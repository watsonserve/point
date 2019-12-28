import { connect } from 'react-redux'
import { FuncDispatch } from '@/entities'
import { loadArticle } from '@/api'
import Article from './article'

function mapState(state: any) {
  return {
    value: state.curArticle,
  }
}

function mapDispatch(dispatch: FuncDispatch) {
  return {
    loadArticle(articleId: string): void {
      loadArticle(articleId)
      .then(md => {
        dispatch({ type: 'CUR_ARTICLE', payload: md })
      })
      .catch(err => {
        console.error(err)
        dispatch({ type: 'CUR_ARTICLE', payload: null })
      })
    }
  }
}

export default connect(mapState, mapDispatch)(Article)
