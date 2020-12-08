var hljs = require('./highlight.code');

hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('css', require('./languages/css'));
hljs.registerLanguage('xml', require('./languages/xml'));
hljs.registerLanguage('sql', require('./languages/sql'));
hljs.registerLanguage('typescript', require('./languages/typescript'));
hljs.registerLanguage('markdown', require('./languages/markdown'));
hljs.registerLanguage('c++', require('./languages/cpp'));
hljs.registerLanguage('c', require('./languages/c'));

module.exports = hljs;