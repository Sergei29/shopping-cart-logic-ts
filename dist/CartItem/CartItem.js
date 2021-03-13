"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CartItem {
    constructor(article) {
        this.quantity = 1;
        this.id = article.id;
        this.name = article.name;
        this.price = article.price;
        this.discount = article.discount;
    }
}
exports.default = CartItem;
