import React from 'react'
import ArticleCard from '@/components/article-card'
import './home.styl'
import { Article } from '@/entities'

interface HomeProps {
  value: Article[]
  loadArticleList: () => void
}

export default class Home extends React.Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props)
    const loadArticleList = this.props.loadArticleList
    loadArticleList()
  }

  render() {
    const articleList = this.props.value

    return (
      <main className="home">
        <div className="container-wrapper">
          <div className="cards">
            <ul className="list-unstyled list-inline attention">
            {articleList.map((article: any, idx: number) => (
              <li className="animated" key={idx}>
                <ArticleCard value={article} />
              </li>
            ))}
            </ul>
          </div>
        </div>
        <footer className="public-footer">© 2018 - 2019 watsonserve.com</footer>
      </main>
    )
  }
}
