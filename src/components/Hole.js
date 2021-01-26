import { Pebble } from '.'
import { range } from 'lodash'

const springConfig =  {stiffness: 120, damping: 14}

export default function Hole ({ bgColor = "whitesmoke", pebbles = 0, onClick }) {
  const pebblesOrganizer = (idx) => {
    const row = idx % 4
    const col = Math.floor(idx/4)
    return { row, col }
  }

  return (
    <div 
      className="bowl"
      style={{backgroundColor: bgColor}}
      onClick={onClick}
    >
      {
        pebbles
        ? 
        <div className="pebble-container" >
        {range(pebbles).map((_, idx) => (
            <Pebble idx={idx} />
        ))
        }
        </div>
        : null
      }
    </div>
  )
}
