import { describe, expect, it } from 'vitest'
import { formatWhen } from './format'

describe('formatWhen', () => {
  it('formats a date as one compact, sortable line', () => {
    expect(formatWhen(new Date(2026, 10, 12, 18, 0, 5))).toBe(
      '2026-11-12 18:00:05'
    )
  })

  it('accepts an ISO string as the adapter records one', () => {
    expect(formatWhen('2026-01-02T03:04:05')).toMatch(/^2026-01-02 03:04:05$/)
  })

  it('passes through what is not a date, and answers nothing for nothing', () => {
    expect(formatWhen('yesterday')).toBe('yesterday')
    expect(formatWhen('')).toBe('')
    expect(formatWhen(undefined)).toBe('')
  })
})
