const SHARE_STR_VERSION = 0x1001

let language = 'C'

const toHexStr = (num, bytes) => {
  let ret = num.toString(16)
  while (ret.length < bytes) ret = '0' + ret
  return ret
}

const createShareStr = ({seed, levelNum, timeUsed, stepCount}) => {
  const salt = Math.floor(Math.random() * (1 << 30))
  const slices = [
    toHexStr((salt + seed + levelNum + timeUsed + stepCount) ^ SHARE_STR_VERSION),
    toHexStr((salt + seed + timeUsed) ^ stepCount, 8),
    toHexStr(salt, 8),
    toHexStr((salt + seed) ^ timeUsed, 8),
    toHexStr((salt + seed + stepCount) ^ levelNum, 8),
    toHexStr(salt ^ seed, 8),
  ]
  return SHARE_STR_VERSION + 'x' + slices.join('')
}

const parseShareStr = (str) => {
  const [version, slices] = str.split('x', 2)
  if (parseInt(version, 10) !== SHARE_STR_VERSION) return null
  const arr = slices.match(/[0-9a-z]{8}/ig)
  const salt = parseInt(arr[2], 16)
  const seed = parseInt(arr[5], 16) ^ salt
  const timeUsed = parseInt(arr[3], 16) ^ (salt + seed)
  const stepCount = parseInt(arr[1], 16) ^ (salt + seed + timeUsed)
  const levelNum = parseInt(arr[4], 16) ^ (salt + seed + stepCount)
  const examing = parseInt(arr[0], 16) ^ (salt + seed + levelNum + timeUsed + stepCount)
  if (examing !== SHARE_STR_VERSION) return null
  return {
    seed,
    levelNum,
    timeUsed,
    stepCount
  }
}

export const shareLevel = (info) => {
  const str = createShareStr(info)
  const url = location.protocol + '//' + location.host + location.pathname + location.search + '#' + str
  document.getElementById('shareHint').innerHTML = language === 'zh-CN' ? '复制以下链接分享给好友' : 'Share this link'
  document.getElementById('shareUrl').innerHTML = url
  document.getElementById('shareWrapper').style.display = 'block'
}

export const getShareInfo = () => {
  if (location.hash) {
    const info = parseShareStr(location.hash.slice(1))
    location.hash = '#'
    if (info) return info
  }
  return null
}

export const setShareType = (options) => {
  language = options.language
}
