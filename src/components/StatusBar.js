import React from 'react'
import { useSelector } from 'react-redux'


const StatusBar = ({ player, isOver, message }) => {

  const roomDetail = useSelector(state => state.rooms.detail)

  return (

  <>
  <div className="container-status" 
    style={{
    position: 'absolute',
    top: '17vh',
    width: '50%',
    zIndex: 1
    }}>
  
    <div className="container bg-light turn-note" 
      style={{
        textAlign: 'center',
        width: '25vw',
        height: '3vw',
        borderRadius: '10px',
        borderStyle: 'solid',
        fontFamily: 'monospace',
        fontSize: '1.5vw',
        fontWeight: 'bold'
        }}>
      {roomDetail.users[player]}'s turn.
    </div>

    <div className="container bg-light game-note" 
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        width: '25vw',
        height: '4vw',
        borderRadius: '10px',
        borderStyle: 'solid',
        color: 'black',
        marginTop: '38vh',
        fontSize: '1vw'
      }}
    > 
    <p className="m-0">{`Player1 (Pink) ${roomDetail.users[0]}`}</p>
    <p>{`Player2 (Orange) ${roomDetail.users[1]}`}</p>
    </div>
  </div>
  </>
  )
} 


export default StatusBar