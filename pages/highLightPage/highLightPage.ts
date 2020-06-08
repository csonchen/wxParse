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

const cssCode = `
.flex {
  display: flex;
}
.flex-center {
  justify-content: center;
}
.flex-middle {
  align-items: center;
}
`

const htmlCode = `
<div>
  <p class="font12">我是标题</p>
  <text>我是文本</text>
</div>
`

const markdownCode = `
## 我是标题

### 我是副标题

1. 我是列表1
2. 我是列表2
`

const sqlCode = `
select * from t_ad where id = 1

select ad_name from t_ad where id = 1
`

const tsCode = `
const id: number;

const setId: (id: number) => {
  this.id = id
}
`

Page({
  data: {
    codeText: `${jsCode}`,
    cssCode: `${cssCode}`,
    htmlCode: `${htmlCode}`,
    markdownCode: `${markdownCode}`,
    sqlCode: `${sqlCode}`,
    tsCode: `${tsCode}`,
  },
})