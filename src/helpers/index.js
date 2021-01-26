const baseRadius = 15
const angleDivider = [0, 6, 12, 17, 10]
const indexes = [0, 6, 18, 35, 17]

const angleGenerator = (idx, radius) => {
  const layer = radius / baseRadius
  const orderInThatLayer = angleDivider[layer] - idx
  const angle = (360 * orderInThatLayer) / angleDivider[layer]
  return angle
}

const radiusGenerator = (idx) => {
  let layer = 0
  if (idx <= indexes[1]) layer = 1
  else if (idx <= indexes[2]) layer = 2
  else if (idx <= indexes[3]) layer = 3
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
  pebblesOrganizer
}