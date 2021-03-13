"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Article {
    constructor(name, price, discount = null) {
        this.id = uuid_1.v4();
        this.name = name;
        this.price = price;
        this.discount = discount;
    }
    setPrice(newPrice) {
        this.price = newPrice;
        return this;
    }
    setDiscount(newDiscount) {
        this.discount = newDiscount;
        return this;
    }
}
exports.default = Article;
