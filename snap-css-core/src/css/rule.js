"use strict";
exports.__esModule = true;
var declaration_1 = require("./declaration");
var Rule = /** @class */ (function () {
    function Rule(selector, padding) {
        if (padding === void 0) { padding = ''; }
        this.selector = selector;
        this.padding = padding;
        this.declarations = [];
        this.suggestions = [];
    }
    Rule.fromString = function (block, padding) {
        if (padding === void 0) { padding = ''; }
        // eslint-disable-next-line no-console
        console.log(block);
        var results = [];
        var res = new Rule('.home', padding);
        res.declarations.push(declaration_1["default"].fromString('Trial Declaration'));
        results.push(res);
        return results;
    };
    Rule.prototype.makeSuggestions = function () {
        this.suggestions = ['.home', 'div'];
    };
    Rule.prototype.toString = function () {
        var result = '';
        var tab = "\n" + this.padding + "  ";
        if (this.suggestions.length > 0)
            result += "// Suggested Selectors -> " + this.suggestions.join(', ') + "\n";
        result += "" + this.padding + this.selector + " {" + tab + this.declarations.join(tab) + " \n" + this.padding + "}";
        return result;
    };
    return Rule;
}());
exports["default"] = Rule;
