import {
  COLOR_R_ARR,
  COLOR_G_ARR,
  COLOR_B_ARR,
} from './consts'
import {
  createButton,
} from './buttons'
import { createTexts } from './texts'

export default (stage, container) => {
  let selectCb = null

  const titleContainer = stage.createContainer().pos(555, 300)
  const title1 = createTexts(stage, 'TRI', 120, COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE')
  const title2 = createTexts(stage, 'TRI', 120, COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE')
  const title3 = createTexts(stage, 'COLORS', 120, COLOR_G_ARR).pos(270, 0).blendMode('SRC_ALPHA', 'ONE')
  const title4 = createTexts(stage, 'COLORS', 120, COLOR_B_ARR).pos(270, 0).blendMode('SRC_ALPHA', 'ONE')
  titleContainer.append(title1).append(title2).append(title3).append(title4)
  container.append(titleContainer)

  const tutorialContainer = stage.createContainer().pos(760, 600)
  const tutorialButton = createButton(stage, 100, 100, 20, () => {
    selectCb('tutorial')
  })
  const tutorialText1 = createTexts(stage, '?', 80, COLOR_R_ARR).pos(15, 10).blendMode('SRC_ALPHA', 'ONE')
  const tutorialText2 = createTexts(stage, '?', 80, COLOR_G_ARR).pos(15, 10).blendMode('SRC_ALPHA', 'ONE')
  tutorialContainer.append(tutorialButton).append(tutorialText1).append(tutorialText2)
  container.append(tutorialContainer)

  const endlessContainer = stage.createContainer().pos(1060, 600)
  const endlessButton = createButton(stage, 100, 100, 20, () => {
    selectCb('endless')
  })
  const endlessText1 = createTexts(stage, '\x01', 80, COLOR_R_ARR).pos(15, 10).blendMode('SRC_ALPHA', 'ONE')
  const endlessText2 = createTexts(stage, '\x01', 80, COLOR_G_ARR).pos(15, 10).blendMode('SRC_ALPHA', 'ONE')
  endlessContainer.append(endlessButton).append(endlessText1).append(endlessText2)
  container.append(endlessContainer)

  const authorContainer = stage.createContainer().pos(840, 960)
  const authorText = createTexts(stage, 'LASTLEAF', 40, [0.4, 0.4, 0.4, 1])
  const authorTextBg = stage.createRect(0, 0, 240, 40).color(0, 0, 0, 0).bind('click', () => {
    selectCb('')
  })
  authorContainer.append(authorTextBg).append(authorText)
  container.append(authorContainer)

  return {
    changeOrientation: (isVertical) => {
      if (isVertical) {
        titleContainer.pos(135, 500)
        tutorialContainer.pos(300, 1200)
        endlessContainer.pos(680, 1200)
        authorContainer.pos(420, 1800)
      }
    },
    onSelect: (cb) => {
      selectCb = cb
    }
  }
}
