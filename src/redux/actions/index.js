import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'
const socket = io('http://localhost:4000')

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
    // console.log(data, 'di get room')
}

export const createRoom = (payload) => (dispatch) => {
    socket.emit('createRoom', payload)
    dispatch(getRooms())
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