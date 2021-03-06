"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;module.exports = function (R) {
  var _ = R._;

  var ActionHandler = (function () {
    var ActionHandler = function ActionHandler(action, handler) {
      this.action = action;
      this.handler = handler;
      this.id = _.uniqueId("ActionHandler");
      _.scopeAll(this, ["pushInto", "removeFrom", "dispatch"]);
    };

    ActionHandler.prototype.pushInto = function (collection) {
      var _this = this;
      _.dev(function () {
        return collection.should.be.an.Object;
      });
      if (!collection[this.action]) {
        collection[this.action] = {};
      }
      _.dev(function () {
        return (collection[_this.action][_this.id] === void 0).should.be.ok;
      });
      collection[this.action][this.id] = this;
    };

    ActionHandler.prototype.removeFrom = function (collection) {
      var _this2 = this;
      _.dev(function () {
        return collection.should.be.an.Object && (collection[_this2.action] !== void 0).should.be.ok && collection[_this2.action].should.be.an.Object && (collection[_this2.action][_this2.id] !== void 0).should.be.ok && collection[_this2.action][_this2.id].should.be.exactly(_this2);
      });
      delete collection[this.action][this.id];
      if (Object.keys(collection[this.action]).length === 0) {
        delete collection[this.action];
      }
    };

    ActionHandler.prototype.isInside = function (collection) {
      _.dev(function () {
        return collection.should.be.an.Object;
      });
      return collection[this.action] && collection[this.action][this.id] && collection[this.action][this.id] === this;
    };

    ActionHandler.prototype.dispatch = function (params) {
      _.dev(function () {
        return params.should.be.an.Object;
      });
      return this.handler.call(null, params);
    };

    return ActionHandler;
  })();

  _.extend(ActionHandler.prototype, {
    id: null });

  return ActionHandler;
};