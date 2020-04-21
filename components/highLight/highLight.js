const hljs = require('./lib/index');

Component({
  properties: {
    codeText: {
      type: String,
      value: '',
      observer(newVal) {
        this.parseCode(newVal)
      }
    }
  },

  data: {
    code: ''
  },

  methods: {
    parseCode(input, language) {
      const lang = language || 'javascript'
      const { value } = hljs.highlight(lang, input)
      const highlighted = value.replace('&amp;', '&').trim()

      let codeResult = `<code class="${lang}">${highlighted}</code>`
      codeResult = codeResult.replace(/\n/g, "<br/>").replace('\<code\>', '')

      this.setData({ code: codeResult })
    }
  }
})