import { DiscountType, ArticleType } from "../Article/Article";

/**
 * @description cart item class that is describing the shopping cart's item, in addition to shop article it has `quantity` property
 */
class CartItem {
  quantity: number;
  id: string;
  name: string;
  price: number;
  discount: DiscountType;

  /**
   * @param {Object} article instance of article
   * @returns {Object} instance of cart item
   */
  constructor(article: ArticleType) {
    this.quantity = 1;
    this.id = article.id;
    this.name = article.name;
    this.price = article.price;
    this.discount = article.discount;
  }
}

export type CartItemType = InstanceType<typeof CartItem>;

export default CartItem;
