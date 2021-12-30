import * as React from 'react'
import { AbortModalPayload } from '../types'

export const getAbortModalPayload = (
  res: {
    sasjsAbort: { MSG: string; MAC: string }[]
    SYSERRORTEXT?: string
    SYSWARNINGTEXT?: string
  },
  setAbortMessagePayload: React.Dispatch<
    React.SetStateAction<AbortModalPayload>
  >
) => {
  const { MSG, MAC } = res.sasjsAbort[0]
  const { SYSERRORTEXT, SYSWARNINGTEXT } = res

  setAbortMessagePayload({ MSG, MAC, SYSERRORTEXT, SYSWARNINGTEXT })
}
