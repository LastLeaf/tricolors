import { SimpleGL } from './simple-gl'

const COLOR_R = [1, 0, 0, 1]
const COLOR_G = [0, 1, 0, 1]
const COLOR_B = [0, 0, 1, 1]

export const init = (canvas) => {
  const stage = new SimpleGL(canvas)
  const root = stage.getRootContainer()
  const rect1 = stage.createRect(100, 100, 500, 500).color(...COLOR_R)
  const rect2 = stage.createRect(275, 500, 500, 500).color(...COLOR_G).blendMode('ONE', 'ONE')
  const rect3 = stage.createRect(500, 100, 500, 500).color(...COLOR_B).blendMode('ONE', 'ONE')
  root.append(rect1).append(rect2).append(rect3)
}
