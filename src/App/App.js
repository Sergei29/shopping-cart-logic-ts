"use strict";
exports.__esModule = true;
var Shop_1 = require("../Shop/Shop");
var shopOne = new Shop_1["default"]("Best One");
shopOne
    .addNewArticle("soap", 30, { price: 10, forNumberOfItems: 6 })
    .addNewArticle("shower gel", 10)
    .addNewArticle("toothpaste", 5)
    .addNewArticle("toilet paper", 12, { price: 6, forNumberOfItems: 5 });
console.log("shopOne.state.articles: ", shopOne.state.articles);
