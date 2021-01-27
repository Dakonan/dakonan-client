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
    <div  className="container h-100 d-inline-block p-3"
    style={{
      backgroundColor: '#ffc107',
      borderRadius: '25px',
      border: '8px solid #073b4c',
      minHeight: '35vh',
    }}
    >
      <>
      <div>
          <h3 style={{ color: '#073b4c'}}><strong>JOIN ROOM</strong></h3>
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