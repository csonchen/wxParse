import HtmlToJson from"./utils/html2json";import showdown from"./utils/showdown.js";import{getSystemInfo,cacheInstance}from"./utils/util";const BIND_NAME="wxParse";Component({pageNodeKey:"",properties:{language:{type:String,value:"html"},nodes:{type:null,observer(e){if(!e)return;const{language:t}=this.properties;if("markdown"===t||"md"===t){const t=(new showdown.Converter).makeHtml(e);this._parseNodes(t)}else this._parseNodes(e)}}},data:{nodesData:[],bindData:{}},lifetimes:{detached(){cacheInstance.remove(this.pageNodeKey)}},methods:{_parseNodes(e){const t=getCurrentPages(),a=t[t.length-1];if(this.pageNodeKey="wxParse_"+a.__wxExparserNodeId__,"string"==typeof e)this._parseHtml(e);else if(Array.isArray(e))this.setData({nodesData:e});else{const t=[e];this.setData({nodesData:t})}},_parseHtml(e){const t=HtmlToJson.html2json(e,this.pageNodeKey);t.view={},t.view.imagePadding=0,this.setData({nodesData:t.nodes,bindData:{[this.pageNodeKey]:t}}),cacheInstance.set(this.pageNodeKey,t),console.log(this.data)},wxParseImgLoad(e){const{from:t,index:a}=e.target.dataset||{};if(void 0!==t&&t.length>0){const{width:t,height:s}=e.detail,o=this._wxAutoImageCal(t,s);this.setData({width:o.imageWidth,height:o.imageHeight,[`nodesData[${a}].loaded`]:!0})}},wxParseImgTap(e){const{src:t}=e.target.dataset,{imageUrls:a=[]}=cacheInstance.get(this.pageNodeKey);wx.previewImage({current:t,urls:a})},_wxAutoImageCal(e,t){let a=0,s=0;const o={},[i,n]=getSystemInfo();return e>i?(a=i,s=a*t/e,o.imageWidth=a,o.imageHeight=s):(o.imageWidth=e,o.imageHeight=t),o},wxParseTagATap(e){const{src:t=""}=e.currentTarget.dataset,a=getCurrentPages(),s=a[a.length-1];if(s&&s.handleTagATap)return void s.handleTagATap(t);-1===t.indexOf("http")?wx.navigateTo({url:t}):wx.navigateTo({url:"/components/wxParse/webviewPage/webviewPage?src="+t})}}});