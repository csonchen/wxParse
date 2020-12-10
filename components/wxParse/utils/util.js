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

const bindInstance = () => {
  let instance = {}

  return {
    /**
     * 提供键名，绑定对象值
     */
    set: (bindName, data = null) => {
      if (!instance[bindName]) {
        instance[bindName] = data 
      }
      return instance[bindName] || {}
    },
    get: (bindName) => {
      return instance[bindName] || {}
    },
    /**
     * 清除实例对象的所有缓存值
     */
    clear: () => {
      instance = {}
    },
    /**
     * 清楚实例对象特定的键
     */
    remove: (bindName) => {
      instance[bindName] && delete instance[bindName]
    }
  }
};

module.exports = {
  getSystemInfo,
  cacheInstance: bindInstance(),
}
