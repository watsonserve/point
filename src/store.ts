import thunk from 'redux-thunk'
import {compose, applyMiddleware, createStore} from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import {History} from 'history'

// reducer: createStore(Reducer, preloadedState: State, enhancer: function)
export default (history: History, initState = {}) => createStore(
  createRootReducer(history),
  initState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
)
