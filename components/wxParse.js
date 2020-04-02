import HtmlToJson from '../utils/html2json';


Component({
  attached() {
    const html = '<p>增加图文详情类<img src="https://dev-sit-1251698455.cos.ap-guangzhou.myqcloud.com/ds/20/50/20200330/3edaec5f39ea43aba4883b041becbf2b.png" style="max-width: 100%;"><img src="https://dev-sit-1251698455.cos.ap-guangzhou.myqcloud.com/ds/20/50/20200330/0fb6e34e2dff4cf19a9f6e0420f10c77.png" style="max-width: 100%;"></p><p><br></p>'

    const result = HtmlToJson(html, 'wxParseData')
    console.log(result)
  }
})