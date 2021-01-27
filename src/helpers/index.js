const baseRadius = 17
// const maxPebbles = [1, 6, 21, 20, 21]
const maxPebbles = [1, 6, 14, 27 ]


const angleGenerator = (idx, radius, dividers) => {
  const layer = radius / baseRadius
  const angle = 360 / dividers[layer]
  const orderedAngle  = angle * (idx + 1)
  return orderedAngle
}

const radiusGenerator = (idx) => {
  let layer = 0
  if (idx <= 6) layer = 1
  else if (idx <= 20) layer = 2
  else layer = 3
  const radius =  layer * baseRadius
  return radius //==> number  0, 20, 40, 
}

const getDividers = (number) => {
  let arr = []
  for (let i = 0; i < maxPebbles.length; i++) {
    if (maxPebbles[i] <= number) {
      arr.push(maxPebbles[i])
      number -= maxPebbles[i]
    } else if (i === maxPebbles.length - 1 && number > 0) {
      arr.push(number)
    }
  }
  return arr
}

const pebblesOrganizer = (idx, number) => {
  const pi = Math.PI
  if (!idx) return {x: 0, y: 0}
  else {
    const radius = radiusGenerator(idx) //radius
    const dividers = getDividers(number) // pembagi sudut untuk layer tertentu
    const theta = angleGenerator(idx, radius, dividers) // sudut suatu pebble
    const radian  = (theta * pi / 180)
    return { 
      x: radius * Math.sin(radian),
      y: radius * Math.cos(radian)
    }
  }
}

export {
  pebblesOrganizer
}