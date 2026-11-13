#!/usr/bin/env node
/*
 * Turns Lighthouse JSON reports into the markdown table the Lighthouse job
 * posts on a pull request.
 *
 * The measuring is the workflow's: it serves the built frontend and runs
 * Lighthouse against it three times per page. This reads those reports and
 * reports the median, because a single run on a shared runner is noisy enough
 * to move a score by ten points.
 *
 * Usage: node scripts/lighthouse-summary.js <page>=<report.json> ...
 *   node scripts/lighthouse-summary.js /=lighthouse-1.json /=lighthouse-2.json
 */
const { readFileSync } = require('node:fs')

const args = process.argv.slice(2)

if (!args.length) {
  console.error(
    'usage: node scripts/lighthouse-summary.js <page>=<report.json> ...'
  )
  process.exit(2)
}

/* page -> the runs measured for it */
const pages = new Map()

for (const arg of args) {
  const at = arg.lastIndexOf('=')
  if (at < 0) {
    console.error(`FAILED: expected <page>=<report.json>, got ${arg}`)
    process.exit(2)
  }

  const page = arg.slice(0, at)
  const report = JSON.parse(readFileSync(arg.slice(at + 1), 'utf8'))

  const score = (id) => Math.round((report.categories[id].score || 0) * 100)
  const display = (id) => report.audits[id].displayValue

  const runs = pages.get(page) || []
  runs.push({
    performance: score('performance'),
    accessibility: score('accessibility'),
    best: score('best-practices'),
    seo: score('seo'),
    lcp: display('largest-contentful-paint'),
    cls: display('cumulative-layout-shift'),
    tbt: display('total-blocking-time'),
    weight: display('total-byte-weight')
  })
  pages.set(page, runs)
}

const median = (values) =>
  [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)]

console.log('<!-- lighthouse-scores -->')
console.log(
  `## Lighthouse - ${pages.size} page(s), median of ${[...pages.values()][0].length} run(s) each`
)
console.log('')
console.log('| Page | Perf | A11y | Best | SEO | LCP | CLS | TBT | Weight |')
console.log('| --- | --- | --- | --- | --- | --- | --- | --- | --- |')

for (const [page, runs] of pages) {
  const first = runs[0]
  console.log(
    `| ${page} | ${median(runs.map((r) => r.performance))} | ${median(runs.map((r) => r.accessibility))} | ${median(runs.map((r) => r.best))} | ${median(runs.map((r) => r.seo))} | ${first.lcp} | ${first.cls} | ${first.tbt} | ${first.weight} |`
  )
}

console.log('')
console.log(
  'The frontend build, served as static files. Timings are from the first visit, on a shared runner.'
)
