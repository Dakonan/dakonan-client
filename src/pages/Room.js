import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRoom, updateRoom } from '../redux/actions'
import { RoomList, JoinBox, NavbarTop, PageWrapper } from '../components'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { updatedRoom } from '../redux/actions'
// import dakonan from '../assets/dakonan.png'
import stars from '../assets/stars.gif'

const Room = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const username = localStorage.username
  let rooms = useSelector(state => state.rooms.data)
  
  useEffect(() => {
    dispatch(updatedRoom())
  }, [rooms, dispatch])

  useEffect(() => {
      dispatch(updateRoom())
  },[dispatch])

  useEffect(() => {
    let isLoggedIn = localStorage.access_token
    if(!isLoggedIn) {
      history.push('/')
    }
  }, [history])

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
    <PageWrapper key="room">
      <section style={{
        backgroundColor: '#118ab2',
        padding: '0px 20px',
        backgroundImage: `url(${stars})`,
        backgroundSize: '50%',
        backgroundRepeat: 'repeat',
        display: 'flex', justifyContent: 'space-between'
      }}>
      <NavbarTop username={username}></NavbarTop>
      <div className="col-12">
        <div className="row room-body justify-content-center">
          <div className="row col-10 justify-content-center">
            <div className="col-12">
            </div>
              <div className='col-lg-5 col-sm-12'>
                <JoinBox></JoinBox>
              </div>
            <div className="col-lg-7 col-sm-12">
              <RoomList rooms={rooms} handleCreateRoom={handleCreateRoom}></RoomList>
          </div>
        </div>
        </div>
      </div>
      </section>
    </PageWrapper>
  )
}
export default Room