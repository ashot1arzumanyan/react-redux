import { createSelector } from 'reselect'

const demandsSelector = (state) => state.demands.demands
const filteredSelector = (state) => state.filterBy

const getDemands = (demands, filterBy) => {
    const selectedDemands = demands.filter(
        demand => filterBy.region ? demand.region === filterBy.region : true 
    ).filter(
        demand => filterBy.city ? demand.city === filterBy.city : true
    ).filter(
        demand => filterBy.type ? demand.type === filterBy.type : true
    ).filter(
        demand => filterBy.subType ? demand.subType === filterBy.subType : true
    )

    return selectedDemands;
}

export default createSelector(
    demandsSelector,
    filteredSelector,
    getDemands
)