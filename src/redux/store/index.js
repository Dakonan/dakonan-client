import {createStore} from 'redux'
import playersReducer from '../reducers'

const store = createStore(playersReducer)

export default store