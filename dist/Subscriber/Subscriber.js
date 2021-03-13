"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Subscriber {
    constructor(name) {
        this.articles = [];
        this.name = name;
        this.id = uuid_1.v4();
    }
    inform(observer) {
        this.articles = observer.state.articles;
    }
}
exports.default = Subscriber;
