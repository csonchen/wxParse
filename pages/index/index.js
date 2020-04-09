//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    htmlText: '<p><a href="https://www.baidu.com" target="_blank">测试跳转</a>&nbsp;<span style="background-color: rgb(139, 170, 74);"> sdgsd</span><br></p><p><ul><li><span style="background-color: rgb(139, 170, 74);">1</span></li><li><span style="background-color: rgb(139, 170, 74);">2323</span></li><li><span style="background-color: rgb(139, 170, 74);">43434</span></li></ul></p><p></p><ol><li style="text-align: center;"><span style="background-color: rgb(139, 170, 74);">test</span></li><li style="text-align: center;"><span style="background-color: rgb(139, 170, 74);">test2</span></li><li style="text-align: center;"><span style="background-color: rgb(139, 170, 74);">test3</span></li><li style="text-align: center;"><span style="background-color: rgb(255, 255, 255);">test4</span></li></ol><p></p><p><img src="https://dev-sit-1251698455.cos.ap-guangzhou.myqcloud.com/ds/22/363/20200401/3c9e7798e3204756b9e0f3263882b81f.jpeg" style="max-width:100%;"><a href="https://baidu.com" target="_blank" style="background-color: rgb(255, 255, 255);">测试跳转</a><br></p>',
  },

  handleTagATap(url) {
    console.log(url)
  }
})
