import React from 'react'

const StatusBar = ({ player, isOver, message }) => {
  return (
    <div>
      <div>
        Player { player + 1 }'s turn.
      </div>
      <div>
        { message }
      </div>
    </div>

  )
}

export default StatusBar