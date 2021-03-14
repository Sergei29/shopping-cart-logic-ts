import { v4 as uuid } from "uuid";
import Observer from "../Observer/Observer";
import { ArticleType } from "../Article/Article";

/**
 * @description subscriber class that is informed of changes happening in class that it is subscribed to;
 */
class Subscriber {
  id: string;
  name: string;
  articles: ArticleType[];

  /**
   * @param {String} name subscribers name
   * @returns {Object} instance of subscriber
   */
  constructor(name: string) {
    this.articles = [];
    this.name = name;
    this.id = uuid();
  }

  /**
   * @description copying the articles list from the observer's state
   * @param {Object} observer instance of observer subscribed to
   * @returns {undefined} assigns value to subscriber's property
   */
  inform(observer: InstanceType<typeof Observer>) {
    this.articles = observer.state.articles;
  }
}

export default Subscriber;
