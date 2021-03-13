"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Observer_1 = require("../Observer/Observer");
var Article_1 = require("../Article/Article");
var Shop = /** @class */ (function (_super) {
    __extends(Shop, _super);
    function Shop(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    Shop.prototype.addNewArticle = function (name, price, discount) {
        if (discount === void 0) { discount = null; }
        var newArticle = new Article_1["default"](name, price, discount);
        var prevState = this.getState();
        var newState = __assign(__assign({}, prevState), { articles: prevState.articles.concat(newArticle) });
        this.setState(newState);
        return this;
    };
    Shop.prototype.updateArticle = function (_a) {
        var articleId = _a.articleId, name = _a.name, price = _a.price, _b = _a.discount, discount = _b === void 0 ? null : _b;
        this.verifyArticle(articleId);
        var prevState = this.getState();
        var newArticles = prevState.articles.map(function (objArticle) {
            if (objArticle.id === articleId) {
                objArticle.name = name ? name : objArticle.name;
                objArticle.price = price ? price : objArticle.price;
                objArticle.discount = discount ? discount : objArticle.discount;
            }
            return objArticle;
        });
        var newState = __assign(__assign({}, prevState), { articles: newArticles });
        this.setState(newState);
        return this;
    };
    Shop.prototype.addDiscount = function (articleId, price, forNumberOfItems) {
        this.verifyArticle(articleId);
        var prevState = this.getState();
        var intNumber = Math.round(forNumberOfItems);
        var newDiscount = { price: price, forNumberOfItems: intNumber };
        var newArticles = prevState.articles.map(function (objArticle) {
            if (objArticle.id === articleId) {
                objArticle.discount = newDiscount;
            }
            return objArticle;
        });
        var newState = __assign(__assign({}, prevState), { articles: newArticles });
        this.setState(newState);
        return this;
    };
    Shop.prototype.removeArticle = function (articleId) {
        this.verifyArticle(articleId);
        return this;
    };
    Shop.prototype.verifyArticle = function (articleId) {
        var prevState = this.getState();
        var article = prevState.articles.find(function (objArticle) { return objArticle.id === articleId; });
        if (!article)
            throw new Error("Article not found.");
    };
    return Shop;
}(Observer_1["default"]));
exports["default"] = Shop;
