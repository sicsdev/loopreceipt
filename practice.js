"use strict";
exports.__esModule = true;
exports.revertObject = function (object) {
    var revertedObject = {};
    for (var _i = 0, _a = Object.entries(object); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        revertedObject[value] = key;
    }
    return revertedObject;
};
var obj = {
    name: "Rahul",
    age: "20"
};
console.log(exports.revertObject(obj));
