import React, { useState, useContext } from 'react'
import { Button, useTheme } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { TextField } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import { Checkbox } from '@mui/material'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import { styled, Theme } from '@mui/material'
import { Container } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { SASContext } from '../context/sasContext'

let styles: any = {}

const LoginComponent = (props: any) => {
  const theme = useTheme()

  styles = {
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(15),
      display: 'flex',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    wrapper: {
      margin: theme.spacing(1)
    },
    buttonProgress: {
      top: '50%',
      left: '50%'
    }
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const context = useContext(SASContext)

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    if (context.login) {
      context.login(username, password).then(() => {
        setLoading(false)
      })
    }
  }

  const handleChange = (e: any) => {
    let target = e.target.name
    if (target === 'username') {
      setUsername(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  return (
    <Container component="main" maxWidth="xs" className="login-page">
      <CssBaseline />
      <div style={styles.paper} className="col-flex LoginComponent">
        <div>
          <img
            className="base-logo"
            alt="company logo"
            width="60px"
            src="logo.png"
          />
        </div>
        <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
          Sign in
        </Typography>
        <form style={styles.form} onSubmit={signIn} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={username}
            onChange={handleChange}
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={handleChange}
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            style={styles.submit}
          >
            {loading ? (
              <CircularProgress size={24} style={styles.buttonProgress}/>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  )
}

export default styled(LoginComponent)(styles)
