import React from 'react'
import moment from 'moment'

const FullDate = (props) => {
  const dateStr = moment(props.date).format('DD MMMM YYYY')
  return (
    <span className='FullDate'>
      { dateStr }
    </span>
  )
}


class FooterProposalDemandItem extends React.PureComponent {

  render() {

    const { comment, date, isReadMore, more } = this.props

    return (
      <div className='d-flex justify-content-between align-items-center position-relative'>
        <div className='Comment'>
          <span className='text-muted'>{comment}</span>
          {isReadMore ? (
          <button className='read_more'>{more}</button>
          ) : (null)}
        </div>
        <FullDate date={date} />
      </div>
    )
  }
}

export default FooterProposalDemandItem