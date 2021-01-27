import React, { useState } from 'react'
import InputField from './inputField'
import JoinCard from './JoinCard'
import {useSelector} from 'react-redux'
import manblue from '../assets/manblue.png'

const JoinBox = () => {
  const [searchRoom, setSearchRoom] = useState('')
  const username = localStorage.username
  let rooms = useSelector(state => state.rooms.data)
  const targetRoom = rooms.filter(room => {
      return room.name.toLowerCase() === searchRoom.toLowerCase()
  })

  const handleSearch = (input) => {
      setSearchRoom(input)
  }
  return (
    <div  className="container bg-warning h-100 d-inline-block p-3"
    style={{
      borderRadius: '25px',
      border: '6px solid',
      minHeight: '35vh',
    }}
    >
      <>
      <div>
          <h3>JOIN ROOM</h3>
      </div>
      <InputField section="join" handleSubmit={handleSearch}></InputField>
      <div className="mt-2">
        <JoinCard rooms={targetRoom} username={username}></JoinCard>
        {/* <RoomCard username={username} rooms={targetRoom} ></RoomCard> */}
      </div>
      </>
    </div>
  )
}

export default JoinBox