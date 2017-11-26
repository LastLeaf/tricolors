var game =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.changeOrientation = undefined;

var _simpleGl = __webpack_require__(1);

var _tiles = __webpack_require__(4);

var _tiles2 = _interopRequireDefault(_tiles);

var _cover = __webpack_require__(12);

var _cover2 = _interopRequireDefault(_cover);

var _tutorial = __webpack_require__(15);

var _tutorial2 = _interopRequireDefault(_tutorial);

var _tutorial3 = __webpack_require__(16);

var _tutorial4 = _interopRequireDefault(_tutorial3);

var _tutorial5 = __webpack_require__(17);

var _tutorial6 = _interopRequireDefault(_tutorial5);

var _generator = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tileUtils = null;

/* eslint-disable no-use-before-define */

var changeOrientation = exports.changeOrientation = function changeOrientation(isVertical) {
  tileUtils.changeOrientation(isVertical);
};

var init = exports.init = function init(canvas, isVertical) {
  var stage = new _simpleGl.SimpleGL(canvas);
  var root = stage.getRootContainer();

  // init main container for tiles
  var mainContainer = stage.createContainer();
  tileUtils = (0, _tiles2.default)(stage, mainContainer);
  if (isVertical) tileUtils.changeOrientation(isVertical);

  // init cover
  var coverContainer = stage.createContainer();
  var coverUtils = (0, _cover2.default)(stage, coverContainer);
  if (isVertical) coverUtils.changeOrientation(isVertical);
  coverUtils.onSelect(function (type) {
    if (type === 'tutorial') {
      root.clear().append(mainContainer);
      var levels = [_tutorial2.default, _tutorial4.default, _tutorial6.default];
      var nextLevel = function nextLevel(item) {
        if (!levels.length) return showCover();
        tileUtils.loadLevel(levels.shift(), function (info) {
          nextLevel();
        });
      };
      nextLevel();
    } else if (type === 'endless') {
      var levelNum = 0;
      root.clear().append(mainContainer);
      var _nextLevel = function _nextLevel(_ref) {
        var timeUsed = _ref.timeUsed;

        tileUtils.loadLevel((0, _generator.endless)({
          level: ++levelNum,
          timeUsed: timeUsed
        }), _nextLevel);
      };
      _nextLevel({
        timeUsed: 0
      });
    } else {
      window.open('https://github.com/LastLeaf/tricolors');
    }
  });

  var showCover = function showCover() {
    root.clear().append(coverContainer);
  };
  showCover();

  return stage;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rectVs = __webpack_require__(2);
var rectFs = __webpack_require__(3);

var createVertexShader = function createVertexShader(gl, src) {
  var shaderLog = '';
  var shader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    shaderLog = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error('Failed initializing WebGL vertex shader: ' + shaderLog);
  }
  return shader;
};

var createFragmentShader = function createFragmentShader(gl, src) {
  var shaderLog = '';
  var shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    shaderLog = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error('Failed initializing WebGL fragment shader: ' + shaderLog);
  }
  return shader;
};

var createShaderProgram = function createShaderProgram(gl, vs, fs) {
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vs);
  gl.attachShader(shaderProgram, fs);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw new Error('Failed initializing WebGL shader program.');
  }
  return shaderProgram;
};

var SimpleAttribBuffer = function () {
  function SimpleAttribBuffer(gl, shaderProgram, attribName, size, count) {
    _classCallCheck(this, SimpleAttribBuffer);

    this._gl = gl;
    this._size = size;
    this._count = count;
    var glBuf = this._glBuf = gl.createBuffer();
    var buf = this._buf = new window.Float32Array(size * count);
    gl.bindBuffer(gl.ARRAY_BUFFER, glBuf);
    gl.bufferData(gl.ARRAY_BUFFER, buf, gl.DYNAMIC_DRAW);
    var attribLocation = gl.getAttribLocation(shaderProgram, attribName);
    gl.enableVertexAttribArray(attribLocation);
    gl.vertexAttribPointer(attribLocation, size, gl.FLOAT, false, 0, 0);
  }

  _createClass(SimpleAttribBuffer, [{
    key: 'getFloat32Array',
    value: function getFloat32Array() {
      return this._buf;
    }
  }, {
    key: 'write',
    value: function write() {
      var gl = this._gl;
      gl.bindBuffer(gl.ARRAY_BUFFER, this._glBuf);
      gl.bufferData(gl.ARRAY_BUFFER, this._buf, gl.DYNAMIC_DRAW);
    }
  }]);

  return SimpleAttribBuffer;
}();

var SimpleUniform = function () {
  function SimpleUniform(gl, shaderProgram, uniformName, size) {
    _classCallCheck(this, SimpleUniform);

    this._gl = gl;
    this._size = size;
    this._loc = gl.getUniformLocation(shaderProgram, uniformName);
  }

  _createClass(SimpleUniform, [{
    key: 'set',
    value: function set(x, y, z, w) {
      var gl = this._gl;
      var size = this._size;
      if (size === 1) {
        gl.uniform1f(this._loc, x);
      } else if (size === 2) {
        gl.uniform2f(this._loc, x, y);
      } else if (size === 3) {
        gl.uniform3f(this._loc, x, y, z);
      } else {
        gl.uniform4f(this._loc, x, y, z, w);
      }
    }
  }]);

  return SimpleUniform;
}();

var SimpleGLObject = function () {
  function SimpleGLObject(simpleGL) {
    _classCallCheck(this, SimpleGLObject);

    this._gl = simpleGL._gl;
    this.alpha = 1;
    this._bindings = Object.create(null);
  }

  _createClass(SimpleGLObject, [{
    key: 'setAlpha',
    value: function setAlpha(alpha) {
      this.alpha = alpha;
      return this;
    }
  }, {
    key: 'blendMode',
    value: function blendMode(s, d, c) {
      var gl = this._gl;
      this._blendMode = [gl[s], gl[d], c];
      return this;
    }
  }, {
    key: '_prepareObject',
    value: function _prepareObject() {
      var gl = this._gl;
      this._triggerBinding('draw');
      var blendMode = this._blendMode;
      if (blendMode) {
        if (blendMode[2]) gl.blendColor(blendMode[2][0], blendMode[2][1], blendMode[2][2], blendMode[2][3]);
        gl.blendFunc(blendMode[0], blendMode[1]);
      } else {
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      }
    }
  }, {
    key: 'bind',
    value: function bind(name, cb) {
      if (!this._bindings[name]) {
        this._bindings[name] = [cb];
      } else {
        this._bindings[name].push(cb);
      }
      return this;
    }
  }, {
    key: '_triggerBinding',
    value: function _triggerBinding(name, detail) {
      var _this = this;

      var arr = this._bindings[name];
      if (!arr) return;
      arr.forEach(function (func) {
        func.call(_this, detail);
      });
    }
  }, {
    key: 'emit',
    value: function emit(pos, name, detail) {
      this._handleEvent(pos, name, detail);
    }
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: '_handleEvent',
    value: function _handleEvent(pos, name, detail) {
      throw new Error('Not implemented');
    }
  }]);

  return SimpleGLObject;
}();

