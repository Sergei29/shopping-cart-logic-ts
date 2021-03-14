import Observer from "../Observer/Observer";
import { ArticleType, DiscountType } from "../Article/Article";

type ObjUpdateType = {
  articleId: string;
  name?: string;
  price?: number;
  discount?: DiscountType;
};

/**
 * @description shop class, that will hold the information on articles and discount, als owill keep track of current users/customers and keep them udated on discount changes;
 */
class Shop extends Observer {
  name: string;

  /**
   * @param {String} name shop's name
   * @returns {Object} instance of Shop
   */
  constructor(name: string) {
    super();
    this.name = name;
  }

  /**
   * @description adds new article, to the shop
   * @param {Object} newArticle new article
   * @returns {this} this of current shop's instance
   */
  addNewArticle(newArticle: ArticleType) {
    this.isArticleExisting(newArticle.id);
    const prevState = this.getState();
    const newState = {
      ...prevState,
      articles: prevState.articles.concat(newArticle),
    };
    this.setState(newState);
    return this;
  }

  /**
   * @description update article by ID
   * @param {String} {articleId ID
   * @param {String} name new name
   * @param {Number} price new price
   * @param {Object | null} discount new discount data}
   * @returns {this}  this of current shop's instance
   */
  updateArticle({ articleId, name, price, discount = null }: ObjUpdateType) {
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

  /**
   * @description add new discount to an existing article
   * @param {String} articleId ID
   * @param {Number} price price per unit
   * @param {Number} forNumberOfItems min amount of units to have the discount applied
   * @returns  {this}  this of current shop's instance
   */
  addDiscount(articleId: string, price: number, forNumberOfItems: number) {
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

  /**
   * @description remove article from th shop
   * @param {String} articleId ID
   * @returns {this} this of current shop's instance
   */
  removeArticle(articleId: string) {
    this.verifyArticle(articleId);
    const prevState = this.getState();
    const newState = {
      ...prevState,
      articles: prevState.articles.filter(
        (article) => article.id !== articleId
      ),
    };
    this.setState(newState);
    return this;
  }

  /**
   * @description verifies if article does not exists
   * @param {String} articleId ID
   * @returns {undefined} throws error if article not found
   */
  verifyArticle(articleId: string) {
    const prevState = this.getState();
    const article = prevState.articles.find(
      (objArticle) => objArticle.id === articleId
    );
    if (!article) throw new Error("Article not found.");
  }

  /**
   * @description verifies if article already does exist
   * @param {String} articleId ID
   * @returns {undefined} throws error if article is found
   */
  isArticleExisting(articleId: string) {
    const prevState = this.getState();
    const article = prevState.articles.find(
      (objArticle) => objArticle.id === articleId
    );
    if (article) throw new Error("Article already exists.");
  }
}

export default Shop;
