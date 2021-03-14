import Subscriber from "../Subscriber/Subscriber";
import Article, { ArticleType } from "../Article/Article";
import CartItem, { CartItemType } from "../CartItem/CartItem";

class User extends Subscriber {
  cart: CartItemType[];
  totalPrice: number;

  constructor(name: string) {
    super(name);
    this.cart = [];
    this.totalPrice = 0;
  }

  addToCart(article: ArticleType) {
    const isExisting = this.isCartItemExisting(article.id);
    if (!isExisting) {
      this.cart.push(new CartItem(article));
      return this;
    }

    const newCart = this.cart.map((cartItem) => {
      if (cartItem.id === article.id) {
        cartItem.quantity += 1;
      }
      return cartItem;
    });

    this.cart = newCart;
    return this;
  }

  removeFromCart(item: ArticleType) {
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
    return this;
  }

  calculateTotal() {
    const mappedArticles = this.articles.reduce((map, current) => {
      map[current.id] = current;
      return map;
    }, {} as Record<string, ArticleType>);

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
    return this;
  }

  isCartItemExisting(itemId: string) {
    if (this.cart.length === 0) return false;
    return this.cart.findIndex((cartItem) => cartItem.id === itemId) > -1;
  }

  isExistingAndSingle(itemId: string) {
    const cartItems = this.cart.filter(
      (objCartItem) => objCartItem.id === itemId
    );
    return cartItems.length === 1;
  }
}

export type UserType = InstanceType<typeof User>;

export default User;
