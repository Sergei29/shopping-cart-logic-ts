"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Observer_1 = __importDefault(require("../Observer/Observer"));
class Shop extends Observer_1.default {
    constructor(name) {
        super();
        this.name = name;
    }
    addNewArticle(newArticle) {
        const prevState = this.getState();
        const newState = {
            ...prevState,
            articles: prevState.articles.concat(newArticle),
        };
        this.setState(newState);
        return this;
    }
    updateArticle({ articleId, name, price, discount = null }) {
        this.verifyArticle(articleId);
        const prevState = this.getState();
        const newArticles = prevState.articles.map((objArticle) => {
            if (objArticle.id === articleId) {
                objArticle.name = name ? name : objArticle.name;
                objArticle.price = price ? price : objArticle.price;
                objArticle.discount = discount ? discount : objArticle.discount;
            }
            return objArticle;
        });
        const newState = { ...prevState, articles: newArticles };
        this.setState(newState);
        return this;
    }
    addDiscount(articleId, price, forNumberOfItems) {
        this.verifyArticle(articleId);
        const prevState = this.getState();
        const intNumber = Math.round(forNumberOfItems);
        const newDiscount = { price, forNumberOfItems: intNumber };
        const newArticles = prevState.articles.map((objArticle) => {
            if (objArticle.id === articleId) {
                objArticle.discount = newDiscount;
            }
            return objArticle;
        });
        const newState = { ...prevState, articles: newArticles };
        this.setState(newState);
        return this;
    }
    removeArticle(articleId) {
        this.verifyArticle(articleId);
        return this;
    }
    verifyArticle(articleId) {
        const prevState = this.getState();
        const article = prevState.articles.find((objArticle) => objArticle.id === articleId);
        if (!article)
            throw new Error("Article not found.");
    }
}
exports.default = Shop;