var SimpleRect = function (_SimpleGLObject) {
  _inherits(SimpleRect, _SimpleGLObject);

  _createClass(SimpleRect, null, [{
    key: '_init',
    value: function _init(simpleGL) {
      var gl = simpleGL._gl;
      var vs = createVertexShader(gl, rectVs);
      var fs = createFragmentShader(gl, rectFs);
      var shaderProgram = createShaderProgram(gl, vs, fs);
      gl.useProgram(shaderProgram);
      var uCanvasSize = gl.getUniformLocation(shaderProgram, 'uCanvasSize');
      gl.uniform2f(uCanvasSize, simpleGL._width, simpleGL._height);
      simpleGL._rectGL = {
        shaderProgram: shaderProgram,
        aPoint: new SimpleAttribBuffer(gl, shaderProgram, 'aPoint', 2, 4),
        uColor: new SimpleUniform(gl, shaderProgram, 'uColor', 4)
      };
    }
  }]);

  function SimpleRect(simpleGL) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var h = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, SimpleRect);

    var _this2 = _possibleConstructorReturn(this, (SimpleRect.__proto__ || Object.getPrototypeOf(SimpleRect)).call(this, simpleGL));

    _this2._simpleGL = simpleGL;
    _this2._gl = simpleGL._gl;
    _this2.x = x;
    _this2.y = y;
    _this2.w = w;
    _this2.h = h;
    _this2.r = 0;
    _this2.g = 0;
    _this2.b = 0;
    _this2.a = 0;
    return _this2;
  }

  _createClass(SimpleRect, [{
    key: 'color',
    value: function color(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      return this;
    }
  }, {
    key: 'pos',
    value: function pos(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }
  }, {
    key: 'size',
    value: function size(w, h) {
      this.w = w;
      this.h = h;
      return this;
    }
  }, {
    key: '_draw',
    value: function _draw(relX, relY, relAlpha) {
      var gl = this._gl;
      var info = this._simpleGL._rectGL;
      gl.useProgram(info.shaderProgram);
      this._prepareObject();
      var aPoint = info.aPoint.getFloat32Array();
      var x = this.x,
          y = this.y,
          w = this.w,
          h = this.h,
          r = this.r,
          g = this.g,
          b = this.b,
          a = this.a;

      aPoint[0] = relX + x;
      aPoint[1] = relY + y;
      aPoint[2] = relX + x;
      aPoint[3] = relY + y + h;
      aPoint[4] = relX + x + w;
      aPoint[5] = relY + y + h;
      aPoint[6] = relX + x + w;
      aPoint[7] = relY + y;
      info.aPoint.write();
      info.uColor.set(r, g, b, a * this.alpha * relAlpha);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
  }, {
    key: '_handleEvent',
    value: function _handleEvent(pos, name, detail) {
      if (pos.x < this.x) return;
      if (pos.x >= this.x + this.w) return;
      if (pos.y < this.y) return;
      if (pos.y >= this.y + this.h) return;
      this._triggerBinding(name, detail);
    }
  }]);

  return SimpleRect;
}(SimpleGLObject);

var SimpleContainer = function (_SimpleGLObject2) {
  _inherits(SimpleContainer, _SimpleGLObject2);

  function SimpleContainer(simpleGL) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, SimpleContainer);

    var _this3 = _possibleConstructorReturn(this, (SimpleContainer.__proto__ || Object.getPrototypeOf(SimpleContainer)).call(this, simpleGL));

    _this3._simpleGL = simpleGL;
    _this3._gl = simpleGL._gl;
    _this3.x = x;
    _this3.y = y;
    _this3._children = [];
    return _this3;
  }

  _createClass(SimpleContainer, [{
    key: 'pos',
    value: function pos(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }
  }, {
    key: 'blendMode',
    value: function blendMode(s, d, c) {
      this._children.forEach(function (item) {
        item.blendMode(s, d, c);
      });
      return this;
    }
  }, {
    key: 'forEachChild',
    value: function forEachChild(func) {
      return this._children.forEach(func);
    }
  }, {
    key: 'index',
    value: function index(i) {
      return this._children[i];
    }
  }, {
    key: 'append',
    value: function append(child) {
      this._children.push(child);
      return this;
    }
  }, {
    key: 'prepend',
    value: function prepend(child) {
      this._children.unshift(child);
      return this;
    }
  }, {
    key: 'insert',
    value: function insert(child, before) {
      var index = this._children.indexOf(before);
      if (index >= 0) this._children.splice(index, 0, child);
      return this;
    }
  }, {
    key: 'remove',
    value: function remove(child) {
      var index = this._children.indexOf(child);
      if (index >= 0) this._children.splice(index, 1);
      return this;
    }
  }, {
    key: 'clear',
    value: function clear() {
      while (this._children.length) {
        this._children.shift();
      }return this;
    }
  }, {
    key: '_draw',
    value: function _draw(relX, relY, relAlpha) {
      var _this4 = this;

      this._prepareObject();
      this._children.forEach(function (node) {
        node._draw(relX + _this4.x, relY + _this4.y, _this4.alpha * relAlpha);
      });
    }
  }, {
    key: '_handleEvent',
    value: function _handleEvent(pos, name, detail) {
      var _this5 = this;

      this._children.forEach(function (node) {
        node._handleEvent({
          x: pos.x - _this5.x,
          y: pos.y - _this5.y
        }, name, detail);
      });
    }
  }]);

  return SimpleContainer;
}(SimpleGLObject);

