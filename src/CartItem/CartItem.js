"use strict";
exports.__esModule = true;
var CartItem = /** @class */ (function () {
    function CartItem(article) {
        this.quantity = 1;
        this.id = article.id;
        this.name = article.name;
        this.price = article.price;
        this.discount = article.discount;
    }
    return CartItem;
}());
exports["default"] = CartItem;
