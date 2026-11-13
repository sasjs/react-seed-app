# Overview

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

This seed app provides a quick start for building a React web app on Viya, SAS
EBI or Foundation SAS with the SASjs DevOps framework.

It is deliberately small: plain React and plain CSS, with no UI component
library, so the only thing to keep up to date with is React itself. What it
demonstrates is the SASjs side - a request, an upload, a session, and a SAS logs
panel that reads the log a request came back with.

Three services come with it, in `sasjs/services`:

- `common/appinit` - the list of areas the data page offers, called once at
  start-up;
- `common/getdata` - the springs for one area, with the selection sent as a
  table;
- `files/upload` - copies an uploaded file into a folder on the server and
  answers with a directory listing, or aborts with the reason it could not
  write.

## Frontend Web

Clone the repo, `cd` into it, and `npm install`.

Next, update the `<sasjs>` element in `src/index.html`:

- `appLoc` - the folder (eg in metadata or SAS Drive) under which the SAS
  services are created.
- `serverType` - either SAS9, SASVIYA or SASJS.
- `serverUrl` - only relevant if not serving from the SAS domain
  (`!SASCONFIG/LevX/Web/WebServer/htdocs` in SAS9 or `/var/www/html` on SAS
  Viya).
- `loginMechanism` - `Default` for user/password, `Redirected` for SSO. See the
  SAS Logon section of the adapter documentation.
- `debug` - when true, every request keeps a log, which is what the SAS Logs
  panel shows.
- `useComputeApi` - Viya only; whether the adapter goes through the Compute API.
- `contextName` - only relevant when `useComputeApi` is true.

Then:

```bash
npm start        # webpack dev server on http://localhost:3000
npm run build    # production build in build/
```

