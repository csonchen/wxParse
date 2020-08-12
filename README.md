# wxParse —— 微信小程序富文本解析

## 原因

由于原作者仓库 [wxParse](https://github.com/icindy/wxParse) 不再维护，我们项目中商品信息展示又是以wxParse这个用做富文本解析的；

于是乎，决定采用 **递归Component** 的方式对其进行重构一番；

原项目使用的 `template` 模板的方式渲染节点，存在以下问题：

1. 节点渲染支持到12层，超出会原样输出 `html` 代码；

2. 每一层级的循环模板都重复了一遍所有的可解析标签，代码十分臃肿。

3. `li `标签不支持 `ol` 有序列表渲染（统一采用的是 `ul` 无序列表），`a`标签无法实现跳转，也无法获取点击事件回调等等；

4. 节点渲染没有绑定 `key` 值，一是在开发工具看到一堆的 `warning`信息（看着十分难受），二是节点频繁删除添加，无法比较`key值`，造成 `dom` 节点频繁操作。

## 功能标签

目前该项目已经可以支持以下标签的渲染：

  - [x] audio标签（可自行更换组件样式，暂时采用微信公众号文章的`audio`音乐播放器的样式处理）
  - [x] video标签
  - [x] table标签
  - [x] ul标签
  - [x] ol标签 
  - [x] li标签
  - [x] a标签
  - [x] img标签
  - [x] video标签
  - [x] br标签
  - [x] button标签
  - [x] h1, h2, h3, h4标签
  - [x] 文本节点
  - [x] 其余块级标签
  - [x] 其余行级标签

## 使用

### 1. 原生组件使用方法

- 克隆 [项目](https://github.com/csonchen/wxParse) 代码，把 **components目录** 拷贝到你的小程序根目录下面;

- 在你的 **page页面** 对应的 `json` 文件引入 `wxParse` 组件

```json
{
  "usingComponents": {
    "wxParse": "/components/wxParse/wxParse"
  }
}
```

- 组件调用

```xml
<wxParse nodes="{{ htmlText }}" />
```


### 2. npm组件使用方法

- 安装组件

```shell
npm install --save wx-minicomponent
```

- 小程序开发工具的 `工具` 栏找到 `构建npm`，点击构建；

- 在页面的 json 配置文件中添加 `wxParse` 自定义组件的配置

```json
{
  "usingComponents": {
    "wxParse": "/miniprogram_npm/wx-minicomponent/wxParse"
  }
}
```

- `wxml` 文件中引用 wxParse

```xml
<wxParse nodes="{{ htmlText }}" />
```

**提示：详细步骤可以参考小程序的[npm使用文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)**


### 补充组件：代码高亮展示组件使用

- 在 `page`的 `json` 文件里面引入 `highLight` 组件

**原生引入：**

```json
{
  "usingComponents": {
    "highLight": "/components/highLight/highLight"
  }
}
```

**npm组件引入：**

```json
{
  "usingComponents": {
    "highLight": "/miniprogram_npm/wx-minicomponent/highLight"
  }
}
```

- 组件调用

```xml
<highLight codeText="{{codeText}}" />
```

## 参数文档

[线上文档地址](https://csonchen.github.io/wxParse/)

- **wxParse：富文本解析组件**

参数|说明|类型|例子
:--|:--|:--|:--
nodes|富文本字符|String|"\<div\>test\</div\>"
language|语言|String| 可选："html" \| "markdown" ("md")

**补充：**

1. a标签的内外链跳转根据的是 `http` 字符判断；

2. a标签的跳转顺序为：

- 如果page页面有定义 `handleTagATap` 方法，优先执行该方法

- 如果page页面没有定义 `handleTagATap` 方法，将根据 `a标签` 的 `href` 字段判断采用内外链跳转方式，外链跳转需要在 `app.json` 文件中新增 `自定义webview` 页面配置，如下所示：

原生webview页面配置：

```json
// app.json
{
  "pages" [
    "components/wxParse/webviewPage/webviewPage"
  ]
}
```

npm 包webview配置：

```json
// app.json
{
  "pages" [
    "miniprogram_npm/wx-minicomponent/wxParse/webviewPage/webviewPage"
  ]
}
```

**受信任的节点**

节点|例子
:--|:--
audio|\<audio title="我是标题" desc="我是小标题" src="https://media.lycheer.net/lecture/25840237/5026279_1509614610000.mp3?0.1" /\>
a|\<a href="https://www.baidu.com"> 跳转到百度 \</a>  </br> \<a href="/pages/highLightPage/highLightPage"> 站内跳转 \</a>
p|
div|
span|
li|
ul|
ol|
img|
button|
h1|
h2|
h3|
h4|
table|
tr|
th|
td|
....|

- **highLight：代码高亮解析组件**

参数|说明|类型|例子
:--|:--|:--|:--
codeText|原始高亮代码字符|String|"var num = 10;"
language|代码语言类型|String|可选值："javascript/typescript/css/xml/sql/markdown"

**提示：如果是html语言，language的值为xml**


- **wxAudio：仿微信公众号文章音频播放组件**

参数|说明|类型|例子
:--|:--|:--|:--
title|标题|String|"test"
desc|副标题|String|"sub test"
src|音频地址|String|

## 示例展示

1. **富文本解析**

- **html文本解析实例**

![示例](https://github.com/csonchen/wxParse/raw/master/static/wxParse.gif)

- **markdown文本解析实例**

![示例](https://github.com/csonchen/wxParse/raw/master/static/md.png)

2. **代码高亮**

![示例](https://github.com/csonchen/wxParse/raw/master/static/wxHigh.gif)

## 更新历史

- 2020-8-10: 文本节点添加选中复制功能

- 2020-8-6：table，tr，td等相关元素标签去掉style样式内嵌，避免表格样式错乱问题

- 2020-8-5: 新增支持a标签的内外链跳转功能，并支持page页面点击方法回调控制

- 2020-6-18：修复table渲染错位和image图片在个别情况无法预览的问题

- 2020-5-31

 1. 迁移utils目录到wxParse目录下；

 2. 富文本增加markdown文本解析支持；

- 2020-5-21: 富文本组件image标签添加loading过渡态，优化图片加载体验

- 2020-5-17: 完善组件参数文档，增加wxParse对audio标签标题，副标题的解析功能

- 2020-5-13: 增加css，html，ts，sql，markdown代码高亮提示支持

- 2020-5-6：增加图片预览功能

## TODO

- [x] 图片占位图优化，优化 `image`标签加载，避免出现一闪而过，优化加载体验；
- [ ] 编写插件，小程序可以通过插件方式引入；
- [ ] 支持 `template` 方式渲染（因为递归组件会引入组件生命周期，节点过多可能对性能有影响）；
- [ ] 尽可能多的修复原 `wxParse` 项目中的 `issue`
- [ ] ....