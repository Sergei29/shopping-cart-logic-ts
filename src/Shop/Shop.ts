import Observer from "../Observer/Observer";
import Article, { ArticleType, DiscountType } from "../Article/Article";

type ObjUpdateType = {
  articleId: string;
  name?: string;
  price?: number;
  discount?: DiscountType;
};

class Shop extends Observer {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  addNewArticle(newArticle: ArticleType) {
    const prevState = this.getState();
    const newState = {
      ...prevState,
      articles: prevState.articles.concat(newArticle),
    };
    this.setState(newState);
    return this;
  }

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

  removeArticle(articleId: string) {
    this.verifyArticle(articleId);
    return this;
  }

  verifyArticle(articleId: string) {
    const prevState = this.getState();
    const article = prevState.articles.find(
      (objArticle) => objArticle.id === articleId
    );
    if (!article) throw new Error("Article not found.");
  }
}

export default Shop;
