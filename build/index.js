const fs = require('fs');
const config = require('./config');
const path = require('path');

(async () => {
  // 获取需要打包的组件名
  const buildType = process.argv[2]

  if (!buildType) return

  // 富文本组件的wxml模板和组件引入路径
  const jsFileName = path.resolve(__dirname, '../components/wxParse/wxParse.wxml')
  const jsonFileName = path.resolve(__dirname, '../components/wxParse/wxParse.json')

  for (let key in config) {
    if (key === buildType) {
      const { name, path, template, renderKey } = config[key]
      // 注入wxml模板文件
      const parseContent = fs.readFileSync(jsFileName, 'utf-8')
      const reg = new RegExp("{{" + renderKey + "}}")
      const result = parseContent.replace(reg, template.trim())
      try {
        fs.writeFileSync(jsFileName, result)
      } catch (err) {
        console.log('写入模板文件失败:', err)
      }

      // 注入json组件引入文件
      const jsonImportObj = JSON.parse(fs.readFileSync(jsonFileName, 'utf-8'))
      jsonImportObj['usingComponents'][name] = path
      const jsonImportContent = JSON.stringify(jsonImportObj)
      try {
        fs.writeFileSync(jsonFileName, jsonImportContent)
      } catch (err) {
        console.log('写入组件引入文件失败：', err)
      }
    }
  }
})();