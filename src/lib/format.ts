const pad = (value: number) => String(value).padStart(2, '0')

/**
 * A request timestamp as the logs panel shows it: `2026-11-12 18:00:00`.
 *
 * Compact on purpose - the full form is three times the width of the service
 * name and wraps each header onto a second line. A value that is not a date is
 * passed through unchanged, so a target that records something else still reads.
 */
export const formatWhen = (value: Date | string | undefined): string => {
  if (!value) return ''

  const date = value instanceof Date ? value : new Date(value)

  if (isNaN(date.getTime())) return String(value)

  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    ` ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  )
}
