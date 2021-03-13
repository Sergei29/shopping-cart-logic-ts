import Shop from "../Shop/Shop";
import User from "../User/User";
import Article from "../Article/Article";
import CartItem from "../CartItem/CartItem";

// shop:
const shopOne = new Shop("Best One");

// Articles:
const soap = new Article("soap", 30, { price: 10, forNumberOfItems: 3 });
const showerGel = new Article("shower gel", 10);
const toothpaste = new Article("toothpaste", 5);
const toiletPaper = new Article("toilet paper", 12, {
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
const Serge = new User("Serge");
const Jenny = new User("Jenny");
const Jack = new User("Jack");
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
