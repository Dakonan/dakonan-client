import React, { useState } from 'react'
import InputField from './inputField'
import RoomCard from './RoomCard'
import {useSelector} from 'react-redux'

const JoinBox = () => {
    const [searchRoom, setSearchRoom] = useState('')
    const username = useSelector(state => state.players.name)
    let rooms = useSelector(state => state.rooms.data)
    const targetRoom = rooms.filter(room => {
        return room.name.toLowerCase() === searchRoom.toLowerCase()
    })

    const handleSearch = (input) => {
        setSearchRoom(input)
    }
    return (
        <>
        <div>
        <h1>JOIN ROOM</h1>
        </div>
        <InputField section="join" handleSubmit={handleSearch}></InputField>
        <RoomCard username={username} rooms={targetRoom} ></RoomCard>
        </>
    )
}

export default JoinBox