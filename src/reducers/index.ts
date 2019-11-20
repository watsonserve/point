import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import { Action } from '@/entities'

function articleList(state: any, action: Action) {
  if ('ARTICLE_LIST' !== action.type) {
    return state || []
  }
  return action.payload
}

function curArticle(state: any, action: Action) {
  if ('CUR_ARTICLE' !== action.type) {
    return state || null
  }
  return action.payload
}

export default function(history: History) {
  return combineReducers({
    router: connectRouter(history),
    articleList,
    curArticle,
  })
}
