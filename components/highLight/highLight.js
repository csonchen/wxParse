const hljs = require('./lib/index');

// 支持的解析语言列表
const LANGUAGE_LIST = [
  'javascript', 
  'css', 
  'xml', 
  'sql', 
  'typescript', 
  'markdown', 
  'c++', 
  'c',
];

Component({
  properties: {
    codeText: {
      type: String,
      value: ''
    },

    language: {
      type: String,
      value: 'javascript'
    }
  },

  data: {
    code: ''
  },

  attached() {
    const { codeText, language } = this.data
    this.parseCode(codeText, language)
  },

  methods: {
    parseCode(input, language) {
      const lang = LANGUAGE_LIST.includes(language) ? language : 'javascript'
      const { value } = hljs.highlight(lang, input)
      const highlighted = value.replace('&amp;', '&').trim()

      let codeResult = `<code class="${lang}">${highlighted}</code>`
      codeResult = codeResult.replace(/\n/g, "<br/>").replace('\<code\>', '')

      this.setData({ code: codeResult })
    }
  }
})