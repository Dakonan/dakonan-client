import React from 'react'
import InputField from './inputField'
import RoomCard from './RoomCard'
import {useSelector} from 'react-redux'

const RoomList = ({handleCreateRoom}) => {
    const username = useSelector(state => state.players.name)
    let rooms = useSelector(state => state.rooms.data)

    return (
        <>
        <div className="d-flex justify-content-center">
            <h1>Room List</h1>
        </div>
        <InputField section="create" handleSubmit={handleCreateRoom}></InputField>
        <div className="row d-flex align-items-center shadow-lg mt-5 mx-auto">
            <RoomCard username={username} rooms={rooms}></RoomCard>
        </div>
        </>
    )
}

export default RoomList