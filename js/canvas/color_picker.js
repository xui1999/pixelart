new Canvas('color_picker', {

  variables: {
    width: 180,
    height: 400,
    color_display: new Area(10, 10, 170, 170),
    colors: [],
    active: true
  },

  actions: {
    disable(v) {
      v.active = false
      v.canvas.style.filter = "grayscale(1)"
    },
    enable(v) {
      v.active = true
      v.canvas.style.filter = ""
    }
  },

  init (v) {
    v.color_display.color = color

    let size = 20
    let gap = 10
    let margin_top = 180

    let color_values = "black, silver, gray, white, maroon, red, purple, fuchsia, green, lime, olive, yellow, navy, blue, teal, aqua".split(", ")
    let color_presets = []

    let cur_x = 0
    let cur_y = 0
    let x_max = 6

    for (let color_value of color_values) {
      color_presets.push([cur_x, cur_y, color_value])
      cur_x++
      if (cur_x >= x_max) {
        cur_x = 0
        cur_y++
      }
    }

    for (let [x, y, c] of color_presets) {
      let color_area = new Area(gap + x * (gap + size), gap + margin_top + y * (gap + size), size, size)
      color_area.color = c
      v.colors.push(color_area)
    }
  },

  calc (v) {
    if (v.active === false) return
    for (let color_area of v.colors) {
      if (color_area.mouseover(v.cursor_x, v.cursor_y) && v.pressed) {
        color = color_area.color
        v.color_display.color = color
        eraser = false
      }
    }
  },

  draw (v) {
    v.color_display.draw(v.ctx)
    for (let color_area of v.colors) color_area.draw(v.ctx)
  }
})