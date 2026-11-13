import { FormEvent, useState } from 'react'
import { useSASContext } from '../context/sasContext'

/**
 * The sign-in form, shown by the shell when a request has answered
 * `login: false`. Plain markup: the app is the seed, not a login product.
 */
export const Login = () => {
  const { login } = useSASContext()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    login(credentials.username, credentials.password).then((success) => {
      setLoading(false)

      if (success) {
        setCredentials({ username: '', password: '' })
      } else {
        setError('Wrong username or password, please try again.')
      }
    })
  }

  const update = (field: 'username' | 'password') => (value: string) =>
    setCredentials((current) => ({ ...current, [field]: value }))

  return (
    <form className="login" onSubmit={submit}>
      <h2>Sign in</h2>

      <label>
        Username
        <input
          name="username"
          value={credentials.username}
          onChange={(event) => update('username')(event.target.value)}
          autoComplete="username"
          required
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={(event) => update('password')(event.target.value)}
          autoComplete="current-password"
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

export default Login
