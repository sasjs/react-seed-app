import { parseLog } from '@sasjs/utils/logs'

/** What `%mp_abort` reported: the reason, the program that raised it, SAS's text. */
export interface AbortDetails {
  message: string
  macro: string
  detail: string
}

const text = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : ''

/** A key from a webout, whatever case the adapter left it in. */
export const findKey = (source: unknown, name: string): unknown => {
  if (!source || typeof source !== 'object') return undefined

  const key = Object.keys(source as Record<string, unknown>).find(
    (candidate) => candidate.toLowerCase() === name
  )

  return key === undefined
    ? undefined
    : (source as Record<string, unknown>)[key]
}

/**
 * Reads the abort payload `%mp_abort` produces (`{ sasjsAbort: [{ MSG, MAC }],
 * SYSERRORTEXT }`), or null when the response carries no abort.
 *
 * An abort arrives as a *resolved* response, so a refused request is an answer
 * with a message in it rather than an exception.
 */
export const readAbort = (response: unknown): AbortDetails | null => {
  const abort = findKey(response, 'sasjsabort')

  if (!abort) return null

  const first = ((Array.isArray(abort) ? abort[0] : abort) || {}) as unknown

  return {
    message: text(findKey(first, 'msg')) || 'The service aborted the request.',
    macro: text(findKey(first, 'mac')),
    detail:
      text(findKey(response, 'syserrortext')) ||
      text(findKey(response, 'syswarningtext'))
  }
}

/**
 * The paths a successful upload left behind: the service answers with a
 * directory listing, either as the whole payload or under `dirlist`.
 */
export const uploadedPaths = (response: unknown): string[] => {
  const rows = Array.isArray(response)
    ? response
    : Array.isArray(findKey(response, 'dirlist'))
      ? (findKey(response, 'dirlist') as unknown[])
      : []

  return rows
    .map((row) => text(findKey(row, 'filepath')))
    .filter((path) => path.length > 0)
}

/** The first error in a log, as the reason a request produced nothing usable. */
export const reasonFromLog = (log: string, fallback: string): string => {
  const errors = parseLog(log || '').filter(
    (issue) => issue.severity === 'error'
  )

  return errors.length
    ? `${errors[0].message.trim()} (line ${errors[0].line + 1})`
    : fallback
}
