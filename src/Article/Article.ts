import { v4 as uuid } from "uuid";

export type DiscountType = {
  price: number;
  forNumberOfItems: number;
} | null;

class Article {
  id: string;
  name: string;
  price: number;
  discount: DiscountType;

  constructor(name: string, price: number, discount: DiscountType = null) {
    this.id = uuid();
    this.name = name;
    this.price = price;
    this.discount = discount;
  }

  setPrice(newPrice: number) {
    this.price = newPrice;
    return this;
  }

  setDiscount(newDiscount: DiscountType) {
    this.discount = newDiscount;
    return this;
  }
}

export type ArticleType = InstanceType<typeof Article>;

export default Article;
