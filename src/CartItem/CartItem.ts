import Article, { DiscountType, ArticleType } from "../Article/Article";

class CartItem {
  quantity: number;
  id: string;
  name: string;
  price: number;
  discount: DiscountType;
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
