import React, { PureComponent } from 'react'

import VerticalDivider from '../proposalDemandCommon/VerticalDivider'


const getText = (props) => {
  const { content, continuousType, frequencyNum, } = props
  const lang = localStorage.lang;
  if (frequencyNum === '1') {
    if (lang === 'ru') {
      if (continuousType === 'week') {
        return 'Каждую неделю'
      } else {
        return `Каждый ${content}`
      }
    } else if (lang === 'en') {
      return `Every ${content}`
    } else {
      return `Ամեն ${content}`;
    }
  } else {
    if (lang === 'ru') {
      if (continuousType === 'day') {
        return `Каждые ${frequencyNum} дня`
      } else if (continuousType === 'week') {
        return `Каждые ${frequencyNum} недели`
      } else {
        return `Каждые ${frequencyNum} месяца`
      }
    } else if (lang === 'en') {
      return `Every ${frequencyNum} ${content}s`
    } else {
      return `Ամեն ${frequencyNum} ${content}ը մեկ`;
    }
  }
}
const Small = (props) => {
  return<small>{ getText(props) }</small>
}

class PlanToHaveContinuous extends PureComponent {

  render() {

    const { plan_to_have_quantity, plan_to_have_price, continuousType, frequencyNum, common } = this.props

    return (
      <React.Fragment>
        <VerticalDivider />

        <div className='d-flex flex-column justify-content-between align-items-center'>
          <div className='d-flex'>
            <div className='d-flex flex-column justify-content-between align-items-center'>
              <small>{plan_to_have_quantity}</small>
              <small className='text-muted'>{common.quantity}</small>
            </div>
            <VerticalDivider className='mx-3'/>
            <div className='d-flex flex-column justify-content-between align-items-center'>
              <small>{plan_to_have_price}</small>
              <small className='text-muted'>{common.price}</small>
            </div>
            <VerticalDivider className='mx-3'/>
            <div className='d-flex flex-column justify-content-between align-items-center'>
              <Small
                continuousType={continuousType}
                frequencyNum={frequencyNum}
                content={common[continuousType].toLowerCase()}
              />
              <small className='text-muted'>{ common.frequency }</small>
            </div>
          </div>
          <small className='text-muted'>{common.plan_to_have}</small>
        </div>
      </React.Fragment>
    )
  }
}

export default PlanToHaveContinuous