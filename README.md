# wxParse

## 微信小程序富文本解析

### 原因

由于原作者仓库 [wxParse](https://github.com/icindy/wxParse) 不再维护，我们项目中商品信息展示又是以wxParse这个用做富文本解析的；

于是乎，决定采用 **递归Component** 的方式对其进行重构一番；

原项目使用的 `template` 模板的方式渲染节点，存在以下问题：

1. 节点渲染支持到12层，超出会原样输出 `html` 代码；

2. 每一层级的循环模板都重复了一遍所有的可解析标签，代码十分臃肿。

3. `li `标签不支持 `ol` 有序列表渲染（统一采用的是 `ul` 无序列表），`a`标签无法实现跳转，也无法获取点击事件回调等等；

4. 节点渲染没有绑定 `key` 值，一是在开发工具看到一堆的 `warning`信息（看着十分难受），二是节点频繁删除添加，无法比较`key值`，造成 `dom` 节点频繁操作。

### 功能标签

1. 目前该项目已经可以支持以下标签的渲染：

  - [x] audio标签（可自行更换组件样式，暂时采用微信公众号文章的`audio`音乐播放器的样式处理）
  - [x] ul标签
  - [x] ol标签 
  - [x] li标签
  - [x] a标签
  - [x] img标签
  - [x] video标签
  - [x] br标签
  - [x] button标签
  - [x] 文本节点
  - [x] 其余块级标签
  - [x] 其余行级标签

2. 支持 **npm包** 引入

```shell
npm install --save wx-minicomponent
```

### 使用

1. **原生组件使用方法**

- 克隆 [项目](https://github.com/csonchen/wxParse) 代码，把 **components目录** 和 **utils目录** 拷贝到你的小程序根目录下面;

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

2. **npm组件使用方法**

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

3. **补充组件**：代码高亮展示组件使用（目前只支持 `javascript` 语法，等我有时间再扩展别的语法）

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
    "wxParse": "/miniprogram_npm/wx-minicomponent/highLight"
  }
}
```

- 组件调用

```xml
<highLight codeText="{{codeText}}" />
```


### 示例展示

![示例](/static/demo.png)

![示例](/static/highlight.png)

### TODO

- [ ] 编写插件，小程序可以通过插件方式引入；
- [ ] 支持 `template` 方式渲染（因为递归组件会引入组件生命周期，节点过多可能对性能有影响）；
- [ ] 图片占位图优化，优化 `image`标签加载，避免出现一闪而过，优化加载体验；
- [ ] 尽可能多的修复原 `wxParse` 项目中的 `issue`
- [ ] ....