More detail on every setting is in the [@sasjs/adapter
documentation](https://sasjs.io/sasjs-adapter/#configuration). If you are running
locally you will either need to whitelist `localhost` on the server, or enable
CORS as described [here](https://sasjs.io/cors).

## Running without a SAS server

The app also builds as a **mock site**: the same frontend, with a
browser-hosted backend standing in for SAS, so it can be opened with no licence,
no server and no deployment.

```bash
npm run mock:build   # frontend + services + the browser host
npm run mock:start   # serves sasjsbuild/mock on http://127.0.0.1:3001
```

What makes that work is `sasjs/mocks/`: a JavaScript twin of each service
(`common/appinit`, `common/getdata`, `files/upload`) answering the same `webout`
the SAS service does. The upload twin refuses a folder that is not on the drive,
as `%mp_abort` does, so the abort dialog is demonstrable too. Each twin also
reports a log - the fixture in `sasjs/mocks/services/common/mock-sas-log.json`,
the failure-shaped one half the time and a clean one the rest - so the SAS Logs
panel has something to show on a site with no SAS behind it. The twins read
`springs.json`, which is generated from the `datalines` block in
`serviceinit.sas`, so the demo shows the rows the deployed service would return.
`npm run check:data` fails when the two drift apart, and `npm run test:mock`
boots the built worker and asserts that each service answers.

This is also what `https://sasjs.github.io/react-seed-app/` serves.

## Backend Services

The best way to deploy SAS services is using the [SASjs CLI](https://cli.sasjs.io).
Simply [install](https://cli.sasjs.io/installation/), update the `defaultTarget`
attribute in the [sasjsconfig.json](sasjs/sasjsconfig.json) file, and run:

```bash
sasjs auth # be sure to use the same serverType and appLoc as above
sasjs cbd
```

This authenticates to your target (follow the prompts) and then compiles, builds
and deploys the services. With `streamWeb: true` in the target's `streamConfig`
it also deploys your frontend as a [streaming
app](https://sasapps.io/sas-streamed-apps) (no need for a web server).

If you are looking to build quickly and do not have time to install NPM, you can
create the web services on SAS9 or SASVIYA with the code below.

```sas
%let appLoc=/Public/app/react-seed-app; /* SAS Folders App Location */
filename mc url "https://raw.githubusercontent.com/sasjs/core/main/all.sas";
%inc mc;
filename ft15f001 temp;
parmcards4;
    proc sql;
    create table areas as select distinct area from sashelp.springs;
    %webout(OPEN)
    %webout(OBJ,areas)
    %webout(CLOSE)
;;;;
%mx_createwebservice(path=&appLoc/services/common, name=appinit)
parmcards4;
    %webout(FETCH)
    proc sql;
    create table springs as select * from sashelp.springs
      where area in (select area from areas);
    %webout(OPEN)
    %webout(OBJ,springs)
    %webout(CLOSE)
;;;;
%mx_createwebservice(path=&appLoc/services/common, name=getdata)
```

## What to know before you start

- The app reads its configuration from the `<sasjs>` element in `src/index.html`.
  Every target in `sasjs/sasjsconfig.json` rewrites that element, which is how one
  codebase serves Viya, SAS 9, a SASjs Server and the mock build.
- There is no UI component library. The shell - header, sign-in, SAS logs panel
  - is plain React, and every colour comes from the tokens in
  `src/styles.scss`, so light and dark are one set of values rather than two
  stylesheets. The choice is applied before the first paint by
  `public/theme-init.js`.
- The SAS logs panel counts errors, warnings and notable notes with `parseLog`
  from `@sasjs/utils`, the parser Data Controller uses, so the counts agree with
  that app's. Clicking a message scrolls the log to the line it names.
- `npm test` runs Vitest over the pure functions - the log summary, the abort
  payload and the timestamp formatting. `npm run lint` is Prettier.
- The Documentation menu item opens `docs/index.html`, which the build copies
  from the `public/docs` submodule. Run `git submodule update --init public/docs`
  in a fresh clone.

## Backend Services in JavaScript

A service can be written in JavaScript instead of SAS - the browser mock build
runs them, and a SASjs Server target can be deployed with them. They live in
`sasjs/mocks`, mirroring the service tree (`sasjs/mocks/services/common/appinit.js`
is the twin of `sasjs/services/common/appinit.sas`), and the CLI copies them into
the build through the `syncFolder` setting in `sasjs/sasjsconfig.json`.

A JavaScript service is called with the same inputs the SAS one receives: the
uploaded tables as `_WEBIN_NAME<n>` / `_WEBIN_FILEREF<n>`, the request parameters
as consts, and the `webout()` block to answer with (`webout('OPEN')`,
`webout('OBJ', 'name', rows)`, `webout('CLOSE')`).

If such a service requires a third-party package, bundle it before deploying to a
SASjs Server target, which does not install dependencies for you.

## Supported Versions of SAS

This app works on all versions of SAS Viya, in SAS 9 EBI from 9.3 and above, and
on regular Foundation SAS (or WPS) installs using SASjs Server.

It does not work on SAS University Edition.

### Code Style

This project uses Prettier to format code. Install the 'Prettier - Code
formatter' extension for VS Code; files you are editing are formatted on save.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/allanbowe"><img src="https://avatars.githubusercontent.com/u/4420615?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Allan Bowe</b></sub></a><br /><a href="https://github.com/sasjs/react-seed-app/commits?author=allanbowe" title="Code">💻</a> <a href="https://github.com/sasjs/react-seed-app/commits?author=allanbowe" title="Tests">⚠️</a> <a href="https://github.com/sasjs/react-seed-app/pulls?q=is%3Apr+reviewed-by%3Aallanbowe" title="Reviewed Pull Requests">👀</a> <a href="#video-allanbowe" title="Videos">📹</a> <a href="https://github.com/sasjs/react-seed-app/commits?author=allanbowe" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.erudicat.com/"><img src="https://avatars.githubusercontent.com/u/25773492?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yury Shkoda</b></sub></a><br /><a href="https://github.com/sasjs/react-seed-app/commits?author=YuryShkoda" title="Code">💻</a> <a href="https://github.com/sasjs/react-seed-app/commits?author=YuryShkoda" title="Tests">⚠️</a> <a href="#projectManagement-YuryShkoda" title="Project Management">📆</a> <a href="#video-YuryShkoda" title="Videos">📹</a> <a href="https://github.com/sasjs/react-seed-app/commits?author=YuryShkoda" title="Documentation">📖</a></td>
    <td align="center"><a href="https://krishna-acondy.io/"><img src="https://avatars.githubusercontent.com/u/2980428?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Krishna Acondy</b></sub></a><br /><a href="https://github.com/sasjs/react-seed-app/commits?author=krishna-acondy" title="Code">💻</a> <a href="https://github.com/sasjs/react-seed-app/commits?author=krishna-acondy" title="Tests">⚠️</a> <a href="https://github.com/sasjs/react-seed-app/pulls?q=is%3Apr+reviewed-by%3Akrishna-acondy" title="Reviewed Pull Requests">👀</a> <a href="#infra-krishna-acondy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#platform-krishna-acondy" title="Packaging/porting to new platform">📦</a> <a href="#maintenance-krishna-acondy" title="Maintenance">🚧</a> <a href="#content-krishna-acondy" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/saadjutt01"><img src="https://avatars.githubusercontent.com/u/8914650?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Muhammad Saad </b></sub></a><br /><a href="https://github.com/sasjs/react-seed-app/commits?author=saadjutt01" title="Code">💻</a> <a href="https://github.com/sasjs/react-seed-app/commits?author=saadjutt01" title="Tests">⚠️</a> <a href="https://github.com/sasjs/react-seed-app/pulls?q=is%3Apr+reviewed-by%3Asaadjutt01" title="Reviewed Pull Requests">👀</a> <a href="#mentoring-saadjutt01" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/sasjs/react-seed-app/commits?author=saadjutt01" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/sabhas"><img src="https://avatars.githubusercontent.com/u/82647447?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sabir Hassan</b></sub></a><br /><a href="https://github.com/sasjs/react-seed-app/commits?author=sabhas" title="Code">💻</a> <a href="https://github.com/sasjs/react-seed-app/commits?author=sabhas" title="Tests">⚠️</a> <a href="https://github.com/sasjs/react-seed-app/pulls?q=is%3Apr+reviewed-by%3Asabhas" title="Reviewed Pull Requests">👀</a> <a href="#ideas-sabhas" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/medjedovicm"><img src="https://avatars.githubusercontent.com/u/18329105?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mihajlo Medjedovic</b></sub></a><br /><a href="https://github.com/sasjs/react-seed-app/commits?author=medjedovicm" title="Code">💻</a> <a href="https://github.com/sasjs/react-seed-app/commits?author=medjedovicm" title="Tests">⚠️</a> <a href="https://github.com/sasjs/react-seed-app/pulls?q=is%3Apr+reviewed-by%3Amedjedovicm" title="Reviewed Pull Requests">👀</a> <a href="#infra-medjedovicm" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/VladislavParhomchik"><img src="https://avatars.githubusercontent.com/u/83717836?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vladislav Parhomchik</b></sub></a><br /><a href="https://github.com/sasjs/react-seed-app/commits?author=VladislavParhomchik" title="Tests">⚠️</a> <a href="https://github.com/sasjs/react-seed-app/pulls?q=is%3Apr+reviewed-by%3AVladislavParhomchik" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
