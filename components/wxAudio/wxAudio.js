"use strict";
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
            observer: function (newVal) {
                if (newVal) {
                    this.handleInitAudio(newVal);
                }
            }
        }
    },
    data: {
        isPlay: false,
        currentTimeStr: '00:00',
        durationStr: '00:00',
        progress: 0,
        innerAudioContext: {}
    },
    detached: function () {
        this.data.innerAudioContext && this.data.innerAudioContext.destroy();
    },
    methods: {
        handleInitAudio: function (src) {
            var _this = this;
            this.data.innerAudioContext = wx.createInnerAudioContext();
            this.data.innerAudioContext.src = src;
            this.data.innerAudioContext.onPlay(function () {
                console.log('开始播放');
            });
            this.data.innerAudioContext.onCanplay(function () {
                _this.data.innerAudioContext.duration;
                setTimeout(function () {
                    var durationStr = _this.parseTime(_this.data.innerAudioContext.duration);
                    _this.setData({ durationStr: durationStr });
                }, 1000);
            });
            this.data.innerAudioContext.onError(function (res) {
                console.log(res.errMsg);
                console.log(res.errCode);
            });
            this.data.innerAudioContext.onEnded(function () {
                _this.setData({ isPlay: false });
            });
            this.data.innerAudioContext.onTimeUpdate(function () {
                var currentTime = _this.data.innerAudioContext.currentTime;
                var duration = _this.data.innerAudioContext.duration;
                var currentTimeStr = _this.parseTime(currentTime);
                var progress = (currentTime / duration) * 100;
                _this.setData({ currentTimeStr: currentTimeStr, progress: progress });
            });
        },
        handleControl: function () {
            if (!this.data.isPlay) {
                this.setData({ isPlay: true });
                this.data.innerAudioContext.play();
            }
            else {
                this.setData({ isPlay: false });
                this.data.innerAudioContext.pause();
            }
        },
        parseTime: function (time) {
            var minute = Math.floor(time / 60);
            var second = Math.floor(time % 60);
            return (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hBdWRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInd4QXVkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLFNBQVMsQ0FBQztJQUNSLFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEtBQUs7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLFlBQUMsTUFBYztnQkFDckIsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtpQkFDN0I7WUFDSCxDQUFDO1NBQ0Y7S0FDRjtJQUVELElBQUksRUFBUztRQUNYLE1BQU0sRUFBRSxLQUFLO1FBQ2IsY0FBYyxFQUFFLE9BQU87UUFDdkIsV0FBVyxFQUFFLE9BQU87UUFDcEIsUUFBUSxFQUFFLENBQUM7UUFDWCxpQkFBaUIsRUFBRSxFQUFFO0tBQ3RCO0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN0RSxDQUFDO0lBRUQsT0FBTyxFQUFFO1FBQ1AsZUFBZSxZQUFDLEdBQVc7WUFBM0IsaUJBZ0NDO1lBL0JDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQUE7WUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3JCLENBQUMsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7Z0JBRXBDLEtBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFBO2dCQUNwQyxVQUFVLENBQUM7b0JBQ1QsSUFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUN4RSxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxhQUFBLEVBQUUsQ0FBQyxDQUFBO2dCQUMvQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtZQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzFCLENBQUMsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNqQyxDQUFDLENBQUMsQ0FBQTtZQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxJQUFNLFdBQVcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQTtnQkFDM0QsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUE7Z0JBQ3JELElBQU0sY0FBYyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQ2xELElBQU0sUUFBUSxHQUFHLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtnQkFDL0MsS0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDLENBQUE7WUFDNUMsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQsYUFBYTtZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2dCQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFBO2FBQ25DO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtnQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQTthQUNwQztRQUNILENBQUM7UUFFRCxTQUFTLFlBQUMsSUFBSTtZQUNaLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLE9BQU8sQ0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLFdBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFFLENBQUE7UUFDeEYsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIElEYXRhIHtcbiAgaXNQbGF5OiBib29sZWFuXG4gIGN1cnJlbnRUaW1lU3RyOiBzdHJpbmdcbiAgZHVyYXRpb25TdHI6IHN0cmluZ1xuICBwcm9ncmVzczogbnVtYmVyXG4gIGlubmVyQXVkaW9Db250ZXh0OiBXZWNoYXRNaW5pcHJvZ3JhbS5Jbm5lckF1ZGlvQ29udGV4dFxufVxuQ29tcG9uZW50KHtcbiAgcHJvcGVydGllczoge1xuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ+agh+mimCdcbiAgICB9LFxuICAgIGRlc2M6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAn5bCP5qCH6aKYJ1xuICAgIH0sXG4gICAgc3JjOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJycsXG4gICAgICBvYnNlcnZlcihuZXdWYWw6IHN0cmluZykge1xuICAgICAgICBpZiAobmV3VmFsKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVJbml0QXVkaW8obmV3VmFsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGRhdGE6IDxJRGF0YT57XG4gICAgaXNQbGF5OiBmYWxzZSxcbiAgICBjdXJyZW50VGltZVN0cjogJzAwOjAwJyxcbiAgICBkdXJhdGlvblN0cjogJzAwOjAwJyxcbiAgICBwcm9ncmVzczogMCxcbiAgICBpbm5lckF1ZGlvQ29udGV4dDoge31cbiAgfSxcbiAgZGV0YWNoZWQoKSB7XG4gICAgdGhpcy5kYXRhLmlubmVyQXVkaW9Db250ZXh0ICYmIHRoaXMuZGF0YS5pbm5lckF1ZGlvQ29udGV4dC5kZXN0cm95KClcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlSW5pdEF1ZGlvKHNyYzogc3RyaW5nKSB7XG4gICAgICB0aGlzLmRhdGEuaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpXG4gICAgICB0aGlzLmRhdGEuaW5uZXJBdWRpb0NvbnRleHQuc3JjID0gc3JjXG4gICAgICB0aGlzLmRhdGEuaW5uZXJBdWRpb0NvbnRleHQub25QbGF5KCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ+W8gOWni+aSreaUvicpXG4gICAgICB9KVxuXG4gICAgICB0aGlzLmRhdGEuaW5uZXJBdWRpb0NvbnRleHQub25DYW5wbGF5KCgpID0+IHtcbiAgICAgICAgLy8g6L+Z5piv5LiA5Liq6L+377yM5o2u6K+06KaB5omL5Yqo5YWI6Kem5Y+R6L+Z5Liq5bGe5oCn77yM5ZCO6Z2i5omN6IO955Soc2V0VGltZW91dOiOt+WPluecn+WunuaXtumVv1xuICAgICAgICB0aGlzLmRhdGEuaW5uZXJBdWRpb0NvbnRleHQuZHVyYXRpb25cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZHVyYXRpb25TdHIgPSB0aGlzLnBhcnNlVGltZSh0aGlzLmRhdGEuaW5uZXJBdWRpb0NvbnRleHQuZHVyYXRpb24pXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHsgZHVyYXRpb25TdHIgfSlcbiAgICAgICAgfSwgMTAwMClcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuZGF0YS5pbm5lckF1ZGlvQ29udGV4dC5vbkVycm9yKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZylcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmVyckNvZGUpXG4gICAgICB9KVxuXG4gICAgICB0aGlzLmRhdGEuaW5uZXJBdWRpb0NvbnRleHQub25FbmRlZCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IGlzUGxheTogZmFsc2UgfSlcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuZGF0YS5pbm5lckF1ZGlvQ29udGV4dC5vblRpbWVVcGRhdGUoKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IHRoaXMuZGF0YS5pbm5lckF1ZGlvQ29udGV4dC5jdXJyZW50VGltZVxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZGF0YS5pbm5lckF1ZGlvQ29udGV4dC5kdXJhdGlvblxuICAgICAgICBjb25zdCBjdXJyZW50VGltZVN0ciA9IHRoaXMucGFyc2VUaW1lKGN1cnJlbnRUaW1lKVxuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IChjdXJyZW50VGltZSAvIGR1cmF0aW9uKSAqIDEwMFxuICAgICAgICB0aGlzLnNldERhdGEoeyBjdXJyZW50VGltZVN0ciwgcHJvZ3Jlc3MgfSlcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIGhhbmRsZUNvbnRyb2woKSB7XG4gICAgICBpZiAoIXRoaXMuZGF0YS5pc1BsYXkpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHsgaXNQbGF5OiB0cnVlIH0pXG4gICAgICAgIHRoaXMuZGF0YS5pbm5lckF1ZGlvQ29udGV4dC5wbGF5KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IGlzUGxheTogZmFsc2UgfSlcbiAgICAgICAgdGhpcy5kYXRhLmlubmVyQXVkaW9Db250ZXh0LnBhdXNlKClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcGFyc2VUaW1lKHRpbWUpIHtcbiAgICAgIGNvbnN0IG1pbnV0ZSA9IE1hdGguZmxvb3IodGltZSAvIDYwKVxuICAgICAgY29uc3Qgc2Vjb25kID0gTWF0aC5mbG9vcih0aW1lICUgNjApXG4gICAgICByZXR1cm4gYCR7bWludXRlIDwgMTAgPyAnMCcgKyBtaW51dGUgOiBtaW51dGV9OiR7c2Vjb25kIDwgMTAgPyAnMCcgKyBzZWNvbmQgOiBzZWNvbmR9YFxuICAgIH1cbiAgfVxufSkiXX0=