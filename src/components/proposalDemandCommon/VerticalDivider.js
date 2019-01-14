import React, { PureComponent } from 'react'

class VerticalDivider extends PureComponent {
  render() {

    const className = 'className' in this.props ? this.props.className : ''

    return (
      <div className='d-flex align-items-center' style={{minHeight: '100%'}}>
        <div className={`vertical_divider ${className}`}></div>
      </div>
    )
  }
}

export default VerticalDivider