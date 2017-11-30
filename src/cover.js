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

  const titleLineContainer = stage.createContainer().pos(12, 240)
  const block1 = stage.createRect(0, 0, 40, 40).color(...COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block2 = stage.createRect(760 * 1 / 6, 0, 40, 40).color(...COLOR_G_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block3 = stage.createRect(760 * 2 / 6, 0, 40, 40).color(...COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block41 = stage.createRect(760 * 3 / 6, 0, 40, 40).color(...COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block42 = stage.createRect(760 * 3 / 6, 0, 40, 40).color(...COLOR_G_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block51 = stage.createRect(760 * 4 / 6, 0, 40, 40).color(...COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block52 = stage.createRect(760 * 4 / 6, 0, 40, 40).color(...COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block61 = stage.createRect(760 * 5 / 6, 0, 40, 40).color(...COLOR_G_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block62 = stage.createRect(760 * 5 / 6, 0, 40, 40).color(...COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block71 = stage.createRect(760, 0, 40, 40).color(...COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block72 = stage.createRect(760, 0, 40, 40).color(...COLOR_G_ARR).blendMode('SRC_ALPHA', 'ONE')
  const block73 = stage.createRect(760, 0, 40, 40).color(...COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE')
  titleLineContainer.append(block1).append(block2).append(block3)
    .append(block41).append(block42)
    .append(block51).append(block52)
    .append(block61).append(block62)
    .append(block71).append(block72).append(block73)

  const titleContainer = stage.createContainer().pos(555, 300)
  const title1 = createTexts(stage, 'TRI', 120, COLOR_R_ARR).blendMode('SRC_ALPHA', 'ONE')
  const title2 = createTexts(stage, 'TRI', 120, COLOR_B_ARR).blendMode('SRC_ALPHA', 'ONE')
  const title3 = createTexts(stage, 'COLORS', 120, COLOR_G_ARR).pos(270, 0).blendMode('SRC_ALPHA', 'ONE')
  const title4 = createTexts(stage, 'COLORS', 120, COLOR_B_ARR).pos(270, 0).blendMode('SRC_ALPHA', 'ONE')
  titleContainer.append(title1).append(title2).append(title3).append(title4).append(titleLineContainer)
  container.append(titleContainer)


  const tutorialContainer = stage.createContainer().pos(760, 600)
  const tutorialButton = createButton(stage, 140, 140, 20, () => {
    selectCb('tutorial')
  }).pos(-20, -20)
  const tutorialText1 = createTexts(stage, '?', 100, COLOR_R_ARR).pos(5, 10).blendMode('SRC_ALPHA', 'ONE')
  const tutorialText2 = createTexts(stage, '?', 100, COLOR_G_ARR).pos(5, 10).blendMode('SRC_ALPHA', 'ONE')
  tutorialContainer.append(tutorialButton).append(tutorialText1).append(tutorialText2)
  container.append(tutorialContainer)

  const endlessContainer = stage.createContainer().pos(1060, 600)
  const endlessButton = createButton(stage, 140, 140, 20, () => {
    selectCb('endless')
  }).pos(-20, -20)
  const endlessText1 = createTexts(stage, '\x01', 100, COLOR_R_ARR).pos(5, 10).blendMode('SRC_ALPHA', 'ONE')
  const endlessText2 = createTexts(stage, '\x01', 100, COLOR_G_ARR).pos(5, 10).blendMode('SRC_ALPHA', 'ONE')
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
