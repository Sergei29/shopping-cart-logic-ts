"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shop_1 = __importDefault(require("../Shop/Shop"));
const User_1 = __importDefault(require("../User/User"));
const Article_1 = __importDefault(require("../Article/Article"));
// shop:
const shopOne = new Shop_1.default("Best One");
// Articles:
const soap = new Article_1.default("soap", 30, { price: 10, forNumberOfItems: 3 });
const showerGel = new Article_1.default("shower gel", 10);
const toothpaste = new Article_1.default("toothpaste", 5);
const toiletPaper = new Article_1.default("toilet paper", 12, {
    price: 6,
    forNumberOfItems: 5,
});
// adding to shop:
shopOne
    .addNewArticle(soap)
    .addNewArticle(showerGel)
    .addNewArticle(toothpaste)
    .addNewArticle(toiletPaper);
// subscribe users to shop:
const Serge = new User_1.default("Serge");
const Jenny = new User_1.default("Jenny");
const Jack = new User_1.default("Jack");
shopOne.register(Serge);
shopOne.register(Jack);
shopOne.register(Jenny);
// console.log(`shopOne.subscribers: `, shopOne.subscribers);
Serge.addToCart(soap)
    .addToCart(toothpaste)
    .addToCart(soap)
    .addToCart(soap)
    .addToCart(soap)
    .removeFromCart(soap);
Serge.calculateTotal();
console.log(`Serge: `, Serge);
