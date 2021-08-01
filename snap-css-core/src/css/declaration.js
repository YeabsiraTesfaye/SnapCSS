"use strict";
exports.__esModule = true;
var Declaration = /** @class */ (function () {
    function Declaration(property, value, type, unit) {
        var _this = this;
        if (type === void 0) { type = 'STRING'; }
        if (unit === void 0) { unit = ''; }
        this.property = property;
        this.value = value;
        this.type = type;
        this.unit = unit;
        this.toString = function () { return _this.property + " : " + _this.value + _this.unit + ";"; };
    }
    Declaration.fromString = function (line) {
        // eslint-disable-next-line no-console
        console.log(line);
        return new Declaration('height', 'inherit');
    };
    return Declaration;
}());
exports["default"] = Declaration;
