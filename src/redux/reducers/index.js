const initialState = {
    players: []
}

const playersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SETPLAYER":
            return {...state, data: action.payload}
        default:
            return state
    }
}

export default playersReducer