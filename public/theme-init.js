/* Applied before the first paint: a stored choice, else what the operating
 * system prefers. Without it the page renders light and then switches, which is
 * the flash every themed site is asked about.
 *
 * This lives in a file rather than in index.html because an inline <script> is
 * the one thing a strict Content-Security-Policy refuses - `script-src 'self'`
 * blocks it and the page silently loses its theme. An external file is allowed,
 * and a classic script in <head> still runs before the first paint. */
;(function () {
  var theme = null
  try {
    theme = localStorage.getItem('sasjs-theme')
  } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
  }
  document.documentElement.setAttribute('data-theme', theme)
})()
