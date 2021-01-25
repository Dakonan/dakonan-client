import React from 'react'
// import MancalaBoard from '../assets/MancalaBoard.png'
import { BigHole, Hole } from '.'
const Board = ({ board, clickHandler }) => {

  const boardWithIndexes = board.map((n, i) => ({ count: n, index: i }))

  const player1Holes = boardWithIndexes.slice(0, 6)
  const player2Holes = boardWithIndexes.slice(7, 13)

  const player1Home = board[6]
  const player2Home = board[13]
  // console.log(board)
  return (
    <div className="board">      
      <BigHole
        className="big-bowl"
        pebbles={player1Home}
      />
      <div>
        <div className="d-flex">
          {
            player1Holes.map((holeObject, idx) => (
              <Hole
                bgColor="#f58634"
                pebbles={holeObject.count}
                key={"player1" + idx}
                onClick={() => clickHandler(holeObject.index)}
              />
            ))
          }
        </div>
        <div className="d-flex">
          {
            player2Holes.map((holeObject, idx) => (
              <Hole bgColor="#eb596e"
                pebbles={holeObject.count}
                key={"player2" + idx}
                onClick={() => clickHandler(holeObject.index)}
              />
            ))
          }
        </div>
      </div>
      <BigHole
        className="big-bowl"
        pebbles={player2Home}
      />
    </div>
  )
}

export default Board