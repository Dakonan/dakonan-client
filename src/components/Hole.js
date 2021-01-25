import { Motion, spring } from 'react-motion'

export default function Hole ({ bgColor = "whitesmoke", pebbles = 0, onClick }) {
  return (
    <div 
      className="bowl"
      style={{backgroundColor: bgColor}}
      onClick={onClick}
    >
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