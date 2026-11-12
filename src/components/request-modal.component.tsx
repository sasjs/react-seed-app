import moment from 'moment'
import React, { useMemo, useRef } from 'react'

import {
  Accordion,
  Box,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Tooltip,
  Typography
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GetAppIcon from '@mui/icons-material/GetApp'
import ErrorIcon from '@mui/icons-material/ErrorOutlined'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import WarningIcon from '@mui/icons-material/WarningAmber'

import { styled, useTheme, Theme } from '@mui/material/styles'

import { LogIssue, parseLog } from '@sasjs/utils/logs'

import Highlight from 'react-highlight'
import './syntax-highlighting.css'

// Define interfaces for props and state
interface ProgramLog {
  logFile?: string
  sourceCode?: string
  generatedCode?: string
  serviceLink: string
  timestamp: string
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

/** A request with its log read once: the issues SAS wrote, and the log marked up. */
interface AnalysedLog extends ProgramLog {
  issues: LogIssue[]
  errors: LogIssue[]
  warnings: LogIssue[]
  notes: LogIssue[]
  /** The severity of each line that carries one, by zero-based line index. */
  lineSeverity: Map<number, string>
  /** ODS HTML logs arrive as markup; everything else is plain text. */
  isHtml: boolean
  logLines: number
}

// Styled components
const SuggestionTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff'
  }
})

const SuggestionTab = styled(Tab)(({ theme }: { theme: Theme }) => ({
  textTransform: 'none',
  minWidth: 72,
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(4),
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
  fontFamily: 'Monaco, Courier, monospace',
  fontSize: theme.typography.pxToRem(15),
  fontWeight: theme.typography.fontWeightMedium
}))

const SecondaryHeading = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(13)
}))

/** The log itself: monospace, scrollable, one line per line of the log. */
const LogPane = styled('div')(({ theme }: { theme: Theme }) => ({
  backgroundColor: '#fbfbfb',
  border: '1px solid #e2e2e2',
  borderRadius: '3px',
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  maxHeight: '45vh',
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontFamily: 'Monaco, Courier, monospace',
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 1.5,
  '& .log-line-number': {
    display: 'inline-block',
    width: '4em',
    marginRight: '1em',
    color: '#9a9a9a',
    textAlign: 'right',
    userSelect: 'none'
  },
  '& .error-line': {
    backgroundColor: 'rgba(211, 47, 47, 0.12)',
    display: 'block'
  },
  '& .warning-line': {
    backgroundColor: 'rgba(237, 108, 2, 0.12)',
    display: 'block'
  },
  '& .flashed': {
    outline: `2px solid ${theme.palette.primary.main}`
  }
}))

const IssueList = styled(List)({
  paddingTop: 0
})

const IssueCode = styled('span')(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: 'Monaco, Courier, monospace',
  marginRight: theme.spacing(1)
}))

const EmptyNote = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
  padding: theme.spacing(1, 0)
}))

const CloseButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1)
}))

/**
 * Reads a request's log once and keeps what the modal renders: the issues SAS
 * wrote, grouped by severity, and the log with those lines marked.
 *
 * `parseLog` is the parser Data Controller reads its SAS logs with, from
 * `@sasjs/utils/logs` - so the two applications agree about what an ERROR is,
 * which notes are notable, and where each one sits in the text. Errors and
 * warnings are marked in the log; a notable note is not a defect, so it is not.
 */
const analyseLog = (request: ProgramLog): AnalysedLog => {
  const log = typeof request.logFile === 'string' ? request.logFile : ''
  const issues = parseLog(log)
  const severityByLine = new Map<number, string>()

  issues.forEach((issue) => {
    if (issue.severity === 'note') return
    for (let line = issue.line; line <= issue.endLine; line++) {
      severityByLine.set(line, issue.severity)
    }
  })

  return {
    ...request,
    issues,
    errors: issues.filter((issue) => issue.severity === 'error'),
    warnings: issues.filter((issue) => issue.severity === 'warning'),
    notes: issues.filter((issue) => issue.severity === 'note'),
    lineSeverity: severityByLine,
    isHtml: /<(html|pre|font)\b/i.test(log),
    logLines: log.split('\n').length
  }
}

