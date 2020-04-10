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
      observer(newVal) {
        if (newVal) {
          this.handleInitAudio(newVal)
        }
      }
    }
  },

  data: {
    isPlay: false,
    currentTimeStr: '00:00',
    durationStr: '00:00',
    progress: 0,
  },

  detached() {
    this.innerAudioContext && this.innerAudioContext.destroy()
  },

  methods: {
    handleInitAudio(src) {
      this.innerAudioContext = wx.createInnerAudioContext()
      this.innerAudioContext.src = src
      this.innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })

      this.innerAudioContext.onCanplay(() => {
        // 这是一个迷，据说要手动先触发这个属性，后面才能用setTimeout获取真实时长
        this.innerAudioContext.duration
        setTimeout(() => {
          const durationStr = this.parseTime(this.innerAudioContext.duration)
          this.setData({ durationStr })
        }, 1000)
      })

      this.innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })

      this.innerAudioContext.onEnded(() => {
        this.setData({ isPlay: false })
      })

      this.innerAudioContext.onTimeUpdate(() => {
        const currentTime = this.innerAudioContext.currentTime
        const duration = this.innerAudioContext.duration
        const currentTimeStr = this.parseTime(currentTime)
        const progress = (currentTime / duration) * 100
        this.setData({ currentTimeStr, progress })
      })
    },

    handleControl() {
      if (!this.data.isPlay) {
        this.setData({ isPlay: true })
        this.innerAudioContext.play()
      } else {
        this.setData({ isPlay: false })
        this.innerAudioContext.pause()
      }
    },

    parseTime(time) {
      const minute = Math.floor(time / 60)
      const second = Math.floor(time % 60)
      return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
    }
  }
})