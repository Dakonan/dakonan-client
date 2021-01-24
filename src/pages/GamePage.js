import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Board from '../components/Board'
import StatusBar from '../components/StatusBar'
import {useDispatch, useSelector} from 'react-redux'
import { makeMove, emptyHomes } from '../utils'
import io from 'socket.io-client'
import { gameStart, updateGameDetail } from '../redux/actions'
import {useParams} from 'react-router-dom'
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
  // const [state, setState] = useState(Object.assign({}, intialState))
  const roomDetail = useSelector(state => state.rooms.detail)
  const loading = useSelector(state => state.rooms.loading)
  const [turn, setTurn] = useState(false)
  useEffect(() => {
    dispatch(updateGameDetail())
  }, [turn])

  function clickHandler (i) {
    const board = {...roomDetail.gameState}
    const newState = makeMove(i)(board)
    setTurn(!turn)
    dispatch(gameStart(newState, name))
  }

  return (
    <div className="App">
      {
        !loading ?
        <h1>Loading</h1>
        :
        roomDetail.name ?
        <>
        <Header />

        <StatusBar
          player={roomDetail.gameState.player}
          isOver={roomDetail.gameState.isOver}
          message={roomDetail.gameState.message}
        />

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
      <p>{JSON.stringify(roomDetail)}</p>
    </div>
  );
}

export default GamePage;