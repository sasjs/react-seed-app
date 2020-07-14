# Overview

This seed app provides a wrapper for `@sasjs/adapter`, a lightning fast adapter for talking to both SAS 9 and Viya.

## Backend Services

Creating services in Viya can be done entirely in SAS Studio using the code below.

```
filename mc url "https://raw.githubusercontent.com/sasjs/core/main/all.sas";
filename ft15f001 temp;
parmcards4;
    proc sql;
    create table areas as select distinct area from sashelp.springs;
    %webout(OPEN)
    %webout(OBJ,areas)
    %webout(CLOSE)
;;;;
%mp_createwebservice(path=/Public/myapp/common, name=appInit)
parmcards4;
    %webout(FETCH)
    proc sql;
    create table springs as select * from sashelp.springs
      where area in (select area from areas);
    %webout(OPEN)
    %webout(OBJ,springs)
    %webout(CLOSE)
;;;;
%mp_createwebservice(path=/Public/myapp/common, name=getData)
```

## Frontend Web

If you are running locally you will either need to whitelist `localhost` on the server, or enable CORS using one of the following commands:

|  OS   | Browser |                                    Launch Command                                     |
| :---: | :-----: | :-----------------------------------------------------------------------------------: |
|  Mac  | Chrome  | `open -n -a Google\ Chrome --args --disable-web-security --user-data-dir=/tmp/chrome` |
| Linux | Chrome  |         `google-chrome --disable-web-security --user-data-dir="/tmp/chrome"`          |
|Windows|Chrome|`"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=C:\Temp`|

## Supported Versions of SAS

This app will work on SAS Viya, and will also work on SAS 9 with one tweak (just set the `serverType` to SAS9 in `sasContext.tsx`)

It will not work on SAS University edition, or local instances of SAS. A web server, and application server (STP or Compute) is required

### Code Style

This project uses Prettier to format code.
Please install the 'Prettier - Code formatter' extension for VS Code.

Files you are editing will automatically be formatted on save.
