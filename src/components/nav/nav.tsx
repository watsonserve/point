import React from 'react'
import './nav.styl'

interface NavProps {
  className?: string
  children?: any
}

export default class Nav extends React.Component<NavProps> {
  render() {
    const { children } = this.props
    let className = this.props.className
    if (className && className.trim()) {
      className = `nav-frame ${className}`
    }

    return (
      <>
        <div className="container-wrapper">
          { children }
        </div>
        <footer className="public-footer">
          © 2018 - 2019 watsonserve.com
        </footer>
      </>
    )
  }
}
