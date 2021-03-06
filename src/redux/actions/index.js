import io from 'socket.io-client'
import axios from 'axios'
import Swal from 'sweetalert2'
import rootServer from '../../config'

const socket = io(rootServer)

export const register = (payload) => (dispatch) => {
  axios({
    url: `/register`,
    method: 'POST',
    data: payload
  })
    .then(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Register Success',
        showConfirmButton: false,
        timer: 1000
      })
      dispatch(setPlayer(payload))
    })
    .catch(err => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: err.response.data.message,
        showConfirmButton: false,
        timer: 1000
      })
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
    dispatch(doneLoading)
  })
}

export const readyToPlay = (roomName) => (dispatch) => {
  socket.emit('readyToPlay', roomName)
  dispatch(updateGameDetail())
}
export const readyToRematch = (state, roomName) => (dispatch) => {
  socket.emit('readyToRematch', state, roomName)
  dispatch(updateGameDetail())
}

export const leaveRoom = (roomName, username) => (dispatch) => {
  socket.emit('leaveRoom', roomName, username)
  dispatch(getRoomDetail())
}

export const surenderUser = (roomName, username) => (dispatch) => {
  socket.emit('leave-room')
}