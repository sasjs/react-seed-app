#!/usr/bin/env node
/*
 * Measures the built mock site with Lighthouse and prints a markdown table.
 *
 * The site is served here rather than by the workflow: it is static files, and
 * a plain http server keeps the measurement independent of the host a
 * deployment happens to use. Each page is measured three times and the median
 * is reported, because a single run on a shared runner is noisy enough to move
 * a score by ten points.
 *
 * Usage: node scripts/lighthouse-report.js [site dir] [page ...]
 *   node scripts/lighthouse-report.js sasjsbuild/mock /
 *
 * The first visit is what is measured: the mock host registers its service
 * worker on that load and replays the page's scripts once it is ready, so these
 * numbers include the boot a visitor actually pays for.
 */
const { spawn, spawnSync } = require('node:child_process')
const { createServer } = require('node:http')
const { readFileSync, existsSync, mkdtempSync } = require('node:fs')
const { extname, join, resolve } = require('node:path')
const { tmpdir } = require('node:os')

const SITE = resolve(process.argv[2] || 'sasjsbuild/mock')
const PAGES = process.argv.slice(3).length ? process.argv.slice(3) : ['/']
const RUNS = 3

const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
}

if (!existsSync(join(SITE, 'index.html'))) {
  console.error(`FAILED: ${SITE} is not a built site - run: npm run mock:build`)
  process.exit(1)
}

const serve = () =>
  new Promise((done) => {
    const server = createServer((req, res) => {
      const url = decodeURIComponent((req.url || '/').split('?')[0])
      const file = join(SITE, url === '/' ? 'index.html' : url)

      if (!file.startsWith(SITE) || !existsSync(file)) {
        res.writeHead(404).end('not found')
        return
      }

      res.writeHead(200, {
        'content-type': TYPES[extname(file)] || 'application/octet-stream'
      })
      res.end(readFileSync(file))
    })

    server.listen(0, '127.0.0.1', () => done(server))
  })

const measure = (url, out) => {
  const result = spawnSync(
    'npx',
    [
      '--yes',
      'lighthouse@12',
      url,
      '--quiet',
      '--only-categories=performance,accessibility,best-practices,seo',
      '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
      `--output=json`,
      `--output-path=${out}`
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
  )

  if (result.status !== 0) {
    throw new Error(`lighthouse failed for ${url}: ${result.stderr || result.stdout}`)
  }

  const report = JSON.parse(readFileSync(out, 'utf8'))

  return {
    performance: report.categories.performance.score * 100,
    accessibility: report.categories.accessibility.score * 100,
    'best-practices': report.categories['best-practices'].score * 100,
    seo: report.categories.seo.score * 100,
    lcp: report.audits['largest-contentful-paint'].displayValue,
    cls: report.audits['cumulative-layout-shift'].displayValue,
    tbt: report.audits['total-blocking-time'].displayValue,
    weight: report.audits['total-byte-weight'].displayValue
  }
}

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

const main = async () => {
  const server = await serve()
  const { port } = server.address()
  const dir = mkdtempSync(join(tmpdir(), 'lh-'))
  const rows = []

  try {
    for (const page of PAGES) {
      const runs = []

      for (let i = 0; i < RUNS; i++) {
        runs.push(measure(`http://127.0.0.1:${port}${page}`, join(dir, `${i}.json`)))
      }

      rows.push({
        page,
        performance: Math.round(median(runs.map((r) => r.performance))),
        accessibility: Math.round(median(runs.map((r) => r.accessibility))),
        'best-practices': Math.round(median(runs.map((r) => r['best-practices']))),
        seo: Math.round(median(runs.map((r) => r.seo))),
        lcp: runs[0].lcp,
        cls: runs[0].cls,
        tbt: runs[0].tbt,
        weight: runs[0].weight
      })
    }
  } finally {
    server.close()
  }

  console.log('<!-- lighthouse-scores -->')
  console.log(`## Lighthouse - ${rows.length} page(s), median of ${RUNS} run(s) each`)
  console.log('')
  console.log('| Page | Perf | A11y | Best | SEO | LCP | CLS | TBT | Weight |')
  console.log('| --- | --- | --- | --- | --- | --- | --- | --- | --- |')
  rows.forEach((row) =>
    console.log(
      `| ${row.page} | ${row.performance} | ${row.accessibility} | ${row['best-practices']} | ${row.seo} | ${row.lcp} | ${row.cls} | ${row.tbt} | ${row.weight} |`
    )
  )
  console.log('')
  console.log(
    'Build: `npm run mock:build`, served as static files. The mock host registers its service worker and replays the page scripts on first load, so these are first-visit numbers.'
  )
}

main().catch((error) => {
  console.error('FAILED:', error.message)
  process.exit(1)
})
