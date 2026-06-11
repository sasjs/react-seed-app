/**
  @file
  @brief Initialisation service - runs on app startup
  @details  This is always the first service called when the app is opened.

  Adapted from sasjs/services/common/appinit.sas. Two adaptations so the
  service's SQL runs standalone:
   - The %webout(OPEN/OBJ/CLOSE) calls are part of the SASjs adapter runtime
     (they serialise the result table to JSON over a web fileref); here we
     surface the same result with a PROC PRINT.
   - The result table (named `areas` upstream, for the JSON key the frontend
     reads) is materialised as `app_areas`; the SELECT DISTINCT is unchanged.
**/

/* mydb.springs was created in the serviceInit program */
proc sql;
create table app_areas as
  select distinct area
  from mydb.springs;
quit;

title "appinit service: distinct areas";
proc print data=app_areas(obs=15) noobs;
run;
title;
