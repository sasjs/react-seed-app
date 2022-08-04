import React, { useContext, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import RequestModal from '../components/request-modal.component'
import UserName from '../components/user-name.component'
import { SASContext } from '../context/sasContext'
import LoginComponent from '../components/login.component'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: 'white',
    padding: '0 8px'
  },
  tabs: {
    '& .MuiTab-root': {
      fontSize: '21px'
    },
    '& .Mui-selected': {
      color: theme.palette.secondary.main
    }
  },
  popOverMenu: {
    '& .MuiList-padding': {
      padding: 0
    }
  },
  logoutButton: {
    justifyContent: 'center'
  }
}))

const Main = (props) => {
  const navigate = useNavigate()
  const sasContext = useContext(SASContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [debug, setDebug] = useState(
    sasContext.sasService.getSasjsConfig().debug
  )

  const { pathname } = useLocation()
  const [tabValue, setTabValue] = useState(pathname)

  useEffect(() => {
    setTabValue(pathname)
  }, [pathname])

  const classes = useStyles()
  const open = Boolean(anchorEl)

  useEffect(() => {
    sasContext.sasService.setDebugState(debug)
  }, [debug, sasContext.sasService])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setIsModalOpen(false)
  }

  const handleTabChange = (event, value) => {
    setTabValue(value)
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <img
              src="logo-white.png"
              alt="logo"
              style={{
                width: '50px',
                cursor: 'pointer',
                marginRight: '25px'
              }}
              onClick={() => navigate('/home')}
            />
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              className={classes.tabs}
            >
              <Tab label="Home" value="/home" to="/home" component={Link} />
              <Tab label="Demo" value="/demo" to="/demo" component={Link} />
              <Tab
                label="FileUploader"
                value="/file-uploader"
                to="/file-uploader"
                component={Link}
              />
            </Tabs>
            <div
              style={{
                display: 'flex',
                flexGrow: '1',
                justifyContent: 'flex-end'
              }}
            >
              <UserName
                userName={sasContext.displayName}
                avatarContent={sasContext.avatarContent}
                onClickHandler={handleMenu}
                className={classes.title}
              />
              <Menu
                className={classes.popOverMenu}
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <FormControlLabel
                    value="start"
                    control={
                      <Switch
                        color="primary"
                        checked={debug}
                        onChange={(e) => setDebug(e.target.checked)}
                      />
                    }
                    label="Debug"
                    labelPlacement="start"
                  ></FormControlLabel>
                </MenuItem>

                <Divider variant="middle" />

                <MenuItem onClick={() => setIsModalOpen(true)}>
                  Requests
                </MenuItem>
                <MenuItem onClick={() => openInNewTab('https://sasjs.io/')}>
                  Documentation
                </MenuItem>
                <Divider variant="middle" />
                <MenuItem
                  onClick={sasContext.logout}
                  className={classes.logoutButton}
                >
                  <Button variant="contained" color="primary">
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Outlet />

        <RequestModal
          programLogs={sasContext.sasService.getSasRequests()}
          sasjsConfig={sasContext.sasService.getSasjsConfig()}
          isModalOpen={isModalOpen}
          handleClose={handleClose}
          open={open}
        />
      </div>
      {!(
        document.querySelector('sasjs')?.getAttribute('loginMechanism') ===
          'Redirected' ||
        sasContext.isUserLoggedIn ||
        sasContext.checkingSession
      ) && <LoginComponent />}
    </>
  )
}

export default Main
