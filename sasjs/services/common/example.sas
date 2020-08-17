/**
  @file example.sas
  @brief example service - for example 
  @details  This is a longer description.

  <h4> Dependencies </h4>
  @li mf_nobs.sas
  @li examplemacro.sas

**/

%put %mf_nobs(sashelp.class);

%examplemacro()
%yetanothermacro()

%webout(OPEN)
%webout(OBJ,areas)
%webout(CLOSE)
