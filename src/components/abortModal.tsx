import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material'

import { styled } from '@mui/material/styles'

import CloseIcon from '@mui/icons-material/Close'

import { AbortModalPayload } from '../types'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

const dialogEntry = (left: string, right?: string) =>
  right &&
  right.trim() && (
    <Typography gutterBottom>
      {left}: <span style={{ fontFamily: 'monospace' }}>{right}</span>
    </Typography>
  )

export interface AbortModalProps {
  abortModalOpen: boolean
  setAbortModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  payload: AbortModalPayload
}

const AbortModal = (props: AbortModalProps) => {
  const { abortModalOpen, setAbortModalOpen, payload } = props

  return (
    <div>
      <BootstrapDialog
        onClose={() => setAbortModalOpen(false)}
        open={abortModalOpen}
      >
        <BootstrapDialogTitle
          id="abort-modal"
          onClose={() => setAbortModalOpen(false)}
        >
          Abort Message
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {dialogEntry('SAS Service', payload.MAC)}
          {dialogEntry('ERROR', payload.MSG)}
          {dialogEntry('SYSWARNINGTEXT', payload.SYSWARNINGTEXT)}
          {dialogEntry('SYSERRORTEXT', payload.SYSERRORTEXT)}
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}

export default AbortModal