var SimpleGL = exports.SimpleGL = function () {
  function SimpleGL(canvas) {
    _classCallCheck(this, SimpleGL);

    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clearDepth(1);
    this._canvas = canvas;
    this._gl = gl;
    this._width = canvas.width;
    this._height = canvas.height;
    this._rootContainer = new SimpleContainer(this, 0, 0);
    SimpleRect._init(this);
    this.setAutoUpdate(true);
  }

  _createClass(SimpleGL, [{
    key: 'setAutoUpdate',
    value: function setAutoUpdate(status) {
      var _this6 = this;

      this._autoUpdate = status;
      if (status) {
        var checkUpdate = function checkUpdate() {
          _this6._scheduledChecking = false;
          if (!_this6._autoUpdate) return;
          requestAnimationFrame(checkUpdate);
          _this6._scheduledChecking = true;
          _this6.update();
        };
        if (!this._scheduledChecking) {
          requestAnimationFrame(checkUpdate);
          this._scheduledChecking = true;
        }
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var gl = this._gl;
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      this._rootContainer._draw(0, 0, 1);
    }
  }, {
    key: 'getRootContainer',
    value: function getRootContainer() {
      return this._rootContainer;
    }
  }, {
    key: 'createContainer',
    value: function createContainer() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(SimpleContainer, [null].concat([this], args)))();
    }
  }, {
    key: 'createRect',
    value: function createRect() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return new (Function.prototype.bind.apply(SimpleRect, [null].concat([this], args)))();
    }
  }]);

  return SimpleGL;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 aPoint;\r\nuniform vec2 uCanvasSize;\r\n\r\nvoid main(void) {\r\n  gl_Position = vec4(aPoint * mat2( 2.0/uCanvasSize.x,0, 0,-2.0/uCanvasSize.y ) + vec2(-1, 1), 0, 1);\r\n}\r\n"

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "uniform highp vec4 uColor;\r\n\r\nvoid main(void) {\r\n  gl_FragColor = uColor;\r\n}\r\n"

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (stage, mainContainer) {
  // game states
  var userClickEnabled = false;
  var userColor = _consts.R | _consts.G | _consts.B;
  var map = null;
  var steps = [];
  var startTime = 0;
  var timeTobj = null;
  var currentTutorialStep = null;
  var tutorialSteps = null;
  var levelEndCb = null;

  // base containers
  var tilesContainer = stage.createContainer();
  mainContainer.append(tilesContainer);
  tilesContainer.pos(1920 - 1080 + TILE_AREA_MARGIN, TILE_AREA_MARGIN);
  var bgContainer = stage.createContainer();
  var fgContainer = stage.createContainer();
  var animateContainer = stage.createContainer();
  var tutorialContainer = stage.createContainer();
  tilesContainer.append(tutorialContainer).append(bgContainer).append(fgContainer).append(animateContainer);

  // meta containers
  var metaContainer = stage.createContainer();
  mainContainer.append(metaContainer);
  metaContainer.pos(TILE_AREA_MARGIN, TILE_AREA_MARGIN);
  var colorHintContainer = stage.createContainer(0, 1080 - TILE_AREA_MARGIN * 2 - 200);
  var levelInfoContainer = stage.createContainer(0, 40);
  var userColorSelectContainer = stage.createContainer(0, 1080 - TILE_AREA_MARGIN * 2);
  metaContainer.append(colorHintContainer).append(levelInfoContainer).append(userColorSelectContainer);

  // add background tiles
  var drawBackground = function drawBackground() {
    for (var j = 0; j < M_N_MAX; j++) {
      // eslint-disable-next-line no-loop-func
      for (var i = 0; i < M_N_MAX; i++) {
        (function (i, j) {
          var _stage$createRect;

          var _toPixelPos = toPixelPos(i, j),
              x = _toPixelPos.x,
              y = _toPixelPos.y;

          var tile = (_stage$createRect = stage.createRect(x, y, TILE_SIZE, TILE_SIZE)).color.apply(_stage$createRect, _toConsumableArray(_consts.COLOR_BG_ARR));
          bgContainer.append(tile);
          tile.bind('click', function () {
            handleUserClick(i, j);
          });
        })(i, j);
      }
    }
  };
  drawBackground();

  // draw foreground tiles
  var initTileContainers = function initTileContainers() {
    for (var j = 0; j < M_N_MAX; j++) {
      for (var i = 0; i < M_N_MAX; i++) {
        var _toPixelPos2 = toPixelPos(i, j),
            x = _toPixelPos2.x,
            y = _toPixelPos2.y;

        var singleTileContainer = stage.createContainer(x, y);
        fgContainer.append(singleTileContainer);
      }
    }
  };
  initTileContainers();
  var refreshTiles = function refreshTiles() {
    for (var j = 0; j < M_N_MAX; j++) {
      for (var i = 0; i < M_N_MAX; i++) {
        var num = map[j][i];
        var singleTileContainer = fgContainer.index(j * M_N_MAX + i);
        singleTileContainer.clear();
        if (num & _consts.R) {
          var _stage$createRect2;

          var rect = (_stage$createRect2 = stage.createRect(0, 0, TILE_SIZE, TILE_SIZE)).color.apply(_stage$createRect2, _toConsumableArray(_consts.COLOR_R_ARR)).blendMode('SRC_ALPHA', 'ONE');
          rect.tileType = _consts.R;
          singleTileContainer.append(rect);
        }
        if (num & _consts.G) {
          var _stage$createRect3;

          var _rect = (_stage$createRect3 = stage.createRect(0, 0, TILE_SIZE, TILE_SIZE)).color.apply(_stage$createRect3, _toConsumableArray(_consts.COLOR_G_ARR)).blendMode('SRC_ALPHA', 'ONE');
          _rect.tileType = _consts.G;
          singleTileContainer.append(_rect);
        }
        if (num & _consts.B) {
          var _stage$createRect4;

          var _rect2 = (_stage$createRect4 = stage.createRect(0, 0, TILE_SIZE, TILE_SIZE)).color.apply(_stage$createRect4, _toConsumableArray(_consts.COLOR_B_ARR)).blendMode('SRC_ALPHA', 'ONE');
          _rect2.tileType = _consts.B;
          singleTileContainer.append(_rect2);
        }
      }
    }
  };

  // show user color status
  var colorSelectButtons = [];
  var colorHints = {};
  var resetMetaContainer = function resetMetaContainer() {
    colorSelectButtons = [];
    colorHintContainer.clear();
    levelInfoContainer.clear();
    userColorSelectContainer.clear();
  };
  var showTitle = function showTitle(titleText, maxColor) {
    var TITLE_SIZE = 100;
    var TIME_SIZE = 40;
    var TITLE_COLOR_ARR = [0.5, 0.5, 0.5, 1];
    var titleContainer = (0, _texts.createTexts)(stage, titleText, TITLE_SIZE, TITLE_COLOR_ARR);
    var timeContainer = stage.createContainer(0, TITLE_SIZE + 20);
    levelInfoContainer.append(titleContainer).append(timeContainer);
    timeTobj = setInterval(function () {
      var timeDiff = Math.floor((Date.now() - startTime) / 1000);
      var minuteStr = (timeDiff < 600 ? '0' : '') + Math.floor(timeDiff / 60);
      var secondStr = ':' + String(timeDiff % 60 + 100).slice(1);
      timeContainer.clear();
      timeContainer.append((0, _texts.createTexts)(stage, minuteStr + secondStr, TIME_SIZE, TITLE_COLOR_ARR));
    }, 1000);
  };
  var showMapInfo = function showMapInfo(str) {
    var mapInfoContainer = (0, _texts.createTexts)(stage, str, 30, [0.3, 0.3, 0.3, 1]).pos(0, -60);
    levelInfoContainer.append(mapInfoContainer);
  };
  var refreshColorSelectButtons = function refreshColorSelectButtons() {
    colorSelectButtons.forEach(function (btn) {
      if (userColor === btn.userColor) (0, _buttons.activateButton)(btn);else (0, _buttons.deactivateButton)(btn);
    });
    colorHintContainer.clear();
    if (colorHints[userColor]) colorHintContainer.append(colorHints[userColor]);
  };
  var drawColorHint = function drawColorHint(maxColor) {
    var SIZE = 60;
    var INTERVAL = 2.25 * 60;
    var INITIAL_X = 22.5;
    var y = 0;[_consts.R | _consts.G, _consts.R | _consts.B, _consts.G | _consts.B, _consts.R | _consts.G | _consts.B].forEach(function (c) {
      if (maxColor & c) {
        var rowOffset = -10;
        var container = stage.createContainer(rowOffset, 0);
        var text = (0, _texts.createTexts)(stage, c === (_consts.R | _consts.G | _consts.B) ? '  +  +  =' : '  +  =', SIZE, [0.5, 0.5, 0.5, 1]);
        container.append(text.pos(0, y));
        var x = INITIAL_X;
        var endX = INITIAL_X + INTERVAL * (c === (_consts.R | _consts.G | _consts.B) ? 3 : 2);
        if (c & _consts.R) {
          var _stage$createRect5, _stage$createRect6;

          container.append((_stage$createRect5 = stage.createRect(x, y, SIZE, SIZE)).color.apply(_stage$createRect5, _toConsumableArray(_consts.COLOR_R_ARR)).blendMode('SRC_ALPHA', 'ONE'));
          container.append((_stage$createRect6 = stage.createRect(endX, y, SIZE, SIZE)).color.apply(_stage$createRect6, _toConsumableArray(_consts.COLOR_R_ARR)).blendMode('SRC_ALPHA', 'ONE'));
          x += INTERVAL;
        }
        if (c & _consts.G) {
          var _stage$createRect7, _stage$createRect8;

          container.append((_stage$createRect7 = stage.createRect(x, y, SIZE, SIZE)).color.apply(_stage$createRect7, _toConsumableArray(_consts.COLOR_G_ARR)).blendMode('SRC_ALPHA', 'ONE'));
          container.append((_stage$createRect8 = stage.createRect(endX, y, SIZE, SIZE)).color.apply(_stage$createRect8, _toConsumableArray(_consts.COLOR_G_ARR)).blendMode('SRC_ALPHA', 'ONE'));
          x += INTERVAL;
        }
        if (c & _consts.B) {
          var _stage$createRect9, _stage$createRect10;

          container.append((_stage$createRect9 = stage.createRect(x, y, SIZE, SIZE)).color.apply(_stage$createRect9, _toConsumableArray(_consts.COLOR_B_ARR)).blendMode('SRC_ALPHA', 'ONE'));
          container.append((_stage$createRect10 = stage.createRect(endX, y, SIZE, SIZE)).color.apply(_stage$createRect10, _toConsumableArray(_consts.COLOR_B_ARR)).blendMode('SRC_ALPHA', 'ONE'));
          x += INTERVAL;
        }
        colorHints[c] = container;
      }
    });
  };
  var drawUserColorSelect = function drawUserColorSelect(maxColor) {
    var SPACING = 30;
    var BORDER_SIZE = 10;
    var SIZE = 60;
    var x = 0;
    var y = -BORDER_SIZE * 2 - SIZE;
    var btns = colorSelectButtons = []
    // eslint-disable-next-line no-loop-func
    ;[_consts.R, _consts.G, _consts.B, _consts.R | _consts.G, _consts.R | _consts.B, _consts.G | _consts.B, _consts.R | _consts.G | _consts.B].forEach(function (c, index) {
      if ((maxColor & c) === c) {
        var _stage$createRect11, _stage$createRect12, _stage$createRect13;

        var btn = (0, _buttons.createButton)(stage, SIZE, SIZE, BORDER_SIZE, function () {
          if (currentTutorialStep && (currentTutorialStep[0] !== -1 || currentTutorialStep[1] !== index)) return;
          userColor = c;
          refreshColorSelectButtons();
          acceptUserClick();
        }).pos(x + BORDER_SIZE, y + BORDER_SIZE);
        btn.userColor = c;
        btns.push(btn);
        userColorSelectContainer.append(btn);
        if (c & _consts.R) userColorSelectContainer.append((_stage$createRect11 = stage.createRect(x + BORDER_SIZE, y + BORDER_SIZE, SIZE, SIZE)).color.apply(_stage$createRect11, _toConsumableArray(_consts.COLOR_R_ARR)).blendMode('SRC_ALPHA', 'ONE'));
        if (c & _consts.G) userColorSelectContainer.append((_stage$createRect12 = stage.createRect(x + BORDER_SIZE, y + BORDER_SIZE, SIZE, SIZE)).color.apply(_stage$createRect12, _toConsumableArray(_consts.COLOR_G_ARR)).blendMode('SRC_ALPHA', 'ONE'));
        if (c & _consts.B) userColorSelectContainer.append((_stage$createRect13 = stage.createRect(x + BORDER_SIZE, y + BORDER_SIZE, SIZE, SIZE)).color.apply(_stage$createRect13, _toConsumableArray(_consts.COLOR_B_ARR)).blendMode('SRC_ALPHA', 'ONE'));
        x += BORDER_SIZE * 2 + SIZE + SPACING;
      }
    });
  };

  // controllers
  var findTileRectByColor = function findTileRectByColor(singleTileContainer, color) {
    var rect = null;
    singleTileContainer.forEachChild(function (item) {
      if (item.tileType === color) {
        rect = item;
        return false;
      }
    });
    return rect;
  };
  var cloneRect = function cloneRect(rect) {
    var ret = stage.createRect(rect.x, rect.y, rect.w, rect.h).color(rect.r, rect.g, rect.b, rect.a).blendMode('SRC_ALPHA', 'ONE');
    ret.tileType = rect.tileType;
    return ret;
  };
  var checkColorToAdj = function checkColorToAdj(m, n, toM, toN, color, srcRect) {
    if (toM < 0 || toM >= M_N_MAX || toN < 0 || toN >= M_N_MAX) return;
    // prepare rect
    var rect = cloneRect(srcRect);
    var srcPos = toPixelPos(m, n, 1);
    var toPos = toPixelPos(toM, toN, 1);
    var midPos = {
      x: (srcPos.x + toPos.x) / 2,
      y: (srcPos.y + toPos.y) / 2,
      alpha: 0
    };
    animateContainer.append(rect);
    var num = map[toN][toM];
    map[toN][toM] ^= color;
    if (num & color) {
      // erase
      var singleTileContainer = fgContainer.index(toN * M_N_MAX + toM);
      var oldRect = findTileRectByColor(singleTileContainer, color);
      singleTileContainer.remove(oldRect);
      rect.pos(toPos.x, toPos.y).setAlpha(1);
      (0, _animate.animateObj)(rect, midPos, ANIMATION_LENGTH);
    } else {
      // add
      rect.pos(midPos.x, midPos.y).setAlpha(0);
      (0, _animate.animateObj)(rect, toPos, ANIMATION_LENGTH);
    }
  };
  var eraseColor = function eraseColor(m, n, color) {
    userClickEnabled = false;
    map[n][m] ^= color;
    // find rect
    var singleTileContainer = fgContainer.index(n * M_N_MAX + m);
    var rect = findTileRectByColor(singleTileContainer, color);
    // handling adjs
    checkColorToAdj(m, n, m - 1, n, color, rect);
    checkColorToAdj(m, n, m + 1, n, color, rect);
    checkColorToAdj(m, n, m, n - 1, color, rect);
    checkColorToAdj(m, n, m, n + 1, color, rect);
    // animate self
    var toPos = {
      x: 0,
      y: 0,
      alpha: 0
    };
    (0, _animate.animateObj)(rect, toPos, ANIMATION_LENGTH, function () {
      requestAnimationFrame(function () {
        animateContainer.clear();
        refreshTiles();
        acceptUserClick();
        if (checkLevelEnd()) return;
      });
    });
  };
  var addColor = function addColor(m, n, color) {
    var _R$G$B$color, _stage$createRect14;

    userClickEnabled = false;
    map[n][m] ^= color;
    // create rect
    var singleTileContainer = fgContainer.index(n * M_N_MAX + m);
    var colorArr = (_R$G$B$color = {}, _defineProperty(_R$G$B$color, _consts.R, _consts.COLOR_R_ARR), _defineProperty(_R$G$B$color, _consts.G, _consts.COLOR_G_ARR), _defineProperty(_R$G$B$color, _consts.B, _consts.COLOR_B_ARR), _R$G$B$color)[color];
    var rect = (_stage$createRect14 = stage.createRect(0, 0, TILE_SIZE, TILE_SIZE)).color.apply(_stage$createRect14, _toConsumableArray(colorArr)).blendMode('SRC_ALPHA', 'ONE');
    rect.setAlpha(0);
    singleTileContainer.append(rect);
    // handling adjs
    checkColorToAdj(m, n, m - 1, n, color, rect);
    checkColorToAdj(m, n, m + 1, n, color, rect);
    checkColorToAdj(m, n, m, n - 1, color, rect);
    checkColorToAdj(m, n, m, n + 1, color, rect);
    // animate self
    var toPos = {
      x: 0,
      y: 0,
      alpha: 1
    };
    (0, _animate.animateObj)(rect, toPos, ANIMATION_LENGTH, function () {
      requestAnimationFrame(function () {
        animateContainer.clear();
        refreshTiles();
        acceptUserClick();
        if (checkLevelEnd()) return;
      });
    });
  };

  // user click handler
  var handleUserClick = function handleUserClick(m, n) {
    if (!userClickEnabled) return;
    if (currentTutorialStep && (currentTutorialStep[0] !== m || currentTutorialStep[1] !== n)) return;
    var num = map[n][m];
    steps.push({
      m: m,
      n: n,
      from: num,
      to: num ? 0 : userColor
    });
    if (num) {
      userColor = num;
      refreshColorSelectButtons();
      if (num & _consts.R) eraseColor(m, n, _consts.R);
      if (num & _consts.G) eraseColor(m, n, _consts.G);
      if (num & _consts.B) eraseColor(m, n, _consts.B);
    } else {
      if (userColor & _consts.R) addColor(m, n, _consts.R);
      if (userColor & _consts.G) addColor(m, n, _consts.G);
      if (userColor & _consts.B) addColor(m, n, _consts.B);
    }
  };
  var acceptUserClick = function acceptUserClick() {
    userClickEnabled = true;
    if (currentTutorialStep) {
      if (currentTutorialStep[0] === -1) {
        var btn = colorSelectButtons[currentTutorialStep[1]];
        (0, _buttons.unflashButton)(btn);
      } else {
        tutorialContainer.clear();
      }
    }
    currentTutorialStep = tutorialSteps.shift();
    if (currentTutorialStep) {
      if (currentTutorialStep[0] === -1) {
        var _btn = colorSelectButtons[currentTutorialStep[1]];
        (0, _buttons.flashButton)(_btn);
      } else {
        var pos = toPixelPos(currentTutorialStep[0], currentTutorialStep[1]);
        var _btn2 = (0, _buttons.createButton)(stage, TILE_SIZE, TILE_SIZE, 20, function () {
          (0, _buttons.unflashButton)(_btn2);
          (0, _buttons.activateButton)(_btn2);
        }).pos(pos.x, pos.y);
        tutorialContainer.append(_btn2);
        (0, _buttons.flashButton)(_btn2);
      }
    }
  };

  // load map and start
  var loadLevel = function loadLevel(level, cb) {
    // load level data
    levelEndCb = cb;
    tutorialSteps = level.tutorialSteps || [];
    currentTutorialStep = null;
    map = level.map || parseLevelStr(level.mapStr);
    // reset ui
    resetMetaContainer();
    refreshTiles();
    // stat used colors
    var hasR = false;
    var hasG = false;
    var hasB = false;
    for (var j = 0; j < M_N_MAX; j++) {
      for (var i = 0; i < M_N_MAX; i++) {
        var num = map[j][i];
        if (num & _consts.R) hasR = true;
        if (num & _consts.G) hasG = true;
        if (num & _consts.B) hasB = true;
      }
    }
    var maxColor = (hasR ? _consts.R : 0) | (hasG ? _consts.G : 0) | (hasB ? _consts.B : 0);
    userColor = _consts.MAP_LETTER_NUM_MAP[level.userColor] || maxColor;
    if (maxColor > _consts.B) {
      drawColorHint(maxColor);
      drawUserColorSelect(maxColor);
      refreshColorSelectButtons();
    }
    // show title
    startTime = Date.now() - (level.timeUsed || 0);
    showTitle(level.title, maxColor);
    if (level.difficulty) showMapInfo('SEED:' + level.seed + ' D:' + level.difficulty);
    acceptUserClick();
  };
  var checkLevelEnd = function checkLevelEnd() {
    var status = -1;
    for (var j = 0; j < M_N_MAX; j++) {
      for (var i = 0; i < M_N_MAX; i++) {
        var num = map[j][i];
        if (status < 0) status = num;else if (status !== num) return false;
      }
    }
    endLevel();
    return true;
  };
  var endLevel = function endLevel() {
    clearInterval(timeTobj);
    levelEndCb({
      timeUsed: Date.now() - startTime
    });
  };

  return {
    loadLevel: loadLevel,
    changeOrientation: function changeOrientation(isVertical) {
      if (isVertical) {
        tilesContainer.pos(TILE_AREA_MARGIN, (1920 - 1080) / 2 + TILE_AREA_MARGIN);
        colorHintContainer.pos(0, 1920 - TILE_AREA_MARGIN * 2 - 200);
        userColorSelectContainer.pos(0, 1920 - TILE_AREA_MARGIN * 2);
      }
    }
  };
};

