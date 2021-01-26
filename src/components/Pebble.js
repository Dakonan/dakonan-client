import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const randomize = () => {
  const constant = 30
  const rand = Math.random()
  let result
  Math.floor(rand * 10) % 2
  ? result = rand * -constant
  : result = rand * constant

  return result
}

export default function Pebble ({ bgColor = "black", isBigHole }) {
  const [pos, setPos] = useState({
    x: randomize(), 
    y: randomize()
  })
 

  useEffect(() => {
    if (pos.x !== 0 || pos.y !== 0) {
      setTimeout(setPos, 500, {x: 45, y: 45})
    }
  }, [pos])
  return (
    <motion.div 
      animate={{ 
        opacity: 1,
        x: isBigHole ? 40 : pos.x,
        y: isBigHole ? 80 : pos.y
      }}
      initial={{opacity: 0}}
    >
      <div className="pebble" 
        style={{backgroundColor: bgColor}}
      />
    </motion.div>
  )
}