"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html2json_1 = require("../../utils/html2json");
var util_1 = require("../../utils/util");
Component({
    properties: {
        nodes: {
            type: null,
            observer: function (val) {
                if (val) {
                    if (typeof val === 'string') {
                        this._parseHtml(val);
                    }
                    else if (Array.isArray(val)) {
                        this.setData({ nodesData: val });
                    }
                    else {
                        var nodesData = [val];
                        this.setData({ nodesData: nodesData });
                    }
                }
            }
        },
    },
    data: {
        nodesData: [],
        bindData: {},
    },
    methods: {
        _parseHtml: function (html, bindName) {
            if (bindName === void 0) { bindName = 'wxParseData'; }
            var _a;
            var transData = html2json_1.default.html2json(html, bindName);
            transData.view = {};
            transData.view.imagePadding = 0;
            this.setData({
                nodesData: transData.nodes,
                bindData: (_a = {},
                    _a[bindName] = transData,
                    _a)
            });
            util_1.bindData(bindName, transData);
            console.log(this.data);
        },
        wxParseImgLoad: function (e) {
            var _a;
            var tagFrom = (e.target.dataset || {}).from;
            if (typeof tagFrom !== 'undefined' && tagFrom.length > 0) {
                var _b = e.detail, width = _b.width, height = _b.height;
                var recal = this._wxAutoImageCal(width, height);
                this.setData((_a = {
                        width: recal.imageWidth,
                        height: recal.imageHeight
                    },
                    _a["nodesData[" + 0 + "].loaded"] = true,
                    _a));
            }
        },
        wxParseImgTap: function (e) {
            var src = e.target.dataset.src;
            var bindName = 'wxParseData';
            var imageUrls = util_1.bindData(bindName).imageUrls;
            wx.previewImage({
                current: src,
                urls: imageUrls
            });
        },
        _wxAutoImageCal: function (originalWidth, originalHeight) {
            var autoWidth = 0, autoHeight = 0;
            var results = {};
            var windowWidth = util_1.getSystemInfo()[0];
            if (originalWidth > windowWidth) {
                autoWidth = windowWidth;
                autoHeight = (autoWidth * originalHeight) / originalWidth;
                results.imageWidth = autoWidth;
                results.imageHeight = autoHeight;
            }
            else {
                results.imageWidth = originalWidth;
                results.imageHeight = originalHeight;
            }
            return results;
        },
        wxParseTagATap: function (e) {
            var src = e.currentTarget.dataset.src;
            var curPages = getCurrentPages();
            var currentPage = curPages[curPages.length - 1];
            if (currentPage) {
                currentPage.handleTagATap && currentPage.handleTagATap(src);
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hQYXJzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInd4UGFyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBK0M7QUFDL0MseUNBQTJEO0FBTzNELFNBQVMsQ0FBQztJQUNSLFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxZQUFDLEdBQUc7Z0JBQ1YsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7d0JBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7cUJBQ3JCO3lCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO3FCQUNqQzt5QkFBTTt3QkFDTCxJQUFNLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3dCQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQyxDQUFBO3FCQUM1QjtpQkFDRjtZQUNILENBQUM7U0FDRjtLQUNGO0lBRUQsSUFBSSxFQUFTO1FBQ1gsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsRUFBRTtLQUNiO0lBRUQsT0FBTyxFQUFFO1FBQ1AsVUFBVSxZQUFDLElBQVksRUFBRSxRQUF3QjtZQUF4Qix5QkFBQSxFQUFBLHdCQUF3Qjs7WUFHL0MsSUFBTSxTQUFTLEdBQUcsbUJBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBRXRELFNBQVMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO1lBQ25CLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQTtZQUUvQixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFNBQVMsRUFBRSxTQUFTLENBQUMsS0FBSztnQkFDMUIsUUFBUTtvQkFDTixHQUFDLFFBQVEsSUFBRyxTQUFTO3VCQUN0QjthQUNGLENBQUMsQ0FBQTtZQUNGLGVBQVEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUE7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEIsQ0FBQztRQU1ELGNBQWMsWUFBQyxDQUFDOztZQUVOLElBQUEsdUNBQWEsQ0FBNkM7WUFDbEUsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2xELElBQUEsYUFBNEIsRUFBMUIsZ0JBQUssRUFBRSxrQkFBbUIsQ0FBQTtnQkFHbEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7Z0JBQ2pELElBQUksQ0FBQyxPQUFPO3dCQUNWLEtBQUssRUFBRSxLQUFLLENBQUMsVUFBVTt3QkFDdkIsTUFBTSxFQUFFLEtBQUssQ0FBQyxXQUFXOztvQkFDekIsR0FBQyxlQUFhLENBQUMsYUFBVSxJQUFHLElBQUk7d0JBQ2hDLENBQUE7YUFDSDtRQUNILENBQUM7UUFNRCxhQUFhLFlBQUMsQ0FBQztZQUNMLElBQUEsMEJBQUcsQ0FBcUI7WUFDaEMsSUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFBO1lBQ3RCLElBQUEsK0NBQVMsQ0FBdUI7WUFDeEMsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDZCxPQUFPLEVBQUUsR0FBRztnQkFDWixJQUFJLEVBQUUsU0FBUzthQUNoQixDQUFDLENBQUE7UUFDSixDQUFDO1FBT0QsZUFBZSxZQUFDLGFBQWEsRUFBRSxjQUFjO1lBQzNDLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQU0sT0FBTyxHQUE4QixFQUFFLENBQUE7WUFDdEMsSUFBQSx1Q0FBVyxDQUFtQjtZQUdyQyxJQUFJLGFBQWEsR0FBRyxXQUFXLEVBQUU7Z0JBQy9CLFNBQVMsR0FBRyxXQUFXLENBQUE7Z0JBQ3ZCLFVBQVUsR0FBRyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsR0FBRyxhQUFhLENBQUE7Z0JBQ3pELE9BQU8sQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO2dCQUM5QixPQUFPLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQTthQUNqQztpQkFBTTtnQkFDTCxPQUFPLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQTtnQkFDbEMsT0FBTyxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUE7YUFDckM7WUFDRCxPQUFPLE9BQU8sQ0FBQTtRQUNoQixDQUFDO1FBTUQsY0FBYyxZQUFDLENBQUM7WUFDTixJQUFBLGlDQUFHLENBQTRCO1lBR3ZDLElBQU0sUUFBUSxHQUFHLGVBQWUsRUFBRSxDQUFDO1lBQ25DLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ2pELElBQUksV0FBVyxFQUFFO2dCQUNmLFdBQVcsQ0FBQyxhQUFhLElBQUksV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUM1RDtRQUNILENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIdG1sVG9Kc29uIGZyb20gJy4uLy4uL3V0aWxzL2h0bWwyanNvbic7XG5pbXBvcnQgeyBnZXRTeXN0ZW1JbmZvLCBiaW5kRGF0YSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnO1xuaW50ZXJmYWNlIElEYXRhIHtcbiAgbm9kZXNEYXRhOiBzdHJpbmdbXSB8IG9iamVjdFtdLFxuICBiaW5kRGF0YToge1xuICAgIFt4OiBzdHJpbmddOiB3eFBhcnNlLklSZXN1bHRcbiAgfVxufVxuQ29tcG9uZW50KHtcbiAgcHJvcGVydGllczoge1xuICAgIG5vZGVzOiB7XG4gICAgICB0eXBlOiBudWxsLFxuICAgICAgb2JzZXJ2ZXIodmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHsgLy8g5Yid5aeL5Li6aHRtbOWvjOaWh+acrOWtl+espuS4slxuICAgICAgICAgICAgdGhpcy5fcGFyc2VIdG1sKHZhbClcbiAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkgeyAvLyBodG1sIOWvjOaWh+acrOino+aekOaIkOiKgueCueaVsOe7hFxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHsgbm9kZXNEYXRhOiB2YWwgfSlcbiAgICAgICAgICB9IGVsc2UgeyAvLyDlhbbkvZnkuLrljZXkuKroioLngrnlr7nosaFcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzRGF0YSA9IFt2YWxdXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoeyBub2Rlc0RhdGEgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9LFxuXG4gIGRhdGE6IDxJRGF0YT57XG4gICAgbm9kZXNEYXRhOiBbXSxcbiAgICBiaW5kRGF0YToge30sXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIF9wYXJzZUh0bWwoaHRtbDogc3RyaW5nLCBiaW5kTmFtZSA9ICd3eFBhcnNlRGF0YScpIHtcblxuICAgICAgLy/lrZjmlL5odG1s6IqC54K56L2s5YyW5ZCO55qEanNvbuaVsOaNrlxuICAgICAgY29uc3QgdHJhbnNEYXRhID0gSHRtbFRvSnNvbi5odG1sMmpzb24oaHRtbCwgYmluZE5hbWUpXG5cbiAgICAgIHRyYW5zRGF0YS52aWV3ID0ge31cbiAgICAgIHRyYW5zRGF0YS52aWV3LmltYWdlUGFkZGluZyA9IDBcblxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgbm9kZXNEYXRhOiB0cmFuc0RhdGEubm9kZXMsXG4gICAgICAgIGJpbmREYXRhOiB7XG4gICAgICAgICAgW2JpbmROYW1lXTogdHJhbnNEYXRhXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBiaW5kRGF0YShiaW5kTmFtZSwgdHJhbnNEYXRhKVxuICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDlm77niYfop4bop4nlrr3pq5jorqHnrpflh73mlbDljLpcbiAgICAgKiBAcGFyYW0geyp9IGUgXG4gICAgICovXG4gICAgd3hQYXJzZUltZ0xvYWQoZSkge1xuICAgICAgLy8g6I635Y+W5b2T5YmN55qEaW1hZ2Ugbm9kZeiKgueCuVxuICAgICAgY29uc3QgeyBmcm9tOiB0YWdGcm9tIH06IHsgZnJvbTogc3RyaW5nIH0gPSBlLnRhcmdldC5kYXRhc2V0IHx8IHt9XG4gICAgICBpZiAodHlwZW9mIHRhZ0Zyb20gIT09ICd1bmRlZmluZWQnICYmIHRhZ0Zyb20ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGUuZGV0YWlsXG5cbiAgICAgICAgLy/lm6DkuLrml6Dms5Xojrflj5Z2aWV35a695bqmIOmcgOimgeiHquWumuS5iXBhZGRpbmfov5vooYzorqHnrpfvvIznqI3lkI7lpITnkIZcbiAgICAgICAgY29uc3QgcmVjYWwgPSB0aGlzLl93eEF1dG9JbWFnZUNhbCh3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHdpZHRoOiByZWNhbC5pbWFnZVdpZHRoLFxuICAgICAgICAgIGhlaWdodDogcmVjYWwuaW1hZ2VIZWlnaHQsXG4gICAgICAgICAgW2Bub2Rlc0RhdGFbJHswfV0ubG9hZGVkYF06IHRydWUsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOmihOiniOWbvueJh1xuICAgICAqIEBwYXJhbSB7Kn0gZSBcbiAgICAgKi9cbiAgICB3eFBhcnNlSW1nVGFwKGUpIHtcbiAgICAgIGNvbnN0IHsgc3JjIH0gPSBlLnRhcmdldC5kYXRhc2V0XG4gICAgICBjb25zdCBiaW5kTmFtZSA9ICd3eFBhcnNlRGF0YSdcbiAgICAgIGNvbnN0IHsgaW1hZ2VVcmxzIH0gPSBiaW5kRGF0YShiaW5kTmFtZSlcbiAgICAgIHd4LnByZXZpZXdJbWFnZSh7XG4gICAgICAgIGN1cnJlbnQ6IHNyYyxcbiAgICAgICAgdXJsczogaW1hZ2VVcmxzXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDorqHnrpfop4bop4nkvJjlhYjnmoTlm77niYflrr3pq5hcbiAgICAgKiBAcGFyYW0geyp9IG9yaWdpbmFsV2lkdGggXG4gICAgICogQHBhcmFtIHsqfSBvcmlnaW5hbEhlaWdodCBcbiAgICAgKi9cbiAgICBfd3hBdXRvSW1hZ2VDYWwob3JpZ2luYWxXaWR0aCwgb3JpZ2luYWxIZWlnaHQpIHtcbiAgICAgIGxldCBhdXRvV2lkdGggPSAwLCBhdXRvSGVpZ2h0ID0gMDtcbiAgICAgIGNvbnN0IHJlc3VsdHM6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fVxuICAgICAgY29uc3QgW3dpbmRvd1dpZHRoXSA9IGdldFN5c3RlbUluZm8oKVxuXG4gICAgICAvLyDliKTmlq3mjInnhaflk6rnp43mlrnlvI/ov5vooYznvKnmlL5cbiAgICAgIGlmIChvcmlnaW5hbFdpZHRoID4gd2luZG93V2lkdGgpIHsgLy/lnKjlm77niYd3aWR0aOWkp+S6juaJi+acuuWxj+W5lXdpZHRo5pe25YCZXG4gICAgICAgIGF1dG9XaWR0aCA9IHdpbmRvd1dpZHRoXG4gICAgICAgIGF1dG9IZWlnaHQgPSAoYXV0b1dpZHRoICogb3JpZ2luYWxIZWlnaHQpIC8gb3JpZ2luYWxXaWR0aFxuICAgICAgICByZXN1bHRzLmltYWdlV2lkdGggPSBhdXRvV2lkdGhcbiAgICAgICAgcmVzdWx0cy5pbWFnZUhlaWdodCA9IGF1dG9IZWlnaHRcbiAgICAgIH0gZWxzZSB7IC8vIOWQpuWImeWxleekuuWOn+adpeaVsOaNrlxuICAgICAgICByZXN1bHRzLmltYWdlV2lkdGggPSBvcmlnaW5hbFdpZHRoXG4gICAgICAgIHJlc3VsdHMuaW1hZ2VIZWlnaHQgPSBvcmlnaW5hbEhlaWdodFxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5aKe5YqgYeagh+etvui3s+i9rFxuICAgICAqIEBwYXJhbSB7Kn0gZSBcbiAgICAgKi9cbiAgICB3eFBhcnNlVGFnQVRhcChlKSB7XG4gICAgICBjb25zdCB7IHNyYyB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcblxuICAgICAgLy8g6YeH55So6YCS5b2S57uE5Lu25pa55byP5riy5p+T77yM5LiN6IO96YCa6L+HdHJpZ2dlckV2ZW505pa55byP5ZCR54i257qn5Lyg5Y+C77yM5Y+v5Lul6I635Y+W5b2T5YmN6aG16Z2i6LCD55So6aG16Z2i5pa55rOV5aSE55CGXG4gICAgICBjb25zdCBjdXJQYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xuICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSBjdXJQYWdlc1tjdXJQYWdlcy5sZW5ndGggLSAxXVxuICAgICAgaWYgKGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlLmhhbmRsZVRhZ0FUYXAgJiYgY3VycmVudFBhZ2UuaGFuZGxlVGFnQVRhcChzcmMpXG4gICAgICB9XG4gICAgfVxuICB9XG59KSJdfQ==