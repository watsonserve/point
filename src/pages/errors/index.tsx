import React, {Component} from 'react'

export default class NotFound extends Component<any, any> {
  constructor(props: any) {
    super(props)
    console.log(props.location)
  }

  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    return true
  }

  private _receiveProps() {}

  render() {
    return (
    <div>404 - not found</div>
    );
  }
}
