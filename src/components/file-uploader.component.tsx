import React, { useContext, useEffect, useState } from 'react'
import { bytesToSize } from '@sasjs/utils/utils/bytesToSize'

import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { SASContext } from '../context/sasContext'
import { AbortModalPayload } from '../types'
import { getAbortModalPayload } from '../utils'
import AbortModal from './abortModal'

const PageLayout = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}))

const UploadInput = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '300px'
}))

const UploadButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2)
}))

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2)
}))

export default function FileUploaderComponent() {
  const sasContext = useContext(SASContext)

  const [uploadPath, setUploadPath] = useState('')
  const [location, setLocation] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [file, setFile] = useState<File | null>(null)
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
    if (event.target.id === 'uploadPath') {
      setUploadPath(event.target.value)
    } else if (event.target.id === 'myFile' && event.target.files?.length) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    setUploadDisabled(true)
    setIsUploading(true)
    setDirList([])
    setAbortModalOpen(false)

    if (sasContext.isUserLoggedIn && file) {
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

    setUploadDisabled(false)
    setIsUploading(false)
  }

  return (
    <PageLayout>
      <Typography variant="h5">
        This is a template file uploader component
      </Typography>
      <Typography>
        You can use it to upload a local file to a directory on your Viya server
      </Typography>

      <UploadInput
        id="uploadPath"
        variant="outlined"
        label="Where to upload"
        value={uploadPath}
        disabled={isUploading}
        onChange={handleChange}
      />
      <UploadInput
        id="myFile"
        variant="outlined"
        type="file"
        disabled={isUploading}
        onChange={handleChange}
      />

      {location && <Typography>Location: {location}</Typography>}
      {fileSize && <Typography>Total Size: {fileSize}</Typography>}

      <UploadButton
        variant="contained"
        color="primary"
        disabled={uploadDisabled}
        onClick={handleUpload}
      >
        Upload
      </UploadButton>

      {isUploading && <CircularProgress sx={{ marginTop: 2 }} />}

      {dirList.length > 0 && !isUploading && (
        <StyledTableContainer>
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
        </StyledTableContainer>
      )}

      <AbortModal
        abortModalOpen={abortModalOpen}
        setAbortModalOpen={setAbortModalOpen}
        payload={abortModalPayload}
      />
    </PageLayout>
  )
}
