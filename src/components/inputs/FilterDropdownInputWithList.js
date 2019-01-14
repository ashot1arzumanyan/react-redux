import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Input, ListGroup, ListGroupItem } from 'reactstrap'

class FilterDropdownInputWithList extends Component {
  render() {

    return (
      <Fragment>
        <Input 
          name='region' 
          type='text' 
          placeholder={common.region}
          onMouseOver={e => this.mouseOver(e)} 
          onFocus={e => this.focus(e.target)}
          onInput={e => this.handleInput(e.target)}
        />             
        <ListGroup style={{display: 'none'}} className='select'>
          {this.state.regions.map(region => 
            <ListGroupItem 
              key={region} 
              className="d-flex justify-content-between"
              data-en={region}
              onClick={e => this.clickOnRegion(e.target)}>
              {content.regions[region]}
              <Badges sumOfType={sumOf.region} referer={region} />
            </ListGroupItem>
          )}
        </ListGroup>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    common: state.content.common,
    cFF: state.content.Filter
  }
}

export default connect(mapStateToProps)(FilterDropdownInputWithList)