import React, {useState, useEffect} from 'react'
import howtoplays from '../assets/howtoplay.png'
const HowToPlay = () => {
  return (
    <div class="howtoplay">
      <img src={howtoplays} class="img-fluid" style={{
        margin: '0',
        padding: '0',
        border: '5px solid',
        borderRadius: '1rem'
      }}/>
  </div>
  )
}

export default HowToPlay