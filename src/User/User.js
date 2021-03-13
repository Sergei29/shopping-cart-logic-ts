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
exports.__esModule = true;
var Subscriber_1 = require("../Subscriber/Subscriber");
var CartItem_1 = require("../CartItem/CartItem");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(name) {
        var _this = _super.call(this, name) || this;
        _this.cart = [];
        _this.totalPrice = 0;
        return _this;
    }
    User.prototype.addToCart = function (article) {
        var isExisting = this.isCartItemExisting(article.id);
        if (!isExisting) {
            this.cart.push(new CartItem_1["default"](article));
            return this;
        }
        var newCart = this.cart.map(function (cartItem) {
            if (cartItem.id === article.id) {
                cartItem.quantity += 1;
            }
            return cartItem;
        });
        this.cart = newCart;
        this.calculateTotal();
        return this;
    };
    User.prototype.removeFromCart = function (item) {
        var isExistingAndOne = this.isExistingAndSingle(item.id);
        if (!isExistingAndOne) {
            var newCart_1 = this.cart.filter(function (objItem) { return objItem.id !== item.id; });
            this.cart = newCart_1;
            return this;
        }
        var newCart = this.cart.map(function (cartItem) {
            if (cartItem.id === item.id) {
                cartItem.quantity -= 1;
            }
            return cartItem;
        });
        this.cart = newCart;
        return this;
    };
    User.prototype.calculateTotal = function () {
        var mappedArticles = this.articles.reduce(function (map, current) {
            map[current.id] = current;
            return map;
        }, {});
        var newTotalPrice = this.cart.reduce(function (totalAmount, current) {
            var currentPricePerUnit = current.price;
            var discount = mappedArticles[current.id].discount;
            if (discount && discount.forNumberOfItems <= current.quantity) {
                currentPricePerUnit = discount.price;
            }
            var itemPrice = currentPricePerUnit * current.quantity;
            return totalAmount + itemPrice;
        }, 0);
        this.totalPrice = newTotalPrice;
    };
    User.prototype.isCartItemExisting = function (itemId) {
        if (this.cart.length === 0)
            return false;
        return this.cart.findIndex(function (cartItem) { return cartItem.id === itemId; }) > -1;
    };
    User.prototype.isExistingAndSingle = function (itemId) {
        var cartItem = this.cart.find(function (objCartItem) { return objCartItem.id === itemId; });
        if (!cartItem)
            return false;
        return cartItem.quantity === 1;
    };
    return User;
}(Subscriber_1["default"]));
exports["default"] = User;
