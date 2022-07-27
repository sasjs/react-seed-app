/**
  @file
  @brief Get Data service - runs on app startup
  @details  This is always the first service called when the app is opened.

  <h4> SAS Macros </h4>

**/

/* this macro converts the JS input to a WORK table - work.areas */
%webout(FETCH)

/* mydb.springs was created in the serviceInit program */
proc sql;
create table springs as
  select *
  from mydb.springs
  where area in (select area from work.areas);

/* these macros open the JSON, send the table back, and close the JSON */
%webout(OPEN)
%webout(OBJ,springs)
%webout(CLOSE)