var _consts = __webpack_require__(5);

var _buttons = __webpack_require__(14);

var _texts = __webpack_require__(7);

var _animate = __webpack_require__(13);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var M_N_MAX = 5;
var TILE_SIZE = 150;
var TILE_MARGIN = 50;
var TILE_AREA_MARGIN = (1080 - TILE_SIZE * M_N_MAX - TILE_MARGIN * (M_N_MAX - 1)) / 2;
var ANIMATION_LENGTH = 200;

var toPixelPos = function toPixelPos(m, n, alpha) {
  var tileBetween = TILE_SIZE + TILE_MARGIN;
  return {
    x: m * tileBetween,
    y: n * tileBetween,
    alpha: alpha
  };
};

var parseLevelStr = function parseLevelStr(str) {
  var signs = str.match(/[-rgbycpw]/g);
  var map = [];
  for (var j = 0; j < M_N_MAX; j++) {
    var line = [];
    for (var i = 0; i < M_N_MAX; i++) {
      line.push(_consts.MAP_LETTER_NUM_MAP[signs.shift()]);
    }
    map.push(line);
  }
  return map;
};

/* eslint-disable no-use-before-define */

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var COLOR_R = '#e75885';
var COLOR_G = '#2f9134';
var COLOR_B = '#228eda';

