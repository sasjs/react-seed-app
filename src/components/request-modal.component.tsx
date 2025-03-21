import moment from 'moment'
import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Accordion,
  AccordionSummary,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Tooltip,
  Typography
} from '@mui/material'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GetAppIcon from '@mui/icons-material/GetApp'
import WarningIcon from '@mui/icons-material/Warning'

import { TreeItem, TreeView } from '@mui/x-tree-view'

import { styled, useTheme, Theme } from '@mui/material/styles'

import Highlight from 'react-highlight'
import './syntax-highlighting.css'

import ResizableBox from './resizeableBox'

// Define interfaces for props and state
interface ProgramLog {
  logFile?: string
  logErrors?: string[]
  logWarnings?: string[]
  serviceLink: string
  timestamp: string
  sourceCode?: string
  generatedCode?: string
  [key: string]: any // Allow additional properties
}

interface SasjsConfig {
  appLoc: string
  [key: string]: any // Allow additional properties
}

interface RequestModalProps {
  programLogs: ProgramLog[]
  sasjsConfig: SasjsConfig
  isModalOpen: boolean
  handleClose: () => void
  open: boolean
}

// Styled components
const AntTabs = styled(Tabs)(() => ({
  '& .MuiTabs-root': {
    borderBottom: '1px solid #e8e8e8'
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff'
  }
}))

const AntTab = styled(Tab)(({ theme }: { theme: Theme }) => ({
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
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium
  },
  '&:focus': {
    color: '#40a9ff'
  }
}))

const Root = styled('div')({
  width: '100%'
})

const Heading = styled(Typography)(({ theme }: { theme: Theme }) => ({
  flexBasis: '33.33%',
  flexShrink: 0,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(12)
  },
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(16)
  }
}))

const SecondaryHeading = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(12)
  },
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(16)
  }
}))

const ExpansionDescription = styled(Typography)(
  ({ theme }: { theme: Theme }) => ({
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
  })
)

const CloseButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1)
}))

const ErrorLabel = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.error.main
}))

const WarningLabel = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.warning.main
}))

const parseErrorsAndWarnings = (req: ProgramLog): void => {
  // Early return if req or req.logFile is undefined
  if (!req || !req.logFile) return

  // Early return if logErrors or logWarnings already exist
  if (req.logErrors !== undefined || req.logWarnings !== undefined) return

  const errorLines: string[] = []
  const warningLines: string[] = []

  const logLines: string[] = req.logFile.split('\n')

  logLines.forEach((line: string, index: number) => {
    // Check if content in element starts with ERROR
    if (/<.*>ERROR/gm.test(line)) {
      const errorLine: string = line.substring(
        line.indexOf('E'),
        line.length - 1
      )
      errorLines.push(errorLine)
    }
    // Check if line starts with ERROR
    else if (/^ERROR/gm.test(line)) {
      errorLines.push(line)
      logLines[index] = `<font>${logLines[index]}</font>`
    }
    // Check if content in element starts with WARNING
    else if (/<.*>WARNING/gm.test(line)) {
      const warningLine: string = line.substring(
        line.indexOf('W'),
        line.length - 1
      )
      warningLines.push(warningLine)
    }
    // Check if line starts with WARNING
    else if (/^WARNING/gm.test(line)) {
      warningLines.push(line)
      logLines[index] = `<font>${logLines[index]}</font>`
    }
  })

  // Update the request object
  req.logFile = logLines.join('\n')
  req.logErrors = errorLines
  req.logWarnings = warningLines
}

