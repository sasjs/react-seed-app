import React, { useState, useEffect, useContext } from 'react'
import { bytesToSize } from '@sasjs/utils/utils/bytesToSize'
import { TextField, useTheme } from '@mui/material'
import { Button } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { Table } from '@mui/material'
import { TableBody } from '@mui/material'
import { TableCell } from '@mui/material'
import { TableContainer } from '@mui/material'
import { TableHead } from '@mui/material'
import { TableRow } from '@mui/material'
import { Paper } from '@mui/material'

import { SASContext } from '../context/sasContext'
import { AbortModalPayload } from '../types'
import { getAbortModalPayload } from '../utils'
import AbortModal from './abortModal'

export default function FileUploaderComponent() {
  const theme = useTheme()

  const styles = {
    pageLayout: {
      padding: '16px',
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      marginTop: '10px',
      width: '300px'
    },
    uploadButton: {
      marginTop: '20px'
    },
    circularProgress: {
      marginTop: '10px'
    },
    table: {
      marginTop: '20px'
    },
    errorTitle: {
      color: theme.palette.error.main
    }
  }

  const sasContext = useContext(SASContext)

  const [uploadPath, setUploadPath] = useState('')
  const [location, setLocation] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [file, setFile] = useState<File>()
  const [uploadDisabled, setUploadDisabled] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [dirList, setDirList] = useState([])
  const [abortModalOpen, setAbortModalOpen] = useState(false)
  const [abortModalPayload, setAbortModalPayload] = useState<AbortModalPayload>(
    { MSG: '' }
  )

  useEffect(() => {
    if (file) {
      setUploadDisabled(false)
      setLocation(`${uploadPath}/${file.name}`)
      setFileSize(bytesToSize(file.size))
    }

    setDirList([])
    setAbortModalOpen(false)
  }, [file, uploadPath])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'uploadPath':
        setUploadPath(event.target.value)
        break
      case 'myFile':
        if (event.target.files?.length) {
          setFile(event.target.files[0])
        }
        break
      default:
        break
    }
  }

  const handleUpload = async () => {
    setUploadDisabled(true)
    setIsUploading(true)
    setDirList([])
    setAbortModalOpen(false)

    if (sasContext.isUserLoggedIn) {
      if (file) {
        await sasContext.sasService
          .uploadFile(
            'services/files/upload',
            [{ file: file, fileName: file.name }],
            { path: uploadPath }
          )
          .then((res: any) => {
            if (res.sasjsAbort) {
              getAbortModalPayload(res, setAbortModalPayload)
              setAbortModalOpen(true)
            } else if (typeof res?.dirlist === 'object') {
              setDirList(res.dirlist)
            } else {
              setAbortModalPayload({
                MSG: 'Response does not contain dir list'
              })
              setAbortModalOpen(true)
            }
          })
          .catch((err) => console.log(err))
      }
    }
    setUploadDisabled(false)
    setIsUploading(false)
  }

  return (
    <div style={styles.pageLayout}>
      <h1>This is a template file uploader component</h1>
      <p>
        You can use it to upload a local file to a directory on your Viya server
      </p>

      <TextField
        style={styles.input}
        id="uploadPath"
        variant="outlined"
        label="Where to upload"
        value={uploadPath}
        disabled={isUploading}
        onChange={handleChange}
      />
      <TextField
        style={styles.input}
        id="myFile"
        variant="outlined"
        type="file"
        disabled={isUploading}
        onChange={handleChange}
      />
      {location ? <p>Location: {location}</p> : null}
      {fileSize ? <p>Total Size: {fileSize}</p> : null}
      <Button
        variant="contained"
        color="primary"
        style={styles.uploadButton}
        disabled={uploadDisabled}
        onClick={handleUpload}
      >
        Upload
      </Button>
      {isUploading ? (
        <CircularProgress style={styles.circularProgress} />
      ) : null}

      {dirList && dirList.length > 0 && !isUploading ? (
        <TableContainer component={Paper} style={styles.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">FILEPATH</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dirList.map((item: any, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{item.FILEPATH}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}

      <AbortModal
        abortModalOpen={abortModalOpen}
        setAbortModalOpen={setAbortModalOpen}
        payload={abortModalPayload}
      />
    </div>
  )
}
