import React, { useEffect } from 'react'
import InputField from './InputField'
import RoomCard from './RoomCard'
import {useDispatch, useSelector} from 'react-redux'
import { updatedRoom } from '../redux/actions'

const RoomList = ({handleCreateRoom}) => {
  const dispatch = useDispatch()
  const username = localStorage.username
  let rooms = useSelector(state => state.rooms.data)
  
  useEffect(() => {
    dispatch(updatedRoom())
  }, [rooms])

  return (
    <div className="container bg-dark h-100 d-inline-block p-3 text-white rounded">
      <div className="d-flex justify-content-center">
        <h3>Room List</h3>
      </div>
      <InputField rooms={rooms} section="create" handleSubmit={handleCreateRoom}></InputField>
      <div className="row d-flex align-items-center shadow-lg mt-5 mx-auto" style={{maxHeight: '30vw', overflow: 'auto'}}>
        <RoomCard username={username} rooms={rooms}></RoomCard>
      </div>
    </div>
  )
}

export default RoomList