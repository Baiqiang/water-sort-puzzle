import COLORS from '../colors'
import * as wasm from './water_sort_puzzle_solver'

export function solve(tubes, emptyTubeCount) {
  const waters = new Uint8Array(
    tubes
      .map((tube) => {
        const waters = []
        tube.waters.forEach((water) => {
          for (let i = 0; i < water.height; i++) {
            waters.push(COLORS.indexOf(water.color))
          }
        })
        return waters
      })
      .flat()
  )
  return wasm.run(tubes.length, tubes[0].height, emptyTubeCount, waters)
}
