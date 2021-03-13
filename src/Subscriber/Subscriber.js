"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
var Subscriber = /** @class */ (function () {
    function Subscriber(name) {
        this.articles = [];
        this.name = name;
        this.id = uuid_1.v4();
    }
    Subscriber.prototype.inform = function (observer) {
        this.articles = observer.state.articles;
    };
    return Subscriber;
}());
exports["default"] = Subscriber;
