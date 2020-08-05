import HtmlToJson from './utils/html2json';
import showdown from './utils/showdown.js';
import { getSystemInfo, bindInstance } from './utils/util';

Component({
  properties: {
    nodes: {
      type: null,
      observer(val) {
        const { language } = this.properties
        if (val) {
          if (language === 'html') {
            this._parseNodes(val)
          }

          if (language === 'markdown' || language === 'md') {
            const converter = new showdown.Converter();
            const parseNodes = converter.makeHtml(val);
            this._parseNodes(parseNodes)
          }
        }
      }
    },

    language: {
      type: String,
      value: 'html' // 可选：html | markdown (md)
    }
  },

  data: {
    nodesData: [],
    bindData: {},
  },

  detached() {
    // 组件销毁，清除绑定实例
    bindInstance.clear()
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
      bindInstance.set(bindName, transData)
      console.log(this.data)
    },

    _parseNodes(nodes) {
      if (typeof nodes === 'string') { // 初始为html富文本字符串
        this._parseHtml(nodes)
      } else if (Array.isArray(nodes)) { // html 富文本解析成节点数组
        this.setData({ nodesData: nodes })
      } else { // 其余为单个节点对象
        const nodesData = [ nodes ]
        this.setData({ nodesData })
      }
    },

    /**
     * 图片视觉宽高计算函数区
     * @param {*} e 
     */
    wxParseImgLoad(e) {
      // 获取当前的image node节点
      const { from: tagFrom, index } = e.target.dataset || {}
      if (typeof tagFrom !== 'undefined' && tagFrom.length > 0) {
        const { width, height } = e.detail
        
        //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
        const recal = this._wxAutoImageCal(width, height)
        this.setData({
          width: recal.imageWidth,
          height: recal.imageHeight,
          [`nodesData[${index}].loaded`]: true,
        })
      }
    },

    /**
     * 预览图片
     * @param {*} e 
     */
    wxParseImgTap(e) {
      const { src } = e.target.dataset
      const bindName = 'wxParseData'
      const { imageUrls } = bindInstance.set(bindName)
      wx.previewImage({ 
        current: src,
        urls: imageUrls
      })
    },

    /**
     * 计算视觉优先的图片宽高
     * @param {*} originalWidth 
     * @param {*} originalHeight 
     */
    _wxAutoImageCal(originalWidth, originalHeight) {
      let autoWidth = 0, autoHeight = 0;
      const results = {}
      const [ windowWidth, windowHeight ] = getSystemInfo()

      // 判断按照哪种方式进行缩放
      if (originalWidth > windowWidth) { //在图片width大于手机屏幕width时候
        autoWidth = windowWidth
        autoHeight = (autoWidth * originalHeight) / originalWidth
        results.imageWidth = autoWidth
        results.imageHeight = autoHeight
      } else { // 否则展示原来数据
        results.imageWidth = originalWidth
        results.imageHeight = originalHeight
      }
      return results
    },

    /**
     * 增加a标签跳转
     * 1. 如果page页面有handleTagATap事件，优先采用事件回调的方式处理
     * 2. 如果page页面没有handleTagATap事件，根据链接字段判断采用内外链跳转方式
     * @param {*} e 
     */
    wxParseTagATap(e) {
      const { src = '' } = e.currentTarget.dataset

      // 采用递归组件方式渲染，不能通过triggerEvent方式向父级传参，可以获取当前页面调用页面方法处理
      const curPages =  getCurrentPages();
      const currentPage = curPages[curPages.length - 1]
      if (currentPage && currentPage.handleTagATap) {
        currentPage.handleTagATap(src)
        return
      }

      // 判断是否内部链接跳转
      const isInnerPage = src.indexOf('http') === -1
      if (isInnerPage) {
        wx.navigateTo({
          url: src
        })
      } else {
        wx.navigateTo({
          url: `/components/wxParse/webviewPage/webviewPage?src=${src}`
        })
      }
    }
  }
})