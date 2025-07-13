class Canvas {
  constructor (name, engine = {}) {
    this.name = name
    this.engine = engine
    Canvas.push(this)
  }

  load () {
    
    this.variables = {
      canvas: document.createElement('canvas'),
      width: 100,
      height: 100,
      background: false
    }

    document.querySelector('body').appendChild(this.variables.canvas)

    this.variables = Object.assign(this.variables, this.engine.variables)
    this.init = (typeof this.engine.init == 'function') ? this.engine.init : (() => {})
    this.calc = (typeof this.engine.calc == 'function') ? this.engine.calc : (() => {})
    this.draw = (typeof this.engine.draw == 'function') ? this.engine.draw : (() => {})
    this.actions = (typeof this.engine.actions == 'object') ? this.engine.actions : {}

    if (this.variables.cursor === false) this.variables.canvas.classList.add('cursor-none')
    if (this.variables.background) this.variables.canvas.style.background = this.variables.background

    this.variables.ctx = this.variables.canvas.getContext('2d')
    
    this.variables.width = this.variables.canvas.width = this.variables.width
    this.variables.height = this.variables.canvas.height = this.variables.height

    this.running = false
    this.interval = undefined

    this.variables.cursor_x = undefined
    this.variables.cursor_y = undefined
    this.variables.cursor_in = false
    this.variables.pressed = false

    this.set_listeners()
  }

  start() {
    this.running = true
    this.run_init()
    this.interval = setInterval(() => this.run_calc(), FPS)
  }

  stop() {
    this.running = false
    this.clear_interval()
  }

  clear_interval() {
    if (typeof this.interval != 'undefined') clearInterval(this.interval)
  }

  run_init () {
    if (typeof this.init == 'function') this.init(this.variables)
  }

  run_calc () {
    if (this.running === false) return
    if (typeof this.calc == 'function') this.calc(this.variables)
  }

  run_draw () {
    if (this.running === false) return
    if (typeof this.draw != 'function') return
    this.variables.ctx.clearRect(0, 0, this.variables.width, this.variables.height)
    this.draw(this.variables)
  }

  set_listeners () {
    let canvas_instance = this
    
    this.variables.canvas.addEventListener('mouseenter', function () {
      canvas_instance.variables.cursor_in = true
    })
    
    this.variables.canvas.addEventListener('mouseleave', function () {
      canvas_instance.variables.cursor_in = false
    })
    
    this.variables.canvas.addEventListener('mousedown', function () {
      canvas_instance.variables.pressed = true
    })
    
    this.variables.canvas.addEventListener('mouseup', function () {
      canvas_instance.variables.pressed = false
    })
    
    this.variables.canvas.addEventListener('mousemove', function (e) {
      canvas_instance.variables.cursor_x = e.offsetX
      canvas_instance.variables.cursor_y = e.offsetY
    })
  }

  do (action) { if (typeof this.actions[action] == 'function') this.actions[action](this.variables) }

  base64 (mime) { return this.variables.canvas.toDataURL(`image/${mime}`) }

  static _all = []

  static push (canvas) {
    if (typeof this.all == 'undefined') this._all = []
    this._all.push(canvas)
  }

  static all () {
    let args = [...arguments]
    let action = args.shift()
    if (action == 'start') this.run_draw()
    for (let canvas of this._all) canvas[action](args)
  }

  static run_draw () {
    for (let canvas of this._all) canvas.run_draw()
    window.requestAnimationFrame(() => this.run_draw())
  }

  static hard_find (canvas_name) {
    return this._all.filter(c => (c.name == canvas_name))[0]
  }
}
