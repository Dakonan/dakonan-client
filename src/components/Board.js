import React, { useEffect, useState } from 'react'
import { BigHole, Hole } from '.'

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
          if (i === currentIndex && i !== 13) return num + 1
          return num
        })
      )
    } else if (clickedIndex > 6) {
      setLocalBoard(localBoard =>
        localBoard.map((num, i) => {
          if (i === currentIndex && i !== 6) {
            console.log('tambah satu', currentIndex, i)
            return num + 1
          }
          return num
        })
      )
    }
  }

  const lightController = (nextIndex, number) => {
    const index = nextIndex - 1
    const timeout = setInterval(() => {
      if (number <= 0) {
        setLight(NaN)
        clickHandler(index)
        clearInterval(timeout)
      }else if (nextIndex !== index) {
        setLight(nextIndex)
        setTimeout(() => {
          pebblesAdder(index, nextIndex)
          number--
          nextIndex++
        }, 600);
      }
      if (nextIndex === 14 ) nextIndex = 0
    }, 1000)
  }

  const boardClickHandler = (index, number) => {
    setLocalBoard(localBoard => localBoard.map((num, i) => {
      if (i === index) return 0
      return num
    }))
    
    if (number === 1) {
      let idx = index < 6 ? 6 : 13
      setLight(idx)
      setTimeout(() => { pebblesAdder(index, idx) }, 600)
      clickHandler(index)
    } else if (number > 1) {
      lightController(index + 1, number)
    }
    
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