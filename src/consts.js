const COLOR_R = '#e75885'
const COLOR_G = '#2f9134'
const COLOR_B = '#228eda'

const transformColorStr = (colorStr) => {
  const r = parseInt(colorStr.slice(1, 3), 16) / 255
  const g = parseInt(colorStr.slice(3, 5), 16) / 255
  const b = parseInt(colorStr.slice(5, 7), 16) / 255
  return [r, g, b, 0.7]
}
export const COLOR_R_ARR = transformColorStr(COLOR_R)
export const COLOR_G_ARR = transformColorStr(COLOR_G)
export const COLOR_B_ARR = transformColorStr(COLOR_B)
export const COLOR_BG_ARR = [0.1, 0.1, 0.1, 1]

export const COLOR_BTN_NORMAL_ARR = [0.2, 0.2, 0.2, 1]
export const COLOR_BTN_ACTIVE_ARR = [0.6, 0.6, 0.6, 1]
export const COLOR_BTN_FLASH_ARR = [0.9, 0.9, 0.9, 1]

export const R = 1
export const G = 2
export const B = 4

export const MAP_LETTER_NUM_MAP = {
  '-': 0,
  r: R,
  g: G,
  b: B,
  y: R | G,
  c: G | B,
  p: R | B,
  w: R | G | B,
}
