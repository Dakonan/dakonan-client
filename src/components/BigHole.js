import { Pebble } from '.'
import { Motion, spring } from 'react-motion'

export default function BigHole ({ bgColor = "whitesmoke", pebbles = 0 }) {
  return (
    <div className="big-bowl" style={{backgroundColor: bgColor}}>
      {
       pebbles
        ? [...Array(pebbles)].map((_, key) => (
          <Pebble key={"player1" + key} bgColor="#456990" />
        ))
        : null
      }
    </div>
  )
}