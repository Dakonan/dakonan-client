import { Pebble } from '.'
import { range } from 'lodash'
import { motion } from 'framer-motion'
import { pebblesOrganizer } from '../helpers'

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.3 },
  pressed: { scale: 2 }
};

export default function Hole ({ bgColor = "whitesmoke", pebbles = 0, onClick }) {
  return (
    <motion.div 
      variants={button}
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      onClick={onClick}
    >
      <div 
        className="bowl"
        style={{backgroundColor: bgColor}}
      >
        {
          pebbles
          ? range(pebbles).map((_, idx) => (
            <motion.div
              animate={pebblesOrganizer(idx)}
            >
              <Pebble key={idx} 
                isBigHole={false}
              />
            </motion.div>
          ))
          : null
        }
      </div>
    </motion.div>
  )
}