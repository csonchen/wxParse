/**
 * 获取屏幕的宽高
 */

let windowWidth = 0
let windowHeight = 0
wx.getSystemInfo({
  success(res) {
    windowWidth = res.windowWidth
    windowHeight = res.windowHeight
  }
})

const getSystemInfo = () => {
  return [ windowWidth, windowHeight ]
}

const bindInstance = (() => {
  let instance = null

  return {
    set: (bindName, data = null) => {
      if (!instance) {
        instance = {
          [bindName]: data
        } 
      }
      return instance[bindName]
    },
    clear: () => {
      instance = null
    }
  }
})();

module.exports = {
  getSystemInfo,
  bindInstance,
}
