"use strict";
exports.__esModule = true;
var rule_set_1 = require("./rule-set");
var CSS = /** @class */ (function () {
    function CSS() {
        this.ruleSets = [];
    }
    CSS.fromString = function (css) {
        // eslint-disable-next-line no-console
        console.log(css);
        var result = new CSS();
        result.ruleSets.push(rule_set_1["default"].fromString('Trial RuleSet'));
        return result;
    };
    CSS.prototype.toString = function () {
        return this.ruleSets.join('\n');
    };
    return CSS;
}());
exports["default"] = CSS;
