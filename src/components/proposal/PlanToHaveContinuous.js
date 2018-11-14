import React, { Component } from 'react'
import { connect } from 'react-redux'

import VerticalDivider from '../proposalDemandCommon/VerticalDivider'

class PlanToHaveContinuous extends Component {
  render() {
    const { common, plan_to_have_quantity, plan_to_have_price, continuousType, frequencyNum, } = this.props
    const ct = common[continuousType].toLowerCase();
    const lang = localStorage.lang;
    const Small = () => {
      const getText = () => {
        if (frequencyNum === '1') {
          if (lang === 'ru') {
            if (continuousType === 'week') {
              return 'Каждую неделю'
            } else {
              return `Каждый ${ct}`
            }
          } else if (lang === 'en') {
            return `Every ${ct}`
          } else {
            return `Ամեն ${ct}`;
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
            return `Every ${frequencyNum} ${ct}s`
          } else {
            return `Ամեն ${frequencyNum} ${ct}ը մեկ`;
          }
        }
      }

      const text = getText()

      return<small>{ text }</small>
    }

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
              <Small></Small>
              <small className='text-muted'>{ common.frequency }</small>
            </div>
          </div>
          <small className='text-muted'>Planavorum em unenal</small>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    common : state.content.common,
  }
}

export default connect(mapStateToProps)(PlanToHaveContinuous)