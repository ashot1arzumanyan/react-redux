import React from 'react'

class LoadingButtonSpiner extends React.PureComponent {
  render() {
    return (
      <div className="lds-css ng-scope">
          <div style={{width: '100%', height: '100%'}} className="lds-flickr">
            <div></div>
            <div></div>
            <div></div>
          </div>
      </div>
    )
  }
} 

export default LoadingButtonSpiner