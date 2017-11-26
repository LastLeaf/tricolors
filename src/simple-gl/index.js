const rectVs = require('./rect.v.glsl')
const rectFs = require('./rect.f.glsl')

const createVertexShader = (gl, src) => {
  let shaderLog = ''
  const shader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    shaderLog = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error('Failed initializing WebGL vertex shader: ' + shaderLog)
  }
  return shader
}

const createFragmentShader = (gl, src) => {
  let shaderLog = ''
  const shader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    shaderLog = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error('Failed initializing WebGL fragment shader: ' + shaderLog)
  }
  return shader
}

const createShaderProgram = (gl, vs, fs) => {
  var shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vs)
  gl.attachShader(shaderProgram, fs)
  gl.linkProgram(shaderProgram)
  if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw new Error('Failed initializing WebGL shader program.')
  }
  return shaderProgram
}

class SimpleAttribBuffer {
  constructor(gl, shaderProgram, attribName, size, count) {
    this._gl = gl
    this._size = size
    this._count = count
    const glBuf = this._glBuf = gl.createBuffer()
    const buf = this._buf = new window.Float32Array(size * count)
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuf)
    gl.bufferData(gl.ARRAY_BUFFER, buf, gl.DYNAMIC_DRAW)
    const attribLocation = gl.getAttribLocation(shaderProgram, attribName)
    gl.enableVertexAttribArray(attribLocation)
    gl.vertexAttribPointer(attribLocation, size, gl.FLOAT, false, 0, 0)
  }
  getFloat32Array() {
    return this._buf
  }
  write() {
    const gl = this._gl
    gl.bindBuffer(gl.ARRAY_BUFFER, this._glBuf)
    gl.bufferData(gl.ARRAY_BUFFER, this._buf, gl.DYNAMIC_DRAW)
  }
}

class SimpleUniform {
  constructor(gl, shaderProgram, uniformName, size) {
    this._gl = gl
    this._size = size
    this._loc = gl.getUniformLocation(shaderProgram, uniformName)
  }
  set(x, y, z, w) {
    const gl = this._gl
    const size = this._size
    if (size === 1) {
      gl.uniform1f(this._loc, x)
    } else if (size === 2) {
      gl.uniform2f(this._loc, x, y)
    } else if (size === 3) {
      gl.uniform3f(this._loc, x, y, z)
    } else {
      gl.uniform4f(this._loc, x, y, z, w)
    }
  }
}

class SimpleGLObject {
  constructor(simpleGL) {
    this._gl = simpleGL._gl
    this.alpha = 1
    this._bindings = Object.create(null)
  }
  setAlpha(alpha) {
    this.alpha = alpha
    return this
  }
  blendMode(s, d, c) {
    const gl = this._gl
    this._blendMode = [gl[s], gl[d], c]
    return this
  }
  _prepareObject() {
    const gl = this._gl
    this._triggerBinding('draw')
    const blendMode = this._blendMode
    if (blendMode) {
      if(blendMode[2]) gl.blendColor(blendMode[2][0], blendMode[2][1], blendMode[2][2], blendMode[2][3])
      gl.blendFunc(blendMode[0], blendMode[1])
    } else {
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    }
  }
  bind(name, cb) {
    if (!this._bindings[name]) {
      this._bindings[name] = [cb]
    } else {
      this._bindings[name].push(cb)
    }
    return this
  }
  _triggerBinding(name, detail) {
    const arr = this._bindings[name]
    if (!arr) return
    arr.forEach((func) => {
      func.call(this, detail)
    })
  }
  emit(pos, name, detail) {
    this._handleEvent(pos, name, detail)
  }
  // eslint-disable-next-line class-methods-use-this
  _handleEvent(pos, name, detail) {
    throw new Error('Not implemented')
  }
}

