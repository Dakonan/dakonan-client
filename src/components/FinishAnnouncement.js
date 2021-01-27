import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import bluefire from '../assets/bluefire.gif'
const FinishAnnouncement = ({message, handleRematch}) => {
  const roomDetail = useSelector(state => state.rooms.detail)
  useEffect(() => {
    console.log(roomDetail)
    if (roomDetail.gameState.message === 'Player 1 wins!') {
      axios({
      url: `/win`,
      method: 'POST',
      headers: {
        username: roomDetail.users[0]
      }
    })
      .then(res => {
        return axios({
          url: `/lose`,
          method: 'POST',
          headers: {
            username: roomDetail.users[1]
          }
    })
      .then((res) => {
        console.log(res)
    })
      })
      .catch(err => {
        console.log(err, 'error di post win')
      })
    } else {
      axios({
      url: `/win`,
      method: 'POST',
      headers: {
        username: roomDetail.users[1]
      }
    })
      .then(res => {
        return axios({
          url: `/lose`,
          method: 'POST',
          headers: {
            username: roomDetail.users[0]
          }
    })
      .then((res) => {
        console.log(res)
    })
      })
      .catch(err => {
        console.log(err, 'error di post win')
      })
    }
  }, [])
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
        <Link to="/room">
          <button style={{
          marginRight: '15px',
          backgroundColor: '#c70079',
          border: '4px solid #581845',
          borderRadius: '25px',
          height: '2.5em',
          width: '10.5em',
          zIndex: '5'
        }}>Back to room</button>
        </Link>
      </div>
      <img src={bluefire} class="bluefire" />
    </div>
  );
}

export default FinishAnnouncement