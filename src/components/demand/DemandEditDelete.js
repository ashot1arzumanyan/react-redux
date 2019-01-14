import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import EditDelete from '../proposalDemandCommon/EditDelete'
import getDemandsByIdAction from '../../actions/getDemandsByIdAction'
import DemandItem from './DemandItem'
import deleteDemandAction from '../../actions/deleteDemandAction'
import LoadingButtonSpiner from '../LoadingButtonSpiner'

class DemandEditDelete extends Component {
  
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.props.getDemandsByIdAction()
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
        
    return (
      <Fragment>
        { this.props.demandsById.map((demand) =>
          <div
            className='position-relative Demand mb-5 mt-3'
            data-id={demand._id}
            key={demand._id}>
            <EditDelete 
              delete={this.handleDelete}
              edit={this.handleEdit}
            />
            <DemandItem
              demand={demand}
              common={this.props.common}        
            />
          </div>
        )}   
        {this.props.isFetching ? (
          <div className='position-relative mt-3'>
            <LoadingButtonSpiner />
          </div>
        ) : null}      
      </Fragment>
    )
  }
}

const mapstateToProps = (state) => {
  return {
    demandsById: state.demandsById.demandsById,
    isFetching: state.demandsById.isFetching,
    common: state.content.common
  }
}

export default connect(mapstateToProps, { getDemandsByIdAction, deleteDemandAction })(DemandEditDelete)