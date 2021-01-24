const initialState = {
  data: [],
  detail: {},
  loading: true,
  start: false
}
const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
      case "SETROOM": 
          return {...state, data: action.payload}
      case "SETROOMDETAIL": 
          return {...state, detail: action.payload}
      case "SETSTART": 
          return {...state, start: true}
      case "SETLOADING":
          return {...state, loading: true}
      case "DONELOADING":
          return {...state, loading: false}
      default: 
          return state
  }
}

export default roomsReducer