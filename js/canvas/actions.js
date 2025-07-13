new Canvas ('actions', {

  variables: {
    width: 100,
    height: 400,
    buttons: [],
    prevend_multiple_click: false
  },

  init (v) {
    v.buttons = [
      {
        text: 'eraser',
        area: new Area(10, 10, 80, 30),
        onclick (b) {
          eraser = !eraser
          b.area.color = eraser ? 'lightgray' : '#333'
          b.text.color = eraser ? '#333' : 'lightgray'
          Canvas.hard_find('color_picker').do(eraser ? 'disable' : 'enable')
        }
      },
      {
        text: 'clear',
        area: new Area(10, 50, 80, 30),
        onclick () {
          Canvas.hard_find('drawing_board').do('clear')
        }
      },
      {
        text: 'save',
        area: new Area(10, 90, 80, 30),
        onclick () {
          let a = document.createElement('a')
          a.setAttribute('href', Canvas.hard_find('drawing_board').base64('png'))
          a.setAttribute('download', 'perfect_pixelart.png')
          a.click()
          a.remove()
        }
      },
    ]

    for (let button of v.buttons) {
      button.area.color = '#333'
      button.text = new Text(button.text, button.area)
      button.text.center(v.ctx)
    }
  },

  calc (v) {
    if (v.pressed) {
      if (v.prevend_multiple_click === false) {
        v.prevend_multiple_click = true
        for (let button of v.buttons) {
          if (button.area.mouseover(v.cursor_x, v.cursor_y)) {
            button.onclick(button)
          }
        }
      }
    } else {
      v.prevend_multiple_click = false
    }
  },

  draw (v) {
    for (let button of v.buttons) {
      button.area.draw(v.ctx)
      button.text.draw(v.ctx)
    }
  }
})
