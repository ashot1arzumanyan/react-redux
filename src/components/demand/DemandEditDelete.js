import React, { Component } from 'react'
import { connect } from 'react-redux'

import EditDelete from '../proposalDemandCommon/EditDelete'
import getDemandsByIdAction from '../../actions/getDemandsByIdAction'
import DemandItem from './DemandItem'
import deleteDemandAction from '../../actions/deleteDemandAction'

class DemandEditDelete extends Component {
  
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    const _id = this.props.user._id
    this.props.getDemandsByIdAction(_id)
  }

  handleDelete(id) {
    const { history } = this.props
    this.props.deleteDemandAction(id, history)
  }

  handleEdit(id) {
    const { history, demandsById } = this.props
    const demand = demandsById.filter(d => d._id === id)
    history.push({
      pathname: '/editDemand',
      state: demand[0]
    })
  }

  render() {
    
    const { demandsById } = this.props
    
    return (
      <div className='col-6'>
        { demandsById.map((demand, i) =>
          <div
            className='position-relative Demand mb-5 mt-3'
            data-id={demand._id}
            key={i}>
            <EditDelete 
              delete={this.handleDelete}
              edit={this.handleEdit}
            />
            <DemandItem
              demand={demand}            
            />
          </div>
        )}         
      </div>
    )
  }
}

const mapstateToProps = (state) => {
  return {
    user: state.user,
    demandsById: state.demandsById.demandsById
  }
}

export default connect(mapstateToProps, { getDemandsByIdAction, deleteDemandAction })(DemandEditDelete)