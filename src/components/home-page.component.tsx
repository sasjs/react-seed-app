import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  homePage: {
    padding: '16px',
    color: '#1c1c1c',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  code: {
    fontFamily: 'Monaco, Courier, monospace',
    border: '1px solid #d9d9d9',
    padding: '5px',
    borderRadius: '3px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  }
}))

const HomePageComponent = () => {
  const classes = useStyles()

  return (
    <div className={classes.homePage}>
      <h1>
        Hello!{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </h1>
      <h3>
        Welcome to the React Seed App for{' '}
        <span className={classes.code}>SASjs</span>.
      </h3>
      <div>
        App Source Code:{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/macropeople/react-seed-app"
        >
          https://github.com/macropeople/react-seed-app
        </a>
      </div>
      <br />
      <div>
        <span className={classes.code}>SASjs</span> Source Code:
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/macropeople/sasjs"
        >
          https://github.com/macropeople/sasjs
        </a>
      </div>
      <br />
      <div>
        <span className={classes.code}>SASjs</span> on NPM:
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.npmjs.com/package/sasjs"
        >
          https://www.npmjs.com/package/sasjs
        </a>
      </div>
    </div>
  )
}

export default HomePageComponent
