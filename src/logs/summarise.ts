import { parseLog } from '@sasjs/utils/logs'

/** A request as the adapter recorded it, narrowed to what the panel shows. */
export interface RequestLike {
  serviceLink?: string
  timestamp?: Date | string
  logFile?: string
}

export type Severity = 'error' | 'warning' | 'note'

/** One message, and where in the log it sits. */
export interface LogIssueView {
  severity: Severity
  line: number
  endLine: number
  code: string
  message: string
}

/** One row of the SAS logs panel. */
export interface LogEntry {
  service: string
  when: Date | string | undefined
  log: string
  /** The log split for display, so a message's line can be scrolled to. */
  lines: string[]
  issues: LogIssueView[]
  errors: number
  warnings: number
  notes: number
  /** Line index -> severity, for tinting the lines a message points at. */
  severityByLine: Record<number, Severity>
}

/**
 * Summarises the adapter's request history for the SAS logs panel.
 *
 * A pure function, so the counting and the line positions are testable without a
 * component or a browser - and so the panel and any future caller share one rule
 * for what counts as an error. `parseLog` reports line indexes into the text it
 * was given, which is what lets a message be clicked and the log scrolled to it.
 */
export const summariseRequests = (requests: RequestLike[]): LogEntry[] =>
  (requests || []).map((request) => {
    const log = typeof request.logFile === 'string' ? request.logFile : ''
    const lines = log.split('\n')

    const issues: LogIssueView[] = parseLog(log).map((issue) => ({
      severity: issue.severity as Severity,
      line: typeof issue.line === 'number' ? issue.line : 0,
      endLine: typeof issue.endLine === 'number' ? issue.endLine : 0,
      code: issue.code || '',
      message: (issue.message || '').trim()
    }))

    const severityByLine: Record<number, Severity> = {}

    issues.forEach((issue) => {
      /* a message can span lines, and the whole of it is marked - but an error
       * is never overwritten by a later warning about the same line */
      for (let line = issue.line; line <= issue.endLine; line++) {
        if (severityByLine[line] !== 'error')
          severityByLine[line] = issue.severity
      }
    })

    const count = (severity: Severity) =>
      issues.filter((issue) => issue.severity === severity).length

    return {
      service: request.serviceLink || '(no service)',
      when: request.timestamp,
      log,
      lines,
      issues,
      errors: count('error'),
      warnings: count('warning'),
      notes: count('note'),
      severityByLine
    }
  })
