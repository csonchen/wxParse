//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    htmlText: '<p><div style="margin-top: 10px;">一. 转义字符</div></div>&lt;div style="color:red"&gt;我是转义字符&lt;/div&gt; <div style="margin-top: 10px;">二. a标签跳转</div> </div><a href="https://www.baidu.com" target="_blank">a标签跳转</a>&nbsp; <div style="margin-top: 10px;">三. 内联标签</div> </div><span style="background-color: rgb(139, 170, 74);">我是内联标签</span><br></p><p><div style="margin-top: 10px">四. ul无序列表</div></div><ul><li style="text-align: center;"><span style="background-color: rgb(139, 170, 74);">1</span></li></ul></p><p></p><div style="margin-top: 10px;">五. ol有序列表</div></div><ol><li style="text-align: center;"><span style="background-color: rgb(139, 170, 74);">test</span></li><li><span style="background-color: rgb(139, 170, 74);">test2</span></li></ol><p></p><div style="margin-top: 10px;">六. 图片渲染</div></div><p><img src="https://dev-sit-1251698455.cos.ap-guangzhou.myqcloud.com/ds/22/363/20200401/3c9e7798e3204756b9e0f3263882b81f.jpeg"></p>',
  },

  handleTagATap(url) {
    console.log(url)
  }
})
