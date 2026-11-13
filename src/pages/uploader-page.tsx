import { ChangeEvent, FormEvent, useState } from 'react'
import { useSASContext } from '../context/sasContext'
import { AbortDialog } from '../components/AbortDialog'
import {
  AbortDetails,
  readAbort,
  reasonFromLog,
  uploadedPaths
} from '../lib/abort'
import './uploader-page.scss'

interface Uploaded {
  path: string
  files: string[]
}

/**
 * Posts a file to a folder on the server, and shows what came back.
 *
 * A successful upload answers with a directory listing; a refused one answers
 * with an abort payload - where the file went, or why it did not. The abort is
 * shown as a dialog of its own, with a way through to the SAS Logs panel,
 * because the log is where the rest of the story is.
 */
export const UploaderPage = () => {
  const { uploadFile, sasService, openLogs } = useSASContext()
  const [uploadPath, setUploadPath] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [uploaded, setUploaded] = useState<Uploaded | null>(null)
  const [abort, setAbort] = useState<AbortDetails | null>(null)

  const selectedNames = files.map((file) => file.name).join(', ')

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files ? Array.from(event.target.files) : [])
    setUploaded(null)
    setAbort(null)
  }

  /** The log of the request that just failed, for the reason it produced none. */
  const lastLog = () => {
    const requests = sasService.getSasRequests() || []
    const last = requests.length ? requests[requests.length - 1] : undefined

    return (last && last.logFile) || ''
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()

    if (files.length < 1 || uploadPath.length < 1) return

    setLoading(true)
    setUploaded(null)
    setAbort(null)

    uploadFile(
      'services/files/upload',
      files.map((file) => ({ file, fileName: file.name })),
      { path: uploadPath }
    )
      .then((response: any) => {
        setLoading(false)

        const listed = uploadedPaths(response)

        if (listed.length > 0) {
          setUploaded({ path: uploadPath, files: listed })

          return
        }

        setAbort(
          readAbort(response) || {
            message: reasonFromLog(
              lastLog(),
              'The service answered without a directory listing.'
            ),
            macro: '',
            detail: ''
          }
        )
      })
      .catch((error: any) => {
        setLoading(false)
        setAbort(
          readAbort(error) || {
            message: (error && error.message) || 'The upload request failed.',
            macro: '',
            detail: ''
          }
        )
      })
  }

  const showLogs = () => {
    setAbort(null)
    openLogs()
  }

  return (
    <div className="uploader-page">
      <header className="page-head">
        <h1>File upload</h1>
        <p>
          Posts a file to a folder on the server - one request to{' '}
          <code>services/files/upload</code> with the file and the folder as
          parameters. The service answers with a directory listing, or aborts
          with the reason it could not write.
        </p>
      </header>

      <form className="upload-card" onSubmit={submit}>
        <label className="field">
          <span>File</span>
          <input type="file" id="fileToUpload" onChange={onFileChange} />
          {selectedNames && <small>{selectedNames}</small>}
        </label>

        <label className="field">
          <span>Upload path</span>
          <input
            name="uploadPath"
            id="upload-path"
            type="text"
            value={uploadPath}
            onChange={(event) => setUploadPath(event.target.value)}
            placeholder="/Public/uploads"
          />
          <small>
            An existing folder on the server, e.g. <code>/Public/uploads</code>
          </small>
        </label>

        <button
          type="submit"
          disabled={!selectedNames || uploadPath.length < 1 || loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {uploaded && (
        <section className="outcome success" role="status">
          <h2>Uploaded</h2>
          <p>
            {uploaded.files.length} file(s) in {uploaded.path}
          </p>

          <ul className="files">
            {uploaded.files.map((path) => (
              <li key={path}>{path}</li>
            ))}
          </ul>
        </section>
      )}

      {abort && (
        <AbortDialog
          abort={abort}
          onClose={() => setAbort(null)}
          onShowLogs={showLogs}
        />
      )}
    </div>
  )
}

export default UploaderPage
