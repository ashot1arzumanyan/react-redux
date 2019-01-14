import * as types from './constant-types'
import selected_proposals from '../selectors/selected_proposals'
import selected_demands from '../selectors/selected_demands'

export const regionFiltersSumOfAction = () => {
    return (dispatch, getState) => {
        const list = new List(selected_proposals(getState()), selected_demands(getState()));
        dispatch({
            type: types.REGION_FILTERS_SUM_OF,
            payload: list.regionFilterSumOf()
        })
    }
}

export const cityFiltersSumOfAction = () => {
    return (dispatch, getState) => {
        const list = new List(selected_proposals(getState()), selected_demands(getState()));
        dispatch({
            type: types.CITY_FILTERS_SUM_OF,
            payload: list.cityFiltersSumOf()
        })
    }
}

export const typeFiltersSumOfAction = () => {
    return (dispatch, getState) => {
        const list = new List(selected_proposals(getState()), selected_demands(getState()));
        dispatch({
            type: types.TYPE_FILTERS_SUM_OF,
            payload: list.typeFiltersSumOf()
        })
    }
}

function List(proposals, demands) {
    this.filteredProposals = proposals;
    this.filteredDemands = demands;
}

List.prototype.regionFilterSumOf = function() {
    return {
        proposals: this.proposalsCityTypeSubType(),
        demands: this.demandsCityTypeSubType() 
    }     
}

List.prototype.cityFiltersSumOf = function() {
    return {
        proposals: this.proposalsTypeSubType(),
        demands: this.demandsTypeSubType() 
    }     
}

List.prototype.typeFiltersSumOf = function() {
    return {
        proposals: this.proposalsSubType(),
        demands: this.demandsSubType() 
    }     
}

List.prototype.proposalsCityTypeSubType = function() {
    const sumOfCity = {};
    const sumOfType = {};
    const sumOfSubType = {};
    for (let i = 0, l = this.filteredProposals.length; i < l; i++) {
        if (this.filteredProposals[i].city in sumOfCity) {
            sumOfCity[this.filteredProposals[i].city] += 1
        } else {
            sumOfCity[this.filteredProposals[i].city] = 1
        }
        if (this.filteredProposals[i].type in sumOfType) {
            sumOfType[this.filteredProposals[i].type] += 1
        } else {
            sumOfType[this.filteredProposals[i].type] = 1
        }
        if (this.filteredProposals[i].subType in sumOfSubType) {
            sumOfSubType[this.filteredProposals[i].subType] += 1
        } else {
            sumOfSubType[this.filteredProposals[i].subType] = 1
        }
    }
    return {
        sumOfCity: sumOfCity,
        sumOfType: sumOfType,
        sumOfSubType: sumOfSubType
    }
} 

List.prototype.demandsCityTypeSubType = function() {
    const sumOfCity = {};
    const sumOfType = {};
    const sumOfSubType = {};
    for (let i = 0, l = this.filteredDemands.length; i < l; i++) {
        if (this.filteredDemands[i].city in sumOfCity) {
            sumOfCity[this.filteredDemands[i].city] += 1
        } else {
            sumOfCity[this.filteredDemands[i].city] = 1
        }
        if (this.filteredDemands[i].type in sumOfType) {
            sumOfType[this.filteredDemands[i].type] += 1
        } else {
            sumOfType[this.filteredDemands[i].type] = 1
        }
        if (this.filteredDemands[i].subType in sumOfSubType) {
            sumOfSubType[this.filteredDemands[i].subType] += 1
        } else {
            sumOfSubType[this.filteredDemands[i].subType] = 1
        }
    }
    return {
        sumOfCity: sumOfCity,
        sumOfType: sumOfType,
        sumOfSubType: sumOfSubType
    }
} 

List.prototype.proposalsTypeSubType = function() {
    const sumOfType = {};
    const sumOfSubType = {};
    for (let i = 0, l = this.filteredProposals.length; i < l; i++) {
        if (this.filteredProposals[i].type in sumOfType) {
            sumOfType[this.filteredProposals[i].type] += 1
        } else {
            sumOfType[this.filteredProposals[i].type] = 1
        }
        if (this.filteredProposals[i].subType in sumOfSubType) {
            sumOfSubType[this.filteredProposals[i].subType] += 1
        } else {
            sumOfSubType[this.filteredProposals[i].subType] = 1
        }
    }
    return {
        sumOfType: sumOfType,
        sumOfSubType: sumOfSubType
    }
} 

List.prototype.demandsTypeSubType = function() {
    const sumOfType = {};
    const sumOfSubType = {};
    for (let i = 0, l = this.filteredDemands.length; i < l; i++) {
        if (this.filteredDemands[i].type in sumOfType) {
            sumOfType[this.filteredDemands[i].type] += 1
        } else {
            sumOfType[this.filteredDemands[i].type] = 1
        }
        if (this.filteredDemands[i].subType in sumOfSubType) {
            sumOfSubType[this.filteredDemands[i].subType] += 1
        } else {
            sumOfSubType[this.filteredDemands[i].subType] = 1
        }
    }
    return {
        sumOfType: sumOfType,
        sumOfSubType: sumOfSubType
    }
} 

List.prototype.proposalsSubType = function() {
    const sumOfSubType = {};
    for (let i = 0, l = this.filteredProposals.length; i < l; i++) {
        if (this.filteredProposals[i].subType in sumOfSubType) {
            sumOfSubType[this.filteredProposals[i].subType] += 1
        } else {
            sumOfSubType[this.filteredProposals[i].subType] = 1
        }
    }
    return {
        sumOfSubType: sumOfSubType
    }
} 

List.prototype.demandsSubType = function() {
    const sumOfSubType = {};
    for (let i = 0, l = this.filteredDemands.length; i < l; i++) {
        if (this.filteredDemands[i].subType in sumOfSubType) {
            sumOfSubType[this.filteredDemands[i].subType] += 1
        } else {
            sumOfSubType[this.filteredDemands[i].subType] = 1
        }
    }
    return {
        sumOfSubType: sumOfSubType
    }
}