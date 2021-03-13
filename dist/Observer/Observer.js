"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Observer {
    constructor() {
        this.state = {
            articles: [],
        };
        this.subscribers = [];
    }
    setState(newState) {
        this.state = newState;
        this.notifyAll();
    }
    getState() {
        return this.state;
    }
    notifyAll() {
        this.subscribers.forEach((subscriber) => subscriber.inform(this));
    }
    register(subscriber) {
        subscriber.articles = this.state.articles;
        this.subscribers.push(subscriber);
    }
    unregister(subscriber) {
        return this.subscribers.filter((objSubscriber) => objSubscriber.id !== subscriber.id);
    }
}
exports.default = Observer;
