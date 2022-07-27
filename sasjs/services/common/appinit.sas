/**
  @file
  @brief Initialisation service - runs on app startup
  @details  This is always the first service called when the app is opened.

  <h4> SAS Macros </h4>

**/

/* mydb.springs was created in the serviceInit program */
proc sql;
create table areas as 
  select distinct area
  from mydb.springs;

%webout(OPEN)
%webout(OBJ,areas)
%webout(CLOSE)
