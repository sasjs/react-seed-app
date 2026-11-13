import { useEffect } from 'react'
import { AbortDetails } from '../lib/abort'

interface AbortDialogProps {
  abort: AbortDetails
  onClose: () => void
  onShowLogs: () => void
}

/** The abort, shown the way a refusal deserves to be shown. */
export const AbortDialog = ({
  abort,
  onClose,
  onShowLogs
}: AbortDialogProps) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <>
      <div className="abort-backdrop" onClick={onClose} />

      <div
        className="abort-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="abort-title"
      >
        <header>
          <h2 id="abort-title">The upload was aborted</h2>
          <button className="close" onClick={onClose} aria-label="close">
            &times;
          </button>
        </header>

        <p className="message">{abort.message}</p>

        {(abort.macro || abort.detail) && (
          <dl className="detail">
            {abort.macro && (
              <>
                <dt>Raised by</dt>
                <dd>{abort.macro}</dd>
              </>
            )}
            {abort.detail && (
              <>
                <dt>SAS</dt>
                <dd>{abort.detail}</dd>
              </>
            )}
          </dl>
        )}

        <footer>
          <button type="button" className="primary" onClick={onShowLogs}>
            View SAS Logs
          </button>
          <button type="button" className="secondary" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </>
  )
}
