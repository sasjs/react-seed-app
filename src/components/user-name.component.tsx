import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'

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
