/**
  @file
  @brief Loads a file from frontend to a user provided location
  @details Returns a directory listing if successful.

  The macros shown below are compiled from the SASjs CORE library (or the
  sasjs/macros project directory) when running the `sasjs cb` command.  This is
  why you see them in the service, but not in the file in the GIT repository.

  <h4> SAS Macros </h4>
  @li mp_abort.sas
  @li mf_isdir.sas
  @li mp_dirlist.sas
  @li mp_binarycopy.sas
  @li mp_webin.sas

**/

%mp_abort(iftrue= (%mf_isdir(&path) = 0)
  ,mac=&_program..sas
  ,msg=%str(File path (&path) is not a valid directory)
)

/*
  Straighten up the _webin_xxx variables
*/
%mp_webin()

/* setup the output destination */
%let outloc=&path/&_webin_filename1;
filename fileout "&outloc";

/* send the data */
%mp_binarycopy(inref=&_webin_fileref1, outref=fileout)

%mp_abort(iftrue= (&syscc ge 4)
  ,mac=&_program..sas
  ,msg=%str(Error occurred reading &_webin_fileref1 and writing to &outloc)
)

/* success - lets create a directory listing */
%mp_dirlist(path=&path,outds=dirlist)
proc sort data=dirlist;
  by filepath;
run;

/* now send it back to the frontend */
%webout(OPEN)
%webout(OBJ,dirlist)
%webout(CLOSE)
