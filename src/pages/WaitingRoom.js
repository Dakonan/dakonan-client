import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { leaveRoom, readyToPlay } from '../redux/actions'
import stars from '../assets/stars.gif'
import loadingnew from '../assets/loadingnew.gif'

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
    
    <section style={{
      backgroundColor: 'purple',
      padding: '0px 20px',
      backgroundImage: `url(${stars})`,
      backgroundSize: '50%',
      backgroundRepeat: 'repeat',
      display: 'flex', justifyContent: 'center'
    }}>
    
    <div className=" row container d-flex flex-column justify-content-center align-items-center bg-warning text-light" 
    style={{
      borderRadius: '25px',
      border: '8px solid black',
      height: '30vh',
      width: '70vh',
      zIndex: '1'
    }}>
      {
        !ready ?
        <>
        <h1 style={{color: 'black'}}><strong>REAADDYYY????</strong></h1>
        {
          roomDetail.name ? 
          <p style={{color: 'black'}}>{`${roomDetail.users.length}/2`}</p>
          :
          ""
        }
        <div className="container d-flex justify-content-center">
          <button onClick={() => handleReady(name)} className="btn- btn-dark mr-3 w-25" style={{
            border: '5px solid black',
            borderRadius: '25px'
            }}>GO</button>
          <button onClick={() => handlePlayerLeave(name, username)} className="btn- btn-danger w-25" style={{
            border: '5px solid black',
            borderRadius: '25px'
            }}>Leave Room</button>
        </div>
        </>
        :
        <>
        <div className='row justify-content-center'>
        <h1 className='col-12' style={{color: 'black'}}><strong>WAITING FOR OTHER PLAYER</strong></h1>
        <div className='col-12'>
          <img src={loadingnew} className="loadingnew" style={{
            maxHeight: '100px',
            marginTop: '-3vh',
            marginBottom: '-2vh'
          }}/>
        </div>
        <button onClick={() => handlePlayerLeave(name, username)} className="btn- btn-danger w-25" style={{
          border: '5px solid black',
          borderRadius: '25px'
        }}>Leave Room</button>
        </div>
        </>
      }
      {/* <p>{JSON.stringify(roomDetail)}</p> */}
    </div>
      {/* <img src={manhead} class="manhead" /> */}
    </section>
    
  )
}

export default WaitingRoom