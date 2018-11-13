import React, { Component } from 'react'
import { connect } from 'react-redux'

import { startEditDemandAction, editDemandAction} from '../actions/editDemandAction'
import AddNewEditDemand from './AddNewEditDemand'

class EditDemand extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(demand) {
    const { startEditDemandAction, editDemandAction, history } = this.props
    startEditDemandAction()
    editDemandAction(demand, () => {
      history.push('/')
    })
  }
  
  render() {

    // const { isFetchingAddNew } = this.props

    return (
      <AddNewEditDemand 
        editMode={true}
        // isFetching={isFetchingAddNew}
        demand={this.props.location.state}
        submit={this.handleSubmit}
      />
    )
  }

}

const mapStateToProps = (state) => {
  return{
    startEditDemandAction: state.startEditDemandAction,
    editDemandAction: state.editDemandAction
  }
}

export default connect(mapStateToProps, { startEditDemandAction, editDemandAction })(EditDemand)