import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useSASContext } from '../context/sasContext'
import { useTheme } from '../lib/useTheme'
import LogsPanel from './LogsPanel'
import Login from './Login'
import './Shell.scss'

const NAV = [
  { label: 'Home', path: '/home' },
  { label: 'Data', path: '/data' },
  { label: 'File upload', path: '/file-uploader' }
]

const REPO_URL = 'https://github.com/sasjs/react-seed-app'

/**
 * The application shell: navigation, sign-in, and the SAS logs panel.
 *
 * Plain markup and a small stylesheet on purpose - this is the file a reader
 * copies, and a component library would be one more version to keep in step
 * before anyone had written a line of their own.
 */
export const Shell = () => {
  const {
    isUserLoggedIn,
    username,
    logout,
    openLogs,
    closeLogs,
    logsOpen,
    logs
  } = useSASContext()
  const { theme, toggle } = useTheme()
  const [redirectedLogin] = useState(
    () =>
      document.querySelector('sasjs')?.getAttribute('loginMechanism') ===
      'Redirected'
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const session = useRef<HTMLDivElement | null>(null)

  /* a click anywhere else closes the session menu */
  useEffect(() => {
    if (!menuOpen) return

    const onPointerDown = (event: MouseEvent) => {
      if (!session.current?.contains(event.target as Node)) setMenuOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)

    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [menuOpen])

  const showLogs = () => {
    setMenuOpen(false)
    openLogs()
  }

  /**
   * Opens the bundled documentation.
   *
   * Resolved against the document's own base rather than the pathname: the app
   * is served from an app-stream path, a domain root and a Pages subfolder by
   * turns, and `pathname + '/docs'` doubles the slash whenever the path already
   * ends in one - which is every app-stream URL.
   *
   * It names the file, not the folder: an app stream has no directory index, so
   * `/docs/` is a 500 there while `/docs/index.html` is the page.
   */
  const openDocs = () => {
    setMenuOpen(false)
    window.location.assign(new URL('docs/index.html', document.baseURI).href)
  }

  return (
    <>
      <header className="app-header">
        <NavLink className="brand" to="/home">
          SASjs <span>React</span>
        </NavLink>

        <nav>
          {NAV.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="tools">
          <a
            className="icon"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Source on GitHub"
            aria-label="Source on GitHub"
          >
            <svg
              viewBox="0 0 16 16"
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>

          <button
            className="icon theme"
            type="button"
            onClick={toggle}
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            title={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {theme === 'dark' ? (
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="12" cy="12" r="4.2" fill="currentColor" />
                <g
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6" />
                  <path d="M5.2 5.2l1.9 1.9M16.9 16.9l1.9 1.9M18.8 5.2l-1.9 1.9M7.1 16.9l-1.9 1.9" />
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M20.5 14.4A8.5 8.5 0 019.6 3.5 8.6 8.6 0 1020.5 14.4z"
                />
              </svg>
            )}
          </button>
        </div>

        {isUserLoggedIn && (
          <div className="session" ref={session}>
            <button
              className="user"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
            >
              {username || 'Signed in'}
              <span aria-hidden="true">&#9662;</span>
            </button>

            {menuOpen && (
              <ul className="menu">
                <li>
                  <button onClick={showLogs}>SAS Logs</button>
                </li>
                <li>
                  <button onClick={openDocs}>Documentation</button>
                </li>
                <li className="divider" aria-hidden="true" />
                <li>
                  <button onClick={logout}>Log out</button>
                </li>
              </ul>
            )}
          </div>
        )}
      </header>

      {/* with SSO there is no password to ask for: the adapter has sent the
          browser to the logon page and the session comes back on its own */}
      {isUserLoggedIn ? <Outlet /> : redirectedLogin ? null : <Login />}

      <LogsPanel open={logsOpen} entries={logs} onClose={closeLogs} />
    </>
  )
}

export default Shell
