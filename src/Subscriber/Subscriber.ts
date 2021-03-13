import { v4 as uuid } from "uuid";
import Observer from "../Observer/Observer";
import { ArticleType } from "../Article/Article";

class Subscriber {
  id: string;
  name: string;
  articles: ArticleType[];

  constructor(name: string) {
    this.articles = [];
    this.name = name;
    this.id = uuid();
  }

  inform(observer: InstanceType<typeof Observer>) {
    this.articles = observer.state.articles;
  }
}

export default Subscriber;
