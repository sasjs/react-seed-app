import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import {
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { SASContext } from '../context/sasContext'
import { AbortModalPayload } from '../types'
import { getAbortModalPayload } from '../utils'
import AbortModal from './abortModal'

function usePrevious(value: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const DataPageComponent = () => {
  const sasContext = useContext(SASContext)
  const prevLoggedIn = usePrevious(sasContext.isUserLoggedIn)
  const [areas, setAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState('')
  const [springs, setSprings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentRequest, setCurrentRequest] = useState(null as any)
  const [abortModalOpen, setAbortModalOpen] = useState(false)
  const [abortModalPayload, setAbortModalPayload] = useState<AbortModalPayload>(
    { MSG: '' }
  )

  const executeRequest = useCallback(
    (request) => {
      if (request) {
        setIsLoading(true)
        if (sasContext.request) {
          sasContext.request(request).then((res) => {
            if (res && res.springs) {
              setSprings(res.springs)
            } else if (res.sasjsAbort) {
              getAbortModalPayload(res, setAbortModalPayload)
              setAbortModalOpen(true)
            }
            setIsLoading(false)
          })
        }
      }
    },
    [sasContext]
  )

  useEffect(() => {
    if (sasContext.startupData) {
      setAreas(sasContext.startupData.areas)
      setSelectedArea(sasContext.startupData.areas[0]['AREA'])
    }
  }, [sasContext.startupData])

  useEffect(() => {
    if (
      !prevLoggedIn &&
      sasContext.isUserLoggedIn &&
      currentRequest &&
      currentRequest.data
    ) {
      executeRequest(currentRequest)
    }
  }, [sasContext.isUserLoggedIn, prevLoggedIn, currentRequest, executeRequest])

  const areaOnChange = (event: SelectChangeEvent) => {
    setSelectedArea(event.target.value as string)
  }

  const submitArea = () => {
    if (sasContext.isUserLoggedIn) {
      const request = {
        url: 'services/common/getdata',
        data: {
          areas: [{ area: selectedArea }]
        }
      }
      setCurrentRequest(request)
      executeRequest(request)
    }
  }

  return (
    <div className="home-page">
      <div className="demo-table">
        {areas && areas.length < 1 ? <CircularProgress /> : ''}

        {areas && areas.length > 0 ? (
          <div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedArea}
              onChange={areaOnChange}
            >
              {areas.map((area: any, index) => {
                return (
                  <MenuItem key={area.AREA + index} value={area.AREA}>
                    {area.AREA}
                  </MenuItem>
                )
              })}
            </Select>

            <Button
              onClick={submitArea}
              style={{ marginLeft: '10px' }}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
        ) : (
          ''
        )}

        <hr />

        {isLoading ? <CircularProgress /> : ''}

        {springs && springs.length > 0 && !isLoading ? (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Latitude</TableCell>
                  <TableCell align="left">Longitude</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Area</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Farenheit</TableCell>
                  <TableCell align="left">Celsius</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {springs.map((row: any, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{row.LATITUDE}</TableCell>
                    <TableCell align="left">{row.LONGITUDE}</TableCell>
                    <TableCell align="left">{row.NAME}</TableCell>
                    <TableCell align="left">{row.AREA}</TableCell>
                    <TableCell align="left">{row.TYPE}</TableCell>
                    <TableCell align="left">{row.FARENHEIT}</TableCell>
                    <TableCell align="left">{row.CELSIUS}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          ''
        )}
      </div>
      <AbortModal
        abortModalOpen={abortModalOpen}
        setAbortModalOpen={setAbortModalOpen}
        payload={abortModalPayload}
      />
    </div>
  )
}

export default DataPageComponent
