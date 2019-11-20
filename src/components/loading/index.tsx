import React, { CSSProperties } from 'react'
import {Spin} from 'antd'

const wrapStyle:CSSProperties = {
  display: 'table',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  width: '100%',
  height: '100%',
  textAlign: 'center',
  verticalAlign: 'middle'
}

const style:CSSProperties = {
  display: 'table-cell',
  transform: 'translateY(-12%)'
}

export default function Loading() {
  return (
    <div style={wrapStyle}>
      <Spin size="large" tip="Loading..." style={style} />
    </div>
  )
}
