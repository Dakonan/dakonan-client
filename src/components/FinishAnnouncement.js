import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'

const FinishAnnouncement = ({message, handleRematch}) => {
  const roomDetail = useSelector(state => state.rooms.detail)
  const loginUser = localStorage.getItem('username')
  useEffect(() => {
    console.log(roomDetail)

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
          Swal.fire(
            `Good Job, ${loginUser}`,
            'Congrats You Win This Game',
            'success'
          )
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
            icon: 'error',
            title: `Oops, you lose, ${loginUser}`,
            text: 'Try hard next time',
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
          Swal.fire(
            `Good Job, ${loginUser}`,
            'Congrats You Win This Game',
            'success'
          )
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
            icon: 'error',
            title: `Oops, you lose, ${loginUser}`,
            text: 'Try hard next time',
          })
        })
        .catch((err) => {
          console.log(err, 'error post lose')
        })
      }
    }
  }, [])
  return (
    <div className="container rounded bg-dark text-white" 
      style={{
      top: '8vh',
      position: 'absolute',
      display: 'flex',
      height: '60vh',
      width: '60vw',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      flexDirection: 'column'
      }}>
      <h1>{message}</h1>
      <button onClick={handleRematch} >Rematch</button>
      <Link to="/room">
        <button>Back to room</button>
      </Link>
    </div>
  );
}

export default FinishAnnouncement


    // if (roomDetail.gameState.message === 'Player 1 wins!') {
    //   axios({
    //   url: `/win`,
    //   method: 'POST',
    //   headers: {
    //     username: roomDetail.users[0]
    //   }
    // })
    //   .then(res => {
    //     return axios({
    //       url: `/lose`,
    //       method: 'POST',
    //       headers: {
    //         username: roomDetail.users[1]
    //       }
    // })
    //   .then((res) => {
    //     console.log(res)
    // })
    //   })
    //   .catch(err => {
    //     console.log(err, 'error di post win')
    //   })
    // } else {
    //   axios({
    //   url: `/win`,
    //   method: 'POST',
    //   headers: {
    //     username: roomDetail.users[1]
    //   }
    // })
    //   .then(res => {
    //     return axios({
    //       url: `/lose`,
    //       method: 'POST',
    //       headers: {
    //         username: roomDetail.users[0]
    //       }
    // })
    //   .then((res) => {
    //     console.log(res)
    // })
    //   })
    //   .catch(err => {
    //     console.log(err, 'error di post win')
    //   })
    // }