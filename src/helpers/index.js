const baseRadius = 15
const angleDivider = [0, 6, 12, 17, 10]
const indexes = [1, 6, 18, 35]

const angleGenerator = (idx, radius, dividers) => {
  console.log(dividers)
  const layer = radius / baseRadius
  const orderInThatLayer = angleDivider[layer] - idx
  const angle = (360 * orderInThatLayer) / dividers[layer]
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

const getDividers = (number) => {
  let arr = [] //array of pebbles quantity per layer
  indexes.forEach(id => {
    if (id < number) {
      arr.push(id)
    }
    else if (arr.reduce((a, b) => a + b) < number) {
      arr.push(number - arr[arr.length - 1])
    }
  })
  return arr
}
const pebblesOrganizer = (idx, number) => {
  const pi = Math.PI
  if (!idx) return {x: 0, y: 0}
  else {
    const radius = radiusGenerator(idx)
    const dividers = getDividers(number)
    const theta = angleGenerator(idx, radius, dividers)
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