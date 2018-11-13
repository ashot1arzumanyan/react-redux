import React, { Component } from 'react'
import { connect } from 'react-redux'

import { startAddNewDemandAction, addNewDemandAction} from '../actions/addNewDemandAction'
import AddNewEditDemand from './AddNewEditDemand'

class AddNewDemand extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(demand) {
    const { startAddNewDemandAction, addNewDemandAction, history } = this.props
    startAddNewDemandAction()
    addNewDemandAction(demand, () => {
      history.push('/')
    })
  }
  
  render() {

    const { isFetchingAddNew } = this.props

    return (
      <AddNewEditDemand 
        editMode={false}
        submit={this.handleSubmit}
      />
    )
  }

}

const mapStateToProps = (state) => {
  return{
    isFetchingAddNew: state.demands.isFetchingAddNew,
    startAddNewDemandAction: state.startAddNewDemandAction,
    addNewDemandAction: state.addNewDemandAction
  }
}

export default connect(mapStateToProps, { startAddNewDemandAction, addNewDemandAction })(AddNewDemand)