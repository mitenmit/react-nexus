"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;module.exports = function (R, EventEmitter) {
  var _ = R._;

  var UplinkEventEmitter = (function (EventEmitter) {
    var UplinkEventEmitter = function UplinkEventEmitter(_ref) {
      var uplink = _ref.uplink;
      // Ducktype-check uplink (since we dont have access to the constructor)
      _.dev(function () {
        return uplink.listenTo.should.be.a.Function && uplink.unlistenFrom.should.be.a.Function;
      });
      EventEmitter.call(this);
      this.uplink = uplink;
      this.uplinkListeners = {};
    };

    _extends(UplinkEventEmitter, EventEmitter);

    UplinkEventEmitter.prototype.listenTo = function (room, handler) {
      var _this = this;
      var _ref2 = EventEmitter.prototype.listenTo.call(this, room, handler);

      var listener = _ref2.listener;
      var createdRoom = _ref2.createdRoom;
      if (createdRoom) {
        _.dev(function () {
          return (_this.uplinkListeners[listener.id] === void 0).should.be.ok;
        });
        this.uplinkListeners[listener.id] = this.uplink.listenTo(room, function (params) {
          return _this._emit(room, params);
        });
      }
      _.dev(function () {
        return _this.uplinkListeners[listener.id].should.be.ok;
      });
      return { listener: listener, createdRoom: createdRoom };
    };

    UplinkEventEmitter.prototype.unlistenFrom = function (listener) {
      var _this2 = this;
      var _ref3 = EventEmitter.prototype.unlistenFrom.call(this, listener);

      var deletedRoom = _ref3.deletedRoom;
      if (deletedRoom) {
        _.dev(function () {
          return (_this2.uplinkListeners[listener.id] !== void 0).should.be.ok;
        });
        this.uplink.unlistenFrom(this.uplinkListeners[listener.id]);
        delete this.uplinkListeners[listener.id];
      }
      _.dev(function () {
        return (_this2.uplinkListeners[listener.id] === void 0).should.be.ok;
      });
      return { listener: listener, deletedRoom: deletedRoom };
    };

    UplinkEventEmitter.prototype.destroy = function () {
      var _this3 = this;
      EventEmitter.prototype.destroy.call(this);
      _.dev(function () {
        return Object.keys(_this3.uplinkListeners).length.should.be.exactly(0);
      });
      this.uplinkListeners = null;
      this.uplink = null;
    };

    return UplinkEventEmitter;
  })(EventEmitter);

  _.extend(UplinkEventEmitter.prototype, {
    uplink: null,
    uplinkListeners: null });

  return UplinkEventEmitter;
};