var transformColorStr = function transformColorStr(colorStr) {
  var r = parseInt(colorStr.slice(1, 3), 16) / 255;
  var g = parseInt(colorStr.slice(3, 5), 16) / 255;
  var b = parseInt(colorStr.slice(5, 7), 16) / 255;
  return [r, g, b, 0.7];
};
var COLOR_R_ARR = exports.COLOR_R_ARR = transformColorStr(COLOR_R);
var COLOR_G_ARR = exports.COLOR_G_ARR = transformColorStr(COLOR_G);
var COLOR_B_ARR = exports.COLOR_B_ARR = transformColorStr(COLOR_B);
var COLOR_BG_ARR = exports.COLOR_BG_ARR = [0.1, 0.1, 0.1, 1];

var COLOR_BTN_NORMAL_ARR = exports.COLOR_BTN_NORMAL_ARR = [0.2, 0.2, 0.2, 1];
var COLOR_BTN_ACTIVE_ARR = exports.COLOR_BTN_ACTIVE_ARR = [0.6, 0.6, 0.6, 1];
var COLOR_BTN_FLASH_ARR = exports.COLOR_BTN_FLASH_ARR = [0.7, 0.7, 0.7, 1];

var R = exports.R = 1;
var G = exports.G = 2;
var B = exports.B = 4;

var MAP_LETTER_NUM_MAP = exports.MAP_LETTER_NUM_MAP = {
  '-': 0,
  r: R,
  g: G,
  b: B,
  y: R | G,
  c: G | B,
  p: R | B,
  w: R | G | B
};

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTexts = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _letters = __webpack_require__(8);

var _letters2 = _interopRequireDefault(_letters);

var _numbers = __webpack_require__(9);

var _numbers2 = _interopRequireDefault(_numbers);

var _symbols = __webpack_require__(10);

var _symbols2 = _interopRequireDefault(_symbols);

var _special = __webpack_require__(11);

var _special2 = _interopRequireDefault(_special);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var dotsPositions = Object.create(null);
var dotsInfo = Object.create(null);

