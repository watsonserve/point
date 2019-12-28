import React from 'react'
import _get from 'lodash/get'
import MarkDownIt from 'markdown-it'
// style
import './article.styl'

const markdown = new MarkDownIt()

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
    const md = this.props.value || ''

    return (
      <main className="article">
        <div className="container-wrapper" dangerouslySetInnerHTML = {{ __html: markdown.render(md) }} />
        <footer className="public-footer">© 2018 - 2019 watsonserve.com</footer>
      </main>
    )
  }
}
