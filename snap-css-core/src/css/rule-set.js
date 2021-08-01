"use strict";
exports.__esModule = true;
var rule_1 = require("./rule");
var RuleSet = /** @class */ (function () {
    function RuleSet(media) {
        if (media === void 0) { media = ''; }
        this.media = media;
        this.rules = [];
    }
    RuleSet.fromString = function (block) {
        // eslint-disable-next-line no-console
        console.log(block);
        var result = new RuleSet('only screen and (max-width: 600px)');
        var padding = result.media === '' ? '' : '  ';
        result.rules = result.rules.concat(rule_1["default"].fromString('Trial Rule', padding));
        return result;
    };
    RuleSet.prototype.toString = function () {
        var result = '';
        if (this.media !== '')
            result += "@media " + this.media + " {\n";
        result += this.rules.join('\n\n');
        if (this.media !== '')
            result += '\n}';
        return result;
    };
    return RuleSet;
}());
exports["default"] = RuleSet;
