import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import RoomCard from '../components/RoomCard'
import { createRoom, updateRoom } from '../redux/actions'

import io from 'socket.io-client'
const socket = io('http://localhost:4000')

const Room = () => {
    const dispatch = useDispatch()
    const [newRoomName, setNewRoomName] = useState('')
    const username = useSelector(state => state.players.name)
    let rooms = useSelector(state => state.rooms.data)
    
    useEffect(() => {
        dispatch(updateRoom())
    },[dispatch])
    
    const handleChangeRoomName = (e) => {
        const roomName = e.target.value
        setNewRoomName(roomName)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            roomName: newRoomName,
            admin: username
        }
        dispatch(createRoom(payload))
    }

    return (
        <div className="container">
            <h4>{`hi ${username}`}</h4>
            <div className="container d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChangeRoomName} type="text" />
                    <button type="submit" className="btn-primary">Create Room</button>
                </form>
            </div>
            <div className="container room-body">
                    <h1>Room List</h1>
                <div className="row d-flex align-items-center shadow-lg mt-5 mx-auto">
                    <RoomCard username={username} rooms={rooms}></RoomCard>
                </div>
            </div>
        </div>
    )
}
export default Room