import React, { useContext, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { SASContext } from '../context/sasContext'

const RootContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  background: ' #000000a6',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw !important',
  maxWidth: 'unset !important',
  height: '100vh'
}))

const Wrapper = styled('div')(({ theme }) => ({
  background: 'white',
  padding: '30px',
  margin: '120px, auto',
  marginTop: theme.spacing(15),
  maxWidth: '400px',
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}))

const LoginForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1)
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2)
}))

const ButtonProgress = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12
})

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const context = useContext(SASContext)

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    if (context.login) {
      context.login(username, password).finally(() => setLoading(false))
    }
  }

  return (
    <RootContainer maxWidth="xs">
      <CssBaseline />
      <Wrapper>
        <img
          className="base-logo"
          alt="company logo"
          width="60px"
          src="logo.png"
        />
        <Typography component="h1" variant="h5" align="center">
          Sign in
        </Typography>
        <LoginForm onSubmit={signIn} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <ButtonProgress size={24} /> : 'Sign In'}
          </SubmitButton>
        </LoginForm>
      </Wrapper>
      <Box mt={8}></Box>
    </RootContainer>
  )
}

export default LoginComponent
