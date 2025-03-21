import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Button,
  Divider,
  FormControlLabel,
  Menu,
  MenuItem,
  Switch,
  Tab,
  Tabs,
  Toolbar
} from '@mui/material'
import { styled } from '@mui/material/styles'

import LoginComponent from '../components/login.component'
import RequestModal from '../components/request-modal.component'
import UserName from '../components/user-name.component'

import { SASContext } from '../context/sasContext'

const Root = styled('div')({ flexGrow: 1 })

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    fontSize: '21px',
    color: theme.palette.primary.contrastText
  }
}))

const StyledMenu = styled(Menu)({
  '& .MuiList-padding': {
    padding: 0
  }
})

const Main = () => {
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
      <Root>
        <AppBar position="static">
          <Toolbar variant="dense">
            <img
              src="logo-white.png"
              alt="logo"
              style={{ width: '50px', cursor: 'pointer', marginRight: '25px' }}
              onClick={() => navigate('/home')}
            />
            <StyledTabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label="Home" value="/home" to="/home" component={Link} />
              <Tab label="Demo" value="/demo" to="/demo" component={Link} />
              <Tab
                label="FileUploader"
                value="/file-uploader"
                to="/file-uploader"
                component={Link}
              />
            </StyledTabs>
            <div
              style={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'flex-end'
              }}
            >
              <UserName
                userName={sasContext.fullName || sasContext.userName}
                avatarContent={sasContext.avatarContent}
                onClickHandler={handleMenu}
                sx={{ color: 'white', padding: '0 8px' }}
              />
              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={Boolean(anchorEl)}
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
                  />
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
                    sx={{ justifyContent: 'center' }}
                  >
                    <Button variant="contained" color="primary">
                      Logout
                    </Button>
                  </MenuItem>
                )}
              </StyledMenu>
            </div>
          </Toolbar>
        </AppBar>
        <Outlet />
        <RequestModal
          programLogs={sasContext.sasService.getSasRequests()}
          sasjsConfig={sasContext.sasService.getSasjsConfig()}
          isModalOpen={isModalOpen}
          handleClose={handleClose}
          open={Boolean(anchorEl)}
        />
      </Root>
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
