import { describe, expect, it } from 'vitest'
import { summariseRequests } from './summarise'

/* A log as SAS writes one: a note on the log itself, an error from the abort,
 * a warning of the converted-values kind that `parseLog` counts as notable. */
const LOG = [
  'NOTE: Copyright (c) 2016 by SAS Institute Inc., Cary, NC, USA.',
  'NOTE: SAS (r) Proprietary Software 9.4',
  '',
  '1    %mp_abort(iftrue= (%mf_isdir(&path) = 0)',
  'ERROR: Execution canceled by an %ABORT CANCEL statement.',
  'ERROR: Errors printed on page 1.',
  'WARNING: Character values have been converted to numeric values.',
  'NOTE: The SAS System stopped processing this step because of errors.'
].join('\n')

describe('summariseRequests', () => {
  it('counts what the parser reported, not what looks like a keyword', () => {
    const [entry] = summariseRequests([
      {
        serviceLink: 'services/files/upload',
        timestamp: '2026-11-12T18:00:00Z',
        logFile: LOG
      }
    ])

    expect(entry.service).toBe('services/files/upload')
    expect(entry.errors).toBe(2)
    expect(entry.warnings).toBe(1)
    // the copyright and version notes are SAS saying hello, not something to read
    expect(entry.notes).toBeLessThan(3)
    expect(entry.log).toBe(LOG)
  })

  it('keeps a request with no log, and names one with no service', () => {
    const [entry] = summariseRequests([{ logFile: '' }])

    expect(entry.service).toBe('(no service)')
    expect(entry.errors).toBe(0)
    expect(entry.warnings).toBe(0)
    expect(entry.notes).toBe(0)
    expect(entry.log).toBe('')
    expect(entry.issues).toEqual([])
  })

  it('reports where each message is, so a click can scroll to it', () => {
    const [entry] = summariseRequests([
      { serviceLink: 'services/files/upload', logFile: LOG }
    ])
    const lines = LOG.split('\n')
    const error = entry.issues.find((issue) => issue.severity === 'error')

    expect(error).toBeTruthy()
    // the index points at the line the reader should be shown
    expect(lines[error!.line]).toContain('ERROR')
    expect(entry.severityByLine[error!.line]).toBe('error')
    expect(entry.lines.length).toBe(lines.length)
    // the message is carried, not just counted
    expect(error!.message.length).toBeGreaterThan(0)
  })

  it('tints every line a wrapped message covers', () => {
    const wrapped = [
      'ERROR 22-322: Syntax error, expecting one of the following: a name,',
      '              a quoted string, a numeric constant.'
    ].join('\n')
    const [entry] = summariseRequests([{ logFile: wrapped }])
    const error = entry.issues.find((issue) => issue.severity === 'error')

    expect(error).toBeTruthy()
    expect(error!.endLine).toBeGreaterThan(error!.line)
    for (let line = error!.line; line <= error!.endLine; line++) {
      expect(entry.severityByLine[line]).toBe('error')
    }
  })

  it('answers an empty history with an empty list', () => {
    expect(summariseRequests([])).toEqual([])
  })
})
