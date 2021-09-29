# Overview

This React seed app provides a wrapper for `@sasjs/adapter`, a lightning fast adapter for talking to both SAS 9 and Viya.


## Frontend Web

If you are running on SAS 9 you need to set `serverType` to SAS9 in `sasContext.tsx`.

1. clone the repo and change into the directory
2. run `npm install`
3. run `npm run build` to create a production build in the `build` folder. This can be deployed to the SAS web server [here](https://sasjs.io/frontend-deployment/).

If you are running locally you will also need to whitelist `localhost` on the server, or enable CORS in your browser as described [here](https://sasjs.io/cors)

## Backend Services

The best way to deploy SAS services is using the [SASjs CLI](https://cli.sasjs.io).  Simply [install](https://cli.sasjs.io/installation/), update the `defaultTarget` attribute in the [sasjsconfig.json](https://github.com/sasjs/react-seed-app/blob/main/sasjs/sasjsconfig.json) file, and run the following commands:

```bash
sasjs auth 
sasjs cbd
```

This will first authenticate to your target (follow the prompts) and after that you can just run `sasjs cbd` to rebuild and deploy your services.  If you set `streamweb:true` in the sasjsconfig.json it will also deploy your frontend as a streaming app (no need for a web server).

If you are just looking to build quickly and don't have time to install NPM then you can also create the web services on both SAS 9 and Viya by running the code below.

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
%mp_createwebservice(path=&appLoc/services/common, name=appinit)
parmcards4;
    %webout(FETCH)
    proc sql;
    create table springs as select * from sashelp.springs
      where area in (select area from areas);
    %webout(OPEN)
    %webout(OBJ,springs)
    %webout(CLOSE)
;;;;
%mp_createwebservice(path=&appLoc/services/common, name=getdata)
```

## Supported Versions of SAS

This app will work on all versions of SAS Viya, and in SAS 9 EBI from 9.3 and above.

It will not work on SAS University edition, or local (base only) instances of SAS. A web server, and application server (STP or Compute) is required

### Code Style

This project uses Prettier to format code.
Please install the 'Prettier - Code formatter' extension for VS Code.

Files you are editing will automatically be formatted on save.
