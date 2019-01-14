import React, { PureComponent } from 'react'

import QuantityMiddleDemandItem from './QuantityMiddleDemandItem'

class ContinuousMiddleDeamndItem extends PureComponent {
  render() {

    const { common, continuousType, frequencyNum, quantity } = this.props
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
      <div className='d-flex flex-column justify-content-between align-items-center'>

        <div className='d-flex flex-column justify-content-between align-items-center'>
          <div className='d-flex'>
            <QuantityMiddleDemandItem 
              quantity={quantity}
              content={common.quantity}
            />
            <div className='d-flex align-items-center position-relative' style={{minHeight: '100%'}}>
              <small className='text-muted position-absolute' style={{top: '100%', left: '-100%' }}>{ common.continuous }</small>

              <div className='vertical_divider mx-3'></div>
            </div>
            <div className='d-flex flex-column justify-content-between align-items-center'>
              <Small></Small>
              <small className='text-muted'>{ common.frequency }</small>
            </div>
          </div>
          {/* <small className='text-muted'>{ common.continuous }</small> */}
        </div>

      </div>
    )

  }
}

export default ContinuousMiddleDeamndItem