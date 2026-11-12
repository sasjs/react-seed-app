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

const folder = String(path || '/').replace(/\/+$/, '') || '/'

/* the _WEBIN_ vars are module-scope consts of the generated program, not
 * properties of globalThis, so they are read by eval with the index inlined */
const webin = (prefix) =>
  eval("typeof " + prefix + "1 === 'undefined' ? '' : " + prefix + "1")

const filename =
  typeof _WEBIN_FILE_COUNT === 'undefined' ? '' : String(webin('_WEBIN_FILENAME'))
const contents = filename ? String(webin('_WEBIN_FILEREF')) : ''

fs.mkdirSync(folder)

if (filename) fs.writeFileSync(`${folder}/${filename}`, contents)

/* mp_dirlist(..., outds=dirlist) - one row per entry, FILEPATH being the column
 * the uploader renders */
const dirlist = fs
  .readdirSync(folder)
  .map((name) => ({ FILEPATH: `${folder}/${name}` }))

webout('OPEN')
webout('OBJ', 'dirlist', dirlist)
webout('CLOSE')
