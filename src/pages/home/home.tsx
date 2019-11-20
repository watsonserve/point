import React from 'react'
import Nav from '@/components/nav'
import ArticleCard from '@/components/article-card'
import './home.styl'
import { Article } from '@/entities'

interface HomeProps {
  value: Article[]
  loadArticleList: () => void
}

export default class Home extends React.Component<HomeProps, any> {
  constructor(props: HomeProps) {
    super(props)
    const loadOrderSetList = this.props.loadArticleList
    loadOrderSetList && loadOrderSetList()
  }

  render() {
    const articleList = this.props.value

    return (
      <Nav>
        <div className="cards">
          <ul className="list-unstyled list-inline attention">
          {articleList.map((article: any, idx: number) => (
            <li className="animated" key={idx}>
              <ArticleCard value={article} />
            </li>
          ))}
          </ul>
        </div>
      </Nav>
    )
  }
}
