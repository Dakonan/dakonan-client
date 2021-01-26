import { Pebble } from '.'
import { motion } from 'framer-motion'
import { pebblesOrganizer } from '../helpers'

export default function BigHole ({ bgColor = "whitesmoke", pebbles = 0 }) {
  return (
    <div className="big-bowl" style={{backgroundColor: bgColor}}>
      {
       pebbles
        ? [...Array(pebbles)].map((_, key) => (
          <motion.div
            animate={pebblesOrganizer(key, pebbles)}
          >
            <Pebble
              key={key}
              bgColor="#456990"
              isBigHole={true}
            />
          </motion.div>
        ))
        : null
      }
    </div>
  )
}