import { Pebble } from '.'
import { range } from 'lodash'
import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { pebblesOrganizer } from '../helpers'
import hitWood from '../assets/single-rock-hitting-wood-2.wav'
import useSound from 'use-sound'

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.3 },
  pressed: { scale: 1.8 }
};

export default function Hole ({ 
  bgColor = "#f6f5f5", 
  pebbles = 0, 
  onClick 
}) {
  const controls = useAnimation()
  const [playSound] =  useSound(hitWood, { volume: 5 })

  useEffect(() => {
    controls.start({
      backgroundColor: "#f4f5db", 
      transition: { duration: 0.4 }
    })
    playSound()
    setTimeout(() => {
      controls.stop()
      controls.start({ backgroundColor: bgColor })
    }, 500)

  }, [pebbles, bgColor, controls])

  return (
    <motion.div 
      variants={button}
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      onClick={onClick}
    >
      <motion.div 
        className="bowl"
        initial={{backgroundColor: "#f4f5db"}}
        animate={controls}
      >
        {
          pebbles
          ? range(pebbles).map((_, idx) => (
            <motion.div
              className="pebble-container"
              animate={pebblesOrganizer(idx, pebbles)}
              key={idx + "hole"}
            >
              <Pebble isBigHole={false}/>
            </motion.div>
          ))
          : null
        }
      </motion.div>
    </motion.div>
  )
}