import { Pebble } from '.'
import { range } from 'lodash'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hole ({ bgColor = "whitesmoke", pebbles = 0, onClick }) {
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const pebblesOrganizer = (idx) => {
    const row = idx % 4
    const col = Math.floor(idx/4)
    return { row, col }
  }
  const clickHandler = () => {
    setScale(1.5)
    setTimeout(onClick, 500)
    setTimeout(setScale, 300, 1)
  }

  useEffect(() => {
    if (pos.x !== 0 || pos.y !== 0) {
      setTimeout(setPos, 500, {x: 0, y: 0})
    }
  }, [pos])

  useEffect(() => {
    setPos({x: Math.random() * 3, y: Math.random() * 3})
  }, [])

  return (
    <motion.div 
      animate={{ scale }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 200
      }}
    >
      <div 
        className="bowl"
        style={{backgroundColor: bgColor}}
        onClick={clickHandler}
      >
      <motion.div 
        animate={{ translateX: pos.x, translateY: pos.y }}
      >
        {
          pebbles
          ? range(pebbles).map((_, idx) => (
            <Pebble />
          ))
          : null
        }
      </motion.div>
      </div>
    </motion.div>
  )
}
