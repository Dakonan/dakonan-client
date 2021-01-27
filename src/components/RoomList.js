import React, { useEffect } from 'react'
import InputField from './inputField'
import RoomCard from './RoomCard'
import {useDispatch, useSelector} from 'react-redux'
import { updatedRoom } from '../redux/actions'

const RoomList = ({handleCreateRoom, rooms}) => {
  const dispatch = useDispatch()
  const username = localStorage.username
  // let rooms = useSelector(state => state.rooms.data)
  
  useEffect(() => {
    dispatch(updatedRoom())
  }, [rooms])
  

  return (
    <div className="container bg-dark h-100 d-inline-block p-3 text-white" 
    style={{
      borderRadius: '25px',
      border: '6px solid'
    }}>
        <div className="d-flex justify-content-center">
            <h3>ROOM LIST</h3>
        </div>
        <InputField rooms={rooms} section="create" handleSubmit={handleCreateRoom}></InputField>
        <div className="row d-flex align-items-center shadow-lg mt-5 mx-auto" style={{maxHeight: '30vw', overflow: 'auto'}}>
            <RoomCard username={username} rooms={rooms}></RoomCard>
        </div>
    </div>
  )
}

export default RoomList