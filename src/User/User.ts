import Subscriber from "../Subscriber/Subscriber";
import { ArticleType } from "../Article/Article";
import CartItem, { CartItemType } from "../CartItem/CartItem";

/**
 * @description user class that is can visit/subscribe to shop, select items from shop's articles into user's shopping crt;
 */
class User extends Subscriber {
  cart: CartItemType[];
  totalPrice: number;

  /**
   * @param {String} name user's name
   * @returns {Object} instance of user
   */
  constructor(name: string) {
    super(name);
    this.cart = [];
    this.totalPrice = 0;
  }

  /**
   * @description adds new article to shopping cart, if same article is already in cart, it increases this article's quantity by 1
   * @param {Object} article instance of article
   * @returns {this} `this` of current user's instance
   */
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

  /**
   * @description removes article from shopping cart, if article's quantity is more than 1, it decreases this article's quantity by 1
   * @param {Object} article instance of article
   * @returns {this} `this` of current user's instance
   */
  removeFromCart(article: ArticleType) {
    const isExistingAndOne = this.isExistingAndSingle(article.id);
    if (!isExistingAndOne) {
      const newCart = this.cart.filter((objItem) => objItem.id !== article.id);
      this.cart = newCart;
      return this;
    }

    const newCart = this.cart.map((cartItem) => {
      if (cartItem.id === article.id) {
        cartItem.quantity -= 1;
      }
      return cartItem;
    });

    this.cart = newCart;
    return this;
  }

  /**
   * @description calculates total price of items in shopping cart, including the latest applicable discount rules
   * @returns {this} `this` of current user's instance
   */
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

  /**
   * @description verifies if item is in the cart
   * @param {String} itemId item ID
   * @returns {Boolean} exists or doesn't
   */
  isCartItemExisting(itemId: string) {
    if (this.cart.length === 0) return false;
    return this.cart.findIndex((cartItem) => cartItem.id === itemId) > -1;
  }

  /**
   * @description verifies if item is in the cart and if it's quantity is 1
   * @param {String} itemId item ID
   * @returns {Boolean} exists in quantity of 1 or otherwise
   */
  isExistingAndSingle(itemId: string) {
    const cartItems = this.cart.filter(
      (objCartItem) => objCartItem.id === itemId
    );
    return cartItems.length === 1;
  }
}

export type UserType = InstanceType<typeof User>;

export default User;
