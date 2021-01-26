import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { leaveRoom, readyToPlay } from '../redux/actions'

const WaitingRoom = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {name} = useParams()
  const [ready, setReady] = useState(false)
  const username = localStorage.username
  const roomDetail = useSelector(state => state.rooms.detail)

  const handleReady = (roomName) => {
    setReady(true)
    dispatch(readyToPlay(roomName))
  }

  const handlePlayerLeave = (roomName, username) => {
    dispatch(leaveRoom(roomName, username))
    history.push('/room')
  }
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center bg-warning text-light h-50 w-50">
      {
        !ready ?
        <>
        <h1>REAADDYYY????</h1>
        {
          roomDetail.name ? 
          <p>{`${roomDetail.users.length}/2`}</p>
          :
          ""
        }
        <div className="container d-flex justify-content-center">
          <button onClick={() => handleReady(name)} className="btn- btn-dark mr-3 w-25">GO</button>
          <button onClick={() => handlePlayerLeave(name, username)} className="btn- btn-danger w-25">Leave Room</button>
        </div>
        </>
        :
        <>
        <h1>WAITING FOR OTHER PLAYER</h1>
        <button onClick={() => handlePlayerLeave(name, username)} className="btn- btn-danger w-25">Leave Room</button>
        </>
      }
      {/* <p>{JSON.stringify(roomDetail)}</p> */}
    </div>
  )
}

export default WaitingRoom