const RequestModal: React.FC<RequestModalProps> = ({
  programLogs,
  sasjsConfig,
  isModalOpen,
  handleClose,
  open
}) => {
  const theme = useTheme()
  const [expanded, setExpanded] = React.useState<number | false>(1)
  const [tab, setTab] = React.useState(0)
  const logRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const logs = useMemo(() => (programLogs || []).map(analyseLog), [programLogs])

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const cutAppLoc = (link: string) =>
    String(link || '').replace(`${sasjsConfig.appLoc}/`, '')

  /* Compact, because the full form - "Thursday, November 12th 2026, 5:50:08 pm
   * (a few seconds ago)" - is three times the width of the service name and is
   * what wrapped each header onto a second line. The long form is still there on
   * hover, where it costs no height. */
  const when = (timestamp: string) => {
    const parsed = moment(timestamp)
    return parsed.isValid() ? parsed.format('D MMM YYYY, HH:mm:ss') : timestamp
  }

  const whenInFull = (timestamp: string) => {
    const parsed = moment(timestamp)
    return parsed.isValid()
      ? `${parsed.format('dddd, MMMM Do YYYY, h:mm:ss a')} (${parsed.fromNow()})`
      : timestamp
  }

  /**
   * Scrolls the log to an issue, using the line number the parser reported
   * rather than searching the rendered text - a log repeats its messages, so a
   * search lands on the first of them every time.
   */
  const goToLogLine = (issue: LogIssue, index: number) => {
    const wrapper = logRefs.current[index]
    if (!wrapper) return

    /* the parser's own line index addresses the rendered line, so nothing is
     * searched for and nothing is estimated */
    const line = wrapper.querySelector(`[data-line="${issue.line}"]`)

    if (line && line.scrollIntoView) {
      line.scrollIntoView({ block: 'center' })
      line.classList.add('flashed')
      setTimeout(() => line.classList.remove('flashed'), 2000)
    }
  }

  const download = (contents: string, name: string) => {
    const stamp = new Date().valueOf()
    const blob = new Blob([contents], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${name}-${stamp}.log`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const issueListItem = (issue: LogIssue, index: number) => (
    <ListItemButton
      key={`${issue.severity}-${issue.line}-${index}`}
      onClick={() => goToLogLine(issue, index)}
      data-testid={`issue-${issue.severity}-${issue.line}`}
    >
      <ListItemText
        primary={
          <>
            {issue.code ? <IssueCode>{issue.code}</IssueCode> : null}
            {issue.message}
          </>
        }
        secondary={`line ${issue.line + 1}`}
      />
    </ListItemButton>
  )

  const issueGroup = (
    title: string,
    issues: LogIssue[],
    icon: React.ReactNode,
    index: number
  ) =>
    issues.length ? (
      <>
        <Typography
          variant="subtitle2"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 1 }}
        >
          {icon}
          {`${title} (${issues.length})`}
        </Typography>
        <IssueList dense>
          {issues.map((issue, at) => issueListItem(issue, index))}
        </IssueList>
      </>
    ) : null

  return (
    <Root>
      {!isModalOpen ? null : (
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={open}
          onClose={handleClose}
          slotProps={{ paper: { style: { height: '100%' } } }}
          aria-labelledby="sas-logs-title"
        >
          <DialogTitle id="sas-logs-title">
            <Typography style={{ fontSize: '1.5rem' }}>SAS logs</Typography>
            {`App Location: ${sasjsConfig.appLoc}`}
            <CloseButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </CloseButton>
          </DialogTitle>
          <DialogContent>
            <Root>
              {logs.length === 0 ? (
                <EmptyNote>
                  No requests yet. Every service call is kept here while the app
                  is open.
                </EmptyNote>
              ) : null}

              {logs.map((log, index) => (
                <Accordion
                  key={`${log.serviceLink}-${index}`}
                  expanded={expanded === index + 1}
                  onChange={handleChange(index + 1)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`log-${index}-content`}
                    // one row, and a tighter one than the default 48px: a
                    // request is a line in a list, not a section heading
                    sx={{
                      minHeight: 44,
                      // MUI raises the expanded summary to 64px on its own, which
                      // is the row the eye is on: keep every row the same height
                      '&.Mui-expanded': { minHeight: 44 },
                      // and its content keeps 20px above and below when open,
                      // which is the rest of the 70px: the collapsed margin wins
                      '&.Mui-expanded .MuiAccordionSummary-content': {
                        margin: '6px 0'
                      },
                      '& .MuiAccordionSummary-content': {
                        alignItems: 'center',
                        gap: 1,
                        my: 0.75,
                        flexWrap: 'wrap'
                      }
                    }}
                  >
                    <Heading variant="subtitle1" sx={{ mr: 0.5 }}>
                      {cutAppLoc(log.serviceLink)}
                    </Heading>
                    {log.errors.length > 0 && (
                      <Chip
                        size="small"
                        color="error"
                        icon={<ErrorIcon />}
                        label={`${log.errors.length} error${
                          log.errors.length === 1 ? '' : 's'
                        }`}
                      />
                    )}
                    {log.warnings.length > 0 && (
                      <Chip
                        size="small"
                        color="warning"
                        icon={<WarningIcon />}
                        label={`${log.warnings.length} warning${
                          log.warnings.length === 1 ? '' : 's'
                        }`}
                      />
                    )}
                    {log.notes.length > 0 && (
                      <Chip
                        size="small"
                        icon={<InfoIcon />}
                        label={`${log.notes.length} note${
                          log.notes.length === 1 ? '' : 's'
                        }`}
                      />
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        ml: 'auto'
                      }}
                    >
                      <Tooltip title={whenInFull(log.timestamp)}>
                        <SecondaryHeading variant="body2">
                          {when(log.timestamp)}
                        </SecondaryHeading>
                      </Tooltip>
                      <Tooltip title="Download the log">
                        <IconButton
                          size="small"
                          sx={{ color: 'primary.main' }}
                          onClick={(event) => {
                            event.stopPropagation()
                            download(log.logFile || '', 'sas-log')
                          }}
                        >
                          <GetAppIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails>
                    <SuggestionTabs
                      value={tab}
                      onChange={(_event, value) => setTab(value)}
                      indicatorColor="primary"
                      textColor="primary"
                      centered
                    >
                      <SuggestionTab label="SAS log" />
                      <SuggestionTab label="Source code" />
                      <SuggestionTab label="Generated code" />
                    </SuggestionTabs>

                    {tab === 0 && (
                      <>
                        {issueGroup(
                          'Errors',
                          log.errors,
                          <ErrorIcon color="error" fontSize="small" />,
                          index
                        )}
                        {issueGroup(
                          'Warnings',
                          log.warnings,
                          <WarningIcon
                            sx={{ color: theme.palette.warning.main }}
                            fontSize="small"
                          />,
                          index
                        )}
                        {issueGroup(
                          'Notable notes',
                          log.notes,
                          <InfoIcon color="info" fontSize="small" />,
                          index
                        )}

                        {log.issues.length === 0 && log.logFile ? (
                          <EmptyNote>
                            No errors, warnings or notable notes in this log.
                          </EmptyNote>
                        ) : null}

                        {!log.logFile ? (
                          <EmptyNote>
                            This request carried no log. Turn on Debug in the
                            menu before running a service to capture one.
                          </EmptyNote>
                        ) : (
                          <LogPane
                            ref={(element) => {
                              logRefs.current[index] = element
                            }}
                          >
                            {log.isHtml ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: log.logFile || ''
                                }}
                              />
                            ) : (
                              (log.logFile || '')
                                .split('\n')
                                .map((text, at) => (
                                  <div
                                    key={at}
                                    data-line={at}
                                    className={
                                      log.lineSeverity.get(at)
                                        ? `${log.lineSeverity.get(at)}-line`
                                        : undefined
                                    }
                                  >
                                    <span className="log-line-number">
                                      {at + 1}
                                    </span>
                                    {text || ' '}
                                  </div>
                                ))
                            )}
                          </LogPane>
                        )}
                      </>
                    )}

                    {tab === 1 && (
                      <Highlight className={'SAS'}>
                        {log.sourceCode || 'No source code captured.'}
                      </Highlight>
                    )}

                    {tab === 2 && (
                      <Highlight className={'SAS'}>
                        {log.generatedCode || 'No generated code captured.'}
                      </Highlight>
                    )}
                  </AccordionDetails>
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
