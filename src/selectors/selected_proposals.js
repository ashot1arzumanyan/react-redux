import { createSelector } from 'reselect'

const proposalsSelector = (state) => state.proposals.proposals
const filteredSelector = (state) => state.filterBy

const getProposals = (proposals, filterBy) => {
    const selectedProposals = proposals.filter(
        proposal => filterBy.region ? proposal.region === filterBy.region : true 
    ).filter(
        proposal => filterBy.city ? proposal.city === filterBy.city : true
    ).filter(
        proposal => filterBy.type ? proposal.type === filterBy.type : true
    ).filter(
        proposal => filterBy.subType ? proposal.subType === filterBy.subType : true
    )

    return selectedProposals;
}

export default createSelector(
    proposalsSelector,
    filteredSelector,
    getProposals
)