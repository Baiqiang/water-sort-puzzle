import BigNumber from 'bignumber.js'
import Tube, { Water } from './tube'

const SQRT5 = Math.sqrt(5)
export const BIG_PRIME = '263335179429578929874825607228167027772193'
const COLORS_BASE = ['red', 'yellow', 'green', 'blue', 'purple', 'pink', 'gray']
const COLORS_WEIGHT = [600, 900, 300]

export function generate(level) {
  const tubeCount = getTubeCount(level)
  const tubeHeight = getTubeHeight(level)
  const emptyTubeCount = getEmptyTubeCount(tubeHeight)
  const tubes = generateTubes(tubeCount, tubeHeight)
  const waters = generateWaters(tubes)
  randomWater(tubes, waters, getRandomNumber(level))
  appendEmptyTubes(tubes, emptyTubeCount)
  return tubes
}

export function randomWater(tubes, waters, randomNumber) {
  let number = randomNumber
  let index = 0
  while (waters.length > 0) {
    const tube = tubes[index]
    if (tube.full) {
      index++
      continue
    }
    const waterIndex = number.mod(waters.length)
    const [water] = waters.splice(waterIndex, 1)
    water.pourInto(tube)
    number = number.idiv(waters.length)
    if (number.lte(1)) {
      number = randomNumber
    }
  }
}

export function generateTubes(tubeCount, tubeHeight) {
  return Array(tubeCount)
    .fill(0)
    .map((_) => new Tube(tubeHeight))
}

export function appendEmptyTubes(tubes, emptyTubeCount) {
  const tubeHeight = tubes[0].height
  for (let i = 0; i < emptyTubeCount; i++) {
    tubes.push(new Tube(tubeHeight))
  }
}

export function generateWaters(tubes) {
  const waters = []
  tubes.forEach((tube, index) => {
    const base = index % COLORS_BASE.length
    const weight = index % COLORS_WEIGHT.length
    const water = new Water(`${COLORS_BASE[base]}-${COLORS_WEIGHT[weight]}`, 1)
    Array(tube.height)
      .fill(0)
      .forEach((_) => {
        waters.push(water.clone())
      })
  })
  return waters
}

function getRandomNumber(level) {
  return BigNumber(level + 1).times(BIG_PRIME)
}

function pickRandomTube(tubes, exclude = null) {
  while (true) {
    const randomTube = tubes[(Math.random() * tubes.length) | 0]
    if (!exclude || exclude) {
      return randomTube
    }
    if (randomTube === exclude) {
      continue
    }
    if (exclude.empty || randomTube.top?.height >= 2) {
      return randomTube
    }
  }
}

function getTubeHeight(level) {
  return Math.min(Math.floor((level + 1) / 20) + 2, 8)
}

function getTubeCount(level) {
  let sum = 0
  let a1 = 1
  let a2 = 1
  let n = 0
  while (sum / 2 < level) {
    a2 = a2 + a1
    a1 = a2 - a1
    sum += a2
    n++
  }
  return Math.min(n + 2, COLORS_BASE.length * COLORS_WEIGHT.length)
}

function getEmptyTubeCount(tubeHeight) {
  return (1 + tubeHeight / 4) | 0
}

function fibonacci(n) {
  return Math.round((((1 + SQRT5) / 2) ** n - ((1 - SQRT5) / 2) ** n) / SQRT5)
}
