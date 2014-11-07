module.exports = function(R) {
    var _ = require("lodash");
    var assert = require("assert");
    var React = R.React;

    assert(R.isClient(), "R.Client: should only be loaded in the client.");
    window.React = React;
    /**
    * <p>Simply provides an specified App for the client</p>
    * <p>Provides instance of App </p>
    * <ul>
    * <li> Client.mount => compute all React Components client-side and establishes a connection via socket in order to make data subscriptions </li>
    * </ul>
    * @class R.Client
    */
    var Client = function Client(App) {
        R.Debug.dev(function() {
            if(!window.React) {
                console.warn("Warning: React is not attached to window.");
            }
        });
        window.React = React;
        R.Debug.dev(R.scope(function() {
            if(!window.__ReactOnRails) {
                window.__ReactOnRails = {};
            }
            if(!window.__ReactOnRails.apps) {
                window.__ReactOnRails.apps = [];
            }
            window.__ReactOnRails.apps.push(this);
        }, this));
        this._app = new App();
    };

    _.extend(Client.prototype, /** @lends R.Client.prototype */ {
        _app: null,
        _rendered: false,
        /**
        * <p> Call the renderIntoDocumentInClient from R.App function </p>
        * @method mount
        */
        mount: regeneratorRuntime.mark(function mount() {
            return regeneratorRuntime.wrap(function mount$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert(!this._rendered, "R.Client.render(...): should only call mount() once.");
                    context$2$0.next = 3;
                    return this._app.renderIntoDocumentInClient(window);
                case 3:
                case "end":
                    return context$2$0.stop();
                }
            }, mount, this);
        }),
    });

    return Client;
};
