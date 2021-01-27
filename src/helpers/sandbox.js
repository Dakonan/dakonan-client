const indexes = [1, 6, 14, 27]

// 10 ==> [1, 6, 3]
// 11 ==> [1, 6, 4]
const getDividers = (number) => {
  let init = number
  let arr = []
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i] <= number) {
      arr.push(indexes[i])
      number -= indexes[i]
    } else if (i === indexes.length - 1 && number > 0) {
      arr.push(number)
    }
  }
  console.log(arr, `>>> dividers ${init}`)
  return arr
}

// getDividers(30)
getDividers(48)
// getDividers(7)

// const baseRadius = 20
// 
// const angleGenerator = (idx, radius, dividers) => {
//   // const layer = radius / baseRadius
//   // const orderInThatLayer = dividers[layer]
//   // const angle = (360 * orderInThatLayer) / dividers[layer]
//   // return angle
//   const layer = radius / baseRadius
//   const angle = 360 / dividers[layer]
//   const orderedAngle  = angle * (idx + 1)
//   console.log(orderedAngle)
//   return orderedAngle
// }
// 
// angleGenerator(0, 0, [ 1, 6, 14 ]) // => angle 360