import { Pebble } from '.'

export default function BigHole ({ bgColor = "whitesmoke", pebbles = 0 }) {
  return (
    <div className="big-bowl" style={{backgroundColor: bgColor}}>
      <div className="big-bowl-container">
        {
        pebbles ? 
          [...Array(pebbles)].map((_, key) => (
            <Pebble key={"player1" + key} bgColor="#456990" />
          ))
          : 
          null
        }
      </div>
    </div>
  )
}