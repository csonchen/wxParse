Page({
  data: {
    src: '',
  },

  onLoad(options) {
    const { src } = options || {}

    if (src !== null && typeof src !== 'undefined') {
      this.setData({
        src: decodeURIComponent(src)
      })
    }
  }
})