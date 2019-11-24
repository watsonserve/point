import { connect } from 'react-redux'
import { loadArticleList } from '@/api'
import { FuncDispatch } from '@/entities'
import Home from '@/pages/home/home'

function mapState(state: any) {
  return {
    value: state.articleList || [],
  }
}

function mapDispatch(dispatch: FuncDispatch) {
  return {
    loadArticleList() {
      loadArticleList().then(articleList => {
        if (!articleList) {
          console.warn(articleList)
          return
        }
        dispatch({ type: 'ARTICLE_LIST', payload: articleList })
      })
    }
  }
}

export default connect(mapState, mapDispatch)(Home)
