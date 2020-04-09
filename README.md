# wxParse

## 微信小程序富文本解析

### 原因

由于原作者仓库 [wxParse](https://github.com/icindy/wxParse) 不再维护，我们项目中又是以wxParse这个用做富文本解析的；

于是乎，决定采用 **递归Component** 的方式对其进行重构一番，原项目使用的 `template` 模板的方式渲染节点，存在以下问题：

1. 节点渲染支持到12层，超出会原样输出 `html` 代码；
2. 每一层级的循环模板都重复了一遍所有的可解析标签，代码十分臃肿。

目前该项目已经可以支持以下标签的渲染：

- [√] ul标签
- [√] ol标签 
- [√] li标签
- [√] a标签
- [√] img标签
- [√] video标签
- [√] br标签
- [√] button标签
- [√] 文本节点
- [√] 其余块级标签
- [√] 其余行级标签

### 使用
1. 在 `page`的 `json` 文件里面引入 `wxParse` 组件

```javascript
{
  "usingComponents": {
    "wxParse": "../../components/wxParse"
  }
}
```

2. 组件调用

```javascript
<wxParse nodes="{{htmlText}}" />
```