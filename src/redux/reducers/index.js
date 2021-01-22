import {combineReducers} from 'redux'
import playersReducer from './playersReducer'
import roomsReducer from './roomReducer'

const allReducers = combineReducers({
    players: playersReducer,
    rooms: roomsReducer
}) 

export default allReducers