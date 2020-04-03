import HtmlToJson from '../utils/html2json';

// 获取屏幕的宽高
let realWindowWidth = 0;
let realWindowHeight = 0;

(function() {
  wx.getSystemInfo({
    success(res) {
      realWindowWidth = res.windowWidth
      realWindowHeight = res.windowHeight
    }
  })
})()

Component({
  properties: {
    nodes: {
      type: null,
      observer(val) {
        if (val) {
          if (typeof val === 'string') { // 初始为html富文本字符串
            this._parseHtml(val)
          } else if (Array.isArray(val)) { // html 富文本解析成节点数组
            this.setData({ nodesData: val })
          } else { // 其余为单个节点对象
            const nodesData = [ val ]
            this.setData({ nodesData })
          }
        }
      }
    },
  },

  data: {
    nodesData: [],
    bindData: {},
  },

  methods: {
    _parseHtml(html, bindName) {
      bindName = 'wxParseData'

      //存放html节点转化后的json数据
      const transData = HtmlToJson.html2json(html, bindName)

      transData.view = {}
      transData.view.imagePadding = 0

      this.setData({
        nodesData: transData.nodes,
        bindData: {
          [bindName]: transData
        }
      })
      console.log(this.data)
    },

    /**
     * 图片视觉宽高计算函数区
     * @param {*} e 
     */
    wxParseImgLoad(e) {
      const { from: tagFrom, idx } = e.target.dataset || {}
      if (typeof tagFrom !== 'undefined' && tagFrom.length > 0) {
        this._calMoreImageInfo(e, idx, tagFrom)
      }
    },

    /**
     * 假循环获取计算图片视觉最佳宽高
     * @param {*} e 
     * @param {*} idx 
     * @param {*} bindName 
     */
    _calMoreImageInfo(e, idx, bindName) {
      const bindData = this.data.bindData
      const temData = bindData[bindName]
      // debugger
      if (!temData || temData.images.length === 0) {
        return
      }

      return
      const temImages = temData.images
      const { width, height } = e.detail
      //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
      const recal = wxAutoImageCal(width, height ,bindName); 
      const index = temImages[idx].index
      let key = `${bindName}`
      for (let i of index.split('.')) {
        key += `.nodex[${i}]`
      }
      const keyW = key + '.width'
      const keyH = key + '.height'
      this.setData({
        [keyW]: recal.imageWidth,
        [keyH]: recal.imageHeight,
      })
    },

    /**
     * 计算视觉优先的图片宽高
     * @param {*} originalWidth 
     * @param {*} originalHeight 
     * @param {*} bindName 
     */
    _wxAutoImageCal(originalWidth, originalHeight, bindName) {
      let windowWidth = 0, windowHeight = 0;
      let autoWidth = 0, autoHeight = 0;
      const results = {}
      const padding = this.bindData[bindName].view.imagePadding
      windowWidth = realWindowWidth - 2 * padding
      windowHeight = realWindowHeight

      // 判断按照哪种方式进行缩放
      if (originalWidth > windowWidth) { //在图片width大于手机屏幕width时候
        autoWidth = windowWidth
        autoHeight = (autoWidth * originalHeight) / originalWidth
        results.imageWidth = autoWidth
        results.imageWidth = autoHeight
      } else { // 否则展示原来数据
        results.imageWidth = originalWidth
        results.imageHeight = originalHeight
      }
      return results
    }
  }
})