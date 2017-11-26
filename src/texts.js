import LETTERS from './dot-fonts/letters'
import NUMBERS from './dot-fonts/numbers'
import SYMBOLS from './dot-fonts/symbols'
import SPECIAL from './dot-fonts/special'

const dotsPositions = Object.create(null)
const dotsInfo = Object.create(null)

const prepareFonts = (letter, dotStr) => {
  const lines = dotStr.split('\n')
  while(lines[0].indexOf('[') < 0) lines.shift()
  const left = lines[0].indexOf('[')
  const right = lines[0].indexOf(']') + 1
  const infoArr = JSON.parse(lines[0].slice(left, right))
  const info = {width: infoArr[0], height: infoArr[1]}
  let n = 0
  const arr = []
  for(lines.shift(); lines.length; lines.shift(), n++) {
    const lineContent = lines[0].slice(left, left + info.width)
    for(let m = 0; m < lineContent.length; m++) {
      if (lineContent[m] === '+') {
        arr.push([m, n])
      }
    }
  }
  dotsPositions[letter] = arr
  dotsInfo[letter] = info
}
for(let k in LETTERS) prepareFonts(k, LETTERS[k])
for(let k in NUMBERS) prepareFonts(k, NUMBERS[k])
for(let k in SYMBOLS) prepareFonts(k, SYMBOLS[k])
for(let k in SPECIAL) prepareFonts(k, SPECIAL[k])

export const createTexts = (stage, str, size, color) => {
  const container = stage.createContainer()
  let x = 0
  for(let i = 0; i < str.length; i++) {
    const dotsPosArr = dotsPositions[str[i]]
    const info = dotsInfo[str[i]]
    const dotSize = size / info.height
    // eslint-disable-next-line no-loop-func
    dotsPosArr.forEach(([m, n]) => {
      const rect = stage.createRect(m * dotSize + x, n * dotSize, dotSize, dotSize).color(...color)
      container.append(rect)
    })
    x += dotSize * info.width
  }
  return container
}
