import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Logo from '@/assets/images/logo.svg'

const ErrorView = React.lazy(() => import('@/pages/errors'))
const Home = React.lazy(() => import('@/pages/home'))
const Article = React.lazy(() => import('@/pages/article'))

export default class Routers extends Component<any, any> {
  render() {
    return (
      <>
        <header className="public-header">
          <Link className="logo" to="/">
            <Logo />
          </Link>
        </header>
        <BrowserRouter>
          <Switch>
            <Route path="/article/:articleId" component={Article} />
            <Route path="/" exact component={Home} />
            <Route title="Page Not Found" component={ErrorView} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}
