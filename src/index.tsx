import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import './App.scss'

import routes from './routes'

const render = () => {
  ReactDOM.render(<>{routes}</>, document.getElementById('root'))
}

render()
