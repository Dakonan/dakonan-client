import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
const randomize = () => {
  const rand = Math.random()
  let result
  rand < 0.5
  ? result = rand * -10
  : result = rand * 10

  return result
}

export default function Pebble ({ bgColor = "black" }) {
  const [pos, setPos] = useState({
    x: randomize(), 
    y: randomize()
  })

  useEffect(() => {
    if (pos.x !== 0 || pos.y !== 0) {
      setTimeout(setPos, 500, {x: 0, y: 0})
    }
  }, [pos])
  return (
    <motion.div 
      animate={{ ...pos, opacity: 1 }}
      initial={{opacity: 0}}
    >
      <div className="pebble" 
        style={{backgroundColor: bgColor}}
      />
    </motion.div>
  )
}