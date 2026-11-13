import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode
} from 'react'
import SASjs, { SASjsConfig, UploadFile } from '@sasjs/adapter'
import { LogEntry, summariseRequests } from '../logs/summarise'

interface SASContextProps {
  /** True until a request answers `login: false` - the app starts signed in. */
  isUserLoggedIn: boolean
  username: string
  startupData: any
  sasService: SASjs
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  /** A service call with `services/` prepended, as the pages address one. */
  request: (url: string, data: any, config?: any) => Promise<any>
  uploadFile: (sasService: string, files: UploadFile[], params?: any) => any
  /** Opens the SAS logs panel, read from the adapter's request history. */
  openLogs: () => void
  closeLogs: () => void
  logsOpen: boolean
  logs: LogEntry[]
}

export const SASContext = createContext<SASContextProps | null>(null)

/**
 * The configuration lives in the `<sasjs>` element in index.html - the tag
 * `sasjs build -t <target>` rewrites, which is how one repo serves a Viya, a
 * SAS 9, a SASjs Server and a browser-hosted mock build. Reading it here is what
 * makes the deployed app agree with the target it was built for.
 */
const readConfig = (): SASjsConfig => {
  const element = document.querySelector('sasjs')
  const attribute = (name: string) => element?.getAttribute(name) || undefined

  return {
    appLoc: attribute('appLoc'),
    serverType: attribute('serverType') as any,
    serverUrl: attribute('serverUrl'),
    loginMechanism: attribute('loginMechanism') as any,
    debug: attribute('debug') === 'true',
    useComputeApi: attribute('useComputeApi') === 'true',
    contextName: attribute('contextName')
  } as SASjsConfig
}

export const SASProvider = ({ children }: { children: ReactNode }) => {
  const config = useMemo(readConfig, [])
  const sasService = useMemo(() => new SASjs(config), [config])
  const redirectedLogin = config.loginMechanism === 'Redirected'

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)
  const [username, setUsername] = useState('')
  const [startupData, setStartupData] = useState<any>(null)
  const [logsOpen, setLogsOpen] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])

  const request = useCallback(
    (url: string, data: any, requestConfig?: any) =>
      new Promise((resolve, reject) => {
        const path = url.startsWith('services/') ? url : `services/${url}`

        sasService
          .request(path, data, requestConfig, () => {
            /* SSO sends the browser to the logon page instead of asking for a
             * password here, so the session is re-established rather than a form
             * shown */
            if (redirectedLogin) {
              sasService.logIn().catch((error) => console.error(error))
            } else {
              setIsUserLoggedIn(false)
            }
          })
          .then(
            (response: any) => {
              if (response && response.login === false) {
                setIsUserLoggedIn(false)
                setUsername('')
                reject(false)

                return
              }

              /* SSO (`loginMechanism: 'Redirected'` on SAS 9) means there is no
               * username to begin with, and a session can change under the app.
               * Every response that carries MF_GETUSER updates it, so the header
               * follows the session rather than the login form. */
              if (response && response.MF_GETUSER) {
                setUsername(response.MF_GETUSER)
              }

              if (response && response.status === 404) {
                reject({
                  MESSAGE: response.body || 'SAS responded with an error'
                })

                return
              }

              resolve(response)
            },
            (error: any) => reject(error)
          )
      }),
    [sasService, redirectedLogin]
  )

  /* the startup data arrives once the session is there: at start-up on a
   * server that lets the app in, and again after a sign-in */
  useEffect(() => {
    if (!isUserLoggedIn) return

    request('common/appinit', null)
      .then((response) => setStartupData(response))
      .catch((error) => console.error(error))
  }, [isUserLoggedIn, request])

  const login = useCallback(
    async (user: string, password: string) => {
      try {
        const result = await sasService.logIn(user, password)

        setIsUserLoggedIn(result.isLoggedIn)
        setUsername(result.userName)

        return result.isLoggedIn
      } catch (error) {
        console.error(error)
        setIsUserLoggedIn(false)

        return false
      }
    },
    [sasService]
  )

  const logout = useCallback(() => {
    sasService.logOut().then(() => {
      setIsUserLoggedIn(false)
      setUsername('')
    })
  }, [sasService])

  const uploadFile = useCallback(
    (service: string, files: UploadFile[], params?: any) =>
      sasService.uploadFile(service, files, params),
    [sasService]
  )

  /* read once on open, so the panel shows what was captured up to that point */
  const openLogs = useCallback(() => {
    setLogs(summariseRequests(sasService.getSasRequests() || []))
    setLogsOpen(true)
  }, [sasService])

  const closeLogs = useCallback(() => setLogsOpen(false), [])

  const value = useMemo(
    () => ({
      isUserLoggedIn,
      username,
      startupData,
      sasService,
      login,
      logout,
      request,
      uploadFile,
      openLogs,
      closeLogs,
      logsOpen,
      logs
    }),
    [
      isUserLoggedIn,
      username,
      startupData,
      sasService,
      login,
      logout,
      request,
      uploadFile,
      openLogs,
      closeLogs,
      logsOpen,
      logs
    ]
  )

  return <SASContext.Provider value={value}>{children}</SASContext.Provider>
}

export const useSASContext = () => {
  const context = useContext(SASContext)

  if (!context) throw new Error('useSASContext must be used inside SASProvider')

  return context
}
