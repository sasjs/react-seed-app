import React from 'react'
import * as moment from 'moment'
import { makeStyles, withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import WarningIcon from '@material-ui/icons/Warning'
import GetAppIcon from '@material-ui/icons/GetApp'
import Tooltip from '@material-ui/core/Tooltip'
import TreeView from '@material-ui/lab/TreeView'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Highlight from 'react-highlight'
import './syntax-highlighting.css'

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8'
  },
  indicator: {
    backgroundColor: '#1890ff'
  }
})(Tabs)

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:focus': {
      color: '#40a9ff'
    }
  },
  selected: {}
}))((props) => <Tab disableRipple {...props} />)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12)
    },
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(16)
    }
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12)
    },
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(16)
    }
  },
  expansionText: {
    display: 'block',
    color: 'white'
  },
  headingTextExpansion: {
    color: '#3f51b5'
  },
  expansionDescription: {
    backgroundColor: '#fbfbfb',
    border: '1px solid #e2e2e2',
    borderRadius: '3px',
    minHeight: '50px',
    padding: '10px',
    boxSizing: 'border-box',
    whiteSpace: 'pre-wrap',
    fontFamily: 'Monaco, Courier, monospace',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12)
    },
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(16)
    }
  },
  programlogWrapper: {
    padding: '20px',
    overflowY: 'auto',
    maxHeight: '300px'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.icon
  },
  errorLabel: {
    color: theme.palette.error.main
  },
  warningLabel: {
    color: theme.palette.sasWarning
  }
}))

const parseErrorsAndWarnings = (req) => {
  if (!req || !req.logFile) return
  if (req['logErrors'] !== undefined || req['logWarnings'] !== undefined) return

  const errorLines = []
  const warningLines = []

  const logLines = req.logFile.split('\n')

  logLines.forEach((line, index) => {
    // check if content in element starts with ERROR
    if (/<.*>ERROR/gm.test(line)) {
      const errorLine = line.substring(line.indexOf('E'), line.length - 1)
      errorLines.push(errorLine)
    }
    // check if line starts with ERROR
    else if (/^ERROR/gm.test(line)) {
      errorLines.push(line)
      logLines[index] = '<font>' + logLines[index] + '</font>'
    }
    // check if content in element starts with WARNING
    else if (/<.*>WARNING/gm.test(line)) {
      const warningLine = line.substring(line.indexOf('W'), line.length - 1)
      warningLines.push(warningLine)
    }
    // check if line starts with WARNING
    else if (/^WARNING/gm.test(line)) {
      warningLines.push(line)
      logLines[index] = '<font>' + logLines[index] + '</font>'
    }
  })

  req.logFile = logLines.join('\n')
  req['logErrors'] = errorLines
  req['logWarnings'] = warningLines
}

