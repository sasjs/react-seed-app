#!/usr/bin/env node
/* Exercise the generated CLI mock with the unchanged released adapter in Chromium.
 * Run after npm run mock:build; CHROMIUM_PATH may select the browser binary. */
const assert = require('node:assert/strict')
const { spawn } = require('node:child_process')
const { once } = require('node:events')
const fs = require('node:fs')
const http = require('node:http')
const os = require('node:os')
const path = require('node:path')

const site = path.resolve('sasjsbuild/mock')
const html = fs.readFileSync(path.join(site, 'index.html'), 'utf8')
const boot = html.match(
  /<script[^>]+src=["']([^"']*\/host\/boot\.js[^"']*)["'][^>]*><\/script>/i
)
const config = html.match(/<sasjs\b[^>]*>/i)
assert.ok(boot && config, 'generated site must provide boot script and config')
const seed = JSON.parse(
  fs.readFileSync('sasjs/mocks/services/common/springs.json', 'utf8')
)
const area = seed[0].AREA
const expected = seed.filter((row) => row.AREA === area)
const bundle = require.resolve('@sasjs/adapter/dist/sasjs-adapter.js')
const network = []
const probe = `<!doctype html><html><head>${boot[0]}</head><body>${config[0]}</sasjs><script src="/__adapter.js"></script><script src="/__probe.js"></script></body></html>`
const script = `window.addEventListener('load', () => {
  const el = document.querySelector('sasjs');
  const run = async (debug) => {
    const sas = new SASjs.default({serverUrl: el.getAttribute('serverurl'), serverType: el.getAttribute('servertype'), appLoc: el.getAttribute('apploc'), debug});
    const request = (data) => sas.request('services/common/getdata', data);
    return [await request({areas: [{AREA: ${JSON.stringify(area)}}], extra: [{X: 'force; file'}]}), await request({unrelated: [{AREA: ${JSON.stringify(area)}}]}), await request({areas: [{OTHER: 'undefined'}]})];
  };
  window.result = Promise.all([run(false), run(true)]).catch(error => { throw Error(JSON.stringify(error)); });
});`
const server = http.createServer((req, res) => {
  const name = new URL(req.url, 'http://localhost').pathname
  if (/\/(SASjsApi|SASStoredProcess|api)(\/|$)/i.test(name)) {
    network.push(req.url)
    return res.writeHead(404).end('unexpected static API')
  }
  if (name === '/__probe.html')
    return res.writeHead(200, { 'Content-Type': 'text/html' }).end(probe)
  if (name === '/__probe.js')
    return res
      .writeHead(200, { 'Content-Type': 'application/javascript' })
      .end(script)
  const file =
    name === '/__adapter.js'
      ? bundle
      : path.resolve(site, '.' + (name === '/' ? '/index.html' : name))
  if (file !== bundle && !file.startsWith(site + path.sep))
    return res.writeHead(403).end()
  try {
    const type = file.endsWith('.js')
      ? 'application/javascript'
      : file.endsWith('.json')
        ? 'application/json'
        : 'text/html'
    const data = fs.readFileSync(file)
    res
      .writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' })
      .end(data)
  } catch (_) {
    res.writeHead(404).end()
  }
})
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function main() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seed-browser-'))
  let chrome, ws
  try {
    server.listen(0, '127.0.0.1')
    await once(server, 'listening')
    chrome = spawn(
      process.env.CHROMIUM_PATH ||
        (fs.existsSync('/usr/bin/google-chrome')
          ? '/usr/bin/google-chrome'
          : 'chromium'),
      [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--remote-debugging-port=0',
        `--user-data-dir=${dir}`,
        'about:blank'
      ],
      { stdio: 'ignore' }
    )
    let port
    for (let i = 0; i < 200 && !port; i++) {
      if (chrome.exitCode !== null)
        throw new Error(`Chromium exited ${chrome.exitCode}`)
      try {
        port = Number(
          fs
            .readFileSync(path.join(dir, 'DevToolsActivePort'), 'utf8')
            .split('\n')[0]
        )
      } catch (_) {
        await sleep(50)
      }
    }
    assert.ok(port, 'Chromium startup timed out')
    const version = await (
      await fetch(`http://127.0.0.1:${port}/json/version`)
    ).json()
    ws = new WebSocket(version.webSocketDebuggerUrl)
    await once(ws, 'open')
    let id = 0
    const pending = new Map()
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data)
      const item = pending.get(msg.id)
      if (!item) return
      pending.delete(msg.id)
      clearTimeout(item.timer)
      msg.error
        ? item.reject(new Error(JSON.stringify(msg.error)))
        : item.resolve(msg.result)
    })
    const send = (method, params = {}, sessionId) =>
      new Promise((resolve, reject) => {
        const n = ++id
        const timer = setTimeout(() => {
          pending.delete(n)
          reject(new Error(`CDP ${method} timed out`))
        }, 30000)
        pending.set(n, { resolve, reject, timer })
        ws.send(JSON.stringify({ id: n, method, params, sessionId }))
      })
    const { targetId } = await send('Target.createTarget', {
      url: 'about:blank'
    })
    const { sessionId } = await send('Target.attachToTarget', {
      targetId,
      flatten: true
    })
    await send('Page.enable', {}, sessionId)
    await send('Runtime.enable', {}, sessionId)
    const evaluate = async (expression) => {
      const r = await send(
        'Runtime.evaluate',
        { expression, awaitPromise: true, returnByValue: true },
        sessionId
      )
      if (r.exceptionDetails)
        throw new Error(JSON.stringify(r.exceptionDetails))
      return r.result.value
    }
    await send(
      'Page.navigate',
      { url: `http://127.0.0.1:${server.address().port}/__probe.html` },
      sessionId
    )
    let previous = 0
    for (const visit of ['first navigation', 'reload']) {
      if (visit === 'reload') await send('Page.reload', {}, sessionId)
      let ready = false
      for (let i = 0; i < 400; i++) {
        if (
          await evaluate(
            `performance.timeOrigin !== ${previous} && !!window.result`
          )
        ) {
          ready = true
          break
        }
        await sleep(50)
      }
      assert.ok(ready, `${visit}: load request not started`)
      previous = await evaluate('performance.timeOrigin')
      const result = await evaluate(
        `(async () => { const result = await Promise.race([window.result, new Promise((_, reject) => setTimeout(() => reject(Error('request timeout')), 20000))]); return {result, controlled: !!navigator.serviceWorker.controller}; })()`
      )
      assert.equal(result.controlled, true, `${visit}: service worker control`)
      for (const [index, responses] of result.result.entries()) {
        assert.deepEqual(
          responses[0].springs,
          expected,
          `${visit}: debug ${!!index} selected rows`
        )
        assert.deepEqual(
          responses[1].springs,
          [],
          `${visit}: unrelated table only`
        )
        assert.deepEqual(responses[2].springs, [], `${visit}: missing AREA`)
      }
      assert.deepEqual(network, [], `${visit}: no API network fallthrough`)
      console.log(
        `PASS ${visit}: actual adapter, debug on/off, ${expected.length} rows, unrelated and missing AREA`
      )
    }
  } finally {
    if (ws) ws.close()
    if (chrome && chrome.exitCode === null) {
      const closed = once(chrome, 'close')
      chrome.kill()
      await closed
    }
    await new Promise((resolve) => server.close(resolve))
    fs.rmSync(dir, { recursive: true, force: true })
  }
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
