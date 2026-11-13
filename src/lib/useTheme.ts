import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'sasjs-theme'

/**
 * Light and dark, one token set in `styles.scss` and a `data-theme` on `<html>`.
 *
 * The initial value is applied by `public/theme-init.js` before the app boots,
 * so the first paint is already the right theme; this hook reads the same
 * attribute and takes over from there.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'

      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* private mode: the choice lasts for the session, which is fine */
      }

      return next
    })
  }, [])

  return { theme, toggle }
}
