import {
  COLOR_BG_ARR,
  COLOR_BTN_NORMAL_ARR,
  COLOR_BTN_ACTIVE_ARR,
  COLOR_BTN_FLASH_ARR,
} from './consts'
import { animateObj } from './animate'

const FLASH_ANIMATION_LENGTH = 1000

export const createButton = (stage, w, h, margin, cb) => {
  const container = stage.createContainer()
  container.append(stage.createRect(-margin, -margin, w + margin * 2, h + margin * 2).color(...COLOR_BTN_NORMAL_ARR).bind('click', cb || function() { /* empty */ }))
  container.append(stage.createRect(0, 0, w, h).color(...COLOR_BG_ARR))
  return container
}
export const activateButton = (container) => {
  container.index(0).color(...COLOR_BTN_ACTIVE_ARR)
}
export const deactivateButton = (container) => {
  container.index(0).color(...COLOR_BTN_NORMAL_ARR)
}
export const flashButton = (container) => {
  if (container.buttonFlashing) return
  container.buttonFlashing = true
  const btn = container.index(0).color(...COLOR_BTN_FLASH_ARR).setAlpha(0)
  let curAlpha = 0
  const flash = () => {
    if (!container.buttonFlashing) {
      activateButton(container)
      return
    }
    curAlpha = 1 - curAlpha
    animateObj(btn, {
      x: btn.x,
      y: btn.y,
      alpha: curAlpha
    }, FLASH_ANIMATION_LENGTH, flash)
  }
  flash()
}
export const unflashButton = (container) => {
  container.buttonFlashing = false
  container.index(0).color(...COLOR_BTN_NORMAL_ARR)
}

