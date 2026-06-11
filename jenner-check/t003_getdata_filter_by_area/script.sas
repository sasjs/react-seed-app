/**
  @file
  @brief Get Data service - runs on app startup
  @details  This is always the first service called when the app is opened.

  Adapted from sasjs/services/common/getdata.sas. The %webout calls are part
  of the SASjs adapter runtime: %webout(FETCH) parses the frontend request
  into a work table of selected areas (mocked in autoexec as work.sel_areas),
  and %webout(OPEN/OBJ/CLOSE) serialise the result to JSON. The PROC SQL
  filter (the WHERE ... IN subquery) is unchanged.
**/

/* mydb.springs was created in the serviceInit program */
proc sql;
create table springs as
  select *
  from mydb.springs
  where area in (select area from work.sel_areas);
quit;

title "getdata service: springs filtered to selected areas";
proc print data=springs(obs=15);
run;
title;
