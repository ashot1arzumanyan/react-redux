import React, { Component } from 'react'

import FullDate from '../FullDate'

class FooterProposalDemandItem extends Component {

  render() {

    const { comment, date } = this.props

    return (
      <div className='d-flex justify-content-between align-items-center'>
        <small>{comment}</small>
        <FullDate date={date} />
      </div>
    )
  }
}

export default FooterProposalDemandItem