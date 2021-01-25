import React, { useEffect, useState } from 'react'
import { BigHole, Hole } from '.'
import { range, set } from 'lodash'

const Board = ({ board, clickHandler }) => {  
  const [localBoard, setLocalBoard] = useState(board)
  const [light, setLight] = useState(NaN)

  useEffect(() => {
    setLocalBoard(board)
  }, [board])

  const pebblesAdder = (clickedIndex, currentIndex) => {
    if (clickedIndex < 6) {
      setLocalBoard(localBoard => 
        localBoard.map((num, i) => {
          if (i === 13) return num
          else if (i === currentIndex) return (num + 1)
          return num
        })
      )
    } else {
      setLocalBoard(localBoard =>
        localBoard.map((num, i) => {
          if (i === 6) return num
          else if (i === currentIndex) return (num + 1)
          return num
        })
      )
    }
  }

  const boardClickHandler = (index, number) => {
    setLocalBoard(localBoard => localBoard.map((num, i) => {
      if (i === index) return 0
      return num
    }))
    
    let idx = index + 1
    let timeout = setInterval(() => {
      if (number <= 0) {
        setLight(NaN)
        clearInterval(timeout)
      }else if (idx !== index) {
        setLight(idx)
        pebblesAdder(index, idx)
        number--
        idx++
      }
      if (idx === 13 ) idx = 0
    }, 1000)
  }

  return (
    <div className="board">
      <BigHole
        className="big-bowl"
        pebbles={localBoard[13]}
        bgColor={light === 13 ? "whitesmoke" : "#f58634"}
      />
      <div>
        <div className="d-flex">
          {
            localBoard.slice(7, 13).reverse().map((number, idx) => (
              <Hole
                bgColor={light === 12-idx ? "whitesmoke" :"#f58634"}
                pebbles={number}
                key={"player2" + idx}
                onClick={() => boardClickHandler(12-idx, number)}
              />
            ))
          }
        </div>
        <div className="d-flex">
          {
            localBoard.slice(0, 6).map((number, idx) => (
              <Hole 
                bgColor={light === idx ? "whitesmoke" : "#eb596e"}
                pebbles={number}
                key={"player1" + idx}
                onClick={() => boardClickHandler(idx, number)}
              />
            ))
          }
        </div>
      </div>
      <BigHole
        className="big-bowl"
        pebbles={localBoard[6]}
        bgColor={light === 6 ? "whitesmoke" : "#eb596e"}
      />
    </div>
  )
}

export default Board