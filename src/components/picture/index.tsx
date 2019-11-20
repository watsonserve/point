import React from 'react'
import { Spin } from 'antd'
import { hashColor } from '@/helper/random'
import { loadImage } from '@/utils/load'

enum LoadState {
  LOADING,
  SUCCESS,
  FAILD,
}

interface ImageProps {
  className?: string
  style?: any
  src: string | ArrayBuffer
  alt?: string
  title: string
  titleLen?: number
}

interface ImageState {
  loaded: LoadState
}

export default class Picture extends React.Component<ImageProps, ImageState> {
  static defaultProps = {
    titleLen: 2,
  }

  constructor(props: ImageProps) {
    super(props)
    this.state = {
      loaded: this._load(props.src)
    }
  }

  private _load(src: any): LoadState {
    // 没有图片地址
    if (!src) {
      return LoadState.FAILD
    }
    // 图片不是地址
    const needLoad = 'string' === typeof src
    if (!needLoad) {
      return LoadState.SUCCESS
    }
    loadImage(src as string)
    .then(() => {
      this.setState({ loaded: LoadState.SUCCESS })
    }).catch(() => {
      this.setState({ loaded: LoadState.FAILD })
    })
    return LoadState.LOADING
  }

  shouldComponentUpdate(nextProps: ImageProps, nextState: any): boolean {
    if (this.props.src !== nextProps.src) {
      const loaded = this._load(nextProps.src)
      const shouldUpdate = LoadState.LOADING !== loaded
      shouldUpdate && this.setState({ loaded })
      return shouldUpdate
    }
    return true
  }

  render(): JSX.Element {
    const { src, children, style, titleLen, ...props } = this.props
    const { loaded } = this.state
    switch (loaded) {
      case LoadState.FAILD:
        const txt = props.title ? props.title.substr(0, titleLen) : ''
        const altStyle = {...style, backgroundColor: `#${hashColor(props.title)}` }
        return (
          <span {...props} style={altStyle}>{ txt }</span>
        )
      case LoadState.SUCCESS:
        return (
          <img {...props} src={src as string} style={style} />
        )
      default:
        return (<Spin />)
    }
  }
}
