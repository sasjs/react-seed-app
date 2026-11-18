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

/* FETCH preserves column spelling; SAS column names are case-insensitive.
 * AREA is character in the seed dataset. Compare character values with SAS
 * blank-padding semantics: trailing spaces are insignificant, leading are not.
 * FETCH returns special numeric missings as strings without type metadata, so
 * a numeric .A cannot be distinguished from the character value '.A'. Numeric
 * AREA is a SAS SQL type mismatch; this mock cannot reproduce that error. */
const unpad = (value) => value.replace(/ +$/, '')
const areas = (webout('FETCH') || {}).areas || []
const wanted = new Set(
  areas.flatMap((row) => {
    const key = Object.keys(row).find((name) => name.toUpperCase() === 'AREA')
    return key === undefined || typeof row[key] !== 'string'
      ? []
      : [unpad(row[key])]
  })
)

const springs = JSON.parse(fs.readFileSync(SPRINGS_FILE, 'utf-8'))

/* proc sql; create table springs as select * from mydb.springs
 *   where area in (select area from work.areas); - dataset order, no sort. */
const rows = springs.filter(
  (row) => typeof row.AREA === 'string' && wanted.has(unpad(row.AREA))
)

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
