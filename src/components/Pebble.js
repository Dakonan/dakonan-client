import { useEffect } from 'react'
import { motion, usePresence } from 'framer-motion'

export default function Pebble ({ bgColor = "black", isBigHole }) {
  const [ iamHere, removePebble ] = usePresence()
  useEffect(() => {
    !iamHere && setTimeout(removePebble, 400)
  }, [iamHere])
  return (
    <motion.div 
      animate={{ 
        x: isBigHole ? 80 : 51,
        y: isBigHole ? 90 : 51,
        transition: {
          duration: 0.55
        }
      }}
      initial={{
        x: 0,
        y: 0
      }}
    >
      <div className="pebble" 
        style={{backgroundColor: bgColor}}
      />
    </motion.div>
  )
}