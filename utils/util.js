"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var windowWidth = 0;
var windowHeight = 0;
wx.getSystemInfo({
    success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
    }
});
var getSystemInfo = function () {
    return [windowWidth, windowHeight];
};
exports.getSystemInfo = getSystemInfo;
var bindData = (function () {
    var instance = null;
    return function (bindName, data) {
        var _a;
        if (!instance) {
            instance = (_a = {},
                _a[bindName] = data,
                _a);
        }
        return instance[bindName];
    };
})();
exports.bindData = bindData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7QUFDbkIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDZixPQUFPLFlBQUMsR0FBRztRQUNULFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFBO1FBQzdCLFlBQVksR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFBO0lBQ2pDLENBQUM7Q0FDRixDQUFDLENBQUE7QUFFRixJQUFNLGFBQWEsR0FBRztJQUNwQixPQUFPLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBQ3BDLENBQUMsQ0FBQTtBQWVDLHNDQUFhO0FBYmYsSUFBTSxRQUFRLEdBQUcsQ0FBQztJQUNoQixJQUFJLFFBQVEsR0FBaUMsSUFBSSxDQUFDO0lBQ2xELE9BQU8sVUFBVSxRQUFnQixFQUFFLElBQVU7O1FBQzNDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixRQUFRO2dCQUNOLEdBQUMsUUFBUSxJQUFHLElBQUk7bUJBQ2pCLENBQUE7U0FDRjtRQUNELE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzNCLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7QUFJSCw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog6I635Y+W5bGP5bmV55qE5a696auYXG4gKi9cblxubGV0IHdpbmRvd1dpZHRoID0gMFxubGV0IHdpbmRvd0hlaWdodCA9IDBcbnd4LmdldFN5c3RlbUluZm8oe1xuICBzdWNjZXNzKHJlcykge1xuICAgIHdpbmRvd1dpZHRoID0gcmVzLndpbmRvd1dpZHRoXG4gICAgd2luZG93SGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxuICB9XG59KVxuXG5jb25zdCBnZXRTeXN0ZW1JbmZvID0gKCkgPT4ge1xuICByZXR1cm4gW3dpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHRdXG59XG5cbmNvbnN0IGJpbmREYXRhID0gKCgpID0+IHtcbiAgbGV0IGluc3RhbmNlOiB7IFt4OiBzdHJpbmddOiBhbnk7IH0gfCBudWxsID0gbnVsbDtcbiAgcmV0dXJuIGZ1bmN0aW9uIChiaW5kTmFtZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XG4gICAgaWYgKCFpbnN0YW5jZSkge1xuICAgICAgaW5zdGFuY2UgPSB7XG4gICAgICAgIFtiaW5kTmFtZV06IGRhdGFcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluc3RhbmNlW2JpbmROYW1lXVxuICB9XG59KSgpO1xuXG5leHBvcnQge1xuICBnZXRTeXN0ZW1JbmZvLFxuICBiaW5kRGF0YSxcbn1cbiJdfQ==