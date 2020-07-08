import React from "react";
import * as moment from "moment";
import { makeStyles, withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Highlight from "react-highlight.js";
import "./syntax-highlighting.css";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8"
  },
  indicator: {
    backgroundColor: "#1890ff"
  }
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(12)
    },
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(16)
    }
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(12)
    },
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(16)
    }
  },
  expansionText: {
    display: "block",
    color: "white"
  },
  headingTextExpansion: {
    color: "#3f51b5"
  },
  expansionDescription: {
    backgroundColor: "#fbfbfb",
    border: "1px solid #e2e2e2",
    borderRadius: "3px",
    minHeight: "50px",
    padding: "10px",
    boxSizing: "border-box",
    whiteSpace: "pre-wrap",
    fontFamily: "Monaco, Courier, monospace",
    position: "relative",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(12)
    },
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(16)
    }
  },
  programlogWrapper: {
    padding: "20px"
  }
}));

const RequestModal = props => {
  const { programLogs, sasjsConfig, isModalOpen, handleClose, open } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [currentTab, setTab] = React.useState(0);

  const decodeHtml = encodedString => {
    const tempElement = document.createElement("textarea");
    tempElement.innerHTML = encodedString;
    return tempElement.value;
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  let revealModal = null;
  if (isModalOpen) {
    revealModal = (
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Typography style={{ fontSize: "1.5rem" }}>
            Request History
          </Typography>
          {`App Location: ${sasjsConfig.appLoc}`}
        </DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            {programLogs.map((programLog, index) => (
              <ExpansionPanel
                key={index}
                expanded={expanded === index + 1}
                onChange={handleChange(index + 1)}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Grid container spacing={3}>
                    <Grid item sm={6} xs={12}>
                      <Typography variant="h5" className={classes.heading}>
                        {programLog.serviceLink.replace(sasjsConfig.appLoc, "")}
                      </Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Typography
                        variant="h5"
                        className={classes.secondaryHeading}
                      >
                        {moment(programLog.timestamp).format
                          ? moment(programLog.timestamp).format(
                              "dddd, MMMM Do YYYY, h:mm:ss a"
                            )
                          : programLog.timestamp}
                        {moment(programLog.timestamp).format
                          ? ` (${moment(programLog.timestamp).fromNow()})`
                          : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <AntTabs
                  value={currentTab}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <AntTab label="SAS Log" />
                  <AntTab label="SAS Source Code" />
                  <AntTab label="SAS Generated Code" />
                </AntTabs>

                {currentTab === 0 ? (
                  <div className={classes.programlogWrapper}>
                    <Typography
                      variant="h5"
                      className={classes.expansionDescription}
                    >
                      <Highlight language={"html"}>
                        {decodeHtml(programLog.logFile)}
                      </Highlight>
                    </Typography>
                  </div>
                ) : (
                  ""
                )}

                {currentTab === 1 ? (
                  <div className={classes.programlogWrapper}>
                    <Typography
                      variant="h5"
                      className={classes.expansionDescription}
                    >
                      <Highlight language={"SAS"}>
                        {decodeHtml(programLog.sourceCode)}
                      </Highlight>
                    </Typography>
                  </div>
                ) : (
                  ""
                )}

                {currentTab === 2 ? (
                  <div className={classes.programlogWrapper}>
                    <Typography
                      variant="h5"
                      className={classes.expansionDescription}
                    >
                      <Highlight language={"SAS"}>
                        {decodeHtml(programLog.generatedCode)}
                      </Highlight>
                    </Typography>
                  </div>
                ) : (
                  ""
                )}
              </ExpansionPanel>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return <div className={classes.root}>{revealModal}</div>;
};

export default RequestModal;
