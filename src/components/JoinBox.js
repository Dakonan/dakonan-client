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
    <div  className="container bg-warning h-100 d-inline-block p-3 rounded">
      <div>
          <h3>JOIN ROOM</h3>
      </div>
      <InputField section="join" handleSubmit={handleSearch}></InputField>
      <div className="mt-5">
        <RoomCard username={username} rooms={targetRoom} ></RoomCard>
      </div>
    </div>
  )
}

export default JoinBox