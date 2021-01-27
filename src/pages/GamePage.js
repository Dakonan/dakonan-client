import React, { useEffect, useState } from 'react'
import { Header, Board, StatusBar, NavbarTop } from '../components'
import {useDispatch, useSelector} from 'react-redux'
import { makeMove, emptyHomes } from '../utils'
import io from 'socket.io-client'
import { gameStart, readyToRematch, updateGameDetail } from '../redux/actions'
import {useParams} from 'react-router-dom'
import fullPageImage from '../assets/GameContainer.png'
import FinishAnnouncement from '../components/FinishAnnouncement'
import WaitingRoom from './WaitingRoom'

const socket = io('http://localhost:4000')

const START_AMOUNT = 4

const intialState = {
  player: 0,
  board: emptyHomes(Array(14).fill(START_AMOUNT)),
  isOver: false,
  message: ''
}

const GamePage = () => {
  const dispatch = useDispatch()
  const {name} = useParams()
  const username = localStorage.username
  const roomDetail = useSelector(state => state.rooms.detail)
  const loading = useSelector(state => state.rooms.loading)
  const [turn, setTurn] = useState(false)

  useEffect(() => {
    dispatch(updateGameDetail())
  }, [turn])

  function clickHandler (i) {
    const gameDetail = {...roomDetail.gameState}
    const newState = makeMove(i)(gameDetail)
    setTurn(!turn)
    dispatch(gameStart(newState, name))
  }

  function HandleRematch () {
    dispatch(readyToRematch(intialState, name))
    // dispatch(gameStart(intialState, name))
  }

  return (
    <>
    <NavbarTop username={username}></NavbarTop>
    <div className="App" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      // top: '4vh',
      // backgroundColor:'blue',
      height: '100vh'
    }}>
      {
        !loading ?
        <h1>Loading</h1>
        :
        roomDetail.name && roomDetail.ready[0] === true && roomDetail.ready[1] === true  ?
        <>
        {/* <Header /> */}

        <StatusBar
          player={roomDetail.gameState.player}
          isOver={roomDetail.gameState.isOver}
          message={roomDetail.gameState.message}
        />
        <div className="fullPageImage">
          <img src={fullPageImage} style={{
            maxWidth: '1095px',
            height: '90vh',
            width: '200vw '
          }}/>
        </div>

        <Board
          board={roomDetail.gameState.board}
          clickHandler={clickHandler}
        />
        {/* <p>{JSON.stringify(roomDetail)}</p> */}
        {/* <button onClick={resetHandler}>
          Reset
        </button> */}
        </>
        :
        <WaitingRoom></WaitingRoom>
      }
    </div>

      {
        roomDetail.name && roomDetail.gameState.isOver == true ?
        <div className="d-flex justify-content-center">
          <FinishAnnouncement handleRematch={HandleRematch} message={roomDetail.gameState.message}></FinishAnnouncement>
        </div>
        :
        ""
      }
    </>
  );
}

export default GamePage;