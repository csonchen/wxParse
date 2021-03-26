import HtmlToJson from './utils/html2json';
import showdown from './utils/showdown.js';
import { getSystemInfo, cacheInstance, getUniqueKey } from './utils/util';

const BIND_NAME = 'wxParse'

Component({
  properties: {
    // 当前页面的page标识符
    pageKey: {
      type: String,
      value: ''
    },
    // 当前节点的根节点标识符
    rootKey: {
      type: String,
      value: ''
    },  
    // 解析语言类型
    language: {
      type: String,
      value: 'html' // 可选：html | markdown (md)
    },
    // 解析节点
    nodes: {
      type: null,
      observer(val) {
        if (!val) return

        const { language } = this.properties
        // 采用markdown解析
        if (language === 'markdown' || language === 'md') {
          const converter = new showdown.Converter();
          const parseNodes = converter.makeHtml(val);
          setTimeout(() => {
            this._parseNodes(parseNodes)
          }, 0);
        } else { // 默认采用html解析
          setTimeout(() => {
            this._parseNodes(val)
          }, 0)
        }
      }
    },
  },

  data: {
    pageNodeKey: '',
    wxparseRootKey: '',
    nodesData: [],
    bindData: {},
  },

  lifetimes: {
    detached() {
      // 组件销毁，清除当前页面绑定的所有wxparse实例
      cacheInstance.removeAllByKey(this.data.pageKey)
    }
  },

  methods: {
    _parseNodes(nodes) {
      if (typeof nodes === 'string') { // 初始为html富文本字符串
        this._parseHtml(nodes)
      } else { // 判断是否解析出来节点数组，其余则为节点对象，需自构建成数组格式
        const nodesData = Object.prototype.toString.call(nodes) === '[object Array]' ? nodes : [nodes]
        this.setData({
          nodesData,
        })
      }
    },

    _parseHtml(html) {
      // 生成page，wxparse根节点标识符
      const allPages = getCurrentPages(),
            currentPage = allPages[allPages.length - 1],
            pageNodeKey = `${BIND_NAME}_${currentPage.__wxExparserNodeId__}`,
            wxparseRootKey = `${pageNodeKey}_${getUniqueKey()}`

      //存放html节点转化后的json数据
      const transData = HtmlToJson.html2json(html, wxparseRootKey)
      transData.view = {}
      transData.view.imagePadding = 0

      this.setData({
        wxparseRootKey,
        pageNodeKey,
        nodesData: transData.nodes,
        bindData: {
          [wxparseRootKey]: transData,
        }
      })
      // 构建page页面对象内部的wxparse富文本节点数组集合 eg: pageId => [wxparse1key, wxparse2key, ....]
      const pageInstance = cacheInstance.get(pageNodeKey)
      if (pageInstance) {
        pageInstance.push(wxparseRootKey)
      } else {
        cacheInstance.set(pageNodeKey, [wxparseRootKey])
      }
      cacheInstance.set(wxparseRootKey, transData)
      // 作调试用，注释打开可以查看HTML解析出来的dom结构
      // console.log(this.data)
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
        })
      }
    },

    /**
     * 预览图片
     * @param {*} e 
     */
    wxParseImgTap(e) {
      const { src = '', from = ''} = e.target.dataset || {}
      const cacheKey = this.data.rootKey || this.data.wxparseRootKey || from
      const { imageUrls = [] } = cacheInstance.get(cacheKey) || {}
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