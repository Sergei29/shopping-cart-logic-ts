"use strict";
exports.__esModule = true;
var Observer = /** @class */ (function () {
    function Observer() {
        this.state = {
            articles: []
        };
        this.subscribers = [];
    }
    Observer.prototype.setState = function (newState) {
        this.state = newState;
        this.notifyAll();
    };
    Observer.prototype.getState = function () {
        return this.state;
    };
    Observer.prototype.notifyAll = function () {
        var _this = this;
        return this.subscribers.forEach(function (subscriber) { return subscriber.inform(_this); });
    };
    Observer.prototype.register = function (subscriber) {
        return this.subscribers.push(subscriber);
    };
    Observer.prototype.unregister = function (subscriber) {
        return this.subscribers.filter(function (objSubscriber) { return objSubscriber.id !== subscriber.id; });
    };
    return Observer;
}());
exports["default"] = Observer;
