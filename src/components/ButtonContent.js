import React from 'react'
import LoadingButtonSpiner from './LoadingButtonSpiner'

class ButtonContent extends React.PureComponent {
  render() {
    return (
      <div className='position-relative'>
        <span
          style={this.props.isFetching ? {opacity: 0} : {opacity: 1}}>
          {this.props.content}
        </span>
        {this.props.isFetching ? <LoadingButtonSpiner /> : null}
      </div>
    )
  }
}

export default ButtonContent