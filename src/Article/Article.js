"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
var Article = /** @class */ (function () {
    function Article(name, price, discount) {
        if (discount === void 0) { discount = null; }
        this.id = uuid_1.v4();
        this.name = name;
        this.price = price;
        this.discount = discount;
    }
    Article.prototype.setPrice = function (newPrice) {
        this.price = newPrice;
        return this;
    };
    Article.prototype.setDiscount = function (newDiscount) {
        this.discount = newDiscount;
        return this;
    };
    return Article;
}());
exports["default"] = Article;
