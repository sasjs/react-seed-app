import React from 'react'
import * as moment from 'moment'
import { Accordion, AccordionSummary, styled, useTheme } from '@mui/material'
import { Typography } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogTitle } from '@mui/material'
import { Tooltip } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemText } from '@mui/material'
import { Grid } from '@mui/material'

import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { IconButton } from '@mui/material'
import Highlight from 'react-highlight'
import './syntax-highlighting.css'
import { ChevronRight, Close, ErrorOutline, ExpandMore, GetApp, Warning } from '@mui/icons-material'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'

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
  const theme = useTheme()

  const AntTabs = styled(Tabs)({
    root: {
      borderBottom: '1px solid #e8e8e8'
    },
    indicator: {
      backgroundColor: '#1890ff'
    }
  })
  
  const AntTab = styled((props) => <Tab disableRipple {...props} />)({
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
  })

  const styles = {
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
  }
  
  const { programLogs, sasjsConfig, isModalOpen, handleClose, open } = props
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
            style={styles.closeButton}
            onClick={handleClose}
          >
            <Close/>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div style={styles.root}>
            {programLogs.map((programLog, index) => (
              <Accordion
                key={index}
                expanded={expanded === index + 1}
                onChange={handleChange(index + 1)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
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
                          <Typography variant="h5" style={styles.heading}>
                            {programLog.serviceLink.replace(
                              sasjsConfig.appLoc,
                              ''
                            )}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {programLog.logWarnings?.length > 0 && (
                            <Warning style={styles.warningLabel} />
                          )}
                        </Grid>
                        <Grid item>
                          {programLog.logErrors?.length > 0 && (
                            <ErrorOutline color="error" />
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
                            style={styles.secondaryHeading}
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
                              <GetApp />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionSummary>
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
                    style={styles.programlogWrapper}
                  >
                    <SimpleTreeView
                      defaultCollapseIcon={<ExpandMore />}
                      defaultExpandIcon={<ChevronRight />}
                    >
                      <TreeItem
                        nodeId="error"
                        label={
                          <Typography style={styles.errorLabel}>
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
                                  style={styles.listItem}
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
                          <Typography style={styles.warningLabel}>
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
                                  style={styles.listItem}
                                  onClick={() => goToLogLine(warning, index)}
                                >
                                  <ListItemText primary={warning} />
                                </ListItem>
                              }
                            />
                          ))}
                      </TreeItem>
                    </SimpleTreeView>
                    <Typography
                      id={`log_container_${index}`}
                      variant="h5"
                      style={styles.expansionDescription}
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
                  <div style={styles.programlogWrapper}>
                    <Typography
                      variant="h5"
                      style={styles.expansionDescription}
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
                  <div style={styles.programlogWrapper}>
                    <Typography
                      variant="h5"
                      style={styles.expansionDescription}
                    >
                      <Highlight className={'SAS'}>
                        {decodeHtml(programLog.generatedCode)}
                      </Highlight>
                    </Typography>
                  </div>
                ) : (
                  ''
                )}
              </Accordion>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  return <div style={styles.root}>{revealModal}</div>
}

export default RequestModal
