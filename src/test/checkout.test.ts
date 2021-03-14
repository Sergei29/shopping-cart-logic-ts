import Shop from "../Shop/Shop";
import User from "../User/User";
import Article from "../Article/Article"; // shop:
import { TOOTHPASTE_DISCOUNT, SOAP_DISCOUNT } from "./testData";

const print = (mixedNestedValue: any) =>
  console.log(JSON.stringify(mixedNestedValue, null, 2));

const shopOne = new Shop("Best One");

// Articles:
const soap = new Article("soap", 30, { price: 10, forNumberOfItems: 3 });
const showerGel = new Article("shower gel", 10);
const toothpaste = new Article("toothpaste", 5);
const toiletPaper = new Article("toilet paper 1/4mile", 12, {
  price: 6,
  forNumberOfItems: 5,
});

// Users:
const Serge = new User("Serge");
const Helena = new User("Helena");

describe("Checkout path", () => {
  describe("Shop operaton", () => {
    it("should add new articles to shop", () => {
      shopOne
        .addNewArticle(soap)
        .addNewArticle(showerGel)
        .addNewArticle(toothpaste)
        .addNewArticle(toiletPaper);
      expect(shopOne.state.articles).toHaveLength(4);
    });

    it("should add new users to shop", () => {
      shopOne.register(Helena);
      shopOne.register(Serge);

      const { subscribers: usersList } = shopOne;

      expect(usersList).toHaveLength(2);
    });

    it("should supply each user with shop articles information", () => {
      const shopArticles = shopOne.state.articles;
      const subscriberArticles = shopOne.subscribers[0].articles;
      const userArticles = Helena.articles;

      expect(subscriberArticles).toEqual(shopArticles);
      expect(userArticles).toEqual(shopArticles);
    });

    it("should add new discount to article by ID in Shop", () => {
      shopOne.addDiscount(
        toothpaste.id,
        TOOTHPASTE_DISCOUNT.price,
        TOOTHPASTE_DISCOUNT.forNumberOfItems
      );

      const updatedArticle = shopOne.state.articles.find(
        (article) => article.id === toothpaste.id
      );
      expect(updatedArticle?.discount).toEqual(TOOTHPASTE_DISCOUNT);
    });

    it("should supply updated discount information to each user", () => {
      const shopArticles = shopOne.state.articles;
      const subscriberArticles = shopOne.subscribers[0].articles;
      const userArticles = Helena.articles;

      expect(subscriberArticles).toEqual(shopArticles);
      expect(userArticles).toEqual(shopArticles);
    });
  });

  describe("User operaton", () => {
    it("should add new item to the cart and update total price", () => {
      Helena.addToCart(soap).addToCart(toothpaste).calculateTotal();
      const totalExpected = soap.price + toothpaste.price;

      expect(Helena.cart).toHaveLength(2);
      expect(Helena.totalPrice).toEqual(totalExpected);
      expect(shopOne.subscribers[0].totalPrice).toEqual(totalExpected);
    });

    it("should add existing item to the cart and update total price", () => {
      Helena.addToCart(toothpaste).calculateTotal();
      const totalExpected = soap.price + toothpaste.price * 2;

      expect(Helena.cart).toHaveLength(2);
      expect(Helena.totalPrice).toEqual(totalExpected);
      expect(shopOne.subscribers[0].totalPrice).toEqual(totalExpected);
    });

    it("should apply discount when matching discount criteria", () => {
      Helena.addToCart(toothpaste).calculateTotal();
      const totalExpected = soap.price + TOOTHPASTE_DISCOUNT.price * 3;

      expect(Helena.cart).toHaveLength(2);
      expect(Helena.totalPrice).toEqual(totalExpected);
      expect(shopOne.subscribers[0].totalPrice).toEqual(totalExpected);
    });

    it("should remove item from cart, re-evaluate discount, and update total price", () => {
      Helena.removeFromCart(toothpaste).calculateTotal();
      const totalExpected = soap.price + toothpaste.price * 2;

      expect(Helena.cart).toHaveLength(2);
      expect(Helena.totalPrice).toEqual(totalExpected);
      expect(shopOne.subscribers[0].totalPrice).toEqual(totalExpected);
    });

    it("should react to new discount updates", () => {
      shopOne.addDiscount(
        soap.id,
        SOAP_DISCOUNT.price,
        SOAP_DISCOUNT.forNumberOfItems
      );
      Helena.addToCart(soap).calculateTotal();
      const totalExpected = SOAP_DISCOUNT.price * 2 + toothpaste.price * 2;

      expect(Helena.cart).toHaveLength(2);
      expect(Helena.totalPrice).toEqual(totalExpected);
      expect(shopOne.subscribers[0].totalPrice).toEqual(totalExpected);
    });
  });
});
