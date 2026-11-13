#!/usr/bin/env node
/*
 * Checks the BUILT mock site: boots the service worker it ships, calls the
 * services the app calls, and asserts the answers.
 *
 * A build that produces files is not the same as a site that answers. The
 * failure this catches is the quiet one - a service renamed, a dataset that did
 * not reach the drive, an exception inside the worker, a JavaScript twin that
 * was not synced from sasjs/mocks - which leaves a perfectly formed folder that
 * renders nothing.
 *
 * Usage:
 *   node scripts/check-mock-site.js [site dir]   (default sasjsbuild/mock)
 *
 * Requires node 22+ (global Request/Response).
 */

const fs = require('fs')
const path = require('path')

const SITE = path.resolve(process.argv[2] || 'sasjsbuild/mock')
const APP = '/Public/app/react-seed-app/services'
const FIXTURE = path.join(
  __dirname,
  '..',
  'sasjs',
  'mocks',
  'services',
  'common',
  'springs.json'
)

const fail = (message) => {
  console.error(`FAILED: ${message}`)
  process.exit(1)
}

if (!fs.existsSync(path.join(SITE, 'sw.js'))) {
  fail(`${SITE} is not a mock build - run: npm run mock:build`)
}

/* the Documentation menu item opens docs/, which the build copies out of the
 * submodule; an empty folder there is a dead link nobody notices until a
 * visitor clicks it */
if (!fs.existsSync(path.join(SITE, 'docs', 'index.html'))) {
  fail(
    `${SITE}/docs/index.html is missing - run: git submodule update --init public/docs`
  )
}

/* The worker registers its fetch listener on `self`, and imports its runtime
 * from the site. Both are stubbed here the way a browser provides them. */
const handlers = { fetch: [], message: [], install: [], activate: [] }

global.self = {
  location: { origin: 'https://mock.example.com', pathname: '/sw.js' },
  addEventListener: (type, fn) => {
    handlers[type] = handlers[type] || []
    handlers[type].push(fn)
  },
  skipWaiting: () => {},
  clients: { claim: () => {}, matchAll: async () => [] }
}

if (!global.navigator) {
  global.navigator = { platform: 'node', hardwareConcurrency: 1 }
}

global.importScripts = (url) => {
  const file = path.join(SITE, String(url).replace(/\?.*$/, ''))

  if (!fs.existsSync(file)) fail(`importScripts: missing ${file}`)

  require(file)
  if (String(url).includes('lint-browser')) self.SASjsCode = global.SASjsCode
}

/* The static host's half: host/*.json is served from disk. */
global.fetch = async (input) => {
  const clean = String(typeof input === 'string' ? input : input.url || input)
    .replace(/^https?:\/\/[^/]+\//, '')
    .replace(/\?.*$/, '')
  const file = path.join(SITE, clean)

  if (!fs.existsSync(file)) {
    return {
      ok: false,
      status: 404,
      json: async () => ({}),
      text: async () => ''
    }
  }

  const body = fs.readFileSync(file)

  return {
    ok: true,
    status: 200,
    json: async () => JSON.parse(body.toString('utf8')),
    text: async () => body.toString('utf8')
  }
}

require(path.join(SITE, 'sw.js'))

/* One request through the worker's own fetch listener. The body is the
 * envelope the page's bridge sends: params as an object, uploaded tables as
 * CSV - which is what the adapter turns an array of rows into. */
const call = async (program, tables = [], params = {}) => {
  let response

  handlers.fetch[0]({
    request: new Request(
      `https://mock.example.com/SASjsApi/stp/execute?_program=${encodeURIComponent(
        program
      )}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ params, tables })
      }
    ),
    respondWith: (value) => {
      response = value
    }
  })

  if (!response) fail(`${program} produced no response`)

  response = await response
  const body = await response.text()

  if (response.status !== 200) {
    fail(`${program} answered ${response.status}: ${body.slice(0, 400)}`)
  }

  try {
    return JSON.parse(body)
  } catch (e) {
    fail(`${program} did not answer JSON: ${body.slice(0, 400)}`)
  }
}

const main = async () => {
  /* appinit: the distinct areas the pages are built on, sorted, no repeats */
  const appinit = await call(`${APP}/common/appinit`)
  const areas = (appinit.areas || []).map((row) => row.AREA)

  if (areas.length < 2) fail(`appinit answered ${areas.length} area(s)`)
  if (areas.join() !== [...areas].sort().join()) fail('areas are not sorted')
  if (new Set(areas).size !== areas.length) fail('appinit repeated an area')

  /* getdata: the rows for one area, with the columns the page reads by name */
  const area = areas[0]
  const csv = `area:$char${area.length}.\r\n${area}`
  const getdata = await call(`${APP}/common/getdata`, [
    { name: 'areas', filename: 'areas.csv', csv }
  ])
  const springs = getdata.springs || []

  if (!springs.length) fail(`getdata answered no rows for ${area}`)
  if (springs.some((row) => row.AREA !== area)) {
    fail(`getdata answered rows outside ${area}`)
  }

  const seeded = JSON.parse(fs.readFileSync(FIXTURE, 'utf-8')).filter(
    (row) => row.AREA === area
  )

  if (springs.length !== seeded.length) {
    fail(
      `getdata answered ${springs.length} row(s) for ${area}, the dataset holds ${seeded.length}`
    )
  }

  const columns = [
    'LATITUDE',
    'LONGITUDE',
    'NAME',
    'AREA',
    'TYPE',
    'FARENHEIT',
    'CELSIUS'
  ]

  springs.forEach((row) => {
    columns.forEach((column) => {
      if (!(column in row)) {
        fail(`a row has no ${column}: ${JSON.stringify(row)}`)
      }
    })
  })

  /* upload: the file lands in the folder named by `path`, and the answer is the
   * listing the uploader renders */
  const folder = '/Public'
  const upload = await call(
    `${APP}/files/upload`,
    [
      { name: 'file', filename: 'check.txt', csv: 'written by check-mock-site' }
    ],
    { path: folder }
  )
  const dirlist = upload.dirlist || []

  if (!dirlist.some((row) => row.FILEPATH === `${folder}/check.txt`)) {
    fail(`upload did not list ${folder}/check.txt: ${JSON.stringify(dirlist)}`)
  }

  /* a folder that is not there is the abort the SAS service performs - the
   * uploader shows it as a dialog, so the twin has to answer like SAS */
  const refused = await call(
    `${APP}/files/upload`,
    [{ name: 'file', filename: 'check.txt', csv: 'refused' }],
    { path: '/no/such/folder' }
  )
  const abort = (refused.sasjsAbort || [])[0]

  if (!abort || !/not a valid directory/.test(abort.MSG)) {
    fail(`upload accepted a missing folder: ${JSON.stringify(refused)}`)
  }

  console.log(
    `mock site answers: ${areas.length} areas, ` +
      `${springs.length} spring(s) for ${area}, upload listed ${dirlist.length} file(s)`
  )
}

main().catch((error) => fail((error && error.stack) || error))
