const config = {
  highLight: {
    name: 'highLight',
    path: '../highLight/highLight',
    template: `
      <view class="{{item.classStr}}" style="{{item.styleStr}}">
        <highLight codeText="{{item.content}}" language="{{item.attr && item.attr.lang}}" />
      </view>
    `,
  },
  wxAudio: {
    name: 'wxAudio',
    path: '../wxAudio/wxAudio',
    template: `
      <view class="wxParse-audio">
        <wxAudio 
          src="{{item.attr.src}}" 
          title="{{item.attr.title}}" 
          desc="{{item.attr.desc}}" 
          class="wxParse-audio-inner {{item.classStr}}" 
          style="{{item.styleStr}}" 
        />
      </view>
    `,
  }
}

module.exports = config