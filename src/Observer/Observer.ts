import { ArticleType } from "../Article/Article";
import { UserType } from "../User/User";

type ObserverStateType = {
  articles: ArticleType[];
};

/**
 * @description base class, Observer,that has its state with list of articles, and has property `subscribers`
 */
class Observer {
  state: ObserverStateType;
  subscribers: UserType[];

  /**
   * @returns {Object} instance of Observer
   */
  constructor() {
    this.state = {
      articles: [],
    };
    this.subscribers = [];
  }

  /**
   *
   * @param {Oject} newState updated state
   * @returns {undefined} sets state
   */
  setState(newState: ObserverStateType) {
    this.state = newState;
    this.notifyAll();
  }

  /**
   * @description gets state value
   * @returns {Object} Observer's state
   */
  getState() {
    return this.state;
  }

  /**
   * @description updating all subscribers
   * @returns {undefined} invokes method in each of subscrber's instance
   */
  notifyAll() {
    this.subscribers.forEach((subscriber) => subscriber.inform(this));
  }

  /**
   * @description add new subcriber
   * @param {Object} subscriber new subscriber
   * @returns {undefined} sets observer: adding to subscribers list
   */
  register(subscriber: UserType) {
    subscriber.articles = this.state.articles;
    this.subscribers.push(subscriber);
  }

  /**
   * @description removes subscriber
   * @param {Object} subscriber subscriber to remove
   * @returns {undefined} updates observer: removing subscriber from subscribers list
   */
  unregister(subscriber: UserType) {
    return this.subscribers.filter(
      (objSubscriber) => objSubscriber.id !== subscriber.id
    );
  }
}

export default Observer;
