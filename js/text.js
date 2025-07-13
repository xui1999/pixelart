class Text {
  constructor (text, area) {
    this.text = text
    this.area = area
    this.color = 'lightgray'
    this.x = area.x
    this.y = area.y
    this.font = "20px monospace"
  }

  center (ctx) {
    ctx.font = this.font
    let w = ctx.measureText(this.text).width
    let h = 20
    this.x = this.area.x + (this.area.w / 2) - (w / 2)
    this.y = this.area.y + (this.area.h) - (h / 2)
  }

  draw (ctx) {
    ctx.font = this.font
    ctx.fillStyle = this.color
    ctx.fillText(this.text, this.x, this.y, this.area.w)
  }

}