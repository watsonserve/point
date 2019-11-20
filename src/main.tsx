import React from 'react'
import ReactDOM from 'react-dom'
import i18n from './i18n'
import App from './app'
import _ from 'lodash'
import * as serviceWorker from './serviceWorker'

(window as any).t = function(name: string): string {
  const lang = _.get(window, 'navigator.language', 'en-US') as string
  const dict = (i18n as any)[lang] || i18n['en-US']
  return _.get(dict, name, name)
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