// Main component
const RequestModal: React.FC<RequestModalProps> = ({
  programLogs,
  sasjsConfig,
  isModalOpen,
  handleClose,
  open
}) => {
  const theme = useTheme()

  const [expanded, setExpanded] = React.useState<number | false>(false)
  const [currentTab, setTab] = React.useState<number>(0)

  const decodeHtml = (encodedString: string): string => {
    const tempElement = document.createElement('textarea')
    tempElement.innerHTML = encodedString
    return tempElement.value
  }

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const goToLogLine = (linkingLine: string, requestIndex: number) => {
    // Cast the result of querySelectorAll to NodeListOf<HTMLElement>
    const allLines = document.querySelectorAll(
      `#request_${requestIndex} font`
    ) as NodeListOf<HTMLElement>

    // Cast the result of querySelector to HTMLElement
    const logWrapper = document.querySelector(
      `#request_${requestIndex}`
    ) as HTMLElement | null
    const logContainer = document.querySelector(
      `#log_container_${requestIndex}`
    ) as HTMLElement | null

    // Check if logWrapper and logContainer exist
    if (logWrapper && logContainer) {
      for (const line of allLines) {
        if (line.textContent?.includes(linkingLine)) {
          // Use HTMLElement properties
          logWrapper.scrollTop =
            line.offsetTop - logWrapper.offsetTop + logContainer.offsetTop
          line.style.backgroundColor = '#f6e30599'

          setTimeout(() => {
            line.style.backgroundColor = ''
          }, 3000)
        }
      }
    }
  }

  const downloadLogs = (event: React.MouseEvent, index: number) => {
    event.stopPropagation()
    const element = document.createElement('a')
    const file = new Blob([programLogs[index].logFile || ''], {
      type: 'text/plain'
    })
    element.href = URL.createObjectURL(file)
    element.download = `${programLogs[index].serviceLink}_${programLogs[index].timestamp}`
    document.body.appendChild(element)
    element.click()
  }

  // Parse errors and warnings for each program log
  programLogs.forEach((programLog) => {
    parseErrorsAndWarnings(programLog)
  })

  return (
    <Root>
      {!isModalOpen ? null : (
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: { height: '100%' }
          }}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Typography style={{ fontSize: '1.5rem' }}>
              Request History
            </Typography>
            {`App Location: ${sasjsConfig.appLoc}`}
            <CloseButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </CloseButton>
          </DialogTitle>
          <DialogContent>
            <Root>
              {programLogs.map((programLog, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === index + 1}
                  onChange={handleChange(index + 1)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid
                      container
                      spacing={2}
                      style={{ alignItems: 'center' }}
                    >
                      <Grid item sm={6} xs={12}>
                        <Grid
                          container
                          spacing={2}
                          style={{ alignItems: 'center' }}
                        >
                          <Grid item>
                            <Heading variant="h5">
                              {programLog.serviceLink.replace(
                                sasjsConfig.appLoc,
                                ''
                              )}
                            </Heading>
                          </Grid>
                          <Grid item>
                            {programLog.logWarnings &&
                              programLog.logWarnings?.length > 0 && (
                                <WarningIcon
                                  sx={{ color: theme.palette.warning.main }}
                                />
                              )}
                          </Grid>
                          <Grid item>
                            {programLog.logErrors &&
                              programLog.logErrors?.length > 0 && (
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
                            <SecondaryHeading variant="h5">
                              {moment(programLog.timestamp).format
                                ? moment(programLog.timestamp).format(
                                    'dddd, MMMM Do YYYY, h:mm:ss a'
                                  )
                                : programLog.timestamp}
                              {moment(programLog.timestamp).fromNow
                                ? ` (${moment(programLog.timestamp).fromNow()})`
                                : ''}
                            </SecondaryHeading>
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
                    <ResizableBox
                      id={`request_${index}`}
                      style={{ padding: '20px' }}
                    >
                      <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                      >
                        <TreeItem
                          nodeId="error"
                          label={
                            <ErrorLabel>
                              {`Errors (${programLog.logErrors?.length || 0})`}
                            </ErrorLabel>
                          }
                        >
                          {programLog.logErrors &&
                            programLog.logErrors.map((error, ind) => (
                              <TreeItem
                                key={`error_${ind}`}
                                nodeId={`error_${ind}`}
                                label={
                                  <ListItem
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
                            <WarningLabel>
                              {`Warnings (${
                                programLog.logWarnings?.length || 0
                              })`}
                            </WarningLabel>
                          }
                        >
                          {programLog.logWarnings &&
                            programLog.logWarnings.map((warning, ind) => (
                              <TreeItem
                                key={`warning_${ind}`}
                                nodeId={`warning_${ind}`}
                                label={
                                  <ListItem
                                    onClick={() => goToLogLine(warning, index)}
                                  >
                                    <ListItemText primary={warning} />
                                  </ListItem>
                                }
                              />
                            ))}
                        </TreeItem>
                      </TreeView>
                      <ExpansionDescription
                        id={`log_container_${index}`}
                        variant="h5"
                      >
                        <Highlight className={'html'} innerHTML={true}>
                          {decodeHtml(programLog.logFile || '')}
                        </Highlight>
                      </ExpansionDescription>
                    </ResizableBox>
                  ) : null}

                  {currentTab === 1 ? (
                    <ResizableBox style={{ padding: '20px' }}>
                      <ExpansionDescription variant="h5">
                        <Highlight className={'html'}>
                          {decodeHtml(programLog.sourceCode || '')}
                        </Highlight>
                      </ExpansionDescription>
                    </ResizableBox>
                  ) : null}

                  {currentTab === 2 ? (
                    <ResizableBox style={{ padding: '20px' }}>
                      <ExpansionDescription variant="h5">
                        <Highlight className={'SAS'}>
                          {decodeHtml(programLog.generatedCode || '')}
                        </Highlight>
                      </ExpansionDescription>
                    </ResizableBox>
                  ) : null}
                </Accordion>
              ))}
            </Root>
          </DialogContent>
        </Dialog>
      )}
    </Root>
  )
}

export default RequestModal
