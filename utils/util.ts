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
  return [windowWidth, windowHeight]
}

const bindData = (() => {
  let instance: { [x: string]: any; } | null = null;
  return function (bindName: string, data?: any) {
    if (!instance) {
      instance = {
        [bindName]: data
      }
    }
    return instance[bindName]
  }
})();

export {
  getSystemInfo,
  bindData,
}
