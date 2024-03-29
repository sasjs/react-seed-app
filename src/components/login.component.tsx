import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { withStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import { SASContext } from '../context/sasContext'

const styles = (theme: Theme) => ({
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
})

const LoginComponent = (props: any) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const classes = props.classes
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
      <div className={`${classes.paper} col-flex LoginComponent`}>
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
        <form className={classes.form} onSubmit={signIn} noValidate>
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
            className={classes.submit}
          >
            {loading ? (
              <CircularProgress size={24} className={classes.buttonProgress} />
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

export default withStyles(styles)(LoginComponent)
