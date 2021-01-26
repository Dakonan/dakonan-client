import { Pebble } from '.'
import { range } from 'lodash'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Hole ({ bgColor = "whitesmoke", pebbles = 0, onClick }) {
  const [scale, setScale] = useState(1)

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
        {
          pebbles
          ? range(pebbles).map((_, idx) => (
            <Pebble key={idx + toString(8)} />
          ))
          : null
        }
      </div>
    </motion.div>
  )
}
