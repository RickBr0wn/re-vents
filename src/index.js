import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './app/layouts/App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './app/store/configureStore'

const store = configureStore()

const rootElement = document.getElementById('root')

let render = () => {
  ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, rootElement)
}

if(module.hot) {
  module.hot.accept('./app/layouts/App', () => {
    setTimeout(render)
  })
}

render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()