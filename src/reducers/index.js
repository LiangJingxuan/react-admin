import { combineReducers } from 'redux'
// import { combineReducers } from 'redux-immutable' // immutable练习
import notifications from './notifications'
import user from './user'
import immu from './immutabletest'

export default combineReducers({
    notifications,
    user,
    immu
})