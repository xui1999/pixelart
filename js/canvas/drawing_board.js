new Canvas('drawing_board', {

  variables: {
    width: 400,
    height: 400,
    tile_size: 10,
    rows: undefined,
    cols: undefined,
    pixel_x: undefined,
    pixel_y: undefined,
    points: [],
    point_inserted: false,
    cursor: false,
    background: '#333'
  },

  actions: {
    clear(v) {
      v.points = []
    }
  },

  init (v) {
    v.cols = v.width / v.tile_size
    v.rows = v.height / v.tile_size
  },

  calc (v) {
    if (v.cursor_in) {
      v.pixel_x = Math.floor(v.cursor_x / v.tile_size) * v.tile_size
      v.pixel_y = Math.floor(v.cursor_y / v.tile_size) * v.tile_size

      if (v.pressed && eraser === false) {
        
        if (v.point_inserted && v.points.length) {
          let {x, y} = v.points.at(-1)
          if (x != v.pixel_x || y != v.pixel_y) v.point_inserted = false 
        } 

        if (v.point_inserted === false) {
          v.points.push({x: v.pixel_x, y: v.pixel_y, c: color})
          v.point_inserted = true
        }

      } else {
        v.point_inserted = false
      }

      if (v.pressed && eraser === true) {
        let to_remove_indexes = []

        for (let index in v.points) {
          let point = v.points[index]
          if (point.x == v.pixel_x && point.y == v.pixel_y) to_remove_indexes.push(index)
        }

        for (let index of to_remove_indexes.reverse()) {
          v.points.splice(index, 1)
        }
      }
    }
  },

  draw (v) {
    for (let {x, y, c} of v.points) {
      v.ctx.fillStyle = c
      v.ctx.fillRect(x, y, v.tile_size, v.tile_size)
    }

    if (v.cursor_in) {
      v.ctx.fillStyle = 'white'
      v.ctx.fillRect(v.pixel_x, v.pixel_y, v.tile_size, v.tile_size)
    }
  }
})