var prepareFonts = function prepareFonts(letter, dotStr) {
  var lines = dotStr.split('\n');
  while (lines[0].indexOf('[') < 0) {
    lines.shift();
  }var left = lines[0].indexOf('[');
  var right = lines[0].indexOf(']') + 1;
  var infoArr = JSON.parse(lines[0].slice(left, right));
  var info = { width: infoArr[0], height: infoArr[1] };
  var n = 0;
  var arr = [];
  for (lines.shift(); lines.length; lines.shift(), n++) {
    var lineContent = lines[0].slice(left, left + info.width);
    for (var m = 0; m < lineContent.length; m++) {
      if (lineContent[m] === '+') {
        arr.push([m, n]);
      }
    }
  }
  dotsPositions[letter] = arr;
  dotsInfo[letter] = info;
};
for (var k in _letters2.default) {
  prepareFonts(k, _letters2.default[k]);
}for (var _k in _numbers2.default) {
  prepareFonts(_k, _numbers2.default[_k]);
}for (var _k2 in _symbols2.default) {
  prepareFonts(_k2, _symbols2.default[_k2]);
}for (var _k3 in _special2.default) {
  prepareFonts(_k3, _special2.default[_k3]);
}var createTexts = exports.createTexts = function createTexts(stage, str, size, color) {
  var container = stage.createContainer();
  var x = 0;

  var _loop = function _loop(i) {
    var dotsPosArr = dotsPositions[str[i]];
    var info = dotsInfo[str[i]];
    var dotSize = size / info.height;
    // eslint-disable-next-line no-loop-func
    dotsPosArr.forEach(function (_ref) {
      var _stage$createRect;

      var _ref2 = _slicedToArray(_ref, 2),
          m = _ref2[0],
          n = _ref2[1];

      var rect = (_stage$createRect = stage.createRect(m * dotSize + x, n * dotSize, dotSize, dotSize)).color.apply(_stage$createRect, _toConsumableArray(color));
      container.append(rect);
    });
    x += dotSize * info.width;
  };

  for (var i = 0; i < str.length; i++) {
    _loop(i);
  }
  return container;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  A: "\n    [6,8]\n       +\n      + +\n     +   +\n     +   +\n     +++++\n     +   +\n     +   +\n  ",
  B: "\n    [6,8]\n     ++++\n     +   +\n     +   +\n     ++++\n     +   +\n     +   +\n     ++++\n  ",
  C: "\n    [6,8]\n      +++\n     +   +\n     +\n     +\n     +\n     +   +\n      +++\n  ",
  D: "\n    [6,8]\n     +++\n     +  +\n     +   +\n     +   +\n     +   +\n     +  +\n     +++\n  ",
  E: "\n    [6,8]\n     +++++\n     +\n     +\n     ++++\n     +\n     +\n     +++++\n  ",
  F: "\n    [6,8]\n     +++++\n     +\n     +\n     ++++\n     +\n     +\n     +\n  ",
  G: "\n    [6,8]\n      +++\n     +   +\n     +\n     +  ++\n     +   +\n     +  ++\n      ++ +\n  ",

  H: "\n    [6,8]\n     +   +\n     +   +\n     +   +\n     +++++\n     +   +\n     +   +\n     +   +\n  ",
  I: "\n    [6,8]\n      +++\n       +\n       +\n       +\n       +\n       +\n      +++\n  ",
  J: "\n    [6,8]\n      +++\n       +\n       +\n       +\n       +\n     + +\n      +\n  ",
  K: "\n    [6,8]\n     +   +\n     +  +\n     + +\n     ++\n     + +\n     +  +\n     +   +\n  ",
  L: "\n    [6,8]\n      +\n      +\n      +\n      +\n      +\n      +\n      ++++\n  ",
  M: "\n    [6,8]\n     +   +\n     ++ ++\n     + + +\n     + + +\n     +   +\n     +   +\n     +   +\n  ",
  N: "\n    [6,8]\n     +   +\n     ++  +\n     + + +\n     +  ++\n     +   +\n     +   +\n     +   +\n  ",

  O: "\n    [6,8]\n      +++\n     +   +\n     +   +\n     +   +\n     +   +\n     +   +\n      +++\n  ",
  P: "\n    [6,8]\n     +++\n     +  +\n     +   +\n     +  +\n     +++\n     +\n     +\n  ",
  Q: "\n    [6,8]\n     +   +\n     ++  +\n     + + +\n     +  ++\n     +   +\n     +   +\n     +   +\n  ",
  R: "\n    [6,8]\n     ++++\n     +   +\n     +  +\n     +++\n     +  +\n     +   +\n     +   +\n  ",
  S: "\n    [6,8]\n      +++\n     +   +\n      +\n       +\n        +\n     +   +\n      +++\n  ",
  T: "\n    [6,8]\n     +++++\n       +\n       +\n       +\n       +\n       +\n       +\n  ",

  U: "\n    [6,8]\n     +   +\n     +   +\n     +   +\n     +   +\n     +   +\n     +  ++\n      ++ +\n  ",
  V: "\n    [6,8]\n     +   +\n     +   +\n     +   +\n     +   +\n     +   +\n      + +\n       +\n  ",
  W: "\n    [6,8]\n     +   +\n     +   +\n     +   +\n     + + +\n     + + +\n     + + +\n      + +\n  ",
  X: "\n    [6,8]\n     +   +\n     +   +\n      + +\n       +\n      + +\n     +   +\n     +   +\n  ",
  Y: "\n    [6,8]\n     +   +\n     +   +\n      + +\n       +\n       +\n       +\n       +\n  ",
  Z: "\n    [6,8]\n     +++++\n         +\n      + +\n       +\n      + +\n     +\n     +++++\n  "
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  0: "\n    [6,8]\n      +++\n     +   +\n     +  ++\n     + + +\n     ++  +\n     +   +\n      +++\n  ",
  1: "\n    [6,8]\n       +\n      ++\n       +\n       +\n       +\n       +\n      +++\n  ",
  2: "\n    [6,8]\n      +++\n     +   +\n        +\n       +\n      +\n     +\n     +++++\n  ",
  3: "\n    [6,8]\n      +++\n     +   +\n         +\n       ++\n         +\n     +   +\n      +++\n  ",
  4: "\n    [6,8]\n        +\n       ++\n      + +\n     +  +\n     +++++\n        +\n        +\n  ",
  5: "\n    [6,8]\n     +++++\n     +\n     +\n      +++\n         +\n     +   +\n      +++\n  ",
  6: "\n    [6,8]\n      +++\n     +   +\n     +\n     ++++\n     +   +\n     +   +\n      +++\n  ",
  7: "\n    [6,8]\n     +++++\n         +\n        +\n       +\n      +\n      +\n      +\n  ",
  8: "\n    [6,8]\n      +++\n     +   +\n     +   +\n      +++\n     +   +\n     +   +\n      +++\n  ",
  9: "\n    [6,8]\n      +++\n     +   +\n     +   +\n      ++++\n         +\n     +   +\n      +++\n  "
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ' ': '\n    [6,8]\n  ',
  '-': '\n    [6,8]\n\n\n\n     +++++\n\n\n\n  ',
  '=': '\n    [6,8]\n\n\n     +++++\n\n     +++++\n\n\n  ',
  '+': '\n    [6,8]\n\n       +\n       +\n     +++++\n       +\n       +\n\n  ',
  '.': '\n    [6,8]\n\n\n\n\n\n      ++\n      ++\n  ',
  ':': '\n    [6,8]\n\n\n       +\n\n\n       +\n\n  ',
  '#': '\n    [6,8]\n      + +\n      + +\n     +++++\n      + +\n     +++++\n      + +\n      + +\n  ',
  '?': '\n    [6,8]\n      +++\n     +   +\n         +\n        +\n       +\n\n       +\n  '
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  '\x01': '\n    [6,8]\n     ++\n     +++\n     ++++\n     +++++\n     ++++\n     +++\n     ++\n  '
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _consts = __webpack_require__(5);

var _buttons = __webpack_require__(14);

var _texts = __webpack_require__(7);

exports.default = function (stage, container) {
  var selectCb = null;

  var titleContainer = stage.createContainer().pos(555, 300);
  var title1 = (0, _texts.createTexts)(stage, 'TRI', 120, _consts.COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE');
  var title2 = (0, _texts.createTexts)(stage, 'TRI', 120, _consts.COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE');
  var title3 = (0, _texts.createTexts)(stage, 'COLORS', 120, _consts.COLOR_G_ARR).pos(270, 0).blendMode('SRC_ALPHA', 'ONE');
  var title4 = (0, _texts.createTexts)(stage, 'COLORS', 120, _consts.COLOR_B_ARR).pos(270, 0).blendMode('SRC_ALPHA', 'ONE');
  titleContainer.append(title1).append(title2).append(title3).append(title4);
  container.append(titleContainer);

  var tutorialContainer = stage.createContainer().pos(760, 600);
  var tutorialButton = (0, _buttons.createButton)(stage, 100, 100, 20, function () {
    selectCb('tutorial');
  });
  var tutorialText1 = (0, _texts.createTexts)(stage, '?', 80, _consts.COLOR_R_ARR).pos(15, 10).blendMode('SRC_ALPHA', 'ONE');
  var tutorialText2 = (0, _texts.createTexts)(stage, '?', 80, _consts.COLOR_G_ARR).pos(15, 10).blendMode('SRC_ALPHA', 'ONE');
  tutorialContainer.append(tutorialButton).append(tutorialText1).append(tutorialText2);
  container.append(tutorialContainer);

  var endlessContainer = stage.createContainer().pos(1060, 600);
  var endlessButton = (0, _buttons.createButton)(stage, 100, 100, 20, function () {
    selectCb('endless');
  });
  var endlessText1 = (0, _texts.createTexts)(stage, '\x01', 80, _consts.COLOR_R_ARR).pos(15, 10).blendMode('SRC_ALPHA', 'ONE');
  var endlessText2 = (0, _texts.createTexts)(stage, '\x01', 80, _consts.COLOR_G_ARR).pos(15, 10).blendMode('SRC_ALPHA', 'ONE');
  endlessContainer.append(endlessButton).append(endlessText1).append(endlessText2);
  container.append(endlessContainer);

  var authorContainer = stage.createContainer().pos(840, 960);
  var authorText = (0, _texts.createTexts)(stage, 'LASTLEAF', 40, [0.4, 0.4, 0.4, 1]);
  var authorTextBg = stage.createRect(0, 0, 240, 40).color(0, 0, 0, 0).bind('click', function () {
    selectCb('');
  });
  authorContainer.append(authorTextBg).append(authorText);
  container.append(authorContainer);

  return {
    changeOrientation: function changeOrientation(isVertical) {
      if (isVertical) {
        titleContainer.pos(135, 500);
        tutorialContainer.pos(300, 1200);
        endlessContainer.pos(680, 1200);
        authorContainer.pos(420, 1800);
      }
    },
    onSelect: function onSelect(cb) {
      selectCb = cb;
    }
  };
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var animateObj = exports.animateObj = function animateObj(obj, toPos, length, cb) {
  var fromX = obj.x;
  var fromY = obj.y;
  var fromAlpha = obj.alpha;
  var toX = toPos.x;
  var toY = toPos.y;
  var toAlpha = toPos.alpha;
  var endTime = Date.now() + length;
  var updateFunc = function updateFunc() {
    var time = Date.now();
    var timeLeft = endTime - time > 0 ? endTime - time : 0;
    var ratio = 1 - Math.sqrt(1 - timeLeft / length);
    var x = toX - ratio * (toX - fromX);
    var y = toY - ratio * (toY - fromY);
    var alpha = toAlpha - ratio * (toAlpha - fromAlpha);
    obj.x = x;
    obj.y = y;
    obj.alpha = alpha;
    if (timeLeft) requestAnimationFrame(updateFunc);else if (cb) return cb();
  };
  requestAnimationFrame(updateFunc);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unflashButton = exports.flashButton = exports.deactivateButton = exports.activateButton = exports.createButton = undefined;

var _consts = __webpack_require__(5);

var _animate = __webpack_require__(13);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var FLASH_ANIMATION_LENGTH = 1000;

var createButton = exports.createButton = function createButton(stage, w, h, margin, cb) {
  var _stage$createRect, _stage$createRect2;

  var container = stage.createContainer();
  container.append((_stage$createRect = stage.createRect(-margin, -margin, w + margin * 2, h + margin * 2)).color.apply(_stage$createRect, _toConsumableArray(_consts.COLOR_BTN_NORMAL_ARR)).bind('click', cb || function () {/* empty */}));
  container.append((_stage$createRect2 = stage.createRect(0, 0, w, h)).color.apply(_stage$createRect2, _toConsumableArray(_consts.COLOR_BG_ARR)));
  return container;
};
var activateButton = exports.activateButton = function activateButton(container) {
  var _container$index;

  (_container$index = container.index(0)).color.apply(_container$index, _toConsumableArray(_consts.COLOR_BTN_ACTIVE_ARR));
};
var deactivateButton = exports.deactivateButton = function deactivateButton(container) {
  var _container$index2;

  (_container$index2 = container.index(0)).color.apply(_container$index2, _toConsumableArray(_consts.COLOR_BTN_NORMAL_ARR));
};
var flashButton = exports.flashButton = function flashButton(container) {
  var _container$index3;

  if (container.buttonFlashing) return;
  container.buttonFlashing = true;
  var btn = (_container$index3 = container.index(0)).color.apply(_container$index3, _toConsumableArray(_consts.COLOR_BTN_FLASH_ARR)).setAlpha(0);
  var curAlpha = 0;
  var flash = function flash() {
    if (!container.buttonFlashing) return;
    curAlpha = 1 - curAlpha;
    (0, _animate.animateObj)(btn, {
      x: btn.x,
      y: btn.y,
      alpha: curAlpha
    }, FLASH_ANIMATION_LENGTH, flash);
  };
  flash();
};
var unflashButton = exports.unflashButton = function unflashButton(container) {
  var _container$index4;

  container.buttonFlashing = false;
  (_container$index4 = container.index(0)).color.apply(_container$index4, _toConsumableArray(_consts.COLOR_BTN_NORMAL_ARR));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  tutorialSteps: [[2, 2], [2, 3], [2, 1]],
  title: '#01',
  mapStr: '\n    --r--\n    -r-r-\n    -rrr-\n    -r-r-\n    --r--\n  '
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  tutorialSteps: [[1, 2], [3, 2], [4, 1], [0, 3]],
  title: '#02',
  mapStr: '\n    ----b\n    -r-pb\n    pr-rp\n    bp-r-\n    b----\n  '
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  tutorialSteps: [[1, 3], [3, 3], [-1, 0], [2, 1], [2, 2]],
  title: '#03',
  mapStr: '\n    --r--\n    -r-r-\n    -y-p-\n    ggwbb\n    -g-b-\n  '
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endless = undefined;

var _consts = __webpack_require__(5);

var D_PER_LEVEL = 80;
var D_COLOR_COUNT = [0, 2, 3, 4];
var D_STEP_BATCH = [0, 4, 3, 0, 2];

var P_SYMMETRY_NONE = 0.1;
var P_SYMMETRY_H = 0.3;
var P_SYMMETRY_V = 0.5;
var P_SYMMETRY_ROTATE = 0.7;
var P_SYMMETRY_ALL = 0.9;
var P_SYMMETRY_ALL_ROTATE = 1;

var P_2_COLOR_D_MIN = D_PER_LEVEL * 2;
var P_3_COLOR_D_MIN = D_PER_LEVEL * 4;
var P_2_COLOR_D_INC = D_PER_LEVEL / 5;
var P_3_COLOR_D_INC = D_PER_LEVEL / 10;

var SYMMETRY_NONE = 0;
var SYMMETRY_H = 1;
var SYMMETRY_V = 2;
var SYMMETRY_ROTATE = 3;
var SYMMETRY_ALL = 4;
var SYMMETRY_ALL_ROTATE = 5;

var levelToDifficulty = function levelToDifficulty(level) {
  return level * D_PER_LEVEL;
};

var endless = exports.endless = function endless(_ref) {
  var level = _ref.level,
      timeUsed = _ref.timeUsed;

  var difficulty = levelToDifficulty(level);

  // random utils
  var seed = Math.floor(Math.random() * 1000000000);
  var curSeed = seed;
  var curRandMul = 1;
  var getRandom = function getRandom(max) {
    var prevRandMul = curRandMul;
    curRandMul *= max;
    if (curRandMul > 1000000000) {
      curSeed = curSeed * 137 % 1000000000;
      prevRandMul = curRandMul = 1;
    }
    return Math.floor(curSeed / prevRandMul) % max;
  };

  // init map
  var colorMap = [];
  for (var j = 0; j < 5; j++) {
    var line = [];
    for (var i = 0; i < 5; i++) {
      line.push(0);
    }
    colorMap.push(line);
  }
  var opCountMap = [];
  for (var _j = 0; _j < 5; _j++) {
    var _line = [];
    for (var _i = 0; _i < 5; _i++) {
      _line.push(0);
    }
    opCountMap.push(_line);
  }

  // generate symmetry type
  var symmetryRand = getRandom(10) / 10;
  var symmetryType = 0;
  if (symmetryRand < P_SYMMETRY_NONE) {
    symmetryType = SYMMETRY_NONE;
  } else if (symmetryRand < P_SYMMETRY_H) {
    symmetryType = SYMMETRY_H;
  } else if (symmetryRand < P_SYMMETRY_V) {
    symmetryType = SYMMETRY_V;
  } else if (symmetryRand < P_SYMMETRY_ROTATE) {
    symmetryType = SYMMETRY_ROTATE;
  } else if (symmetryRand < P_SYMMETRY_ALL) {
    symmetryType = SYMMETRY_ALL;
  } else if (symmetryRand < P_SYMMETRY_ALL_ROTATE) {
    symmetryType = SYMMETRY_ALL_ROTATE;
  }

  // generate color type
  var colorKey = [_consts.R, _consts.G, _consts.B][getRandom(3)];
  var colorRand = getRandom(10) / 10;
  var colors = [_consts.R, _consts.G, _consts.B];
  var colorType = 1;
  var pColor2 = (difficulty - P_2_COLOR_D_MIN) * P_2_COLOR_D_INC;
  var pColor3 = (difficulty - P_3_COLOR_D_MIN) * P_3_COLOR_D_INC;
  if (colorRand < pColor3) {
    colors = [_consts.R, _consts.G, _consts.B];
    colorType = 3;
  } else if (colorRand < pColor2) {
    colors.splice(colors.indexOf(colorKey), 1);
    colorType = 2;
  } else {
    colors = [colorKey];
    colorType = 1;
  }

  // generate each step
  var currentD = 0;
  // eslint-disable-next-line complexity
  var nextStep = function nextStep() {
    var stepColor = colors[getRandom(colorType)];
    var stepM = getRandom(5);
    var stepN = getRandom(5);

    // init maps
    var signMap = [];
    for (var _j2 = 0; _j2 < 5; _j2++) {
      var _line2 = [];
      for (var _i2 = 0; _i2 < 5; _i2++) {
        _line2.push(0);
      }
      signMap.push(_line2);
    }
    var weightMap = [];
    for (var _j3 = 0; _j3 < 5; _j3++) {
      var _line3 = [];
      for (var _i3 = 0; _i3 < 5; _i3++) {
        _line3.push(0);
      }
      weightMap.push(_line3);
    }

    // construct sign map
    var stepCount = 0;
    var setSignMap = function setSignMap(m, n) {
      if (signMap[n][m]) return;
      stepCount++;
      signMap[n][m] = 1;
    };
    setSignMap(stepM, stepN);
    if (symmetryType === SYMMETRY_H) {
      setSignMap(4 - stepM, stepN);
    } else if (symmetryType === SYMMETRY_V) {
      setSignMap(stepM, 4 - stepN);
    } else if (symmetryType === SYMMETRY_ROTATE) {
      setSignMap(4 - stepM, 4 - stepN);
    } else if (symmetryType === SYMMETRY_ALL) {
      setSignMap(4 - stepM, stepN);
      setSignMap(stepM, 4 - stepN);
      setSignMap(4 - stepM, 4 - stepN);
    } else if (symmetryType === SYMMETRY_ALL_ROTATE) {
      setSignMap(4 - stepN, stepM);
      setSignMap(stepN, 4 - stepM);
      setSignMap(4 - stepM, 4 - stepN);
    }

    // extend weight map
    var stepD = 0;
    for (var _j4 = 0; _j4 < 5; _j4++) {
      for (var _i4 = 0; _i4 < 5; _i4++) {
        if (signMap[_j4 - 1] && signMap[_j4 - 1][_i4]) stepD += ++weightMap[_j4][_i4] + opCountMap[_j4][_i4];
        if (signMap[_j4 + 1] && signMap[_j4 + 1][_i4]) stepD += ++weightMap[_j4][_i4] + opCountMap[_j4][_i4];
        if (signMap[_j4][_i4 - 1]) stepD += ++weightMap[_j4][_i4] + opCountMap[_j4][_i4];
        if (signMap[_j4][_i4 + 1]) stepD += ++weightMap[_j4][_i4] + opCountMap[_j4][_i4];
        if (signMap[_j4][_i4]) stepD += ++weightMap[_j4][_i4] + opCountMap[_j4][_i4];
      }
    }

    // check and write to map
    stepD *= D_COLOR_COUNT[colorType] * D_STEP_BATCH[stepCount];
    if (stepD + currentD <= difficulty || currentD === 0) {
      console.info([stepM, stepN, stepColor]); // FIXME step is shown in console
      for (var _j5 = 0; _j5 < 5; _j5++) {
        for (var _i5 = 0; _i5 < 5; _i5++) {
          if (weightMap[_j5][_i5] % 2) {
            colorMap[_j5][_i5] ^= stepColor;
          }
          opCountMap[_j5][_i5] += weightMap[_j5][_i5];
        }
      }
    } else {
      stepD = 0;
    }
    return stepD;
  };
  while (currentD < difficulty) {
    var stepD = nextStep();
    if (!stepD) break;
    currentD += stepD;
  }

  var levelObj = {
    timeUsed: timeUsed,
    title: '#' + (level < 10 ? '0' + level : level),
    seed: seed,
    difficulty: currentD,
    map: colorMap
  };
  return levelObj;
};

/***/ })
/******/ ]);
//# sourceMappingURL=game.js.map