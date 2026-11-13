import { describe, expect, it } from 'vitest'
import { findKey, readAbort, reasonFromLog, uploadedPaths } from './abort'

describe('readAbort', () => {
  it('reads the payload %mp_abort produces', () => {
    const abort = readAbort({
      sasjsAbort: [
        {
          MSG: 'The target folder does not exist',
          MAC: 'mp_abort.sas'
        }
      ],
      SYSERRORTEXT: 'Physical file does not exist.'
    })

    expect(abort).toEqual({
      message: 'The target folder does not exist',
      macro: 'mp_abort.sas',
      detail: 'Physical file does not exist.'
    })
  })

  it('accepts either case, and a single object rather than a list', () => {
    const abort = readAbort({
      SASJSABORT: { msg: 'Refused', mac: 'mfu_abort' },
      syswarningtext: 'WARNING: something'
    })

    expect(abort).toEqual({
      message: 'Refused',
      macro: 'mfu_abort',
      detail: 'WARNING: something'
    })
  })

  it('answers null when the response carries no abort', () => {
    expect(readAbort({ dirlist: [] })).toBeNull()
    expect(readAbort(null)).toBeNull()
    expect(readAbort('a string')).toBeNull()
  })

  it('still gives a message when the macro left one out', () => {
    expect(readAbort({ sasjsAbort: [{}] })!.message).toBe(
      'The service aborted the request.'
    )
  })
})

describe('uploadedPaths', () => {
  it('reads a listing under dirlist, and a listing as the payload', () => {
    const rows = [{ FILEPATH: '/Public/uploads/a.txt' }]

    expect(uploadedPaths({ dirlist: rows })).toEqual(['/Public/uploads/a.txt'])
    expect(uploadedPaths(rows)).toEqual(['/Public/uploads/a.txt'])
  })

  it('accepts lower case keys and drops rows without a path', () => {
    expect(
      uploadedPaths({ dirlist: [{ filepath: '/a' }, {}, { FILEPATH: '' }] })
    ).toEqual(['/a'])
  })

  it('answers an empty list when there is nothing to read', () => {
    expect(uploadedPaths(null)).toEqual([])
    expect(uploadedPaths({})).toEqual([])
  })
})

describe('findKey', () => {
  it('matches a key whatever its case, and nothing else', () => {
    expect(findKey({ WebOut: 1 }, 'webout')).toBe(1)
    expect(findKey({ other: 1 }, 'webout')).toBeUndefined()
    expect(findKey(undefined, 'webout')).toBeUndefined()
  })
})

describe('reasonFromLog', () => {
  it('quotes the first error with a one-based line number', () => {
    const log = ['NOTE: hello', 'ERROR: Physical file does not exist.'].join(
      '\n'
    )

    expect(reasonFromLog(log, 'fallback')).toBe(
      'Physical file does not exist. (line 2)'
    )
  })

  it('falls back when the log has no error', () => {
    expect(reasonFromLog('NOTE: nothing wrong', 'fallback')).toBe('fallback')
    expect(reasonFromLog('', 'fallback')).toBe('fallback')
  })
})
