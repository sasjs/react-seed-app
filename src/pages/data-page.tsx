import { useEffect, useState } from 'react'
import { useSASContext } from '../context/sasContext'
import { readAbort } from '../lib/abort'
import './data-page.scss'

const COLUMNS = [
  { key: 'LATITUDE', numeric: true },
  { key: 'LONGITUDE', numeric: true },
  { key: 'NAME', numeric: false },
  { key: 'AREA', numeric: false },
  { key: 'TYPE', numeric: false },
  { key: 'FARENHEIT', numeric: true },
  { key: 'CELSIUS', numeric: true }
]

/** A value SAS left empty reads as a dash, not as a gap in the table. */
const shown = (value: any) =>
  value === null || value === undefined || value === '' ? '-' : value

/**
 * The data page: pick an area, ask SAS for the matching springs, render the
 * rows. One request to `services/common/getdata`, with the selection as a table.
 */
export const DataPage = () => {
  const { startupData, request } = useSASContext()
  const [areas, setAreas] = useState<any[]>([])
  const [selectedArea, setSelectedArea] = useState('')
  const [springs, setSprings] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [noData, setNoData] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (Array.isArray(startupData?.areas)) setAreas(startupData.areas)
  }, [startupData])

  const submit = () => {
    setLoading(true)
    setNoData(false)
    setError('')

    request('common/getdata', { areas: [{ area: selectedArea }] })
      .then((response: any) => {
        const rows = response?.springs

        setLoading(false)

        if (Array.isArray(rows) && rows.length > 0) {
          setSprings(rows)
        } else {
          setSprings([])
          setNoData(true)
        }
      })
      .catch((reason: any) => {
        setLoading(false)
        setSprings([])

        const abort = readAbort(reason)

        setError(
          abort?.message || reason?.MESSAGE || 'The request to SAS failed.'
        )
      })
  }

  return (
    <div className="data-page">
      <header className="page-head">
        <h1>Springs by area</h1>
        <p>
          Pick an area and the app asks SAS for the matching rows - one request
          to <code>services/common/getdata</code> with the selection as a table.
        </p>
      </header>

      <div className="toolbar">
        <label className="field">
          <span>Area</span>
          <select
            value={selectedArea}
            onChange={(event) => setSelectedArea(event.target.value)}
          >
            <option value="">Select from dropdown</option>
            {areas.map((area) => (
              <option key={area.AREA} value={area.AREA}>
                {area.AREA}
              </option>
            ))}
          </select>
        </label>

        <button onClick={submit} disabled={!selectedArea || loading}>
          {loading ? 'Running...' : 'SUBMIT'}
        </button>

        {springs.length > 0 && !loading && (
          <span className="meta">
            {springs.length} row(s) for <strong>{selectedArea}</strong>
          </span>
        )}
      </div>

      {areas.length < 1 && <p className="state">Loading areas...</p>}
      {loading && <p className="state">Running the service...</p>}
      {error && !loading && (
        <p className="state" role="alert">
          {error}
        </p>
      )}
      {noData && !loading && <p className="state">No data in the response.</p>}

      {springs.length > 0 && !loading && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column.key}
                    className={column.numeric ? 'number' : undefined}
                  >
                    {column.key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {springs.map((row, index) => (
                <tr key={index}>
                  {COLUMNS.map((column) => (
                    <td
                      key={column.key}
                      className={
                        column.numeric
                          ? 'number'
                          : column.key === 'NAME'
                            ? 'name'
                            : undefined
                      }
                    >
                      {shown(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default DataPage
