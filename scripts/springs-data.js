#!/usr/bin/env node
/*
 * Writes the mock's dataset from the one the SAS service reads.
 *
 * `sasjs/services/serviceinit.sas` builds `mydb.springs` from an inline
 * `datalines4` block, and the mock's JavaScript twins (`appinit.js`,
 * `getdata.js`) read `springs.json` instead - a browser has no SAS engine, so
 * the rows exist once as SAS source and once as JSON. This script derives the
 * JSON from the SAS source so the two cannot drift: re-run it after editing the
 * datalines, and `--check` (what CI runs) fails when the committed file no
 * longer matches.
 *
 * Usage: node scripts/springs-data.js [--check]
 */
const { readFileSync, writeFileSync, existsSync } = require('node:fs')
const path = require('node:path')

const SERVICE_INIT = path.join(__dirname, '..', 'sasjs', 'services', 'serviceinit.sas')
const FIXTURE = path.join(
  __dirname,
  '..',
  'sasjs',
  'mocks',
  'services',
  'common',
  'springs.json'
)

/* The columns, in the order the input statement reads them, with the type the
 * SAS service gives each. Numeric columns hold 'H' in the datalines for a
 * missing value, which `missing a ... z` turns into .H - null here. */
const COLUMNS = [
  ['LATITUDE', 'number'],
  ['LONGITUDE', 'number'],
  ['NAME', 'text'],
  ['AREA', 'text'],
  ['TYPE', 'text'],
  ['FARENHEIT', 'number'],
  ['CELSIUS', 'number']
]

const parseDatalines = (sas) => {
  const lines = sas.split(/\r?\n/)
  const start = lines.findIndex((line) => /^datalines4;?$/i.test(line.trim()))
  if (start < 0) throw new Error('no datalines4 block in serviceinit.sas')

  const rows = []
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (/^;;;;?/.test(line)) break
    if (!line) continue
    rows.push(line)
  }
  return rows
}

/* DSD: comma separated, a value quoted only when it holds a separator or a
 * quote, an embedded quote doubled. */
const splitDsv = (line) => {
  const values = []
  let value = ''
  let quoted = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (quoted) {
      if (char === '"' && line[i + 1] === '"') {
        value += '"'
        i++
      } else if (char === '"') quoted = false
      else value += char
    } else if (char === '"') quoted = true
    else if (char === ',') {
      values.push(value)
      value = ''
    } else value += char
  }
  values.push(value)

  return values
}

const toRow = (values) =>
  Object.fromEntries(
    COLUMNS.map(([name, type], index) => {
      const raw = (values[index] ?? '').trim()
      if (type === 'text') return [name, raw]
      if (raw === '' || /^[Hh]$/.test(raw)) return [name, null]
      const number = Number(raw)
      return [name, Number.isNaN(number) ? null : number]
    })
  )

const sas = readFileSync(SERVICE_INIT, 'utf8')
const rows = parseDatalines(sas).map((line) => toRow(splitDsv(line)))
const json = JSON.stringify(rows, null, 2) + '\n'

if (process.argv.includes('--check')) {
  const current = existsSync(FIXTURE) ? readFileSync(FIXTURE, 'utf8') : ''
  if (current !== json) {
    console.error(
      'FAILED: sasjs/mocks/services/common/springs.json is not what serviceinit.sas holds - run: node scripts/springs-data.js'
    )
    process.exit(1)
  }
  console.log(`${rows.length} row(s) in springs.json, in step with serviceinit.sas`)
} else {
  writeFileSync(FIXTURE, json)
  console.log(`wrote ${rows.length} row(s) to ${path.relative(process.cwd(), FIXTURE)}`)
}
