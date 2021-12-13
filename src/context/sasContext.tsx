import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
  ReactNode
} from 'react'
import SASjs, { SASjsConfig } from '@sasjs/adapter'
import axios from 'axios'
import { ServerType } from '@sasjs/utils/types'

interface SASContextProps {
  isUserLoggedIn: boolean
  checkingSession: boolean
  userName: string
  fullName: string
  avatarContent: string
  sasService: SASjs
  setIsUserLoggedIn: null | Dispatch<SetStateAction<boolean>>
  login: ((userName: string, password: string) => Promise<boolean>) | null
  logout: (() => void) | null
  request: ((requestProps: { url: string; data: any }) => Promise<any>) | null
  startupData: any
}

declare global {
  interface Window {
    sasjsConfig: SASjsConfig
  }
}

const sasjsConfig = window.sasjsConfig as SASjsConfig

const sasService = new SASjs(sasjsConfig)

export const SASContext = createContext<SASContextProps>({
  isUserLoggedIn: false,
  checkingSession: false,
  userName: '',
  fullName: '',
  avatarContent: '',
  sasService,
  setIsUserLoggedIn: null,
  login: null,
  logout: null,
  request: null,
  startupData: null
})

const getTokens = () => {
  const accessToken = localStorage.getItem('accessToken') ?? undefined
  const refreshToken = localStorage.getItem('refreshToken') ?? undefined

  return { accessToken, refreshToken }
}
const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}
const getAuthCode = async (credentials: any) => {
  return fetch(`${sasjsConfig.serverUrl}/SASjsApi/auth/authorize`, {
    method: 'POST',
    headers,
    body: JSON.stringify(credentials)
  }).then((data) => data.json())
}
const getNewTokens = async (payload: any) => {
  return fetch(`${sasjsConfig.serverUrl}/SASjsApi/auth/token`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }).then((data) => data.json())
}

const SASProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [checkingSession, setCheckingSession] = useState(false)
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [avatarContent, setAvatarContent] = useState('')
  const [startupData, setStartupData] = useState(null)
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')

  const fetchStartupData = useCallback(() => {
    const { REACT_APP_CLIENT_ID: clientId } = process.env
    const authConfig =
      sasjsConfig.serverType === ServerType.Sasjs
        ? {
            access_token: accessToken,
            refresh_token: refreshToken,
            client: clientId as string,
            secret: ''
          }
        : undefined
    sasService
      .request('services/common/appinit', null, {}, undefined, authConfig)
      .then((response: any) => {
        setStartupData(response)
        if (sasjsConfig.serverType === 'SASVIYA') {
          axios
            .get('/identities/users/@currentUser')
            .then((res) => {
              if (res.data?.name) {
                setFullName(res.data.name)
                if (res.data?.links) {
                  const { uri } = res.data.links.find((obj: any) => {
                    return obj.rel === 'avatarContent'
                  })
                  setAvatarContent(uri)
                }
              }
            })
            .catch((err) => console.log(err))
        } else {
          setFullName(response.MF_GETUSER)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [accessToken, refreshToken])

  const login = useCallback(async (username, password) => {
    if (sasjsConfig.serverType === ServerType.Sasjs) {
      const { REACT_APP_CLIENT_ID: clientId } = process.env

      const { code } = await getAuthCode({
        clientId,
        username,
        password
      }).catch((_) => setIsUserLoggedIn(false))
      if (!code) return false

      const { accessToken, refreshToken } = await getNewTokens({
        clientId,
        code
      }).catch((_) => setIsUserLoggedIn(false))
      if (!accessToken || !refreshToken) return false

      saveTokens(accessToken, refreshToken)
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)

      setIsUserLoggedIn(true)
      return true
    }

    return sasService
      .logIn(username, password)
      .then(
        (res: { isLoggedIn: boolean; userName: string }) => {
          setIsUserLoggedIn(res.isLoggedIn)
          return true
        },
        (err) => {
          console.error(err)
          setIsUserLoggedIn(false)
          return false
        }
      )
      .catch((e) => {
        if (e === 403) {
          console.error('Invalid host')
        }
        return false
      })
  }, [])

  const logout = useCallback(() => {
    sasService.logOut(accessToken).then(() => {
      setIsUserLoggedIn(false)
      if (accessToken) {
        saveTokens('', '')
        setAccessToken('')
        setRefreshToken('')
      }
    })
  }, [accessToken])

  const request = useCallback(
    ({ url, data }) => {
      const { REACT_APP_CLIENT_ID: clientId } = process.env
      const authConfig =
        sasjsConfig.serverType === ServerType.Sasjs
          ? {
              access_token: accessToken,
              refresh_token: refreshToken,
              client: clientId as string,
              secret: ''
            }
          : undefined
      return sasService.request(
        url,
        data,
        {},
        () => setIsUserLoggedIn(false),
        authConfig
      )
    },
    [accessToken, refreshToken]
  )

  useEffect(() => {
    setCheckingSession(true)
    const { accessToken, refreshToken } = getTokens()
    sasService.checkSession(accessToken).then((response) => {
      setCheckingSession(false)
      if (response.isLoggedIn) {
        setAccessToken(accessToken as string)
        setRefreshToken(refreshToken as string)
      }
      setIsUserLoggedIn(response.isLoggedIn)
    })
  }, [])

  useEffect(() => {
    if (isUserLoggedIn) {
      setUserName(sasService.getUserName())
      if (!startupData) {
        fetchStartupData()
      }
    }
  }, [isUserLoggedIn, startupData, fetchStartupData])

  return (
    <SASContext.Provider
      value={{
        isUserLoggedIn,
        checkingSession,
        userName,
        fullName,
        avatarContent,
        sasService,
        setIsUserLoggedIn,
        login,
        logout,
        request,
        startupData
      }}
    >
      {children}
    </SASContext.Provider>
  )
}

export default SASProvider
