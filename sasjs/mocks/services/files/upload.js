/* React Seed App mock: services/files/upload
 *
 * The JavaScript twin of upload.sas. The SAS service copies an uploaded file
 * into a directory on the server and answers with a directory listing; here the
 * directory is a folder in the browser's drive, which is the only filesystem a
 * mock build has.
 *
 * The file arrives the way the adapter sends it: one _WEBIN_ entry whose
 * filename is the client's file name and whose contents are the file's text.
 * A file the browser cannot decode as UTF-8 is not round-tripped byte for byte
 * - that is the one thing this twin cannot do, and the reason the SAS service
 * exists. `path` is a request parameter, so the host binds it as a const.
 */

const pathNode = require('path')

const DRIVE_FILES = pathNode.resolve(
  weboutPath,
  '..',
  '..',
  '..',
  'drive',
  'files'
)
const APP_LOC = String(_program).replace(/\/(services|jobs|tests)\/.*$/, '')

const folder = String(path || '/').replace(/\/+$/, '') || '/'

/* the request's `path` is a folder on the drive, and the drive's root here is
 * DRIVE_FILES - so the twin writes to the mounted folder and answers with the
 * path the caller asked about, as SAS does */
const mounted = DRIVE_FILES + folder

/* the _WEBIN_ vars are module-scope consts of the generated program, not
 * properties of globalThis, so they are read by eval with the index inlined */
const webin = (prefix) =>
  eval('typeof ' + prefix + "1 === 'undefined' ? '' : " + prefix + '1')

const filename =
  typeof _WEBIN_FILE_COUNT === 'undefined'
    ? ''
    : String(webin('_WEBIN_FILENAME'))
const contents = filename ? String(webin('_WEBIN_FILEREF')) : ''

/* A mocked run reports a log, because the SAS Logs panel is part of what this
 * seed demonstrates and a JavaScript twin that wrote nothing leaves it empty.
 * The text is a fixture shared by the three twins (mock-sas-log.json); a run
 * reports the failure-shaped one half the time and a clean one the rest, so the
 * panel shows a log with something in it as well as a log with nothing. */
const reportMockLog = () => {
  const file = pathNode.join(
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

/* mp_abort(iftrue= (%mf_isdir(&path) = 0) ...) - the SAS service refuses a
 * folder that is not there rather than creating one, and answers with the abort
 * payload the uploader renders as a dialog. The twin does the same, so the
 * refusal is demonstrable on a site with no SAS behind it. */
let isDirectory = false

try {
  isDirectory = fs.statSync(mounted).isDirectory()
} catch (error) {
  isDirectory = false
}

if (!isDirectory) {
  webout('OPEN')
  webout('OBJ', 'sasjsAbort', [
    {
      MSG: `File path (${folder}) is not a valid directory`,
      MAC: _program
    }
  ])
  webout('CLOSE')
} else {
  if (filename) fs.writeFileSync(`${mounted}/${filename}`, contents)

  /* mp_dirlist(..., outds=dirlist) - one row per entry, FILEPATH being the
   * column the uploader renders */
  const dirlist = fs
    .readdirSync(mounted)
    .map((name) => ({ FILEPATH: `${folder}/${name}` }))

  webout('OPEN')
  webout('OBJ', 'dirlist', dirlist)
  webout('CLOSE')
}
