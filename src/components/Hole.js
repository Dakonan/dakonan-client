import { Pebble } from '.'
import { range } from 'lodash'
import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { pebblesOrganizer } from '../helpers'

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.3 },
  pressed: { scale: 1.8 }
};

export default function Hole ({ 
  bgColor = "whitesmoke", 
  pebbles = 0, 
  onClick 
}) {
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
              animate={pebblesOrganizer(idx, pebbles)}
              key={idx + "hole"}
            >
              <Pebble
                isBigHole={false}
              />
            </motion.div>
          ))
          : null
        }
      </motion.div>
    </motion.div>
  )
}