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
  },
})