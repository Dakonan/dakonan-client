import io from 'socket.io-client'
import axios from 'axios'
const socket = io('http://localhost:4000')

export const register = (payload) => (dispatch) => {
  // console.log(payload, 'dari register<<<<<')
  axios({
    url: `/register`,
    method: 'POST',
    data: payload
  })
    .then(res => {
      console.log(res, 'berhasil post!')
      dispatch(setPlayer(payload))
    })
    .catch(err => {
      console.log(err)
    })

}

export const getLeaderBoard = () => (dispatch) => {
  axios({
      url: `/leaderboard`,
      method: 'GET',
    })
      .then(res => {
        // console.log(res.data, 'ini dari leaderboard')
        dispatch(setLeaderBoard(res.data))
      })
      .catch(err => {
        console.log(err, 'error di leaderboard')
      })
}

export const setLeaderBoard = (payload) => {
  return {
    type: 'GETLEADERBOARD',
    payload
  }
}

export const setPlayer = (payload) => {
  return {
      type: 'SETPLAYER',
      payload
  }
}
export const getPlayer = () => () => {

}

export const insertPlayerName = (payload) => {
  return {
      type: 'INSERTPLAYERNAME',
      payload
  }
}

export const createPlayer = (payload) => (dispatch) => {
  socket.emit("playerRegistration", payload)
  dispatch(insertPlayerName(payload.username))   
}

export const setRooms = (payload ) => {
  return {
      type: 'SETROOM',
      payload
  }
}

export const setLoading = () => {
  return {
      type:  'SETLOADING'
  }
}

export const doneLoading = () => {
  return {
      type: 'DONELOADING'
  }
}
export const updateRoom = () => (dispatch) => {
  socket.emit('updateRoom', 'test')
  dispatch(updatedRoom())
}
export const updatedRoom = () => (dispatch) => {
  socket.on('sendUpdateRoom', payload => {
      dispatch(setRooms(payload))
  })
}

export const getRooms = () => (dispatch) => {
  socket.on('updatedRoom', payload => {
      dispatch(setRooms(payload))
  })
}

export const createRoom = (payload) => (dispatch) => {
  socket.emit('createRoom', payload)
  dispatch(getRooms())
  dispatch(joinRoom(payload))
  
}

export const joinRoom = (payload) => (dispatch) => {
  socket.emit('joinRoom', payload)
  dispatch(getRoomDetail())
}

export const getRoomDetail = () => (dispatch) => {
  socket.on('roomDetail', payload => {
      dispatch(setRoomDetail(payload))
  })
}
export const setRoomDetail = (payload) => {
  return {
      type: 'SETROOMDETAIL',
      payload
  }
}

export const setStart = () => {
  return {
      type: 'SETSTART'
  }
}

export const emitStartGame = (roomName) => (dispatch) => {
  socket.emit('startGame', roomName)
  dispatch(startGameAnnounce())
}

export const startGameAnnounce = () => (dispatch) => {
  socket.on('start-Game', (roomName) => {
      dispatch(setStart())
  })
}

export const gameStart = (state, roomName) => (dispatch) => {
  socket.emit('gameStart', state, roomName)
  dispatch(setLoading())
  dispatch(updateGameDetail())
}

export const updateGameDetail = () => (dispatch) => {
  socket.on('gameDetail', payload => {
      dispatch(setRoomDetail(payload))
      // console.log(payload, 'payload dari game detail')
      dispatch(doneLoading)
  })
}