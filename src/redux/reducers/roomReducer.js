const initialState = {
    data: [],
    detail: {}
}
const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SETROOM": 
            return {...state, data: action.payload}
        case "SETROOMDETAIL": 
            return {...state, detail: action.payload}
        default: 
            return state
    }
}

export default roomsReducer