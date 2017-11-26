export const animateObj = (obj, toPos, length, cb) => {
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
