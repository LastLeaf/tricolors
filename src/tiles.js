import {
  COLOR_R_ARR,
  COLOR_G_ARR,
  COLOR_B_ARR,
  R,
  G,
  B,
  MAP_LETTER_NUM_MAP,
} from './consts'
import LEVEL_1 from './levels/1'

const M_N_MAX = 5
const TILE_SIZE = 150
const TILE_MARGIN = 50
const TILE_AREA_MARGIN = (1080 - TILE_SIZE * M_N_MAX - TILE_MARGIN * (M_N_MAX - 1)) / 2
const ANIMATION_LENGTH = 200

const toPixelPos = (m, n, alpha) => {
  const tileBetween = TILE_SIZE + TILE_MARGIN
  return {
    x: m * tileBetween,
    y: n * tileBetween,
    alpha: alpha
  }
}

const animateObj = (obj, toPos, length, cb) => {
  const fromX = obj.x
  const fromY = obj.y
  const fromAlpha = obj.alpha
  const toX = toPos.x
  const toY = toPos.y
  const toAlpha = toPos.alpha
  const endTime = Date.now() + length
  const updateFunc = () => {
    const time = Date.now()
    const timeLeft = endTime - time > 0 ? endTime - time : 0
    const ratio = 1 - Math.sqrt(1 - timeLeft / length)
    const x = toX - ratio * (toX - fromX)
    const y = toY - ratio * (toY - fromY)
    const alpha = toAlpha - ratio * (toAlpha - fromAlpha)
    obj.x = x
    obj.y = y
    obj.alpha = alpha
    if (timeLeft) requestAnimationFrame(updateFunc)
    else if (cb) return cb()
  }
  requestAnimationFrame(updateFunc)
}

const parseLevelStr = (str) => {
  const signs = str.match(/[-rgbycpw]/g)
  const map = []
  for(let j = 0; j < M_N_MAX; j++) {
    const line = []
    for(let i = 0; i < M_N_MAX; i++) {
      line.push(MAP_LETTER_NUM_MAP[signs.shift()])
    }
    map.push(line)
  }
  return map
}

