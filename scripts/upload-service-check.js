const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')
const vm = require('node:vm')

const source = fs.readFileSync('sasjs/mocks/services/files/upload.js', 'utf8')

function run(
  upload,
  exists = true,
  missingStage = false,
  writeBlocked = false,
  listBlocked = false
) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'seed-upload-'))
  try {
    const drive = path.join(root, 'drive/files')
    const log = path.join(
      drive,
      'Public/app/seed/services/common/mock-sas-log.json'
    )
    fs.mkdirSync(path.dirname(log), { recursive: true })
    fs.writeFileSync(log, JSON.stringify({ clean: [], noisy: [] }))
    const folder = '/uploads'
    const mounted = path.join(drive, folder)
    if (exists) fs.mkdirSync(mounted, { recursive: true })
    if (writeBlocked) fs.mkdirSync(path.join(mounted, 'payload.bin'))
    const staged = path.join(root, 'staged.bin')
    if (upload && !missingStage) fs.writeFileSync(staged, upload)
    const output = {}
    const context = {
      fs: listBlocked
        ? {
            ...fs,
            readdirSync: () => {
              throw new Error('EACCES: directory listing denied')
            }
          }
        : fs,
      require,
      console,
      weboutPath: path.join(root, 'sessions/id/webout'),
      _program: '/Public/app/seed/services/files/upload',
      path: folder,
      _WEBIN_FILE_COUNT: upload ? 1 : 0,
      _WEBIN_FILENAME1: upload ? 'payload.bin' : '',
      _WEBIN_FILEREF1: upload ? staged : '',
      webout: (action, name, value) => {
        if (action === 'OBJ') output[name] = value
      }
    }
    vm.runInNewContext(source, context)
    return {
      contents:
        upload &&
        exists &&
        !writeBlocked &&
        fs.existsSync(path.join(mounted, 'payload.bin'))
          ? fs.readFileSync(path.join(mounted, 'payload.bin'))
          : undefined,
      paths:
        output.dirlist && Array.from(output.dirlist, (row) => row.FILEPATH),
      abort: output.sasjsAbort && output.sasjsAbort[0].MSG
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
}

test('copies exact staged bytes and lists the uploaded file', () => {
  const bytes = Buffer.from([0xef, 0xbb, 0xbf, 0x41, 0, 0xff, 0xfe])
  const result = run(bytes)
  assert.deepEqual(result.contents, bytes)
  assert.deepEqual(result.paths, ['/uploads/payload.bin'])
})

test('lists the empty folder without an upload', () => {
  assert.deepEqual(run(null).paths, [])
})

test('copies an empty uploaded file', () => {
  assert.deepEqual(run(Buffer.alloc(0)).contents, Buffer.alloc(0))
})

test('returns an abort when the staged file cannot be read', () => {
  const result = run(Buffer.from('x'), true, true)
  assert.match(result.abort, /staged file.*ENOENT/i)
  assert.equal(result.paths, undefined)
  assert.equal(result.contents, undefined)
})

test('returns an abort when the destination cannot be written', () => {
  const result = run(Buffer.from('x'), true, false, true)
  assert.match(result.abort, /write.*EISDIR/i)
  assert.equal(result.paths, undefined)
})

test('returns an abort when listing the directory fails after a write', () => {
  const result = run(Buffer.from('x'), true, false, false, true)
  assert.match(result.abort, /list directory.*EACCES/i)
  assert.equal(result.paths, undefined)
  assert.deepEqual(result.contents, Buffer.from('x'))
})

test('preserves the abort response for a missing folder', () => {
  assert.equal(
    run(Buffer.from('x'), false).abort,
    'File path (/uploads) is not a valid directory'
  )
})
