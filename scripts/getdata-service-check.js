/* Execute the stored program with the installed shared prelude on both hosts.
 * SASJS_WEBOUT_MODULE can override it with a locally built webout module. */
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')
const { test } = require('node:test')

const common = path.join(
  __dirname,
  '..',
  'sasjs',
  'mocks',
  'services',
  'common'
)
const source = fs.readFileSync(path.join(common, 'getdata.js'), 'utf8')
const seed = JSON.parse(
  fs.readFileSync(path.join(common, 'springs.json'), 'utf8')
)
const scratch = os.tmpdir()
const realModule = process.env.SASJS_WEBOUT_MODULE
const preludeModule = realModule
  ? require(path.resolve(realModule))
  : require('@sasjs/utils')
const program = '/Public/app/demo/services/common/getdata'

function runService(browser, csv, springs = seed) {
  fs.mkdirSync(scratch, { recursive: true })
  const dir = fs.mkdtempSync(path.join(scratch, 'getdata-'))
  try {
    const weboutPath = path.join(dir, 'sessions', 's1', 'webout.txt')
    const headersPath = path.join(dir, 'sessions', 's1', 'headers.txt')
    const drive = path.join(
      dir,
      'drive',
      'files',
      'Public',
      'app',
      'demo',
      'services',
      'common'
    )
    fs.mkdirSync(path.dirname(weboutPath), { recursive: true })
    fs.mkdirSync(drive, { recursive: true })
    fs.writeFileSync(weboutPath, '')
    fs.writeFileSync(headersPath, '')
    fs.writeFileSync(path.join(drive, 'springs.json'), JSON.stringify(springs))
    if (fs.existsSync(path.join(common, 'mock-sas-log.json'))) {
      fs.copyFileSync(
        path.join(common, 'mock-sas-log.json'),
        path.join(drive, 'mock-sas-log.json')
      )
    }
    const isolated = {}
    const setup = preludeModule.getWeboutPrelude({
      weboutPath,
      headersPath,
      program,
      debug: '',
      username: 'test',
      userId: 'test',
      apiServerUrl: 'http://localhost'
    })
    const context = {
      tables:
        csv === null
          ? [
              {
                name: 'unrelated',
                filename: 'other.csv',
                csv: 'area:$char40.\r\nundefined'
              }
            ]
          : csv === undefined
            ? []
            : [
                {
                  name: 'unrelated',
                  filename: 'other.csv',
                  csv: 'x:$char1.\r\nx'
                },
                {
                  name: 'areas',
                  filename: 'areas.csv',
                  csv: browser ? csv : Buffer.from(csv)
                }
              ]
    }
    const programFn = new Function(
      'require',
      'fs',
      'weboutPath',
      '_program',
      'globalThis',
      'console',
      '_sasjs_fetch_context',
      `let _webout = '';\n${setup}\nconst webout = globalThis.webout;\n${source}`
    )
    const requireHost = browser
      ? (name) => {
          if (name === 'path') return path
          throw new Error(`browser has no ${name}`)
        }
      : require
    const quiet = { log() {}, warn() {}, error() {} }
    programFn(requireHost, fs, weboutPath, program, isolated, quiet, context)
    return JSON.parse(fs.readFileSync(weboutPath, 'utf8'))
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

for (const browser of [false, true]) {
  const host = `${browser ? 'browser' : 'server'} (shared prelude)`
  test(`${host}: FETCH selects seeded rows in dataset order`, () => {
    const first = seed[0].AREA
    const second = seed.find((row) => row.AREA !== first).AREA
    const result = runService(
      browser,
      `area:$char40.\r\n ${second} \r\n${first}`
    )
    assert.deepEqual(
      result.springs,
      seed.filter((row) => row.AREA === first || row.AREA === second)
    )
  })
  test(`${host}: missing areas returns no springs`, () => {
    assert.deepEqual(runService(browser, undefined).springs, [])
  })
  test(`${host}: unrelated table alone does not select springs`, () => {
    assert.deepEqual(
      runService(browser, null, [{ AREA: 'undefined' }]).springs,
      []
    )
  })
  test(`${host}: rows without an AREA column do not select undefined`, () => {
    const springs = [{ AREA: 'undefined' }]
    assert.deepEqual(
      runService(browser, 'other:$char40.\r\nanything', springs).springs,
      []
    )
  })
  test(`${host}: area column names remain case insensitive`, () => {
    const area = seed[0].AREA
    assert.deepEqual(
      runService(browser, `ArEa:$char40.\r\n${area}`).springs,
      seed.filter((row) => row.AREA === area)
    )
  })
  test(`${host}: quoted CSV values are used whole`, () => {
    const springs = [
      { AREA: 'A, "B"\nC', NAME: 'fixture' },
      { AREA: 'Other', NAME: 'other' }
    ]
    const csv = 'area:$char40.\r\n"A, ""B""\nC"'
    assert.deepEqual(runService(browser, csv, springs).springs, [springs[0]])
  })
}
