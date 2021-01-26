const maxPebbleEachLayer = [0, 6, 10, 16, 17]
const baseRadius = 15

const angleGenerator = (idx, radius) => {
  const layer = radius / baseRadius
  const orderInThatLayer = maxPebbleEachLayer[layer] - idx
  const angle = (360 * orderInThatLayer) / maxPebbleEachLayer[layer]
  return angle
}

const radiusGenerator = (idx) => {
  let layer = 0
  if (idx <= maxPebbleEachLayer[1]) layer = 1
  else if (idx <= maxPebbleEachLayer[2]) layer = 2
  else if (idx <= maxPebbleEachLayer[3]) layer = 3
  else layer = 4
  
  return layer * baseRadius
}

const pebblesOrganizer = (idx) => {
  const pi = Math.PI
  if (!idx) return {x: 0, y: 0}
  else {
    const radius = radiusGenerator(idx)
    const theta = angleGenerator(idx, radius)
    const radian  = (theta * pi / 180)
    return { 
      x: radius * Math.sin(radian),
      y: radius * Math.cos(radian)
    }
  }
}

export {
  radiusGenerator,
  angleGenerator,
  pebblesOrganizer
}