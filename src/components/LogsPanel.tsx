import { useEffect, useRef, useState } from 'react'
import { LogEntry, LogIssueView } from '../logs/summarise'
import { formatWhen } from '../lib/format'
import './LogsPanel.scss'

interface LogsPanelProps {
  open: boolean
  entries: LogEntry[]
  onClose: () => void
}

interface Flash {
  entry: number
  line: number
}

/**
 * The SAS logs panel: one row per request the adapter kept, the messages SAS
 * wrote, and the log itself with those lines marked.
 *
 * `parseLog` from `@sasjs/utils` is the parser Data Controller reads its logs
 * with, so the two applications agree about what an ERROR is, which notes are
 * notable, and where each one sits in the text.
 */
export const LogsPanel = ({ open, entries, onClose }: LogsPanelProps) => {
  const [flash, setFlash] = useState<Flash | null>(null)
  const panes = useRef<Record<number, HTMLDivElement | null>>({})

  /* Escape closes the panel, the way a dialog is expected to behave */
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  /**
   * Scrolls the log to the line a message points at, and flashes it.
   *
   * The message carries the line index `parseLog` reported, and the log renders
   * one element per line, so this is a lookup rather than a search of the text -
   * a log with the same message twice still lands on the right one.
   */
  const jumpTo = (entry: number, issue: LogIssueView) => {
    const pane = panes.current[entry]
    const line = pane?.querySelector(`[data-line="${issue.line}"]`)

    if (line) line.scrollIntoView({ block: 'center' })

    setFlash({ entry, line: issue.line })
    window.setTimeout(() => setFlash(null), 1600)
  }

  if (!open) return null

  return (
    <>
      {/* clicking the backdrop closes the panel; the panel stops the click */}
      <div className="logs-backdrop" onClick={onClose} />

      <aside
        className="logs"
        role="dialog"
        aria-modal="true"
        aria-label="SAS Logs"
      >
        <header>
          <h2>SAS Logs</h2>
          <button className="close" onClick={onClose} aria-label="close">
            &times;
          </button>
        </header>

        {entries.length < 1 && (
          <p className="empty">
            No requests yet. Turn on debug in the app&apos;s SASjs config to
            capture logs, then use the app and open this panel again.
          </p>
        )}

        {entries.map((entry, index) => (
          <details className="entry" key={`${entry.service}-${index}`}>
            <summary>
              <span className="service">{entry.service}</span>

              {entry.errors > 0 && (
                <span className="badge error">{entry.errors} error(s)</span>
              )}
              {entry.warnings > 0 && (
                <span className="badge warning">
                  {entry.warnings} warning(s)
                </span>
              )}
              {entry.notes > 0 && (
                <span className="badge note">{entry.notes} note(s)</span>
              )}

              <span className="when">{formatWhen(entry.when)}</span>
            </summary>

            {/* one button per message: clicking it scrolls the log to that line */}
            {entry.issues.length > 0 && (
              <ul className="issues">
                {entry.issues.map((issue, at) => (
                  <li className={issue.severity} key={`${issue.line}-${at}`}>
                    <button
                      type="button"
                      onClick={() => jumpTo(index, issue)}
                      title={issue.message}
                    >
                      <span className="tag">{issue.severity}</span>
                      <span className="place">line {issue.line + 1}</span>
                      {issue.code && (
                        <span className="code">({issue.code})</span>
                      )}
                      <span className="text">{issue.message}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div
              className="log-pane"
              ref={(element) => {
                panes.current[index] = element
              }}
            >
              {entry.lines.map((text, line) => (
                <div
                  key={line}
                  data-line={line}
                  className={[
                    'line',
                    entry.severityByLine[line] || '',
                    flash && flash.entry === index && flash.line === line
                      ? 'flash'
                      : ''
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className="no">{line + 1}</span>
                  <span className="text">{text}</span>
                </div>
              ))}
            </div>
          </details>
        ))}
      </aside>
    </>
  )
}

export default LogsPanel
