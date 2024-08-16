import React, { useContext, useState, useEffect } from 'react'

import { AppBar, useTheme } from '@mui/material'
import { Toolbar } from '@mui/material'
import { MenuItem } from '@mui/material'
import { Switch } from '@mui/material'
import { Divider } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Button } from '@mui/material'
import { Menu } from '@mui/material'
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import RequestModal from '../components/request-modal.component'
import UserName from '../components/user-name.component'
import { SASContext } from '../context/sasContext'
import LoginComponent from '../components/login.component'

const Main = (props) => {
  const theme = useTheme()
  
  const styles = {
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
  }

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
      <div style={styles.root}>
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
              style={styles.tabs}
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
                userName={sasContext.fullName || sasContext.userName}
                avatarContent={sasContext.avatarContent}
                onClickHandler={handleMenu}
                style={styles.title}
              />
              <Menu
                style={styles.popOverMenu}
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
                {sasContext.isUserLoggedIn && (
                  <MenuItem
                    onClick={sasContext.logout}
                    style={styles.logoutButton}
                  >
                    <Button variant="contained" color="primary">
                      Logout
                    </Button>
                  </MenuItem>
                )}
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
