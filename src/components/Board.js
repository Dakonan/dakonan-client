import React, { useEffect, useState } from 'react'
import { BigHole, Hole } from '.'

const Board = ({ board, clickHandler, roomDetail }) => {    
  const [localBoard, setLocalBoard] = useState(board)
  const username = localStorage.username
  
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
        clickHandler(index) //request to server
        clearInterval(timeout)
      } else if (number === 1) {
        if (couldHijack(index, nextIndex)) {
          const homeIndex = index < 6 ? 6 : 13
          const hijackedIndex = 12 - nextIndex
          setTimeout(() => {
            hijacker(nextIndex, hijackedIndex, homeIndex)
            number--
          }, 500)
        } else {
          setTimeout(() => {
            pebblesAdder(index, nextIndex)
            number--
          }, 500)
        } 
      } else {
        setTimeout(() => {
          pebblesAdder(index, nextIndex)
          number--
          nextIndex++
        }, 500)
      }
      if (nextIndex === 14 ) nextIndex = 0
    }, 1000)
  }

  const couldHijack = (clickedIndex, lastIndex) => {
   const allowedIndexToHijack = clickedIndex < 6
      ? [7, 8, 9, 10, 11, 12]
      : [0, 1, 2, 3, 4, 5]
    // list of allowed index to hijact
    if (!allowedIndexToHijack.includes(lastIndex) && !localBoard[lastIndex]) return true
    return false
  }

  const hijacker = (nextIndex, hijackedIndex, homeIndex) => {
    const currentPlayerNumber = localBoard[nextIndex]
    const enemyNumber = localBoard[hijackedIndex]

    setLocalBoard(localBoard => 
      localBoard.map((num, idx) => {
        if (idx === hijackedIndex || idx === nextIndex) {
          return 0
        }
        else if (idx === homeIndex) {
          return localBoard[homeIndex] + currentPlayerNumber + enemyNumber
        } else {
          return num
        }
      })
    )    
  }

  const boardClickHandler = (index, number) => {
    if (!isNaN(index) && !isNaN(number)) {
      setLocalBoard(localBoard => localBoard.map((num, i) => {
        if (i === index) return 0
        return num
      }))
      lightController(index + 1, number)
    }
  }

  return (
    <div className="board">
      <BigHole
        className="big-bowl"
        pebbles={localBoard[13]}
        bgColor="#f58634"
      />
      <div>
        <div className="d-flex">
        {
          localBoard.slice(7, 13).reverse().map((number, idx) => (
            <Hole
              bgColor="#f58634"
              pebbles={number}
              key={"player2" + idx}
              onClick={() => {
                username === roomDetail.users[0] || roomDetail.gameState.player !== 1
                ? boardClickHandler()
                : boardClickHandler(12 - idx, number)
              }}
            />
          ))
        }
        </div>
        <div className="d-flex">
        {
          localBoard.slice(0, 6).map((number, idx) => (
            <Hole 
              bgColor="#eb596e"
              pebbles={number}
              key={"player1" + idx}
              onClick={() => {
                username === roomDetail.users[1] || roomDetail.gameState.player !== 0
                ? boardClickHandler()
                : boardClickHandler(idx, number)
              
              }}
            />
          ))
        }
        </div>
      </div>
      <BigHole
        className="big-bowl"
        pebbles={localBoard[6]}
        bgColor="#eb596e"
      />
    </div>
  )
}

export default Board