import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const FinishAnnouncement = ({message, handleRematch}) => {
  return (
    <div className="container rounded bg-dark text-white" 
      style={{
      top: '8vh',
      position: 'absolute',
      display: 'flex',
      height: '60vh',
      width: '60vw',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      flexDirection: 'column'
      }}>
      <h1>{message}</h1>
      <button onClick={handleRematch} >Rematch</button>
      <Link to="/room">
        <button>Back to room</button>
      </Link>
    </div>
  );
}

export default FinishAnnouncement