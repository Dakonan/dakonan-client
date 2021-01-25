import React from 'react'

const StatusBar = ({ player, isOver, message }) => (
  <div style={{
    position: 'absolute',
    top: '322px',
    left: '865px',
    zIndex: '11'
    }}>

  	<div style={{
      zIndex: '1'
    }}>
      Player { player + 1 }'s turn.
    </div>
    
    
    

    <div style={{
      color: 'red',
      marginTop: '290px'
    }}>
      { message }
    </div>
  </div>
)

export default StatusBar