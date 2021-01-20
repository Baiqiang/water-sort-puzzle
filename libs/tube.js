export default class Tube {
  constructor(height) {
    this.water = []
    this.height = height
  }

  pourInto(tube) {
    if (tube.full) {
      return 0
    }
    const thisTop = this.top
    const thatTop = tube.top
    if (!thisTop) {
      return 0
    }
    if (thatTop && !thisTop.eq(thatTop)) {
      return 0
    }
    if (!thatTop) {
      this.water.pop()
      tube.water.push(thisTop)
      return thisTop.height
    } else {
      const remained = thisTop.height + tube.filledHeight - tube.height
      if (remained <= 0) {
        this.water.pop()
        thatTop.height += thisTop.height
        return thisTop.height
      } else {
        thisTop.height = remained
        const pouredHeight = tube.height - tube.filledHeight
        thatTop.height += pouredHeight
        return pouredHeight
      }
    }
  }

  get top() {
    return this.water[this.water.length - 1]
  }

  get solved() {
    return (
      this.water.length === 0 ||
      (this.water.length === 1 && this.top.height === this.height)
    )
  }

  get full() {
    return this.filledHeight === this.height
  }

  get empty() {
    return this.filledHeight === 0
  }

  get filledHeight() {
    return this.water.reduce((h, { height }) => h + height, 0)
  }

  clone() {
    const tube = new Tube(this.height)
    tube.water = this.water.map((water) => water.clone())
    return tube
  }
}

export class Water {
  constructor(color, height) {
    this.color = color
    this.height = height
  }

  eq(water) {
    return this.color === water?.color
  }

  clone() {
    return new Water(this.color, this.height)
  }

  pourInto(tube) {
    if (this.eq(tube.top)) {
      tube.top.height += this.height
    } else {
      tube.water.push(this.clone())
    }
  }
}
