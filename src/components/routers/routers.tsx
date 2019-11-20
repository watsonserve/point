import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Picture from '@/components/picture'
import logo from '@/assets/images/logo.svg'

const ErrorView = React.lazy(() => import('@/pages/errors'))
const Home = React.lazy(() => import('@/pages/home'))
const Article = React.lazy(() => import('@/pages/article'))

export default class Routers extends Component<any, any> {
  render() {
    return (
      <>
        <header className="public-header">
          <Link className="logo" to="/">
            <Picture title="logo" src={logo as any} />
          </Link>
        </header>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/article/:articleId" component={Article} />
            <Route title="Page Not Found" component={ErrorView} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}