export default function(stage, tilesContainer) {
  // game states
  let userClickEnabled = false
  let userColor = R | G | B
  let map = null
  let tutorial = null

  // base containers
  tilesContainer.pos(1920 - 1080 + TILE_AREA_MARGIN, TILE_AREA_MARGIN)
  const bgContainer = stage.createContainer()
  tilesContainer.append(bgContainer)
  const fgContainer = stage.createContainer()
  tilesContainer.append(fgContainer)
  const animateContainer = stage.createContainer()
  tilesContainer.append(animateContainer)

  // add background tiles
  const drawBackground = () => {
    for(let j = 0; j < M_N_MAX; j++) {
      // eslint-disable-next-line no-loop-func
      for(let i = 0; i < M_N_MAX; i++) ((i, j) => {
        const {x, y} = toPixelPos(i, j)
        const tile = stage.createRect(x, y, TILE_SIZE, TILE_SIZE).color(0.1, 0.1, 0.1, 1)
        bgContainer.append(tile)
        tile.bind('click', () => {
          // eslint-disable-next-line no-use-before-define
          handleUserClick(i, j)
        })
      })(i, j)
    }
  }
  drawBackground()

  // refresh foreground tiles
  const initTileContainers = () => {
    for(let j = 0; j < M_N_MAX; j++) {
      for(let i = 0; i < M_N_MAX; i++) {
        const {x, y} = toPixelPos(i, j)
        const singleTileContainer = stage.createContainer(x, y)
        fgContainer.append(singleTileContainer)
      }
    }
  }
  initTileContainers()
  const refreshTiles = () => {
    for(let j = 0; j < M_N_MAX; j++) {
      for(let i = 0; i < M_N_MAX; i++) {
        const num = map[j][i]
        const singleTileContainer = fgContainer.index(j * M_N_MAX + i)
        singleTileContainer.clear()
        if (num & R) {
          const rect = stage.createRect(0, 0, TILE_SIZE, TILE_SIZE).color(...COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE')
          rect.tileType = R
          singleTileContainer.append(rect)
        }
        if (num & G) {
          const rect = stage.createRect(0, 0, TILE_SIZE, TILE_SIZE).color(...COLOR_G_ARR).blendMode('SRC_ALPHA', 'ONE')
          rect.tileType = G
          singleTileContainer.append(rect)
        }
        if (num & B) {
          const rect = stage.createRect(0, 0, TILE_SIZE, TILE_SIZE).color(...COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE')
          rect.tileType = B
          singleTileContainer.append(rect)
        }
      }
    }
  }

  // controllers
  const findTileRectByColor = (singleTileContainer, color) => {
    let rect = null
    singleTileContainer.forEachChild((item) => {
      if (item.tileType === color) {
        rect = item
        return false
      }
    })
    return rect
  }
  const cloneRect = (rect) => {
    const ret = stage.createRect(rect.x, rect.y, rect.w, rect.h).color(rect.r, rect.g, rect.b, rect.a).blendMode('SRC_ALPHA', 'ONE')
    ret.tileType = rect.tileType
    return ret
  }
  const checkColorToAdj = (m, n, toM, toN, color, srcRect) => {
    if (toM < 0 || toM >= M_N_MAX || toN < 0 || toN >= M_N_MAX) return
    // prepare rect
    const rect = cloneRect(srcRect)
    const srcPos = toPixelPos(m, n, 1)
    const toPos = toPixelPos(toM, toN, 1)
    const midPos = {
      x: (srcPos.x + toPos.x) / 2,
      y: (srcPos.y + toPos.y) / 2,
      alpha: 0
    }
    animateContainer.append(rect)
    const num = map[toN][toM]
    map[toN][toM] ^= color
    if (num & color) {
      // erase
      const singleTileContainer = fgContainer.index(toN * M_N_MAX + toM)
      const oldRect = findTileRectByColor(singleTileContainer, color)
      singleTileContainer.remove(oldRect)
      rect.pos(toPos.x, toPos.y).setAlpha(1)
      animateObj(rect, midPos, ANIMATION_LENGTH)
    } else {
      // add
      rect.pos(midPos.x, midPos.y).setAlpha(0)
      animateObj(rect, toPos, ANIMATION_LENGTH)
    }
  }
  const eraseColor = (m, n, color) => {
    userClickEnabled = false
    map[n][m] ^= color
    // find rect
    const singleTileContainer = fgContainer.index(n * M_N_MAX + m)
    const rect = findTileRectByColor(singleTileContainer, color)
    // handling adjs
    checkColorToAdj(m, n, m - 1, n, color, rect)
    checkColorToAdj(m, n, m + 1, n, color, rect)
    checkColorToAdj(m, n, m, n - 1, color, rect)
    checkColorToAdj(m, n, m, n + 1, color, rect)
    // animate self
    const toPos = {
      x: 0,
      y: 0,
      alpha: 0,
    }
    animateObj(rect, toPos, ANIMATION_LENGTH, () => {
      requestAnimationFrame(() => {
        animateContainer.clear()
        refreshTiles()
        userClickEnabled = true
      })
    })
  }
  const addColor = (m, n, color) => {
    userClickEnabled = false
    map[n][m] ^= color
    // create rect
    const singleTileContainer = fgContainer.index(n * M_N_MAX + m)
    const colorArr = {
      [R]: COLOR_R_ARR,
      [G]: COLOR_G_ARR,
      [B]: COLOR_B_ARR,
    }[color]
    const rect = stage.createRect(0, 0, TILE_SIZE, TILE_SIZE).color(...colorArr).blendMode('SRC_ALPHA', 'ONE')
    rect.setAlpha(0)
    singleTileContainer.append(rect)
    // handling adjs
    checkColorToAdj(m, n, m - 1, n, color, rect)
    checkColorToAdj(m, n, m + 1, n, color, rect)
    checkColorToAdj(m, n, m, n - 1, color, rect)
    checkColorToAdj(m, n, m, n + 1, color, rect)
    // animate self
    const toPos = {
      x: 0,
      y: 0,
      alpha: 1,
    }
    animateObj(rect, toPos, ANIMATION_LENGTH, () => {
      requestAnimationFrame(() => {
        animateContainer.clear()
        refreshTiles()
        userClickEnabled = true
      })
    })
  }

  // user click handler
  const handleUserClick = (m, n) => {
    if (!userClickEnabled) return
    const num = map[n][m]
    if (num) {
      userColor = num
      if (num & R) eraseColor(m, n, R)
      if (num & G) eraseColor(m, n, G)
      if (num & B) eraseColor(m, n, B)
    } else {
      if (userColor & R) addColor(m, n, R)
      if (userColor & G) addColor(m, n, G)
      if (userColor & B) addColor(m, n, B)
    }
  }

  // load map and start
  const loadLevel = (level) => {
    tutorial = level.tutorial || null
    userColor = MAP_LETTER_NUM_MAP[level.userColor]
    map = parseLevelStr(level.map)
    refreshTiles()
    userClickEnabled = true
  }
  loadLevel(LEVEL_1)
}
