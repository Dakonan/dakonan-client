import React from 'react'
import InputField from './inputField'
import RoomCard from './RoomCard'
import {useSelector} from 'react-redux'

const RoomList = ({handleCreateRoom}) => {
  const username = useSelector(state => state.players.name)
  let rooms = useSelector(state => state.rooms.data)

  return (
    <div className="container  bg-dark h-100 d-inline-block p-3 text-white rounded">
        <div className="d-flex justify-content-center">
            <h3>Room List</h3>
        </div>
        <InputField section="create" handleSubmit={handleCreateRoom}></InputField>
        <div className="row d-flex align-items-center shadow-lg mt-5 mx-auto" style={{maxHeight: '30vw', overflow: 'auto'}}>
            <RoomCard username={username} rooms={rooms}></RoomCard>
        </div>
    </div>
  )
}

export default RoomList