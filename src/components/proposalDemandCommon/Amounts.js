import React, { PureComponent } from 'react'

class Amounts extends PureComponent {
  render() {

    const { content, color, onClick, length, count } = this.props

    return (
      <div 
        className={`Amounts ${color} d-flex justify-content-center w-100 my-4 position-relative`}
        onClick={onClick}>
        <div>{content}</div>
        <div 
          className='position-absolute'
          style={{right: '10px'}}>
          {length}
          {'  /  '}
          {count}
        </div>
      </div>
    ) 
  }
}

export default Amounts