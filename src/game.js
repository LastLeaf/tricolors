import { SimpleGL } from './simple-gl'
import tiles from './tiles'
import cover from './cover'
import TUTORIAL_1 from './levels/tutorial-1'
import TUTORIAL_2 from './levels/tutorial-2'
import TUTORIAL_3 from './levels/tutorial-3'
import { endless } from './generator'
import { getShareInfo } from './share'

let tileUtils = null

/* eslint-disable no-use-before-define */

export const changeOrientation = (isVertical) => {
  tileUtils.changeOrientation(isVertical)
}

export const init = (canvas, options) => {
  const {isVertical} = options
  const stage = new SimpleGL(canvas)
  const root = stage.getRootContainer()

  // init main container for tiles
  const mainContainer = stage.createContainer()
  tileUtils = tiles(stage, mainContainer)
  if (isVertical) tileUtils.changeOrientation(isVertical)

  // init cover
  const coverContainer = stage.createContainer()
  const coverUtils = cover(stage, coverContainer, options)
  if (isVertical) coverUtils.changeOrientation(isVertical)
  coverUtils.onSelect((type) => {
    if (type === 'tutorial') {
      root.clear().append(mainContainer)
      const levels = [TUTORIAL_1(), TUTORIAL_2(), TUTORIAL_3()]
      const nextLevel = (item) => {
        if (!levels.length) return showCover()
        tileUtils.loadLevel(levels.shift(), ({timeUsed, stepCount, quit}) => {
          if (quit) return showCover()
          nextLevel()
        })
      }
      nextLevel()
    } else if (type === 'endless') {
      const seed = Math.floor(Math.random() * (1000000000))
      let levelNum = 0
      root.clear().append(mainContainer)
      const nextLevel = ({timeUsed, stepCount, quit}) => {
        if (quit) return showCover()
        tileUtils.loadLevel(endless({
          seed,
          level: ++levelNum,
          stepCount,
          timeUsed
        }), nextLevel)
      }
      nextLevel({
        timeUsed: 0
      })
    } else {
      window.open('https://github.com/LastLeaf/tricolors')
    }
  })

  const showCover = () => {
    root.clear().append(coverContainer)
  }

  const shareInfo = getShareInfo()
  if (!shareInfo) {
    showCover()
  } else {
    let {seed, levelNum, timeUsed, stepCount} = shareInfo
    levelNum--
    root.clear().append(mainContainer)
    const nextLevel = ({timeUsed, stepCount, quit}) => {
      if (quit) return showCover()
      tileUtils.loadLevel(endless({
        seed,
        level: ++levelNum,
        stepCount,
        timeUsed
      }), nextLevel)
    }
    nextLevel({
      timeUsed,
      stepCount
    })
  }

  return stage
}
