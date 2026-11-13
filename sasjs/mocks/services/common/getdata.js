/* React Seed App mock: services/common/getdata
 *
 * The JavaScript twin of getdata.sas: the `areas` table the adapter uploads
 * arrives as CSV (exactly as it does for the SAS service, where %webout(FETCH)
 * builds work.areas from it), and the answer is the matching rows of the
 * dataset as `springs`.
 */

const path = require('path')

const DRIVE_FILES = path.resolve(weboutPath, '..', '..', '..', 'drive', 'files')
const APP_LOC = String(_program).replace(/\/(services|jobs|tests)\/.*$/, '')
const SPRINGS_FILE = path.join(
  DRIVE_FILES,
  APP_LOC,
  'services',
  'common',
  'springs.json'
)

/* An uploaded table, by name. The host binds one set of _WEBIN_ vars per file:
 * _WEBIN_NAME<n> is the table name, _WEBIN_FILEREF<n> its contents - so both
 * are read by eval, because they are module-scope consts of the generated
 * program rather than properties of globalThis. */
const getTable = (name) => {
  if (typeof _WEBIN_FILE_COUNT === 'undefined') return ''

  for (let i = 1; i <= _WEBIN_FILE_COUNT; i++) {
    const tableName = eval(
      `typeof _WEBIN_NAME${i} === 'undefined' ? '' : _WEBIN_NAME${i}`
    )
    if (tableName !== name) continue

    return String(eval(`_WEBIN_FILEREF${i}`))
  }

  return ''
}

/* The adapter's table CSV: a header of `name:format.` entries separated by
 * spaces, then one comma separated record per row, values quoted only when
 * they contain a separator or a quote. A quoted value may hold a line break,
 * so a record ends at a line break that arrives OUTSIDE quotes. */
const parseCsv = (csv) => {
  const records = []
  let values = []
  let value = ''
  let quoted = false

  const endRecord = () => {
    values.push(value)
    records.push(values)
    values = []
    value = ''
  }

  const text = String(csv || '')

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        value += '"'
        i++
      } else if (char === '"') {
        quoted = false
      } else {
        value += char
      }
    } else if (char === '"') {
      quoted = true
    } else if (char === ',') {
      values.push(value)
      value = ''
    } else if (char === '\r' || char === '\n') {
      if (char === '\r' && text[i + 1] === '\n') i++
      if (values.length || value !== '') endRecord()
    } else {
      value += char
    }
  }

  if (values.length || value !== '') endRecord()

  if (records.length < 2) return []

  const columns = records[0]
    .join(' ')
    .trim()
    .split(/\s+/)
    .map((header) => header.replace(/:.*$/, '').toUpperCase())

  return records.slice(1).map((record) => {
    const row = {}

    columns.forEach((column, index) => {
      row[column] = record[index] === undefined ? '' : record[index]
    })

    return row
  })
}

const wanted = new Set(
  parseCsv(getTable('areas')).map((row) => String(row.AREA).trim())
)

const springs = JSON.parse(fs.readFileSync(SPRINGS_FILE, 'utf-8'))

/* proc sql; create table springs as select * from mydb.springs
 *   where area in (select area from work.areas); - dataset order, no sort. */
const rows = springs.filter((row) => wanted.has(row.AREA))

/* A mocked run reports a log, because the SAS Logs panel is part of what this
 * seed demonstrates and a JavaScript twin that wrote nothing leaves it empty.
 * The text is a fixture shared by the three twins (mock-sas-log.json); a run
 * reports the failure-shaped one half the time and a clean one the rest, so the
 * panel shows a log with something in it as well as a log with nothing. */
const reportMockLog = () => {
  const file = path.join(
    DRIVE_FILES,
    APP_LOC,
    'services',
    'common',
    'mock-sas-log.json'
  )
  const { noisy, clean } = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const lines = Math.random() < 0.5 ? noisy : clean

  lines.forEach((line) =>
    console.log(line.replaceAll('{{program}}', () => String(_program)))
  )
}

reportMockLog()

webout('OPEN')
webout('OBJ', 'springs', rows)
webout('CLOSE')
