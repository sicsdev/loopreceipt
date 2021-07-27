"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.deferrer = function (func) {
    var prevargs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        prevargs[_i - 1] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return func.apply(void 0, __spreadArrays(prevargs, args));
    };
};
console.log("practice");
function add(a, b) {
    return a + b;
}
var d = exports.deferrer(add, 1, 2);
console.log(d());
