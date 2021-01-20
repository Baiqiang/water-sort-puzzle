import { Water } from './tube'

export default class Step {
  undone = false

  constructor(tube1, tube2, height) {
    this.tube1 = tube1
    this.tube2 = tube2
    this.height = height
  }

  undo() {
    if (this.undone) {
      return
    }
    const water = this.tube2.top
    if (water.eq(this.tube1.top)) {
      this.tube1.top.height += this.height
    } else {
      this.tube1.waters.push(new Water(water.color, this.height))
    }
    water.height -= this.height
    if (water.height === 0) {
      this.tube2.waters.pop()
    }
    this.undone = true
  }

  redo() {
    if (!this.undone) {
      return
    }
    this.tube1.pourInto(this.tube2)
    this.undone = false
  }
}
