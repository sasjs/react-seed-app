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
import { LoginResult } from '@sasjs/adapter/types/Login'

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

const sasElement = document.querySelector('sasjs')

const useComputeApi = sasElement?.getAttribute('useComputeApi')

const sasjsConfig = {
  serverUrl: sasElement?.getAttribute('serverUrl') ?? undefined,
  appLoc: sasElement?.getAttribute('appLoc') ?? '',
  serverType: sasElement?.getAttribute('serverType'),
  debug: sasElement?.getAttribute('debug') === 'true',
  loginMechanism: sasElement?.getAttribute('loginMechanism') ?? 'Default',
  useComputeApi:
    useComputeApi === 'true'
      ? true
      : useComputeApi === 'false'
      ? false
      : useComputeApi,
  contextName: sasElement?.getAttribute('contextName') ?? ''
} as SASjsConfig

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

const SASProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [checkingSession, setCheckingSession] = useState(false)
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [avatarContent, setAvatarContent] = useState('')
  const [startupData, setStartupData] = useState(null)

  const fetchStartupData = useCallback(() => {
    sasService
      .request('services/common/appinit', null)
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
  }, [])

  const login = useCallback(async (username, password) => {
    return sasService
      .logIn(username, password)
      .then(
        (res: LoginResult) => {
          setUserName(res.userName)
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
    sasService.logOut().then(() => {
      setIsUserLoggedIn(false)
      setFullName('')
      setUserName('')
    })
  }, [])

  const request = useCallback(({ url, data }) => {
    return sasService.request(url, data, {}, () => setIsUserLoggedIn(false))
  }, [])

  useEffect(() => {
    setCheckingSession(true)
    sasService
      .checkSession()
      .then((response) => {
        setCheckingSession(false)
        setIsUserLoggedIn(response.isLoggedIn)
      })
      .catch((_) => {
        setCheckingSession(false)
        setIsUserLoggedIn(false)
      })
  }, [])

  useEffect(() => {
    if (isUserLoggedIn) {
      setUserName(sasService.getUserName())
      if (!startupData) {
        fetchStartupData()
      }
    } else if (sasjsConfig.loginMechanism === 'Redirected') {
      sasService
        .logIn()
        .then(
          (res: { isLoggedIn: boolean; userName: string }) => {
            setIsUserLoggedIn(res.isLoggedIn)
          },
          (err) => {
            console.error(err)
            setIsUserLoggedIn(false)
          }
        )
        .catch((e) => {
          if (e === 403) {
            console.error('Invalid host')
          }
        })
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
