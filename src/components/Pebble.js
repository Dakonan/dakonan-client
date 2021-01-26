import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const randomize = () => {
  const constant = 30
  const rand = Math.random()
  let result
  Math.floor(rand * 10) % 2
  ? result = rand * -constant
  : result = rand * constant

  return result
}

export default function Pebble ({ bgColor = "black", idx }) {
  // const [pos, setPos] = useState({
  //   x: randomize(), 
  //   y: randomize()
  // })
  const [radius, setRadius] = useState(30)
  const [theta, setTheta] = useState(0) //angle of polar coordinat

  const pebblesOrganizer = (idx) => {
   const pi = Math.PI
   if (!idx) return {x: 0, y: 0}
   else {
     const radian  = (theta * pi / 180)
     if (theta < 360) {
       setTheta(theta => theta + 30)
       return {
         x: radius * Math.sin(radian),
         y: radius * Math.cos(radian)
       }
     } else {
       setRadius(radius => radius + 30)
       setTheta(0)
       return {
         x: radius * Math.sin(radian),
         y: radius * Math.cos(radian)
       }
     }
   }
  }
  // useEffect(() => {
  //   if (pos.x !== 0 || pos.y !== 0) {
  //     setTimeout(setPos, 500, {x: 45, y: 45})
  //   }
  // }, [pos])
  return (
    <motion.div 
      animate={{ 
        opacity: 1,
        x: pebblesOrganizer(idx).x + 45,
        y: pebblesOrganizer(idx).y + 45
      }}
      initial={{opacity: 0}}
    >
      <div className="pebble" 
        style={{backgroundColor: bgColor}}
      />
    </motion.div>
  )
}