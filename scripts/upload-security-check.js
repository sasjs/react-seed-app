const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')
const vm = require('node:vm')

const source = fs.readFileSync('sasjs/mocks/services/files/upload.js', 'utf8')

function attempt(folder, filename, setup = () => {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'seed-upload-security-'))
  try {
    const drive = path.join(root, 'drive/files')
    const uploads = path.join(drive, 'uploads')
    const outside = path.join(root, 'outside')
    const log = path.join(
      drive,
      'Public/app/seed/services/common/mock-sas-log.json'
    )
    fs.mkdirSync(path.dirname(log), { recursive: true })
    fs.mkdirSync(uploads, { recursive: true })
    fs.mkdirSync(outside)
    fs.writeFileSync(log, JSON.stringify({ clean: [], noisy: [] }))
    fs.writeFileSync(path.join(outside, 'victim'), 'untouched')
    const staged = path.join(root, 'staged')
    fs.writeFileSync(staged, 'attack')
    setup({ drive, uploads, outside, root })
    const output = {}
    vm.runInNewContext(source, {
      fs,
      require,
      console,
      weboutPath: path.join(root, 'sessions/id/webout'),
      _program: '/Public/app/seed/services/files/upload',
      path: folder,
      _WEBIN_FILE_COUNT: 1,
      _WEBIN_FILENAME1: filename,
      _WEBIN_FILEREF1: staged,
      webout: (action, name, value) => {
        if (action === 'OBJ') output[name] = value
      }
    })
    return {
      output,
      victim: fs.readFileSync(path.join(outside, 'victim'), 'utf8')
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
}

for (const [label, folder, filename] of [
  ['folder traversal', '/../../outside', 'victim'],
  ['filename traversal', '/', '../../outside/victim'],
  ['backslash filename traversal', '/uploads', '..\\..\\outside\\victim']
]) {
  test(`rejects ${label}`, () => {
    const result = attempt(folder, filename)
    assert.ok(result.output.sasjsAbort, JSON.stringify(result.output))
    assert.equal(result.victim, 'untouched')
  })
}

test('rejects a symlinked directory leading outside the drive', () => {
  const result = attempt('/escape', 'victim', ({ drive, outside }) => {
    fs.symlinkSync(outside, path.join(drive, 'escape'), 'dir')
  })
  assert.ok(result.output.sasjsAbort, JSON.stringify(result.output))
  assert.equal(result.victim, 'untouched')
})

test('rejects a symlinked destination file', () => {
  const result = attempt('/uploads', 'victim', ({ uploads, outside }) => {
    fs.symlinkSync(path.join(outside, 'victim'), path.join(uploads, 'victim'))
  })
  assert.ok(result.output.sasjsAbort, JSON.stringify(result.output))
  assert.equal(result.victim, 'untouched')
})
