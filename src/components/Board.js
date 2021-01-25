import React from 'react'
import MancalaBoard from '../assets/MancalaBoard.png'

const Board = ({ board, clickHandler }) => {

  const boardWithIndexes = board.map((n, i) => ({ count: n, index: i }))

  const player1Holes = boardWithIndexes.slice(0, 6)
  const player2Holes = boardWithIndexes.slice(7, 13)

  const player1Home = board[6]
  const player2Home = board[13]

  return (
    <>
    {/* <div style={{
      position: 'absolute',
      marginTop: '70px'
    }}>
    </div> */}
      <div style={{position: 'absolute'}}>
        <img src={MancalaBoard} style={{
          maxWidth: '700px',
        
        }}/>

      </div>
    <div className="board">
      <div className="home-2">
        { player2Home }
      </div>

      <div className="holes-section">
        <div className="holes-container-2">
        	{player2Holes.reverse().map((hole, i) => (
            <div className="hole" key={i} onClick={() => clickHandler(hole.index)}>
              { hole.count }
            </div>
          ))}
        </div>

        <div className="holes-container-1">
          {player1Holes.map((hole, i) => (
            <div className="hole" key={i} onClick={() => clickHandler(hole.index)}>
              { hole.count }
            </div>
          ))}
        </div>
      </div>

      <div className="home-1">
        { player1Home }
      </div>
    </div>
    </>
  )
}

export default Board