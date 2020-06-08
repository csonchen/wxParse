"use strict";
var hljs = require('./lib/index');
Component({
    properties: {
        codeText: {
            type: String,
            value: ''
        },
        language: {
            type: String,
            value: 'javascript'
        }
    },
    data: {
        code: ''
    },
    attached: function () {
        var _a = this.data, codeText = _a.codeText, language = _a.language;
        this.parseCode(codeText, language);
    },
    methods: {
        parseCode: function (input, language) {
            var lang = language || 'javascript';
            var value = hljs.highlight(lang, input).value;
            var highlighted = value.replace('&amp;', '&').trim();
            var codeResult = "<code class=\"" + lang + "\">" + highlighted + "</code>";
            codeResult = codeResult.replace(/\n/g, "<br/>").replace('\<code\>', '');
            this.setData({ code: codeResult });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaExpZ2h0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGlnaExpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFcEMsU0FBUyxDQUFDO0lBQ1IsVUFBVSxFQUFFO1FBQ1YsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBRUQsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsWUFBWTtTQUNwQjtLQUNGO0lBRUQsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7S0FDVDtJQUVELFFBQVE7UUFDQSxJQUFBLGNBQWtDLEVBQWhDLHNCQUFRLEVBQUUsc0JBQXNCLENBQUE7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVELE9BQU8sRUFBRTtRQUNQLFNBQVMsWUFBQyxLQUFhLEVBQUUsUUFBZ0I7WUFDdkMsSUFBTSxJQUFJLEdBQUcsUUFBUSxJQUFJLFlBQVksQ0FBQTtZQUM3QixJQUFBLHlDQUFLLENBQWdDO1lBQzdDLElBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO1lBRXRELElBQUksVUFBVSxHQUFHLG1CQUFnQixJQUFJLFdBQUssV0FBVyxZQUFTLENBQUE7WUFDOUQsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFFdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ3BDLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGhsanMgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpO1xuXG5Db21wb25lbnQoe1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgY29kZVRleHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH0sXG5cbiAgICBsYW5ndWFnZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICdqYXZhc2NyaXB0J1xuICAgIH1cbiAgfSxcblxuICBkYXRhOiB7XG4gICAgY29kZTogJydcbiAgfSxcblxuICBhdHRhY2hlZCgpIHtcbiAgICBjb25zdCB7IGNvZGVUZXh0LCBsYW5ndWFnZSB9ID0gdGhpcy5kYXRhXG4gICAgdGhpcy5wYXJzZUNvZGUoY29kZVRleHQsIGxhbmd1YWdlKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBwYXJzZUNvZGUoaW5wdXQ6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZykge1xuICAgICAgY29uc3QgbGFuZyA9IGxhbmd1YWdlIHx8ICdqYXZhc2NyaXB0J1xuICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gaGxqcy5oaWdobGlnaHQobGFuZywgaW5wdXQpXG4gICAgICBjb25zdCBoaWdobGlnaHRlZCA9IHZhbHVlLnJlcGxhY2UoJyZhbXA7JywgJyYnKS50cmltKClcblxuICAgICAgbGV0IGNvZGVSZXN1bHQgPSBgPGNvZGUgY2xhc3M9XCIke2xhbmd9XCI+JHtoaWdobGlnaHRlZH08L2NvZGU+YFxuICAgICAgY29kZVJlc3VsdCA9IGNvZGVSZXN1bHQucmVwbGFjZSgvXFxuL2csIFwiPGJyLz5cIikucmVwbGFjZSgnXFw8Y29kZVxcPicsICcnKVxuXG4gICAgICB0aGlzLnNldERhdGEoeyBjb2RlOiBjb2RlUmVzdWx0IH0pXG4gICAgfVxuICB9XG59KSJdfQ==