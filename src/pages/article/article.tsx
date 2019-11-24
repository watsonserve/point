import React from 'react'
import _get from 'lodash/get'
import { boundMethod } from 'autobind-decorator'
// 组件
import Nav from '@/components/nav'
// 数据类型, 接口
import t from '@/helper/i18n'
// style
import './article.styl'

interface ArticleProps {
  value: string
  loadArticle: (articleId: string) => void
}

export default class Article extends React.Component<ArticleProps, any> {
  constructor(props: ArticleProps) {
    super(props)
    const loadArticle = this.props.loadArticle
    const articleId = _get(this.props, 'match.params.articleId')
    articleId && loadArticle(articleId)
  }

  render() {
    return (
      <Nav className="booking">
      </Nav>
    )
  }
}
