import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory, useParams } from 'react-router-dom'
import { leaveRoom, surenderUser } from '../redux/actions/index'
import axios from 'axios'
import bluefire from '../assets/bluefire.gif'
import Swal from 'sweetalert2'
import winGif from '../assets/win.gif'
import loseGif from '../assets/lose.gif'

const FinishAnnouncement = ({message, handleRematch}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const roomDetail = useSelector(state => state.rooms.detail)
  const loginUser = localStorage.getItem('username')
  const {name} = useParams()

  useEffect(() => {
    if (roomDetail.gameState.message === 'Player 1 wins!') {
      if (loginUser === roomDetail.users[0]) {
        axios({
        url: `/win`,
        method: 'POST',
        headers: {
          username: roomDetail.users[0]
        }
      })
        .then((res) => {
          Swal.fire({
            title: 'Congrats!',
            text: `You win this game, ${loginUser}!`,
            imageUrl: winGif,
            imageWidth: 400,
            imageHeight: 250,
            imageAlt: 'Custom image',
          })
        })
        .catch((err) => {
          console.log(err, 'error post win')
        })
      } else if (loginUser === roomDetail.users[1]) {
        axios({
        url: `/lose`,
        method: 'POST',
        headers: {
          username: roomDetail.users[1]
        }
      })
        .then((res) => {
          Swal.fire({
            title: 'Ouch!',
            text: `You lose this game, come back stronger, ${loginUser}!`,
            imageUrl: loseGif,
            imageWidth: 400,
            imageHeight: 250,
            imageAlt: 'Custom image',
          })
        })
        .catch((err) => {
          console.log(err, 'error post lose')
        })
      }
    } else if (roomDetail.gameState.message === 'Player 2 wins!') {
      if (loginUser === roomDetail.users[1]) {
        axios({
        url: `/win`,
        method: 'POST',
        headers: {
          username: roomDetail.users[1]
        }
      })
        .then((res) => {
          Swal.fire({
            title: 'Congrats!',
            text: `You win this game, ${loginUser}!`,
            imageUrl: winGif,
            imageWidth: 400,
            imageHeight: 250,
            imageAlt: 'Custom image',
          })
        })
        .catch((err) => {
          console.log(err, 'error post win')
        })
      } else if (loginUser === roomDetail.users[0]) {
        axios({
        url: `/lose`,
        method: 'POST',
        headers: {
          username: roomDetail.users[0]
        }
      })
        .then((res) => {
          Swal.fire({
            title: 'Ouch!',
            text: `You lose this game, come back stronger, ${loginUser}!`,
            imageUrl: loseGif,
            imageWidth: 400,
            imageHeight: 250,
            imageAlt: 'Custom image',
          })
        })
        .catch((err) => {
          console.log(err, 'error post lose')
        })
      }
    }
  }, [loginUser, roomDetail.gameState.message, roomDetail.users])  
  const handlePlayerLeave = (roomName, username) => {
    dispatch(surenderUser(roomName, username))
    history.push('/room')
  }
  return (
    <div className="container text-white" 
      style={{
      top: '15vh',
      backgroundColor: '#900c3f',
      position: 'absolute',
      display: 'flex',
      height: '39vh',
      width: '49vw',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      flexDirection: 'column',
      border: '10px solid #581845',
      borderRadius: '25px'
      }}>
      <h1 style={{
        color: '#ffc300',
        webkitTextStroke: '3px #581845',
        zIndex: '3',
        fontWeight: '1000'
        }}>{message}</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        zIndex: '3'
      }}>
        <button onClick={handleRematch} style={{
          marginRight: '15px',
          backgroundColor: '#ff5733',
          border: '4px solid #c70039',
          borderRadius: '25px',
          height: '2.5em',
          width: '7.5em',
          zIndex: '3'
        }} >Rematch</button>
          <button 
          onClick={() => handlePlayerLeave(name, loginUser)}
          style={{
          marginRight: '15px',
          backgroundColor: '#c70079',
          border: '4px solid #581845',
          borderRadius: '25px',
          height: '2.5em',
          width: '10.5em',
          zIndex: '5'
        }}>Back to room</button>
      </div>
      <img src={bluefire} class="bluefire" alt="bluefire" />
    </div>
  );
}

export default FinishAnnouncement