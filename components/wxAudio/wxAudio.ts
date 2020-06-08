interface IData {
  isPlay: boolean
  currentTimeStr: string
  durationStr: string
  progress: number
  innerAudioContext: WechatMiniprogram.InnerAudioContext
}
Component({
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    desc: {
      type: String,
      value: '小标题'
    },
    src: {
      type: String,
      value: '',
      observer(newVal: string) {
        if (newVal) {
          this.handleInitAudio(newVal)
        }
      }
    }
  },

  data: <IData>{
    isPlay: false,
    currentTimeStr: '00:00',
    durationStr: '00:00',
    progress: 0,
    innerAudioContext: {}
  },
  detached() {
    this.data.innerAudioContext && this.data.innerAudioContext.destroy()
  },

  methods: {
    handleInitAudio(src: string) {
      this.data.innerAudioContext = wx.createInnerAudioContext()
      this.data.innerAudioContext.src = src
      this.data.innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })

      this.data.innerAudioContext.onCanplay(() => {
        // 这是一个迷，据说要手动先触发这个属性，后面才能用setTimeout获取真实时长
        this.data.innerAudioContext.duration
        setTimeout(() => {
          const durationStr = this.parseTime(this.data.innerAudioContext.duration)
          this.setData({ durationStr })
        }, 1000)
      })

      this.data.innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })

      this.data.innerAudioContext.onEnded(() => {
        this.setData({ isPlay: false })
      })

      this.data.innerAudioContext.onTimeUpdate(() => {
        const currentTime = this.data.innerAudioContext.currentTime
        const duration = this.data.innerAudioContext.duration
        const currentTimeStr = this.parseTime(currentTime)
        const progress = (currentTime / duration) * 100
        this.setData({ currentTimeStr, progress })
      })
    },

    handleControl() {
      if (!this.data.isPlay) {
        this.setData({ isPlay: true })
        this.data.innerAudioContext.play()
      } else {
        this.setData({ isPlay: false })
        this.data.innerAudioContext.pause()
      }
    },

    parseTime(time) {
      const minute = Math.floor(time / 60)
      const second = Math.floor(time % 60)
      return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
    }
  }
})