const RequestModal = (props) => {
  const { programLogs, sasjsConfig, isModalOpen, handleClose, open } = props
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const [currentTab, setTab] = React.useState(0)

  const decodeHtml = (encodedString) => {
    const tempElement = document.createElement('textarea')
    tempElement.innerHTML = encodedString
    return tempElement.value
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  const goToLogLine = (linkingLine, requestIndex) => {
    const allLines = document.querySelectorAll(`#request_${requestIndex} font`)
    const logWrapper = document.querySelector(`#request_${requestIndex}`)
    const logContainer = document.querySelector(
      `#log_container_${requestIndex}`
    )
    for (const line of allLines) {
      if (line.textContent.includes(linkingLine)) {
        logWrapper.scrollTop =
          line.offsetTop - logWrapper.offsetTop + logContainer.offsetTop
        line.style.backgroundColor = '#f6e30599'

        setTimeout(() => {
          line.style = ''
        }, 3000)
      }
    }
  }

  const downloadLogs = (event, index) => {
    event.stopPropagation()
    const element = document.createElement('a')
    const file = new Blob([programLogs[index].logFile], {
      type: 'text/plain'
    })
    element.href = URL.createObjectURL(file)
    element.download = `${programLogs[index].serviceLink}_${programLogs[index].timestamp}`
    document.body.appendChild(element)
    element.click()
  }

  for (const programLog of programLogs) {
    parseErrorsAndWarnings(programLog)
  }

  let revealModal = null
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
          <Typography style={{ fontSize: '1.5rem' }}>
            Request History
          </Typography>
          {`App Location: ${sasjsConfig.appLoc}`}
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
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
                  <Grid container spacing={2} style={{ alignItems: 'center' }}>
                    <Grid item sm={6} xs={12}>
                      <Grid
                        container
                        spacing={2}
                        style={{ alignItems: 'center' }}
                      >
                        <Grid item>
                          <Typography variant="h5" className={classes.heading}>
                            {programLog.serviceLink.replace(
                              sasjsConfig.appLoc,
                              ''
                            )}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {programLog.logWarnings?.length > 0 && (
                            <WarningIcon className={classes.warningLabel} />
                          )}
                        </Grid>
                        <Grid item>
                          {programLog.logErrors?.length > 0 && (
                            <ErrorOutlineIcon color="error" />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <Grid item>
                          <Typography
                            variant="h5"
                            className={classes.secondaryHeading}
                          >
                            {moment(programLog.timestamp).format
                              ? moment(programLog.timestamp).format(
                                  'dddd, MMMM Do YYYY, h:mm:ss a'
                                )
                              : programLog.timestamp}
                            {moment(programLog.timestamp).format
                              ? ` (${moment(programLog.timestamp).fromNow()})`
                              : ''}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Download Logs">
                            <IconButton
                              style={{ color: 'blue' }}
                              onClick={(event) => downloadLogs(event, index)}
                            >
                              <GetAppIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
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
                  <div
                    id={`request_${index}`}
                    className={classes.programlogWrapper}
                  >
                    <TreeView
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                    >
                      <TreeItem
                        nodeId="error"
                        label={
                          <Typography className={classes.errorLabel}>
                            {`Errors (${programLog.logErrors?.length})`}
                          </Typography>
                        }
                      >
                        {programLog.logErrors &&
                          programLog.logErrors.map((error, ind) => (
                            <TreeItem
                              nodeId={`error_${ind}`}
                              label={
                                <ListItem
                                  className={classes.listItem}
                                  onClick={() => goToLogLine(error, index)}
                                >
                                  <ListItemText primary={error} />
                                </ListItem>
                              }
                            />
                          ))}
                      </TreeItem>
                      <TreeItem
                        nodeId="warnings"
                        label={
                          <Typography className={classes.warningLabel}>
                            {`Warnings (${programLog.logWarnings?.length})`}
                          </Typography>
                        }
                      >
                        {programLog.logWarnings &&
                          programLog.logWarnings.map((warning, ind) => (
                            <TreeItem
                              nodeId={`error_${ind}`}
                              label={
                                <ListItem
                                  className={classes.listItem}
                                  onClick={() => goToLogLine(warning, index)}
                                >
                                  <ListItemText primary={warning} />
                                </ListItem>
                              }
                            />
                          ))}
                      </TreeItem>
                    </TreeView>
                    <Typography
                      id={`log_container_${index}`}
                      variant="h5"
                      className={classes.expansionDescription}
                    >
                      <Highlight className={'html'} innerHTML={true}>
                        {decodeHtml(programLog.logFile)}
                      </Highlight>
                    </Typography>
                  </div>
                ) : (
                  ''
                )}

                {currentTab === 1 ? (
                  <div className={classes.programlogWrapper}>
                    <Typography
                      variant="h5"
                      className={classes.expansionDescription}
                    >
                      <Highlight className={'html'}>
                        {decodeHtml(programLog.sourceCode)}
                      </Highlight>
                    </Typography>
                  </div>
                ) : (
                  ''
                )}

                {currentTab === 2 ? (
                  <div className={classes.programlogWrapper}>
                    <Typography
                      variant="h5"
                      className={classes.expansionDescription}
                    >
                      <Highlight className={'SAS'}>
                        {decodeHtml(programLog.generatedCode)}
                      </Highlight>
                    </Typography>
                  </div>
                ) : (
                  ''
                )}
              </ExpansionPanel>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  return <div className={classes.root}>{revealModal}</div>
}

export default RequestModal
