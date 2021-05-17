const fs = require('fs');
const config = require('./config');
const path = require('path');

(async () => {
  const jsFileName = path.resolve(__dirname, '../components/wxParse/wxParse.wxml')
  const jsonFileName = path.resolve(__dirname, '../components/wxParse/wxParse.json')
  const parseContent = fs.readFileSync(jsFileName, 'utf-8')
  const { wxAudio: { template } } = config
  const result = parseContent.replace(/\{\{(template)\}\}/gm, template)
  try {
    fs.writeFileSync(jsFileName, result)
  } catch (err) {
    console.log('写入模板文件失败:', err)
  }
})();