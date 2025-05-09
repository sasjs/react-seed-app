import { IconButton, Typography } from '@mui/material'

import AccountCircle from '@mui/icons-material/AccountCircle'

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
      <Typography variant="h6" sx={props.sx}>
        {props.userName}
      </Typography>
    </IconButton>
  )
}

export default UserName
