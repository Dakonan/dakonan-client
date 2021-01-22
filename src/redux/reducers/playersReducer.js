const initialState = {
    allPlayers: [],
    name: ''
}

const playersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SETPLAYER":
            return {...state, allPlayers: action.payload}
        case "INSERTPLAYERNAME":
            return {...state, name: action.payload}
        default:
            return state
    }
}

export default playersReducer