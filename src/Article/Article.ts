import { v4 as uuid } from "uuid";

export type DiscountType = {
  price: number;
  forNumberOfItems: number;
} | null;

/**
 * @description article class that is describing the Shop's article;
 */
class Article {
  id: string;
  name: string;
  price: number;
  discount: DiscountType;

  /**
   * @param {String} name article name
   * @param {Number} price price per unit
   * @param {Object} discount discount, price and min quantity to apply discount
   * @returns {Object} instance of article
   */
  constructor(name: string, price: number, discount: DiscountType = null) {
    this.id = uuid();
    this.name = name;
    this.price = price;
    this.discount = discount;
  }

  /**
   * @description set article price
   * @param {Number} newPrice new price
   * @returns {this} `this` of current article's instance
   */
  setPrice(newPrice: number) {
    this.price = newPrice;
    return this;
  }

  /**
   * @description set discount
   * @param {Object} newDiscount new discount information, price and min quantity to apply discount
   * @returns {this} `this` of current article's instance
   */
  setDiscount(newDiscount: DiscountType) {
    this.discount = newDiscount;
    return this;
  }
}

export type ArticleType = InstanceType<typeof Article>;

export default Article;
