//index.js
//获取应用实例
const app = getApp()

const jsCode = `init = jQuery.fn.init = function( selector, context, root ) {
  var match, elem;

  // v1.4之后，可以创建不包含任何DOM节点的空jQuery对象
  if ( !selector ) {
    return this
  }

  // 处理字符串
  if ( typeof selector === 'string' ) {
    // 处理 HTML 字符串
    if ( selector[ 0 ] === '<' && selector[ selector.length - 1 ] === '>' && selector.length >= 3) {
        // ....

    // 其它字符串，当做选择器处理    
    } else {
      match = rquickExpr.exec( selector )
    }

  // 处理 DOM 节点 => $(DOMElement)  
  } else if ( selector.nodeType ) {
    // .....

  // 处理函数 => $(function)
  } else if ( typeof selector === 'function' ) {
    // ....
  }

  // 处理其它情况
  return jQuery.makeArray( selector, this )
}`

Page({
  data: {
    codeText: `${jsCode}`,
    htmlText: '<p><div style="margin-bottom: 10px;">audio标签</div><audio src="https://media.lycheer.net/lecture/25840237/5026279_1509614610000.mp3?0.1" /><div style="margin-top: 10px;">一. 转义字符</div></div>&lt;div style="color:red"&gt;我是转义字符&lt;/div&gt; <div style="margin-top: 10px;">二. a标签跳转</div> </div><a href="https://www.baidu.com" target="_blank">a标签跳转</a>&nbsp; <div style="margin-top: 10px;">三. 内联标签</div> </div><span style="background-color: rgb(139, 170, 74);">我是内联标签</span><br></p><p><div style="margin-top: 10px">四. ul无序列表</div></div><ul><li style="text-align: center;"><span style="background-color: rgb(139, 170, 74);">1</span></li></ul></p><p></p><div style="margin-top: 10px;">五. ol有序列表</div></div><ol><li style="text-align: center;"><span style="background-color: rgb(139, 170, 74);">test</span></li><li><span style="background-color: rgb(139, 170, 74);">test2</span></li></ol><p></p><div style="margin-top: 10px;">六. 图片渲染</div></div><p><img src="https://dev-sit-1251698455.cos.ap-guangzhou.myqcloud.com/ds/22/363/20200401/3c9e7798e3204756b9e0f3263882b81f.jpeg"><img src="https://mmbiz.qpic.cn/mmbiz_png/1gmcynicwloGkVMTr6wTHdDXlFUSaSxOSRELianAFGJYVzvXJKoM2xbbFMqKe6ONy5zoHHejNbibTJn5gdEOc1aIA/0?wx_fmt=png"/></p>',
  },


  handleTagATap(url) {
    console.log(url)
  }
})
