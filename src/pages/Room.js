import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createRoom, updateRoom } from '../redux/actions'
import RoomList from '../components/RoomList'
import JoinBox from '../components/JoinBox'
import { useHistory } from 'react-router-dom'
import NavbarTop from '../components/Navbar'
import Swal from 'sweetalert2'
import { updatedRoom } from '../redux/actions'
import dakonan from '../assets/dakonan.png'
import stars from '../assets/stars.gif'

const Room = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const username = localStorage.username
  let rooms = useSelector(state => state.rooms.data)
  
  useEffect(() => {
    console.log(rooms, 'di room page')
    dispatch(updatedRoom())
  }, [rooms])

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
    let isAlreadyUsed
    isAlreadyUsed = rooms.findIndex(room => {
      return room.name === roomName
    })
    if(isAlreadyUsed === -1 || !roomName) {
      let payload = {
        roomName,
        username
      }
      dispatch(createRoom(payload))
      history.push(`/game/${roomName}`)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Room Name Already Used'
      })
    }

  }
    
  return (
    <>
      <section style={{
        backgroundColor: 'blue',
        padding: '0px 20px',
        backgroundImage: `url(${stars})`,
        backgroundSize: '50%',
        backgroundRepeat: 'repeat',
        display: 'flex', justifyContent: 'space-between'
      }}>
      
      <NavbarTop username={username}></NavbarTop>
      

      <div className="col-12">
        <div className="row room-body justify-content-center"
        style={{
          // backgroundColor: 'red',
        }}
        >
          {/* <div className='col-1' style={{backgroundColor: 'red'}}></div> */}
          <div className="row col-10 justify-content-center">
            <div className="col-12">
              {/* <img src={dakonan} class="dakonan" style={{
                maxWidth: '180px',
                paddingBottom: '20px',
                // paddingTop: '20px',
                filter: 'drop-shadow(2px 2px 0 black) drop-shadow(-2px 2px 0 black)'
              }}/> */}
            </div>
              <div className='col-lg-5 col-sm-12'>
                <JoinBox></JoinBox>
              </div>
            <div className="col-lg-7 col-sm-12">
              <RoomList rooms={rooms} handleCreateRoom={handleCreateRoom}></RoomList>
          </div>
        </div>
        {/* <div className='col-1' style={{backgroundColor: 'red'}}></div> */}
        </div>
      </div>
      </section>
    </>
  )
}
export default Room