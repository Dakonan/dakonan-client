import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createRoom, updateRoom } from '../redux/actions'
import RoomList from '../components/RoomList'
import JoinBox from '../components/JoinBox'
import { useHistory } from 'react-router-dom'
import NavbarTop from '../components/Navbar'
const Room = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const username = localStorage.username
  useEffect(() => {
      dispatch(updateRoom())
  },[dispatch])

  useEffect(() => {
    let isLoggedIn = localStorage.access_token
    if(!isLoggedIn) {
      history.push('/')
    }
  }, [])

  const handleCreateRoom = (roomName) => {
    let payload = {
      roomName,
      username
    }
    dispatch(createRoom(payload))
    history.push(`/game/${roomName}`)
  }

  return (
    <>
    <NavbarTop username={username}></NavbarTop>
    <div className="container">
      <div className="container room-body">
        <div className="row">
          <div className='col-lg-5 col-sm-12'>
            <JoinBox></JoinBox>
          </div>
          <div className="col-lg-7 col-sm-12">
            <RoomList handleCreateRoom={handleCreateRoom}></RoomList>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}
export default Room