import React, { useEffect, useState } from 'react'
import { Header, Board, StatusBar, NavbarTop } from '../components'
import {useDispatch, useSelector} from 'react-redux'
import { makeMove, emptyHomes } from '../utils'
import io from 'socket.io-client'
import { gameStart, updateGameDetail } from '../redux/actions'
import {useParams} from 'react-router-dom'
import fullPageImage from '../assets/GameContainer.png'
import decoration from '../assets/decoration.png'

const socket = io('http://localhost:4000')

// const START_AMOUNT = 4

// const intialState = {
//   player: 0,
//   board: emptyHomes(Array(14).fill(START_AMOUNT)),
//   isOver: false,
//   message: ''
// }

const GamePage = () => {
  const dispatch = useDispatch()
  const {name} = useParams()
  const username = useSelector(state => state.players.name)
  const roomDetail = useSelector(state => state.rooms.detail)
  const loading = useSelector(state => state.rooms.loading)
  const [turn, setTurn] = useState(false)
  useEffect(() => {
    dispatch(updateGameDetail())
  }, [turn])

  function clickHandler (i) {
    const board = {...roomDetail.gameState}
    const newState = makeMove(i)(board)
    console.log(i, newState)
    setTurn(!turn)
    dispatch(gameStart(newState, name))
  }

  return (
    <>
    <NavbarTop username={username}></NavbarTop>
    <div className="App" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      top: '5vh',
      // backgroundColor:'blue',
      height: '80vh'
    }}>
      {
        !loading ?
        <h1>Loading</h1>
        :
        roomDetail.name ?
        <>
        {/* <Header /> */}

        <StatusBar
          player={roomDetail.gameState.player}
          isOver={roomDetail.gameState.isOver}
          message={roomDetail.gameState.message}
        />
{/* 
        <div className="decoration">
          <img src={decoration} />
        </div> */}

        <div className="fullPageImage" style={{
          // backgroundColor: 'red'
        }}>
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

        {/* <button onClick={resetHandler}>
          Reset
        </button> */}
        </>
        :
        <h1>waiting for player 2</h1>
      }
    </div>
    </>
  );
}

export default GamePage;