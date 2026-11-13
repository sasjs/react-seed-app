#!/usr/bin/env node
/*
 * Serves the built frontend for the Lighthouse job.
 *
 * The app calls a SAS service at start-up (`services/common/appinit`), and with
 * no backend behind the build that is a POST. Python's `http.server` answers a
 * POST with 501 *without reading the request body*, which leaves the browser's
 * fetch unsettled: Lighthouse then hangs on its full-page screenshot until the
 * DevTools call times out, and the job fails for a reason that has nothing to do
 * with the app. (Measured: identical flags and Chrome complete against the react
 * seed app, whose start-up call is a GET.)
 *
 * So this answers a POST with JSON - enough for the page to finish its start-up
 * call and go quiet - and serves files otherwise, falling back to index.html.
 *
 * Usage: node scripts/serve-build.js [dir] [port]
 */

const fs = require('fs')
const http = require('http')
const path = require('path')

const ROOT = path.resolve(process.argv[2] || 'dist/browser')
const PORT = Number(process.argv[3] || 4173)

const CONTENT_TYPES = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2'
}

const server = http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    // drain the body first: an unread body is what leaves the browser's fetch
    // pending, which is the whole reason this server exists
    request.resume()
    request.on('end', () => {
      response.writeHead(200, { 'content-type': 'application/json' })
      response.end(
        JSON.stringify({ WEBOUT: '', MESSAGE: 'static preview - no SAS here' })
      )
    })

    return
  }

  const requested = path.join(
    ROOT,
    decodeURIComponent(request.url.split('?')[0])
  )
  const file =
    fs.existsSync(requested) && fs.statSync(requested).isFile()
      ? requested
      : path.join(ROOT, 'index.html')

  response.writeHead(200, {
    'content-type':
      CONTENT_TYPES[path.extname(file)] || 'application/octet-stream'
  })

  fs.createReadStream(file).pipe(response)
})

server.listen(PORT, '127.0.0.1', () => {
  process.stdout.write(`serving ${ROOT} on http://127.0.0.1:${PORT}/\n`)
})
