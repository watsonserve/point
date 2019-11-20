import React, { Suspense, Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import 'antd-mobile/dist/antd-mobile.css'
import './assets/style/common.styl'
import './assets/style/app.styl'
import Loading from './components/loading'
import createStore from './store'
import Routers from './components/routers'

const history = createBrowserHistory()
const store = createStore(history)

class App extends Component<any, any> {
  render() {
    return (
      <Provider store={store}>
        {/* <Message /> */}
        <ConnectedRouter history={history}>
          <Suspense fallback={<Loading />}>
            <Routers />
          </Suspense>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
