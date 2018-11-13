import { combineReducers } from 'redux'

import content from './content'
import user from './user'
import userRegister from './userRegister'
import proposals from './proposals'
import demands from './demands'
import sumOf from './sumOf'
import demandsById from './demandsById'
import proposalsById from './proposalsById'

import filterBy from './filterBy'

const reducers = combineReducers({
    content, 
    user, 
    userRegister,
    proposals, 
    demands, 
    sumOf,
    filterBy,
    demandsById,
    proposalsById
});

export default reducers