import { combineReducers } from 'redux'

import content from './content'
import user from './user'
import userRegister from './userRegister'
import proposals from './proposals'
import demands from './demands'
import sumOf from './sumOf'
import filteredSumOfByRegion from './filteredSumOfByRegion'
import filteredSumOfByCity from './filteredSumOfByCity'
import filteredSumOfByType from './filteredSumOfByType'
import demandsById from './demandsById'
import proposalsById from './proposalsById'
import errors from './errors'
import isFetchings from './isFetchings'

import filterBy from './filterBy'

const reducers = combineReducers({
    content, 
    user, 
    userRegister,
    proposals, 
    demands, 
    sumOf,
    filteredSumOfByRegion,
    filteredSumOfByCity,
    filteredSumOfByType,
    filterBy,
    demandsById,
    proposalsById,
    errors,
    isFetchings
});

export default reducers