class SimpleRect extends SimpleGLObject {
  static _init(simpleGL) {
    const gl = simpleGL._gl
    const vs = createVertexShader(gl, rectVs)
    const fs = createFragmentShader(gl, rectFs)
    const shaderProgram = createShaderProgram(gl, vs, fs)
    gl.useProgram(shaderProgram)
    const uCanvasSize = gl.getUniformLocation(shaderProgram, 'uCanvasSize')
    gl.uniform2f(uCanvasSize, simpleGL._width, simpleGL._height)
    simpleGL._rectGL = {
      shaderProgram,
      aPoint: new SimpleAttribBuffer(gl, shaderProgram, 'aPoint', 2, 4),
      uColor: new SimpleUniform(gl, shaderProgram, 'uColor', 4),
    }
  }
  constructor(simpleGL, x = 0, y = 0, w = 0, h = 0) {
    super(simpleGL)
    this._simpleGL = simpleGL
    this._gl = simpleGL._gl
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.r = 0
    this.g = 0
    this.b = 0
    this.a = 0
  }
  color(r, g, b, a) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    return this
  }
  pos(x, y) {
    this.x = x
    this.y = y
    return this
  }
  size(w, h) {
    this.w = w
    this.h = h
    return this
  }
  _draw(relX, relY, relAlpha) {
    const gl = this._gl
    const info = this._simpleGL._rectGL
    gl.useProgram(info.shaderProgram)
    this._prepareObject()
    const aPoint = info.aPoint.getFloat32Array()
    const {x, y, w, h, r, g, b, a} = this
    aPoint[0] = relX + x
    aPoint[1] = relY + y
    aPoint[2] = relX + x
    aPoint[3] = relY + y + h
    aPoint[4] = relX + x + w
    aPoint[5] = relY + y + h
    aPoint[6] = relX + x + w
    aPoint[7] = relY + y
    info.aPoint.write()
    info.uColor.set(r, g, b, a * this.alpha * relAlpha)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
  }
  _handleEvent(pos, name, detail) {
    if (pos.x < this.x) return
    if (pos.x >= this.x + this.w) return
    if (pos.y < this.y) return
    if (pos.y >= this.y + this.h) return
    this._triggerBinding(name, detail)
  }
}

class SimpleContainer extends SimpleGLObject {
  constructor(simpleGL, x = 0, y = 0) {
    super(simpleGL)
    this._simpleGL = simpleGL
    this._gl = simpleGL._gl
    this.x = x
    this.y = y
    this._children = []
  }
  pos(x, y) {
    this.x = x
    this.y = y
    return this
  }
  blendMode(s, d, c) {
    this._children.forEach((item) => {
      item.blendMode(s, d, c)
    })
    return this
  }
  forEachChild(func) {
    return this._children.forEach(func)
  }
  index(i) {
    return this._children[i]
  }
  append(child) {
    this._children.push(child)
    return this
  }
  prepend(child) {
    this._children.unshift(child)
    return this
  }
  insert(child, before) {
    const index = this._children.indexOf(before)
    if (index >= 0) this._children.splice(index, 0, child)
    return this
  }
  remove(child) {
    const index = this._children.indexOf(child)
    if (index >= 0) this._children.splice(index, 1)
    return this
  }
  clear() {
    while(this._children.length) this._children.shift()
    return this
  }
  _draw(relX, relY, relAlpha) {
    this._prepareObject()
    this._children.forEach((node) => {
      node._draw(relX + this.x, relY + this.y, this.alpha * relAlpha)
    })
  }
  _handleEvent(pos, name, detail) {
    this._children.forEach((node) => {
      node._handleEvent({
        x: pos.x - this.x,
        y: pos.y - this.y
      }, name, detail)
    })
  }
}

export class SimpleGL {
  constructor(canvas) {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0.0, 0.0, 0.0, 0.0)
    gl.clearDepth(1)
    this._canvas = canvas
    this._gl = gl
    this._width = canvas.width
    this._height = canvas.height
    this._rootContainer = new SimpleContainer(this, 0, 0)
    SimpleRect._init(this)
    this.setAutoUpdate(true)
  }
  setAutoUpdate(status) {
    this._autoUpdate = status
    if (status) {
      const checkUpdate = () => {
        this._scheduledChecking = false
        if (!this._autoUpdate) return
        requestAnimationFrame(checkUpdate)
        this._scheduledChecking = true
        this.update()
      }
      if (!this._scheduledChecking) {
        requestAnimationFrame(checkUpdate)
        this._scheduledChecking = true
      }
    }
  }
  update() {
    const gl = this._gl
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    this._rootContainer._draw(0, 0, 1)
  }
  getRootContainer() {
    return this._rootContainer
  }
  createContainer(...args) {
    return new SimpleContainer(this, ...args)
  }
  createRect(...args) {
    return new SimpleRect(this, ...args)
  }
}
