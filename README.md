# Overview

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

This React seed app provides a wrapper for `@sasjs/adapter`, a lightning fast adapter for talking to SAS - on Viya, EBI, or SASjs Server.

## Quick Deploy (Compiled App) on SAS Viya

Just run the following in SAS Studio:

```sas
%let apploc=/Users/&sysuserid/ReactSeedApp; /* desired SAS Drive location */
filename rsa url "https://github.com/sasjs/react-seed-app/releases/latest/download/viya.sas";
%inc rsa;
```

## Frontend Web

These are the minimal steps to get up and running:

1. clone the repo and change into the directory
2. Open `index.html` and set the `serverType` to SASVIYA, SAS9, or SASJS depending on backend server
3. Also change `appLoc` to the backend root location in which you plan to deploy the services.
4. run `npm install`
5. run `npm run build` to create a production build in the `build` folder. This can be deployed to the SAS web server [here](https://sasjs.io/frontend-deployment/).

If you are running locally you will also need to whitelist `localhost` on the server, or enable CORS in your browser as described [here](https://sasjs.io/cors)

## Running without SAS (the mock build)

The app also runs with no SAS at all. `npm run mock:build` builds the frontend,
compiles the services, and wraps the result in a service-worker host that
answers the SASjs API in the browser - the same @sasjs/api routes a SASjs Server
answers - so every screen can be used, and every service called, without a
licence, a server or a login:

```bash
npm run mock:build   # frontend + compile + mock site, in sasjsbuild/mock
npm run mock:start   # serve it at http://localhost:3001
```

What makes that work:

* the `mock` target in `sasjs/sasjsconfig.json` (`streamConfig.mockWeb`) points
  the build at the frontend output (`build/`);
* `sasjs/mocks` holds the JavaScript twin of each service, mirroring the service
  folders, and `syncFolder` in the config puts them on the mock drive beside the
  compiled `.sas` - a request for `services/common/getdata` finds `getdata.js`
  and runs it in the browser;
* `sasjs/mocks/services/common/springs.json` is generated from the `datalines4`
  block in `sasjs/services/serviceinit.sas` by `node scripts/springs-data.js`, so
  the mock's data and the SAS service's data cannot drift. `npm run check:data`
  (what CI runs) fails when they have.

`npm run test:mock` boots the built site's worker in node and calls appinit,
getdata and upload, so a build that produces files but answers nothing fails in
CI rather than in a visitor's browser.

## Backend Services

The best way to deploy SAS services is using the [SASjs CLI](https://cli.sasjs.io). Simply [install](https://cli.sasjs.io/installation/), update the `defaultTarget` attribute in the [sasjsconfig.json](https://github.com/sasjs/react-seed-app/blob/main/sasjs/sasjsconfig.json) file, and run the following commands:

```bash
sasjs auth # be sure to use the same serverType and appLoc as steps 2 & 3 above
sasjs cbd
```

This will first authenticate to your target (follow the prompts) and after that you can just run `sasjs cbd` to rebuild and deploy your services. If you set `streamweb:true` in the sasjsconfig.json it will also deploy your frontend as a streaming app (no need for a web server).

If you are just looking to build quickly and don't have time to install NPM then you can also create the web services on SAS9 or SASVIYA by running the code below.

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

## Supported Versions of SAS

This app will work on all versions of SAS Viya, in SAS 9 EBI from 9.3 and above, and on regular Foundation SAS (or WPS) installs using SASjs Server.

It will not work on SAS University edition.

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

### Code Style

This project uses Prettier to format code.
Please install the 'Prettier - Code formatter' extension for VS Code.

Files you are editing will automatically be formatted on save.

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
