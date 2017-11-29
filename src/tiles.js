import {
  COLOR_R_ARR,
  COLOR_G_ARR,
  COLOR_B_ARR,
  COLOR_BG_ARR,
  R,
  G,
  B,
  MAP_LETTER_NUM_MAP,
} from './consts'
import {
  createButton,
  activateButton,
  deactivateButton,
  flashButton,
  unflashButton,
} from './buttons'
import { createTexts } from './texts'
import { animateObj } from './animate'

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

/* eslint-disable no-use-before-define */

export default function(stage, mainContainer) {
  // game states
  let userClickEnabled = false
  let userColor = R | G | B
  let map = null
  let originalMapJSON = null
  let steps = []
  let startTime = 0
  let timeTobj = null
  let currentTutorialStep = null
  let tutorialSteps = null
  let levelEndCb = null

  // base containers
  const tilesContainer = stage.createContainer()
  mainContainer.append(tilesContainer)
  tilesContainer.pos(1920 - 1080 + TILE_AREA_MARGIN, TILE_AREA_MARGIN)
  const bgContainer = stage.createContainer()
  const fgContainer = stage.createContainer()
  const animateContainer = stage.createContainer()
  const tutorialContainer = stage.createContainer()
  tilesContainer.append(tutorialContainer).append(bgContainer).append(fgContainer).append(animateContainer)

  // meta containers
  const metaContainer = stage.createContainer()
  mainContainer.append(metaContainer)
  metaContainer.pos(TILE_AREA_MARGIN, TILE_AREA_MARGIN)
  const colorHintContainer = stage.createContainer(0, 1080 - TILE_AREA_MARGIN * 2 - 200)
  const levelInfoContainer = stage.createContainer(0, 40)
  const menuContainer = stage.createContainer(1080 - TILE_AREA_MARGIN, 30)
  const userColorSelectContainer = stage.createContainer(0, 1080 - TILE_AREA_MARGIN * 2)
  metaContainer.append(colorHintContainer).append(levelInfoContainer).append(userColorSelectContainer).append(menuContainer)

  // add background tiles
  const drawBackground = () => {
    for(let j = 0; j < M_N_MAX; j++) {
      // eslint-disable-next-line no-loop-func
      for(let i = 0; i < M_N_MAX; i++) ((i, j) => {
        const {x, y} = toPixelPos(i, j)
        const tile = stage.createRect(x, y, TILE_SIZE, TILE_SIZE).color(...COLOR_BG_ARR)
        bgContainer.append(tile)
        tile.bind('click', () => {
          handleUserClick(i, j)
        })
      })(i, j)
    }
  }
  drawBackground()

  // draw foreground tiles
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

  // show user color status
  let colorSelectButtons = []
  let colorHints = {}
  const resetMetaContainer = () => {
    colorSelectButtons = []
    colorHintContainer.clear()
    levelInfoContainer.clear()
    userColorSelectContainer.clear()
  }
  const showTitle = (titleText, maxColor) => {
    const TITLE_SIZE = 100
    const TIME_SIZE = 40
    const TITLE_COLOR_ARR = [0.5, 0.5, 0.5, 1]
    const titleContainer = createTexts(stage, titleText, TITLE_SIZE, TITLE_COLOR_ARR)
    const timeContainer = stage.createContainer(0, TITLE_SIZE + 20)
    levelInfoContainer.append(titleContainer).append(timeContainer)
    timeTobj = setInterval(() => {
      const timeDiff = Math.floor((Date.now() - startTime) / 1000)
      const minuteStr = (timeDiff < 600 ? '0' : '') + Math.floor(timeDiff / 60)
      const secondStr = ':' + String(timeDiff % 60 + 100).slice(1)
      timeContainer.clear()
      timeContainer.append(createTexts(stage, minuteStr + secondStr, TIME_SIZE, TITLE_COLOR_ARR))
    }, 1000)
  }
  const showMenuButtons = () => {
    const resetButton = createButton(stage, 70, 70, 10, () => {
      if (!userClickEnabled) return
      if (currentTutorialStep) return
      resetLevel()
    }).pos(-260, 0)
    const resetText = createTexts(stage, '\x02', 70, [0.4, 0.4, 0.4, 1]).pos(-255, 5)
    const quitButton = createButton(stage, 70, 70, 10, () => {
      if (!userClickEnabled) return
      if (currentTutorialStep) return
      endLevel(true)
    }).pos(-140, 0)
    const quitText = createTexts(stage, '\x03', 70, [0.4, 0.4, 0.4, 1]).pos(-135, 5)
    menuContainer.append(resetButton).append(resetText).append(quitButton).append(quitText)
  }
  const showMapInfo = (str) => {
    const mapInfoContainer = createTexts(stage, str, 30, [0.3, 0.3, 0.3, 1]).pos(0, -60)
    levelInfoContainer.append(mapInfoContainer)
  }
  const refreshColorSelectButtons = () => {
    colorSelectButtons.forEach((btn) => {
      if (userColor === btn.userColor) activateButton(btn)
      else deactivateButton(btn)
    })
    colorHintContainer.clear()
    if (colorHints[userColor]) colorHintContainer.append(colorHints[userColor])
  }
  const drawColorHint = (maxColor) => {
    const SIZE = 60
    const INTERVAL = 2.25 * 60
    const INITIAL_X = 22.5
    let y = 0
    ;[R|G, R|B, G|B, R|G|B].forEach((c) => {
      if (maxColor & c) {
        const rowOffset = -10
        const container = stage.createContainer(rowOffset, 0)
        const text = createTexts(stage, c === (R|G|B) ? '  +  +  =' : '  +  =', SIZE, [0.5, 0.5, 0.5, 1])
        container.append(text.pos(0, y))
        let x = INITIAL_X
        let endX = INITIAL_X + INTERVAL * (c === (R|G|B) ? 3 : 2)
        if (c & R) {
          container.append(stage.createRect(x, y, SIZE, SIZE).color(...COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE'))
          container.append(stage.createRect(endX, y, SIZE, SIZE).color(...COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE'))
          x += INTERVAL
        }
        if (c & G) {
          container.append(stage.createRect(x, y, SIZE, SIZE).color(...COLOR_G_ARR).blendMode('SRC_ALPHA', 'ONE'))
          container.append(stage.createRect(endX, y, SIZE, SIZE).color(...COLOR_G_ARR).blendMode('SRC_ALPHA', 'ONE'))
          x += INTERVAL
        }
        if (c & B) {
          container.append(stage.createRect(x, y, SIZE, SIZE).color(...COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE'))
          container.append(stage.createRect(endX, y, SIZE, SIZE).color(...COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE'))
          x += INTERVAL
        }
        colorHints[c] = container
      }
    })
  }
  const drawUserColorSelect = (maxColor) => {
    const SPACING = 30
    const BORDER_SIZE = 15
    const SIZE = 70
    let x = 0
    let y = -BORDER_SIZE * 2 - SIZE
    const btns = colorSelectButtons = []
    // eslint-disable-next-line no-loop-func
    ;[R, G, B, R|G, R|B, G|B, R|G|B].forEach((c, index) => {
      if ((maxColor & c) === c) {
        const btn = createButton(stage, SIZE, SIZE, BORDER_SIZE, () => {
          if (currentTutorialStep && (currentTutorialStep[0] !== -1 || currentTutorialStep[1] !== index)) return
          userColor = c
          refreshColorSelectButtons()
          acceptUserClick()
        }).pos(x + BORDER_SIZE, y + BORDER_SIZE)
        btn.userColor = c
        btns.push(btn)
        userColorSelectContainer.append(btn)
        if (c & R) userColorSelectContainer.append(stage.createRect(x + BORDER_SIZE, y + BORDER_SIZE, SIZE, SIZE).color(...COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE'))
        if (c & G) userColorSelectContainer.append(stage.createRect(x + BORDER_SIZE, y + BORDER_SIZE, SIZE, SIZE).color(...COLOR_G_ARR).blendMode('SRC_ALPHA', 'ONE'))
        if (c & B) userColorSelectContainer.append(stage.createRect(x + BORDER_SIZE, y + BORDER_SIZE, SIZE, SIZE).color(...COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE'))
        x += BORDER_SIZE * 2 + SIZE + SPACING
      }
    })
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
        acceptUserClick()
        if (checkLevelEnd()) return
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
        acceptUserClick()
        if (checkLevelEnd()) return
      })
    })
  }

  // user click handler
  const handleUserClick = (m, n) => {
    if (!userClickEnabled) return
    if (currentTutorialStep && (currentTutorialStep[0] !== m || currentTutorialStep[1] !== n)) return
    const num = map[n][m]
    steps.push({
      m,
      n,
      from: num,
      to: num ? 0 : userColor
    })
    if (num) {
      userColor = num
      refreshColorSelectButtons()
      if (num & R) eraseColor(m, n, R)
      if (num & G) eraseColor(m, n, G)
      if (num & B) eraseColor(m, n, B)
    } else {
      if (userColor & R) addColor(m, n, R)
      if (userColor & G) addColor(m, n, G)
      if (userColor & B) addColor(m, n, B)
    }
  }
  const acceptUserClick = () => {
    userClickEnabled = true
    if (currentTutorialStep) {
      if (currentTutorialStep[0] === -1) {
        const btn = colorSelectButtons[currentTutorialStep[1]]
        unflashButton(btn)
        activateButton(btn)
      } else {
        tutorialContainer.clear()
      }
    }
    currentTutorialStep = tutorialSteps.shift()
    if (currentTutorialStep) {
      if (currentTutorialStep[0] === -1) {
        const btn = colorSelectButtons[currentTutorialStep[1]]
        flashButton(btn)
      } else {
        const pos = toPixelPos(currentTutorialStep[0], currentTutorialStep[1])
        const btn = createButton(stage, TILE_SIZE, TILE_SIZE, 20, () => {
          unflashButton(btn)
          activateButton(btn)
        }).pos(pos.x, pos.y)
        tutorialContainer.append(btn)
        flashButton(btn)
      }
    }
  }

  // load map and start
  const loadLevel = (level, cb) => {
    // load level data
    levelEndCb = cb
    tutorialSteps = level.tutorialSteps || []
    currentTutorialStep = null
    map = level.map || parseLevelStr(level.mapStr)
    originalMapJSON = JSON.stringify(map)
    // reset ui
    animateContainer.clear()
    tutorialContainer.clear()
    resetMetaContainer()
    refreshTiles()
    // stat used colors
    let hasR = false
    let hasG = false
    let hasB = false
    for(let j = 0; j < M_N_MAX; j++) {
      for(let i = 0; i < M_N_MAX; i++) {
        const num = map[j][i]
        if (num & R) hasR = true
        if (num & G) hasG = true
        if (num & B) hasB = true
      }
    }
    const maxColor = (hasR ? R : 0) | (hasG ? G : 0) | (hasB ? B : 0)
    userColor = MAP_LETTER_NUM_MAP[level.userColor] || maxColor
    if (maxColor !== R && maxColor !== G && maxColor !== B) {
      drawColorHint(maxColor)
      drawUserColorSelect(maxColor)
      refreshColorSelectButtons()
    }
    // show title
    startTime = Date.now() - (level.timeUsed || 0)
    showTitle(level.title, maxColor)
    showMenuButtons()
    if (level.difficulty) showMapInfo('SEED:' + level.seed + ' D:' + level.difficulty)
    acceptUserClick()
  }
  const resetLevel = () => {
    map = JSON.parse(originalMapJSON)
    refreshTiles()
  }
  const checkLevelEnd = () => {
    let status = -1
    for(let j = 0; j < M_N_MAX; j++) {
      for(let i = 0; i < M_N_MAX; i++) {
        const num = map[j][i]
        if (status < 0) status = num
        else if (status !== num) return false
      }
    }
    endLevel()
    return true
  }
  const endLevel = (quit = false) => {
    clearInterval(timeTobj)
    levelEndCb({
      timeUsed: Date.now() - startTime,
      quit
    })
  }

  return {
    loadLevel,
    changeOrientation: (isVertical) => {
      if (isVertical) {
        tilesContainer.pos(TILE_AREA_MARGIN, (1920 - 1080) / 2 + TILE_AREA_MARGIN)
        colorHintContainer.pos(0, 1920 - TILE_AREA_MARGIN * 2 - 200)
        userColorSelectContainer.pos(0, 1920 - TILE_AREA_MARGIN * 2)
      }
    }
  }
}
