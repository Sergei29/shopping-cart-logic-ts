import { ArticleType } from "../Article/Article";
import { UserType } from "../User/User";
type StateType = {
  articles: ArticleType[];
};
class Observer {
  state: StateType;
  subscribers: UserType[];

  constructor() {
    this.state = {
      articles: [],
    };
    this.subscribers = [];
  }

  setState(newState: StateType) {
    this.state = newState;
    this.notifyAll();
  }

  getState() {
    return this.state;
  }

  notifyAll() {
    this.subscribers.forEach((subscriber) => subscriber.inform(this));
  }

  register(subscriber: UserType) {
    subscriber.articles = this.state.articles;
    this.subscribers.push(subscriber);
  }

  unregister(subscriber: UserType) {
    return this.subscribers.filter(
      (objSubscriber) => objSubscriber.id !== subscriber.id
    );
  }
}

export default Observer;
