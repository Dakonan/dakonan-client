import React from 'react'
import { useSelector } from 'react-redux'


const StatusBar = ({ player, isOver, message }) => {

  const roomDetail = useSelector(state => state.rooms.detail)

  return (

  <>
  <div className="container-status" 
    style={{
    position: 'absolute',
    top: '7.8vw',
    width: '50%',
    zIndex: 3
    }}>
  
    <div className="container bg-light" 
      style={{
        textAlign: 'center',
        width: '25vw',
        height: '3vw',
        borderRadius: '10px',
        borderStyle: 'solid',
        fontFamily: 'monospace',
        fontSize: 28,
        fontWeight: 'bold'
        }}>
      {roomDetail.users[player]}'s turn.
    </div>

    <div className="container bg-light" 
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        width: '25vw',
        height: '4vw',
        borderRadius: '10px',
        borderStyle: 'solid',
        color: 'black',
        marginTop: '25.6vh',
        fontSize: 20
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