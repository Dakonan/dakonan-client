import React from 'react'

const StatusBar = ({ player, isOver, message }) => (
  <>
  <div className="container-status" 
    style={{
    position: 'absolute',
    top: '7.5vw',
    zIndex: 3
    }}>
  
    <div className="container bg-light" 
      style={{
        textAlign: 'center',
        width: '20vw',
        height: '3vw',
        borderRadius: '10px',
        borderStyle: 'solid'
        }}>
      Player { player + 1 }'s turn.
    </div>

    <div className="container bg-light" 
      style={{
        textAlign: 'center',
        width: '20vw',
        height: '3vw',
        borderRadius: '10px',
        borderStyle: 'solid',
        color: 'black',
        marginTop: '39.5vh'
      }}
    >
    { message }
    </div>
  </div>
  </>
)

export default StatusBar