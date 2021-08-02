"use strict";
exports.__esModule = true;
exports.splitOnUpperCase = function (str) {
    // str = "MyNameIsKhan"
    // returns "My Name Is Khan"
    var ans = "";
    var cur = "";
    for (var _i = 0, _a = str.split(""); _i < _a.length; _i++) {
        var s = _a[_i];
        if (/[A-Z]/.test(s)) {
            // encountered uppercase character
            ans += cur + " ";
            cur = s;
        }
        else {
            cur += s;
        }
    }
    ans += cur;
    return ans;
};
console.log(exports.splitOnUpperCase("MyNameIsKhan"));
