import React from 'react'
import Marble from '../assets/baby.svg'
export default function Pebble ({ bgColor = "black" }) {
  const randomTop = Math.floor(Math.random()*6 + 2)
  const randomRight = Math.floor(Math.random()*6 +1)
  return (
    <div className="pebble" style={{
      // position: 'absolute',
      // top: randomTop + 'vh',
      // left: randomRight + 'vw' 
      }} >
      <img src={Marble} alt="bola"></img>
    </div>
  )
}