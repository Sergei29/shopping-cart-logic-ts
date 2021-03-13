"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = __importDefault(require("../Subscriber/Subscriber"));
const CartItem_1 = __importDefault(require("../CartItem/CartItem"));
class User extends Subscriber_1.default {
    constructor(name) {
        super(name);
        this.cart = [];
        this.totalPrice = 0;
    }
    addToCart(article) {
        const isExisting = this.isCartItemExisting(article.id);
        if (!isExisting) {
            this.cart.push(new CartItem_1.default(article));
            return this;
        }
        const newCart = this.cart.map((cartItem) => {
            if (cartItem.id === article.id) {
                cartItem.quantity += 1;
            }
            return cartItem;
        });
        this.cart = newCart;
        this.calculateTotal();
        return this;
    }
    removeFromCart(item) {
        const isExistingAndOne = this.isExistingAndSingle(item.id);
        if (!isExistingAndOne) {
            const newCart = this.cart.filter((objItem) => objItem.id !== item.id);
            this.cart = newCart;
            return this;
        }
        const newCart = this.cart.map((cartItem) => {
            if (cartItem.id === item.id) {
                cartItem.quantity -= 1;
            }
            return cartItem;
        });
        this.cart = newCart;
        this.calculateTotal();
        return this;
    }
    calculateTotal() {
        const mappedArticles = this.articles.reduce((map, current) => {
            map[current.id] = current;
            return map;
        }, {});
        const newTotalPrice = this.cart.reduce((totalAmount, current) => {
            let currentPricePerUnit = current.price;
            const { discount } = mappedArticles[current.id];
            if (discount && discount.forNumberOfItems <= current.quantity) {
                currentPricePerUnit = discount.price;
            }
            const itemPrice = currentPricePerUnit * current.quantity;
            return totalAmount + itemPrice;
        }, 0);
        this.totalPrice = newTotalPrice;
    }
    isCartItemExisting(itemId) {
        if (this.cart.length === 0)
            return false;
        return this.cart.findIndex((cartItem) => cartItem.id === itemId) > -1;
    }
    isExistingAndSingle(itemId) {
        const cartItems = this.cart.filter((objCartItem) => objCartItem.id === itemId);
        return cartItems.length === 1;
    }
}
exports.default = User;
