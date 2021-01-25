import React from 'react'

import MancalaBoard from '../assets/MancalaBoard.png'

const Board = ({ board, clickHandler }) => {

  const boardWithIndexes = board.map((n, i) => ({ count: n, index: i }))

  const player1Holes = boardWithIndexes.slice(0, 6)
  const player2Holes = boardWithIndexes.slice(7, 13)

  const player1Home = board[6]
  const player2Home = board[13]

  return (
    <div style={{
      position: 'absolute',
      // backgroundColor: 'green'
      marginTop: '70px'
    }}>
      <img src={MancalaBoard} style={{
        maxWidth: '700px',
       
      }}/>
      <div className="rectangle" />

      <div className="board row" style={{
        // backgroundColor: 'pink',
        justifyContent: 'center',
        position: 'relative',
        // bottom: '29.8vh',
        bottom: '33.9vh',
        left: '3.5vh'
      }}>


        <div className="home">
          { player2Home }
        </div>

        <div className="holes-section" >

          <div className="holes-container" >
            {player2Holes.reverse().map((hole, i) => (
              <div className="hole" key={i} onClick={() => clickHandler(hole.index)}>
                { hole.count }
              </div>
            ))}
          </div>

          <div className="holes-container" >
            {player1Holes.map((hole, i) => (
              <div className="hole" key={i} onClick={() => clickHandler(hole.index)}>
                { hole.count }
              </div>
            ))}
          </div>

        </div>

        <div className="home">
          { player1Home }
        </div>

      </div>
    </div>
  )
}

export default Board