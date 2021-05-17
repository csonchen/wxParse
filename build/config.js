const config = {
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