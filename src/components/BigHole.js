import { Pebble } from '.'
import { motion, useAnimation } from 'framer-motion'
import { pebblesOrganizer } from '../helpers'
import { useEffect } from 'react'

export default function BigHole ({ bgColor = "whitesmoke", pebbles = 0 }) {
  const controls = useAnimation()
  useEffect(() => {
    controls.start({
      backgroundColor: "#f4f5db", 
      transition: { duration: 3 }
    })
    setTimeout(() => {
      controls.stop()
      controls.start({ backgroundColor: bgColor })
    }, 500)

  }, [pebbles])

  return (
    <motion.div 
      className="big-bowl"
      initial={{backgroundColor: '#f4f5db'}}
      animate={controls}
    >
      {
       pebbles
        ? [...Array(pebbles)].map((_, key) => (
          <motion.div
            animate={pebblesOrganizer(key, pebbles)}
            key={key}
          >
            <Pebble
              bgColor="#456990"
              isBigHole={true}
            />
          </motion.div>
        ))
        : null
      }
    </motion.div>
  )
}