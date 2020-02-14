import React from 'react'
import { Link } from 'react-router-dom'
import { Article } from '@/entities'
import { dateFormat } from '@/helper/time'
import './article-card.styl'

interface ArticleCardProps {
  value: Article
}

export default class ArticleCard extends React.Component<ArticleCardProps> {
  render() {
    const { articleId, title, summary, updateTime } = this.props.value

    return (
      <Link className="card attention-card" to={`/article/${articleId}`}>
        <div className="title">
          <i className="icon-font icon-report"></i>
          <h4>{ title }</h4>
        </div>
        <p className="update">
          更新时间: <time>{ dateFormat(updateTime * 1000) }</time>
        </p>
        <p className="summary">{ summary }</p>
      </Link>
    )
  }
}
