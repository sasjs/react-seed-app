# Overview

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

This React seed app provides a wrapper for `@sasjs/adapter`, a lightning fast adapter for talking to SAS - on Viya, EBI, or SASjs Server.

## Frontend Web

If you are running on SAS 9 you need to set `serverType` to SAS9 in `sasContext.tsx`.

1. clone the repo and change into the directory
2. run `npm install`
3. run `npm run build` to create a production build in the `build` folder. This can be deployed to the SAS web server [here](https://sasjs.io/frontend-deployment/).

If you are running locally you will also need to whitelist `localhost` on the server, or enable CORS in your browser as described [here](https://sasjs.io/cors)

## Backend Services

The best way to deploy SAS services is using the [SASjs CLI](https://cli.sasjs.io). Simply [install](https://cli.sasjs.io/installation/), update the `defaultTarget` attribute in the [sasjsconfig.json](https://github.com/sasjs/react-seed-app/blob/main/sasjs/sasjsconfig.json) file, and run the following commands:

```bash
sasjs auth
sasjs cbd
```

This will first authenticate to your target (follow the prompts) and after that you can just run `sasjs cbd` to rebuild and deploy your services. If you set `streamweb:true` in the sasjsconfig.json it will also deploy your frontend as a streaming app (no need for a web server).

If you are just looking to build quickly and don't have time to install NPM then you can also create the web services on ANY version of SAS by running the code below.

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

If you are writing services in JS and your service depends on any third party library/package then you need to bundle that service before deploying it to sasjs server otherwise the service wouldn't work. You can choose any bundler for this process. One possible option could be `webpack`. And if you choose webpack then you can use it like:<br/>
`npx webpack --mode none --target node --entry <path-of-file-to-bundle/build> --output-path <path-of-output-folder> --output-filename <name-of-output-file>`
<br/>

In our case we have a mock service at path `sasjs/mocks/appinit.js` and we want to build and make it ready for deployment. So, we have to run following in terminal:<br/>
`npx webpack --mode none --target node --entry ./sasjs/mocks/appinit.js --output-path sasjsbuild/mocks --output-filename appinit.js`

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
