const hljs = require('./lib/index');

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
      const lang = language || 'javascript'
      const { value } = hljs.highlight(lang, input)
      const highlighted = value.replace('&amp;', '&').trim()

      let codeResult = `<code class="${lang}">${highlighted}</code>`
      codeResult = codeResult.replace(/\n/g, "<br/>").replace('\<code\>', '')

      this.setData({ code: codeResult })
    }
  }
})