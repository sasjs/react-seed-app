# Overview

This seed app provides a wrapper for `@sasjs/adapter`, a lightning fast adapter for talking to both SAS 9 and Viya.

## Backend Services

Creating web services in SAS 9 or Viya can be done entirely in SAS Studio using the code below.

```
%let appLoc=/Public/app/react; /* SAS Folders App Location */
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
%mp_createwebservice(path=&appLoc/common, name=appinit)
parmcards4;
    %webout(FETCH)
    proc sql;
    create table springs as select * from sashelp.springs
      where area in (select area from areas);
    %webout(OPEN)
    %webout(OBJ,springs)
    %webout(CLOSE)
;;;;
%mp_createwebservice(path=&appLoc/common, name=getdata)
```

## Frontend Web

If you are running on SAS 9 you need to set `serverType` to SAS9 in `sasContext.tsx`.

1. clone the repo and change into the directory
2. run `npm install` 
3. run `npm run build` to create a production build in the `build` folder.  This can be deployed to the SAS web server [here](https://sasjs.io/frontend/deployment/).

If you are running locally you will also need to whitelist `localhost` on the server, or enable CORS in your browser as described [here](https://sasjs.io/frontend/cors/)


## Supported Versions of SAS

This app will work on all versions of SAS Viya, and in SAS 9 EBI from 9.3 and above.

It will not work on SAS University edition, or local (base only) instances of SAS. A web server, and application server (STP or Compute) is required

### Code Style

This project uses Prettier to format code.
Please install the 'Prettier - Code formatter' extension for VS Code.

Files you are editing will automatically be formatted on save.
