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

const getUniqueKey = (() => {
  // 避免程序执行过快（快到1ms就再次调用），来个变量控制一下
  let num = 0
  return function() {
    return new Date().getTime() + num++
  }
})();

const bindInstance = () => {
  let instance = {}

  return {
    getInstance: () => {
      return instance
    },
    /**
     * 提供键名，绑定对象值
     */
    set: (bindName, data = null) => {
      if (!instance[bindName]) {
        instance[bindName] = data 
      }
      return instance[bindName]
    },
    get: (bindName) => {
      return instance[bindName] || null
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
    },
    /**
     * 清楚当前节点及其子节点列表
     * @param {*} key 
     */
    removeAllByKey: (key) => {
      if (!instance[key]) return
      // 清除子节点关联
      for (let childKey of instance[key]) {
        instance[childKey] && delete instance[childKey]
      }
      // 清除父节点关联
      delete instance[key]
    }
  }
};

module.exports = {
  getSystemInfo,
  getUniqueKey,
  cacheInstance: bindInstance(),
}
