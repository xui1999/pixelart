class Area {
  constructor (x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = 'black'
  }

  mouseover (x, y) { return (x >= this.x && x < this.x + this.w && y >= this.y && y < this.y + this.h) }

  draw (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
    if (this.color == 'black') {
      ctx.strokeStyle = 'white'
      ctx.strokeRect(this.x, this.y, this.w, this.h)
    }
  }
}