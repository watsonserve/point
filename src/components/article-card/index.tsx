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
    const { id, title, summary, updateTime } = this.props.value

    return (
      <div className="card attention-card">
        <div className="title">
          <Link to={`/article/${id}`}>
            <i className="icon-font icon-report"></i>
            <h5>{ title }</h5>
          </Link>
        </div>
        <p className="update">
          更新时间 <time>{ dateFormat(updateTime) }</time>
        </p>
        <p className="summary">{ summary }</p>
      </div>
    )
  }
}
