import { Pebble } from '.'
import { motion, useAnimation } from 'framer-motion'
import { pebblesOrganizer } from '../helpers'
import { useEffect } from 'react'
import hitWood from '../assets/single-rock-hitting-wood-2.wav'
import useSound from 'use-sound'

export default function BigHole ({ bgColor = "#f6f5f5", pebbles = 0 }) {

  const [playSound] =  useSound(hitWood, { volume: 5 })
  const controls = useAnimation()
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