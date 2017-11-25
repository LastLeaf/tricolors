import { SimpleGL } from './simple-gl'
import tiles from './tiles'

export const init = (canvas) => {
  const stage = new SimpleGL(canvas)
  const root = stage.getRootContainer()
  const tilesContainer = stage.createContainer()
  root.append(tilesContainer)
  tiles(stage, tilesContainer)
  return stage
}
