import React from 'react'
import { IconButton } from '@mui/material'
import { Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

const UserName = (props: any) => {
  return (
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={props.onClickHandler}
      color="inherit"
    >
      {props.avatarContent ? (
        <img
          src={props.avatarContent}
          alt="user-avatar"
          style={{ width: '25px' }}
        />
      ) : (
        <AccountCircle></AccountCircle>
      )}
      <Typography variant="h6" className={props.className}>
        {props.userName}
      </Typography>
    </IconButton>
  )
}

export default UserName
