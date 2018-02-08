(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(2);
var toSubscriber_1 = __webpack_require__(17);
var observable_1 = __webpack_require__(10);
var pipe_1 = __webpack_require__(22);
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AbstractContract {

	/**
	 * Clone contract and return new contract instance
	 * @return {Object}
	 */
	clone() {
		let clonedContract = this.contract.clone();
		let contractAdapterClone = Object.assign({}, this);
		contractAdapterClone.contract = clonedContract;
		contractAdapterClone.address = clonedContract._address;

		return contractAdapterClone;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractContract;



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
exports.root = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(5);
var Subscription_1 = __webpack_require__(18);
var Observer_1 = __webpack_require__(8);
var rxSubscriber_1 = __webpack_require__(9);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_defer__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_defer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_defer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromPromise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__);






class Organization extends __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__["a" /* AbstractContract */] {

    /**
     * @param {Methods} methods
     * @param {Properties} properties
     * @param {ContractFactory} contractFactory
     */
    constructor(methods, properties, contractFactory) {
        super();
        this.contractFactory = contractFactory;
        this.properties = properties;
        this.methods = methods;
    }

    /**
     * @returns {ProposalManager}
     */
    async getProposalManager() {
        const proposalManagerAddress = await this.properties.get('proposalManager');
        return this.contractFactory.createProposalManager(proposalManagerAddress)
    }

    /**
     * @returns {Observable}
     */
    getProposals() {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(this.getProposalManager()).concatMap(proposalManager => {
           return proposalManager.proposals;
        });
    }

    /**
     * @param proposalAddress
     * @returns {Proposal}
     */
    getProposal(proposalAddress) {
        return this.contractFactory.createProposal(proposalAddress);
    }

    /**
     * @param {number} proposalId
     * @param choice
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @returns {Promise}
     */
    vote(proposalId, choice, from, gas, gasPrice) {
        return this.methods.executeMethod('vote', [proposalId, choice], from, gas, gasPrice);
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @returns {Promise}
     */
    unvote(proposalId, from, gas, gasPrice) {
        return this.methods.executeMethod('unvote', [proposalId], from, gas, gasPrice);
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @returns {Promise}
     */
    approve(proposalId, from, gas, gasPrice) {
        return this.methods.executeMethod('approve', [proposalId], from, gas, gasPrice);
    }

    /**
     * @param {string} proposalAddress
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @returns {Promise}
     */
    propose(proposalAddress, from, gas, gasPrice) {
        return this.methods.executeMethod('propose', [proposalAddress], from, gas, gasPrice);
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @returns {Promise}
     */
    execute(proposalId, from, gas, gasPrice) {
        return this.methods.executeMethod('execute', [proposalId], from, gas, gasPrice);
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @returns {Promise}
     */
    newVotingRound(proposalId, from, gas, gasPrice) {
        return this.methods.executeMethod('newVotingRound', [proposalId], from, gas, gasPrice)
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @returns {Promise}
     */
    tally(proposalId, from, gas, gasPrice) {
        return this.methods.executeMethod('tally', [proposalId], from, gas, gasPrice);
    }

    /**
     * @param {number} proposalId
     * @returns {Promise}
     */
    quorumReached(proposalId) {
        return this.methods.executeMethod('quorumReached', [proposalId], from, gas, gasPrice);
    }

    /**
     * @param {number} optionId
     * @returns {Promise}
     */
    winningOption(optionId) {
        return this.methods.executeMethod('winningOption', [optionId]);
    }

    /**
     * @returns {Promise}
     */
    votingRights() {
        return this.methods.executeMethod('votingRights', []);
    }

    /**
     * @returns {Promise}
     */
    votingPower() {
        return this.methods.executeMethod('votingPower', []);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Organization;



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(2);
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(2);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(2);
var isArrayLike_1 = __webpack_require__(27);
var isPromise_1 = __webpack_require__(28);
var isObject_1 = __webpack_require__(6);
var Observable_1 = __webpack_require__(0);
var iterator_1 = __webpack_require__(29);
var InnerSubscriber_1 = __webpack_require__(30);
var observable_1 = __webpack_require__(10);
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            destination.syncErrorThrowable = true;
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        var iterator = result[iterator_1.iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        var obs = result[observable_1.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
exports.OuterSubscriber = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__ = __webpack_require__(1);


class VotingPower extends __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__["a" /* AbstractContract */] {

    /**
     * @param {Methods} methods
     */
    constructor(methods) {
        super();
        this.methods = methods;
    }

    /**
     * @param {number} quorum
     * @returns {Promise}
     */
    quorumReached(quorum) {
        return this.methods.executeMethod('quorumReached', [quorum]);
    }

    /**
     * @param {string} voter
     * @returns {Promise}
     */
    votingWeightOf(voter) {
        return this.methods.executeMethod('votingWeightOf', [voter]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VotingPower;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__ = __webpack_require__(1);


class VotingRights extends __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__["a" /* AbstractContract */] {

    /**
     * @param {Methods} methods
     */
    constructor(methods) {
        super();
        this.methods = methods;
    }

    /**
     * @param {string} voter
     * @returns {Promise}
     */
    canVote(voter) {
        return this.methods.executeMethod('canVote', [voter]);
    }

    /**
     * @param {string} proposer
     * @returns {Promise}
     */
    canPropose(proposer) {
        return this.methods.executeMethod('canPropose', [proposer]);
    }

    /**
     * @param {string} approver
     * @returns {Promise}
     */
    canApprove(approver) {
        return this.methods.executeMethod('canApprove', [approver]);
    }

    /**
     * @param {number} proposal
     * @returns {Promise}
     */
    requiresApproval(proposal) {
        return this.methods.executeMethod('requiresApproval', [proposal]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VotingRights;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contracts_Organization_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contracts_voting_VotingPower_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contracts_voting_VotingRights_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ABIS_contract_metadata_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__factories_Web3Factory__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__factories_ContractFactory__ = __webpack_require__(47);







class Harbour {

	/**
	 * @param {Web3} web3
	 * @param {string} versionAddress
	 */
	constructor(web3, versionAddress) {
		this.web3Factory = new __WEBPACK_IMPORTED_MODULE_4__factories_Web3Factory__["a" /* default */](web3);
		this.contractFactory = new __WEBPACK_IMPORTED_MODULE_5__factories_ContractFactory__["a" /* default */](web3, __WEBPACK_IMPORTED_MODULE_3__ABIS_contract_metadata_js__["a" /* data */], this.web3Factory);
		this.deploy = this.web3Factory.createDeploy();
		this.version = this.contractFactory.createVersion(versionAddress);
	}

	/**
	 * Deploy an harbour organization and return the organization address
	 * @param {Object} votingRights
	 * @param {Object} votingPower
	 * @param {string} from
	 * @param {string} gas
	 * @param {string} gasPrice
	 * @returns {Promise}
	 */
	async createOrganization(votingRights, votingPower, from, gas, gasPrice) {
		const deployedModules = await this.deployModules(votingRights, votingPower, from);
		return await this.version.createOrganization(
			deployedModules['votingRights'],
			deployedModules['votingPower'],
			from,
			gas,
			gasPrice
		);
	}

	/**
	 * Destroys an deployed organization
	 * @param {number} id
	 * @param {string} from
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @returns {Promise}
	 */
	async destroyOrganization(id, from, gas, gasPrice) {
		return await this.version.destroyOrganization(id, from, gas, gasPrice);
	}

	/**
	 *
	 * @param {Object} votingRights
	 * @param {Object} votingPower
	 * @param {string} from
	 * @returns {Object}
	 */
	async deployModules(votingRights, votingPower, from) {
		let votingRightsAddress = await this.deploy.deploy(
			votingRights.bytecode,
			votingRights.arguments,
			votingRights.gas,
			votingRights.gasPrice,
			from
		);

		let votingPowerAddress = await this.deploy.deploy(
			votingPower.bytecode,
			votingPower.arguments,
			votingPower.gas,
			votingPower.gasPrice,
			from
		);

		return {
			votingRights: votingRightsAddress.contractAddress,
			votingPower: votingPowerAddress.contractAddress
		};
	}

	/**
	 * @param {Object} deployArguments
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @param {string} from
	 * @returns {Promise}
	 */
	deployBallot(deployArguments, gas, gasPrice, from) {
		return this.deploy.deploy(
			this.contractFactory.getAbiFromContractData('Ballot').bytecode,
			deployArguments,
			gas,
			gasPrice,
			from
		);
	}

	/**
	 * @param {Object} deployArguments
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @param {string} from
	 * @returns {Promise}
	 */
	deployProposal(deployArguments, gas, gasPrice, from) {
		return this.deploy.deploy(
			this.contractFactory.getAbiFromContractData('Proposal').bytecode,
			deployArguments,
			gas,
			gasPrice,
			from
		);
	}

	/**
	 * Returns an harbour organization
	 * @param {string} address
	 * @returns {Organization}
	 */
	getOrganization(address) {
		return this.contractFactory.createOrganization(address);
	}

	/**
	 * Returns an harbour organization
	 * @param {string} address
	 * @returns {VotingPower}
	 */
	getVotingPower(address) {
		return this.contractFactory.createVotingPower(address);
	}

	/**
	 * Returns an harbour organization
	 * @param {string} address
	 * @returns {VotingRights}
	 */
	getVotingRights(address) {
		return this.contractFactory.createVotingPower(address);
	}
}
/* harmony export (immutable) */ __webpack_exports__["Harbour"] = Harbour;



/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(3);
var rxSubscriber_1 = __webpack_require__(9);
var Observer_1 = __webpack_require__(8);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(19);
var isObject_1 = __webpack_require__(6);
var isFunction_1 = __webpack_require__(5);
var tryCatch_1 = __webpack_require__(20);
var errorObject_1 = __webpack_require__(7);
var UnsubscriptionError_1 = __webpack_require__(21);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(7);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var noop_1 = __webpack_require__(23);
/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var defer_1 = __webpack_require__(25);
Observable_1.Observable.defer = defer_1.defer;
//# sourceMappingURL=defer.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DeferObservable_1 = __webpack_require__(26);
exports.defer = DeferObservable_1.DeferObservable.create;
//# sourceMappingURL=defer.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var subscribeToResult_1 = __webpack_require__(11);
var OuterSubscriber_1 = __webpack_require__(12);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var DeferObservable = (function (_super) {
    __extends(DeferObservable, _super);
    function DeferObservable(observableFactory) {
        _super.call(this);
        this.observableFactory = observableFactory;
    }
    /**
     * Creates an Observable that, on subscribe, calls an Observable factory to
     * make an Observable for each new Observer.
     *
     * <span class="informal">Creates the Observable lazily, that is, only when it
     * is subscribed.
     * </span>
     *
     * <img src="./img/defer.png" width="100%">
     *
     * `defer` allows you to create the Observable only when the Observer
     * subscribes, and create a fresh Observable for each Observer. It waits until
     * an Observer subscribes to it, and then it generates an Observable,
     * typically with an Observable factory function. It does this afresh for each
     * subscriber, so although each subscriber may think it is subscribing to the
     * same Observable, in fact each subscriber gets its own individual
     * Observable.
     *
     * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption>
     * var clicksOrInterval = Rx.Observable.defer(function () {
     *   if (Math.random() > 0.5) {
     *     return Rx.Observable.fromEvent(document, 'click');
     *   } else {
     *     return Rx.Observable.interval(1000);
     *   }
     * });
     * clicksOrInterval.subscribe(x => console.log(x));
     *
     * // Results in the following behavior:
     * // If the result of Math.random() is greater than 0.5 it will listen
     * // for clicks anywhere on the "document"; when document is clicked it
     * // will log a MouseEvent object to the console. If the result is less
     * // than 0.5 it will emit ascending numbers, one every second(1000ms).
     *
     * @see {@link create}
     *
     * @param {function(): SubscribableOrPromise} observableFactory The Observable
     * factory function to invoke for each Observer that subscribes to the output
     * Observable. May also return a Promise, which will be converted on the fly
     * to an Observable.
     * @return {Observable} An Observable whose Observers' subscriptions trigger
     * an invocation of the given Observable factory function.
     * @static true
     * @name defer
     * @owner Observable
     */
    DeferObservable.create = function (observableFactory) {
        return new DeferObservable(observableFactory);
    };
    DeferObservable.prototype._subscribe = function (subscriber) {
        return new DeferSubscriber(subscriber, this.observableFactory);
    };
    return DeferObservable;
}(Observable_1.Observable));
exports.DeferObservable = DeferObservable;
var DeferSubscriber = (function (_super) {
    __extends(DeferSubscriber, _super);
    function DeferSubscriber(destination, factory) {
        _super.call(this, destination);
        this.factory = factory;
        this.tryDefer();
    }
    DeferSubscriber.prototype.tryDefer = function () {
        try {
            this._callFactory();
        }
        catch (err) {
            this._error(err);
        }
    };
    DeferSubscriber.prototype._callFactory = function () {
        var result = this.factory();
        if (result) {
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    };
    return DeferSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=DeferObservable.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(2);
function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.iterator = symbolIteratorPonyfill(root_1.root);
/**
 * @deprecated use iterator instead
 */
exports.$$iterator = exports.iterator;
//# sourceMappingURL=iterator.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var fromPromise_1 = __webpack_require__(32);
Observable_1.Observable.fromPromise = fromPromise_1.fromPromise;
//# sourceMappingURL=fromPromise.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var PromiseObservable_1 = __webpack_require__(33);
exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
//# sourceMappingURL=fromPromise.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(2);
var Observable_1 = __webpack_require__(0);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PromiseObservable = (function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {PromiseLike<T>} promise The promise to be converted.
     * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
     * the delivery of the resolved value (or the rejection).
     * @return {Observable<T>} An Observable which wraps the Promise.
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(Observable_1.Observable));
exports.PromiseObservable = PromiseObservable;
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
//# sourceMappingURL=PromiseObservable.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var concatMap_1 = __webpack_require__(35);
Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var concatMap_1 = __webpack_require__(36);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project, resultSelector) {
    return concatMap_1.concatMap(project, resultSelector)(this);
}
exports.concatMap = concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mergeMap_1 = __webpack_require__(37);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project, resultSelector) {
    return mergeMap_1.mergeMap(project, resultSelector, 1);
}
exports.concatMap = concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var subscribeToResult_1 = __webpack_require__(11);
var OuterSubscriber_1 = __webpack_require__(12);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return function mergeMapOperatorFunction(source) {
        if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
            resultSelector = null;
        }
        return source.lift(new MergeMapOperator(project, resultSelector, concurrent));
    };
}
exports.mergeMap = mergeMap;
var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
exports.MergeMapOperator = MergeMapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = (function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeMapSubscriber = MergeMapSubscriber;
//# sourceMappingURL=mergeMap.js.map

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data = [
	{
		"contractName": "ModuleRegistry",
		"abi": [
			{
				"constant": false,
				"inputs": [
					{
						"name": "name",
						"type": "bytes32"
					},
					{
						"name": "module",
						"type": "address"
					}
				],
				"name": "addModule",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "name",
						"type": "bytes32"
					}
				],
				"name": "getModule",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "",
						"type": "bytes32"
					}
				],
				"name": "modules",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			}
		],
		"bytecode": "0x6060604052341561000f57600080fd5b6102708061001e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806335324eee1461005c57806385acd641146100a2578063b0b6cc1a14610109575b600080fd5b341561006757600080fd5b6100a060048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610170565b005b34156100ad57600080fd5b6100c76004808035600019169060200190919050506101cd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011457600080fd5b61012e600480803560001916906020019091905050610211565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b80600080846000191660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b6000806000836000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820ffa3e5e962484806a21e66ab7d1968b4ce91f41b17ab1b6d5a5d64e25b350c020029",
		"deployedBytecode": "0x606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806335324eee1461005c57806385acd641146100a2578063b0b6cc1a14610109575b600080fd5b341561006757600080fd5b6100a060048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610170565b005b34156100ad57600080fd5b6100c76004808035600019169060200190919050506101cd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011457600080fd5b61012e600480803560001916906020019091905050610211565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b80600080846000191660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b6000806000836000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820ffa3e5e962484806a21e66ab7d1968b4ce91f41b17ab1b6d5a5d64e25b350c020029",
		"sourceMap": "86:577:25:-;;;;;;;;;;;;;;;;;",
		"deployedSourceMap": "86:577:25:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;332:104;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;559:102;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;144:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;332:104;423:6;407:7;:13;415:4;407:13;;;;;;;;;;;;;;;;;;:22;;;;;;;;;;;;;;;;;;332:104;;:::o;559:102::-;615:7;641;:13;649:4;641:13;;;;;;;;;;;;;;;;;;;;;;;;;;;634:20;;559:102;;;:::o;144:50::-;;;;;;;;;;;;;;;;;;;;;;:::o",
		"source": "pragma solidity ^0.4.18;\n\nimport \"./ModuleRegistryInterface.sol\";\n\n// @todo ownership\ncontract ModuleRegistry is ModuleRegistryInterface {\n\n    mapping (bytes32 => ProxyInterface) public modules;\n\n    /// @dev Adds a module to module list\n    /// @param name Name of the module\n    /// @param module Address of the module proxy\n    function addModule(bytes32 name, ProxyInterface module) external {\n        modules[name] = module;\n    }\n\n    /// @dev Returns address for module\n    /// @param name Name of the module\n    /// @return Address of the module\n    function getModule(bytes32 name) external view returns (address) {\n        return modules[name];\n    }\n}\n",
		"sourcePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Registries/ModuleRegistry.sol",
		"ast": {
			"attributes": {
				"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Registries/ModuleRegistry.sol",
				"exportedSymbols": {
					"ModuleRegistry": [
						2311
					]
				}
			},
			"children": [
				{
					"attributes": {
						"literals": [
							"solidity",
							"^",
							"0.4",
							".18"
						]
					},
					"id": 2277,
					"name": "PragmaDirective",
					"src": "0:24:25"
				},
				{
					"attributes": {
						"SourceUnit": 2330,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Registries/ModuleRegistryInterface.sol",
						"file": "./ModuleRegistryInterface.sol",
						"scope": 2312,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 2278,
					"name": "ImportDirective",
					"src": "26:39:25"
				},
				{
					"attributes": {
						"contractDependencies": [
							2329
						],
						"contractKind": "contract",
						"documentation": null,
						"fullyImplemented": true,
						"linearizedBaseContracts": [
							2311,
							2329
						],
						"name": "ModuleRegistry",
						"scope": 2312
					},
					"children": [
						{
							"attributes": {
								"arguments": [
									null
								]
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "ModuleRegistryInterface",
										"referencedDeclaration": 2329,
										"type": "contract ModuleRegistryInterface"
									},
									"id": 2279,
									"name": "UserDefinedTypeName",
									"src": "113:23:25"
								}
							],
							"id": 2280,
							"name": "InheritanceSpecifier",
							"src": "113:23:25"
						},
						{
							"attributes": {
								"constant": false,
								"name": "modules",
								"scope": 2311,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "mapping(bytes32 => contract ProxyInterface)",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"type": "mapping(bytes32 => contract ProxyInterface)"
									},
									"children": [
										{
											"attributes": {
												"name": "bytes32",
												"type": "bytes32"
											},
											"id": 2281,
											"name": "ElementaryTypeName",
											"src": "153:7:25"
										},
										{
											"attributes": {
												"contractScope": null,
												"name": "ProxyInterface",
												"referencedDeclaration": 2275,
												"type": "contract ProxyInterface"
											},
											"id": 2282,
											"name": "UserDefinedTypeName",
											"src": "164:14:25"
										}
									],
									"id": 2283,
									"name": "Mapping",
									"src": "144:35:25"
								}
							],
							"id": 2284,
							"name": "VariableDeclaration",
							"src": "144:50:25"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "addModule",
								"payable": false,
								"scope": 2311,
								"stateMutability": "nonpayable",
								"superFunction": 2321,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "name",
												"scope": 2298,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bytes32",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bytes32",
														"type": "bytes32"
													},
													"id": 2285,
													"name": "ElementaryTypeName",
													"src": "351:7:25"
												}
											],
											"id": 2286,
											"name": "VariableDeclaration",
											"src": "351:12:25"
										},
										{
											"attributes": {
												"constant": false,
												"name": "module",
												"scope": 2298,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract ProxyInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "ProxyInterface",
														"referencedDeclaration": 2275,
														"type": "contract ProxyInterface"
													},
													"id": 2287,
													"name": "UserDefinedTypeName",
													"src": "365:14:25"
												}
											],
											"id": 2288,
											"name": "VariableDeclaration",
											"src": "365:21:25"
										}
									],
									"id": 2289,
									"name": "ParameterList",
									"src": "350:37:25"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2290,
									"name": "ParameterList",
									"src": "397:0:25"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "contract ProxyInterface"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"type": "contract ProxyInterface"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2284,
																		"type": "mapping(bytes32 => contract ProxyInterface)",
																		"value": "modules"
																	},
																	"id": 2291,
																	"name": "Identifier",
																	"src": "407:7:25"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2286,
																		"type": "bytes32",
																		"value": "name"
																	},
																	"id": 2292,
																	"name": "Identifier",
																	"src": "415:4:25"
																}
															],
															"id": 2293,
															"name": "IndexAccess",
															"src": "407:13:25"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2288,
																"type": "contract ProxyInterface",
																"value": "module"
															},
															"id": 2294,
															"name": "Identifier",
															"src": "423:6:25"
														}
													],
													"id": 2295,
													"name": "Assignment",
													"src": "407:22:25"
												}
											],
											"id": 2296,
											"name": "ExpressionStatement",
											"src": "407:22:25"
										}
									],
									"id": 2297,
									"name": "Block",
									"src": "397:39:25"
								}
							],
							"id": 2298,
							"name": "FunctionDefinition",
							"src": "332:104:25"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "getModule",
								"payable": false,
								"scope": 2311,
								"stateMutability": "view",
								"superFunction": 2328,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "name",
												"scope": 2310,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bytes32",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bytes32",
														"type": "bytes32"
													},
													"id": 2299,
													"name": "ElementaryTypeName",
													"src": "578:7:25"
												}
											],
											"id": 2300,
											"name": "VariableDeclaration",
											"src": "578:12:25"
										}
									],
									"id": 2301,
									"name": "ParameterList",
									"src": "577:14:25"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2310,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 2302,
													"name": "ElementaryTypeName",
													"src": "615:7:25"
												}
											],
											"id": 2303,
											"name": "VariableDeclaration",
											"src": "615:7:25"
										}
									],
									"id": 2304,
									"name": "ParameterList",
									"src": "614:9:25"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 2304
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"type": "contract ProxyInterface"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2284,
																"type": "mapping(bytes32 => contract ProxyInterface)",
																"value": "modules"
															},
															"id": 2305,
															"name": "Identifier",
															"src": "641:7:25"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2300,
																"type": "bytes32",
																"value": "name"
															},
															"id": 2306,
															"name": "Identifier",
															"src": "649:4:25"
														}
													],
													"id": 2307,
													"name": "IndexAccess",
													"src": "641:13:25"
												}
											],
											"id": 2308,
											"name": "Return",
											"src": "634:20:25"
										}
									],
									"id": 2309,
									"name": "Block",
									"src": "624:37:25"
								}
							],
							"id": 2310,
							"name": "FunctionDefinition",
							"src": "559:102:25"
						}
					],
					"id": 2311,
					"name": "ContractDefinition",
					"src": "86:577:25"
				}
			],
			"id": 2312,
			"name": "SourceUnit",
			"src": "0:664:25"
		},
		"compiler": {
			"name": "solc",
			"version": "0.4.18+commit.9cf6e910.Emscripten.clang"
		},
		"networks": {},
		"schemaVersion": "1.0.1",
		"updatedAt": "2018-01-18T17:45:14.654Z"
	},
	{
		"contractName": "Organization",
		"abi": [
			{
				"constant": false,
				"inputs": [
					{
						"name": "proposalAddress",
						"type": "address"
					}
				],
				"name": "propose",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "proposalManager",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "winningOption",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "addr",
						"type": "address"
					}
				],
				"name": "isOwner",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "electoralSystem",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "proposalId",
						"type": "uint256"
					}
				],
				"name": "unvote",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "configuration",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "votingPower",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "owner",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "proposalId",
						"type": "uint256"
					},
					{
						"name": "choice",
						"type": "uint256"
					}
				],
				"name": "vote",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "proposal",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "votingRights",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "quorumReached",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "newVotingRound",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "tally",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "newOwner",
						"type": "address"
					}
				],
				"name": "transferOwnership",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "modules",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "execute",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"name": "_configuration",
						"type": "address"
					},
					{
						"name": "_proposalManager",
						"type": "address"
					},
					{
						"name": "_modules",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"name": "id",
						"type": "uint256"
					},
					{
						"indexed": false,
						"name": "proposal",
						"type": "address"
					},
					{
						"indexed": true,
						"name": "creator",
						"type": "address"
					}
				],
				"name": "ProposalCreated",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "ProposalExecuted",
				"type": "event"
			}
		],
		"bytecode": "0x6060604052341561000f57600080fd5b60405160608061256c83398101604052808051906020019091908051906020019091908051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505061241a806101526000396000f3006060604052600436106100fc576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063012679511461010157806302f89be21461013a5780630dca7ed81461018f5780632f54bf6e146101c65780633db9fd801461021757806351ec42851461026c5780636c70bee91461028f57806377174f85146102e45780638da5cb5b14610339578063b384abef1461038e578063b759f954146103ba578063bf5cfcd4146103dd578063d4a8dd9814610432578063e12ab0941461046d578063ed8b6b3114610490578063f2fde38b146104b3578063f7e80e98146104ec578063fe0d94c114610541575b600080fd5b341561010c57600080fd5b610138600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610564565b005b341561014557600080fd5b61014d61091b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561019a57600080fd5b6101b06004808035906020019091905050610941565b6040518082815260200191505060405180910390f35b34156101d157600080fd5b6101fd600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b63565b604051808215151515815260200191505060405180910390f35b341561022257600080fd5b61022a610bbc565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561027757600080fd5b61028d6004808035906020019091905050610be2565b005b341561029a57600080fd5b6102a2610e64565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102ef57600080fd5b6102f7610e8a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561034457600080fd5b61034c610f65565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561039957600080fd5b6103b86004808035906020019091908035906020019091905050610f8a565b005b34156103c557600080fd5b6103db6004808035906020019091905050611600565b005b34156103e857600080fd5b6103f0611777565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561043d57600080fd5b6104536004808035906020019091905050611852565b604051808215151515815260200191505060405180910390f35b341561047857600080fd5b61048e6004808035906020019091905050611ba3565b005b341561049b57600080fd5b6104b16004808035906020019091905050611f68565b005b34156104be57600080fd5b6104ea600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506120bc565b005b34156104f757600080fd5b6104ff612113565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561054c57600080fd5b6105626004808035906020019091905050612139565b005b60008061056f611777565b73ffffffffffffffffffffffffffffffffffffffff166342b4632e336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561061157600080fd5b6102c65a03f1151561062257600080fd5b50505060405180519050151561063757600080fd5b819150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166352c28fab33856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b151561073357600080fd5b6102c65a03f1151561074457600080fd5b505050604051805190509050610758611777565b73ffffffffffffffffffffffffffffffffffffffff166328639905826000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b15156107ce57600080fd5b6102c65a03f115156107df57600080fd5b50505060405180519050151561089457600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b759f954826040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b151561087f57600080fd5b6102c65a03f1151561089057600080fd5b5050505b3373ffffffffffffffffffffffffffffffffffffffff167f7e5361edd70248cf0a9e88723fe06b63fa8cad3a111b246c13fe2be1c5318f458285604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a2505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632ad95786600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8856000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b1515610a1a57600080fd5b6102c65a03f11515610a2b57600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515610aa057600080fd5b6102c65a03f11515610ab157600080fd5b505050604051805190506000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515610b4157600080fd5b6102c65a03f11515610b5257600080fd5b505050604051805190509050919050565b60008173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050919050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8836000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b1515610c7d57600080fd5b6102c65a03f11515610c8e57600080fd5b5050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff16631bbef3996000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515610d0657600080fd5b6102c65a03f11515610d1757600080fd5b505050604051805190501515610d2c57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515610d9857600080fd5b6102c65a03f11515610da957600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663aed2377d336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b1515610e4c57600080fd5b6102c65a03f11515610e5d57600080fd5b5050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166385acd6416000604051602001526040518163ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180807f73747261746567790000000000000000000000000000000000000000000000008152506020019050602060405180830381600087803b1515610f4557600080fd5b6102c65a03f11515610f5657600080fd5b50505060405180519050905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637910867b856000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b151561102657600080fd5b6102c65a03f1151561103757600080fd5b50505060405180519050151561104c57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8856000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b15156110e557600080fd5b6102c65a03f115156110f657600080fd5b50505060405180519050915061110a611777565b73ffffffffffffffffffffffffffffffffffffffff16634873d68d33846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b15156111e057600080fd5b6102c65a03f115156111f157600080fd5b50505060405180519050151561120657600080fd5b8173ffffffffffffffffffffffffffffffffffffffff16631bbef3996000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561127257600080fd5b6102c65a03f1151561128357600080fd5b50505060405180519050151561129857600080fd5b8173ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561130457600080fd5b6102c65a03f1151561131557600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663b922f6fd846000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b151561139557600080fd5b6102c65a03f115156113a657600080fd5b5050506040518051905015156113bb57600080fd5b6113c3610e8a565b73ffffffffffffffffffffffffffffffffffffffff16630a01131233846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b151561149957600080fd5b6102c65a03f115156114aa57600080fd5b5050506040518051905090508173ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561152257600080fd5b6102c65a03f1151561153357600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff16632a4a1b733385846040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019350505050600060405180830381600087803b15156115e657600080fd5b6102c65a03f115156115f757600080fd5b50505050505050565b611608611777565b73ffffffffffffffffffffffffffffffffffffffff166374743444336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156116aa57600080fd5b6102c65a03f115156116bb57600080fd5b5050506040518051905015156116d057600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b759f954826040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b151561176057600080fd5b6102c65a03f1151561177157600080fd5b50505050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166385acd6416000604051602001526040518163ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180807f72696768747300000000000000000000000000000000000000000000000000008152506020019050602060405180830381600087803b151561183257600080fd5b6102c65a03f1151561184357600080fd5b50505060405180519050905090565b600080600080611860610e8a565b73ffffffffffffffffffffffffffffffffffffffff166313a2e7526000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156118cb57600080fd5b6102c65a03f115156118dc57600080fd5b505050604051805190509250600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8866000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b151561198157600080fd5b6102c65a03f1151561199257600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515611a0757600080fd5b6102c65a03f11515611a1857600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff16631703a0186000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515611a8d57600080fd5b6102c65a03f11515611a9e57600080fd5b505050604051805190509150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638eaa6ac06000604051602001526040518163ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180807f6d696e51756f72756d00000000000000000000000000000000000000000000008152506020019050602060405180830381600087803b1515611b6357600080fd5b6102c65a03f11515611b7457600080fd5b5050506040518051905090508083670de0b6b3a76400008402811515611b9657fe5b0410159350505050919050565b6000611bad6123c7565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8846000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b1515611c4657600080fd5b6102c65a03f11515611c5757600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515611ccc57600080fd5b6102c65a03f11515611cdd57600080fd5b505050604051805190509150600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166320b591f5836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515611dae57600080fd5b6102c65a03f11515611dbf57600080fd5b50505060405180519050151515611dd557600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b1bb22c9836000604051604001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019150506040805180830381600087803b1515611e9957600080fd5b6102c65a03f11515611eaa57600080fd5b5050506040518060400160405290508173ffffffffffffffffffffffffffffffffffffffff1663a2bbeb42826040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082600260200280838360005b83811015611f2c578082015181840152602081019050611f11565b50505050905001915050600060405180830381600087803b1515611f4f57600080fd5b6102c65a03f11515611f6057600080fd5b505050505050565b611f7181611852565b1515611f7c57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8826000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b151561201557600080fd5b6102c65a03f1151561202657600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663902cfb8861205483610941565b6040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b15156120a557600080fd5b6102c65a03f115156120b657600080fd5b50505050565b6120c533610b63565b15156120d057600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8836000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b15156121d457600080fd5b6102c65a03f115156121e557600080fd5b5050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff16635051a5ec6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561225d57600080fd5b6102c65a03f1151561226e57600080fd5b50505060405180519050151561228357600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166378b903376000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156122ef57600080fd5b6102c65a03f1151561230057600080fd5b50505060405180519050151561231557600080fd5b8073ffffffffffffffffffffffffffffffffffffffff1663614619546040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b151561237857600080fd5b6102c65a03f1151561238957600080fd5b5050507f712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f826040518082815260200191505060405180910390a15050565b60408051908101604052806002905b60008152602001906001900390816123d657905050905600a165627a7a723058209df624ca5e0d195b4579c42179d8046968d95bc120b03193db8714e2699cd9860029",
		"deployedBytecode": "0x6060604052600436106100fc576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063012679511461010157806302f89be21461013a5780630dca7ed81461018f5780632f54bf6e146101c65780633db9fd801461021757806351ec42851461026c5780636c70bee91461028f57806377174f85146102e45780638da5cb5b14610339578063b384abef1461038e578063b759f954146103ba578063bf5cfcd4146103dd578063d4a8dd9814610432578063e12ab0941461046d578063ed8b6b3114610490578063f2fde38b146104b3578063f7e80e98146104ec578063fe0d94c114610541575b600080fd5b341561010c57600080fd5b610138600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610564565b005b341561014557600080fd5b61014d61091b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561019a57600080fd5b6101b06004808035906020019091905050610941565b6040518082815260200191505060405180910390f35b34156101d157600080fd5b6101fd600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b63565b604051808215151515815260200191505060405180910390f35b341561022257600080fd5b61022a610bbc565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561027757600080fd5b61028d6004808035906020019091905050610be2565b005b341561029a57600080fd5b6102a2610e64565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102ef57600080fd5b6102f7610e8a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561034457600080fd5b61034c610f65565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561039957600080fd5b6103b86004808035906020019091908035906020019091905050610f8a565b005b34156103c557600080fd5b6103db6004808035906020019091905050611600565b005b34156103e857600080fd5b6103f0611777565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561043d57600080fd5b6104536004808035906020019091905050611852565b604051808215151515815260200191505060405180910390f35b341561047857600080fd5b61048e6004808035906020019091905050611ba3565b005b341561049b57600080fd5b6104b16004808035906020019091905050611f68565b005b34156104be57600080fd5b6104ea600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506120bc565b005b34156104f757600080fd5b6104ff612113565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561054c57600080fd5b6105626004808035906020019091905050612139565b005b60008061056f611777565b73ffffffffffffffffffffffffffffffffffffffff166342b4632e336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561061157600080fd5b6102c65a03f1151561062257600080fd5b50505060405180519050151561063757600080fd5b819150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166352c28fab33856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b151561073357600080fd5b6102c65a03f1151561074457600080fd5b505050604051805190509050610758611777565b73ffffffffffffffffffffffffffffffffffffffff166328639905826000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b15156107ce57600080fd5b6102c65a03f115156107df57600080fd5b50505060405180519050151561089457600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b759f954826040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b151561087f57600080fd5b6102c65a03f1151561089057600080fd5b5050505b3373ffffffffffffffffffffffffffffffffffffffff167f7e5361edd70248cf0a9e88723fe06b63fa8cad3a111b246c13fe2be1c5318f458285604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a2505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632ad95786600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8856000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b1515610a1a57600080fd5b6102c65a03f11515610a2b57600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515610aa057600080fd5b6102c65a03f11515610ab157600080fd5b505050604051805190506000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515610b4157600080fd5b6102c65a03f11515610b5257600080fd5b505050604051805190509050919050565b60008173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050919050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8836000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b1515610c7d57600080fd5b6102c65a03f11515610c8e57600080fd5b5050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff16631bbef3996000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515610d0657600080fd5b6102c65a03f11515610d1757600080fd5b505050604051805190501515610d2c57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515610d9857600080fd5b6102c65a03f11515610da957600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663aed2377d336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b1515610e4c57600080fd5b6102c65a03f11515610e5d57600080fd5b5050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166385acd6416000604051602001526040518163ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180807f73747261746567790000000000000000000000000000000000000000000000008152506020019050602060405180830381600087803b1515610f4557600080fd5b6102c65a03f11515610f5657600080fd5b50505060405180519050905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637910867b856000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b151561102657600080fd5b6102c65a03f1151561103757600080fd5b50505060405180519050151561104c57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8856000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b15156110e557600080fd5b6102c65a03f115156110f657600080fd5b50505060405180519050915061110a611777565b73ffffffffffffffffffffffffffffffffffffffff16634873d68d33846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b15156111e057600080fd5b6102c65a03f115156111f157600080fd5b50505060405180519050151561120657600080fd5b8173ffffffffffffffffffffffffffffffffffffffff16631bbef3996000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561127257600080fd5b6102c65a03f1151561128357600080fd5b50505060405180519050151561129857600080fd5b8173ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561130457600080fd5b6102c65a03f1151561131557600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663b922f6fd846000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b151561139557600080fd5b6102c65a03f115156113a657600080fd5b5050506040518051905015156113bb57600080fd5b6113c3610e8a565b73ffffffffffffffffffffffffffffffffffffffff16630a01131233846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b151561149957600080fd5b6102c65a03f115156114aa57600080fd5b5050506040518051905090508173ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561152257600080fd5b6102c65a03f1151561153357600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff16632a4a1b733385846040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019350505050600060405180830381600087803b15156115e657600080fd5b6102c65a03f115156115f757600080fd5b50505050505050565b611608611777565b73ffffffffffffffffffffffffffffffffffffffff166374743444336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156116aa57600080fd5b6102c65a03f115156116bb57600080fd5b5050506040518051905015156116d057600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b759f954826040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b151561176057600080fd5b6102c65a03f1151561177157600080fd5b50505050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166385acd6416000604051602001526040518163ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180807f72696768747300000000000000000000000000000000000000000000000000008152506020019050602060405180830381600087803b151561183257600080fd5b6102c65a03f1151561184357600080fd5b50505060405180519050905090565b600080600080611860610e8a565b73ffffffffffffffffffffffffffffffffffffffff166313a2e7526000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156118cb57600080fd5b6102c65a03f115156118dc57600080fd5b505050604051805190509250600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8866000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b151561198157600080fd5b6102c65a03f1151561199257600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515611a0757600080fd5b6102c65a03f11515611a1857600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff16631703a0186000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515611a8d57600080fd5b6102c65a03f11515611a9e57600080fd5b505050604051805190509150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638eaa6ac06000604051602001526040518163ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180807f6d696e51756f72756d00000000000000000000000000000000000000000000008152506020019050602060405180830381600087803b1515611b6357600080fd5b6102c65a03f11515611b7457600080fd5b5050506040518051905090508083670de0b6b3a76400008402811515611b9657fe5b0410159350505050919050565b6000611bad6123c7565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8846000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b1515611c4657600080fd5b6102c65a03f11515611c5757600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663ac3910a26000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515611ccc57600080fd5b6102c65a03f11515611cdd57600080fd5b505050604051805190509150600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166320b591f5836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515611dae57600080fd5b6102c65a03f11515611dbf57600080fd5b50505060405180519050151515611dd557600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b1bb22c9836000604051604001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019150506040805180830381600087803b1515611e9957600080fd5b6102c65a03f11515611eaa57600080fd5b5050506040518060400160405290508173ffffffffffffffffffffffffffffffffffffffff1663a2bbeb42826040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082600260200280838360005b83811015611f2c578082015181840152602081019050611f11565b50505050905001915050600060405180830381600087803b1515611f4f57600080fd5b6102c65a03f11515611f6057600080fd5b505050505050565b611f7181611852565b1515611f7c57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8826000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b151561201557600080fd5b6102c65a03f1151561202657600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1663902cfb8861205483610941565b6040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b15156120a557600080fd5b6102c65a03f115156120b657600080fd5b50505050565b6120c533610b63565b15156120d057600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c7f758a8836000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b15156121d457600080fd5b6102c65a03f115156121e557600080fd5b5050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff16635051a5ec6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561225d57600080fd5b6102c65a03f1151561226e57600080fd5b50505060405180519050151561228357600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166378b903376000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156122ef57600080fd5b6102c65a03f1151561230057600080fd5b50505060405180519050151561231557600080fd5b8073ffffffffffffffffffffffffffffffffffffffff1663614619546040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b151561237857600080fd5b6102c65a03f1151561238957600080fd5b5050507f712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f826040518082815260200191505060405180910390a15050565b60408051908101604052806002905b60008152602001906001900390816123d657905050905600a165627a7a723058209df624ca5e0d195b4579c42179d8046968d95bc120b03193db8714e2699cd9860029",
		"sourceMap": "430:4943:12:-;;;855:302;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;202:10:15;194:5;;:18;;;;;;;;;;;;;;;;;;1064:14:12;1048:13;;:30;;;;;;;;;;;;;;;;;;1106:16;1088:15;;:34;;;;;;;;;;;;;;;;;;1142:8;1132:7;;:18;;;;;;;;;;;;;;;;;;855:302;;;430:4943;;;;;;",
		"deployedSourceMap": "430:4943:12:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2650:497;;;;;;;;;;;;;;;;;;;;;;;;;;;;631:47;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4910:166;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;326:95:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;684:47:12;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1924:232;;;;;;;;;;;;;;;;;;;;;;;;;;538:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5230:141;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;50:20:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1302:510:12;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2258:147;;;;;;;;;;;;;;;;;;;;;;;;;;5082:142;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4408:350;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3634:311;;;;;;;;;;;;;;;;;;;;;;;;;;4056:172;;;;;;;;;;;;;;;;;;;;;;;;;;225:95:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;587:38:12;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3253:272;;;;;;;;;;;;;;;;;;;;;;;;;;2650:497;2852:26;2919:7;2719:14;:12;:14::i;:::-;:25;;;2745:10;2719:37;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2711:46;;;;;;;;2899:8;2852:56;;2929:15;;;;;;;;;;;:19;;;2949:10;2961:15;2929:48;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2919:58;;2993:14;:12;:14::i;:::-;:31;;;3025:2;2993:35;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2992:36;2988:94;;;3044:15;;;;;;;;;;;:23;;;3068:2;3044:27;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2988:94;3129:10;3092:48;;;3108:2;3112:15;3092:48;;;;;;;;;;;;;;;;;;;;;;;;;;;;2650:497;;;:::o;631:47::-;;;;;;;;;;;;;:::o;4910:166::-;4963:4;4986:15;;;;;;;;;;;:22;;;5027:15;;;;;;;;;;;:27;;;5055:2;5027:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5009:57;;;:59;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4986:83;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4979:90;;4910:166;;;:::o;326:95:15:-;378:4;410;401:13;;:5;;;;;;;;;;;:13;;;394:20;;326:95;;;:::o;684:47:12:-;;;;;;;;;;;;;:::o;1924:232::-;1976:26;2023:15;;;;;;;;;;;:27;;;2051:10;2023:39;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1976:87;;2082:8;:17;;;:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2074:28;;;;;;;;2113:8;:15;;;:17;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:24;;;2138:10;2113:36;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1924:232;;:::o;538:43::-;;;;;;;;;;;;;:::o;5230:141::-;5274:20;5334:7;;;;;;;;;;;:17;;;:29;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5306:58;;5230:141;:::o;50:20:15:-;;;;;;;;;;;;;:::o;1302:510:12:-;1423:26;1681:11;1373:15;;;;;;;;;;;:26;;;1400:10;1373:38;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1365:47;;;;;;;;1470:15;;;;;;;;;;;:27;;;1498:10;1470:39;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1423:87;;1529:14;:12;:14::i;:::-;:22;;;1552:10;1564:8;1529:44;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1521:53;;;;;;;;1592:8;:17;;;:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1584:28;;;;;;;;1630:8;:15;;;:17;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:31;;;1662:6;1630:39;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1622:48;;;;;;;;1695:13;:11;:13::i;:::-;:28;;;1724:10;1736:8;1695:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1681:64;;1755:8;:15;;;:17;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:22;;;1778:10;1790:6;1798;1755:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1302:510;;;;:::o;2258:147::-;2317:14;:12;:14::i;:::-;:25;;;2343:10;2317:37;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2309:46;;;;;;;;2365:15;;;;;;;;;;;:23;;;2389:8;2365:33;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2258:147;:::o;5082:142::-;5127:21;5189:7;;;;;;;;;;;:17;;;:27;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5160:57;;5082:142;:::o;4408:350::-;4461:4;4477:14;4533:11;4625:18;4494:13;:11;:13::i;:::-;:27;;;:29;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4477:46;;4565:15;;;;;;;;;;;:27;;;4593:2;4565:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4547:57;;;:59;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:66;;;:68;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4533:82;;4646:13;;;;;;;;;;;:17;;;:30;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4625:51;;4738:13;4724:9;525:6;4696;:24;4695:38;;;;;;;;4694:57;;4687:64;;4408:350;;;;;;:::o;3634:311::-;3686:22;3835:25;;:::i;:::-;3729:15;;;;;;;;;;;:27;;;3757:2;3729:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3711:57;;;:59;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3686:84;;3790:15;;;;;;;;;;;:25;;;3816:6;3790:33;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3789:34;3781:43;;;;;;;;3863:15;;;;;;;;;;;:29;;;3893:6;3863:37;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3835:65;;3910:6;:16;;;3927:10;3910:28;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3634:311:12;;;:::o;4056:172::-;4107:17;4121:2;4107:13;:17::i;:::-;4099:26;;;;;;;;4153:15;;;;;;;;;;;:27;;;4181:2;4153:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4135:67;;;4203:17;4217:2;4203:13;:17::i;:::-;4135:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4056:172;:::o;225:95:15:-;114:19;122:10;114:7;:19::i;:::-;106:28;;;;;;;;305:8;297:5;;:16;;;;;;;;;;;;;;;;;;225:95;:::o;587:38:12:-;;;;;;;;;;;;;:::o;3253:272::-;3298:26;3345:15;;;;;;;;;;;:27;;;3373:2;3345:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3298:79;;3396:8;:19;;;:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3388:30;;;;;;;;3436:8;:19;;;:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3428:30;;;;;;;;3469:8;:16;;;:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3498:20;3515:2;3498:20;;;;;;;;;;;;;;;;;;3253:272;;:::o;430:4943::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
		"source": "pragma solidity ^0.4.18;\n\nimport \"./Ownership/Ownable.sol\";\nimport \"./ConfigurationInterface.sol\";\nimport \"./OrganizationInterface.sol\";\nimport \"./Proposals/ProposalInterface.sol\";\nimport \"./Voting/VotingPowerInterface.sol\";\nimport \"./Voting/VotingRightsInterface.sol\";\nimport \"./Registries/ModuleRegistryInterface.sol\";\nimport \"./ElectoralSystems/ElectoralSystemInterface.sol\";\nimport \"./Managers/ProposalManagerInterface.sol\";\n\ncontract Organization is OrganizationInterface, Ownable {\n\n    uint constant PERCENTAGE_BASE = 10**18;\n\n    ConfigurationInterface public configuration;\n    ModuleRegistryInterface public modules;\n    ProposalManagerInterface public proposalManager;\n    ElectoralSystemInterface public electoralSystem;\n\n    event ProposalCreated(uint id, address proposal, address indexed creator);\n    event ProposalExecuted(uint id);\n\n    function Organization(\n        ConfigurationInterface _configuration,\n        ProposalManagerInterface _proposalManager,\n        ModuleRegistryInterface _modules\n    )\n    public\n    {\n        configuration = _configuration;\n        proposalManager = _proposalManager;\n        modules = _modules;\n    }\n\n    /// @dev Votes on a proposal.\n    /// @param proposalId ID of the proposal to vote on.\n    /// @param choice Option selected for vote.\n    function vote(uint proposalId, uint choice) external {\n        require(proposalManager.isApproved(proposalId));\n\n        ProposalInterface proposal = ProposalInterface(proposalManager.getProposal(proposalId));\n\n        require(votingRights().canVote(msg.sender, proposal));\n        require(proposal.isVoting());\n        require(proposal.ballot().isValidChoice(choice));\n\n        uint weight = votingPower().votingWeightOf(msg.sender, proposal);\n        proposal.ballot().vote(msg.sender, choice, weight);\n    }\n\n    /// @dev Reverses a vote on a proposal.\n    /// @param proposalId ID of the proposal to undo vote on.\n    function unvote(uint proposalId) external {\n        ProposalInterface proposal = ProposalInterface(proposalManager.getProposal(proposalId));\n\n        require(proposal.isVoting());\n\n        proposal.ballot().unvote(msg.sender);\n    }\n\n    /// @dev Approves a proposal.\n    /// @param proposal ID of the proposal we want to approve\n    function approve(uint proposal) external {\n        require(votingRights().canApprove(msg.sender));\n        proposalManager.approve(proposal);\n    }\n\n    // @todo move off chain\n    // @todo this isn't smart, proposal contract should be created here. Pass Ballot, Executor etc.\n    /// @dev Creates a new proposal and stores it.\n    /// @param proposalAddress Address of the new proposal.\n    function propose(address proposalAddress) external {\n        require(votingRights().canPropose(msg.sender));\n\n        // @todo we will need to hash the code to see if it matches the stored hash\n        ProposalInterface proposal = ProposalInterface(proposal);\n\n        uint id = proposalManager.add(msg.sender, proposalAddress);\n\n        if (!votingRights().requiresApproval(id)) {\n            proposalManager.approve(id);\n        }\n\n        ProposalCreated(id, proposalAddress, msg.sender);\n    }\n\n    /// @dev Executes a proposal if it has passed.\n    /// @param id ID of the proposal to execute.\n    function execute(uint id) external {\n        ProposalInterface proposal = ProposalInterface(proposalManager.getProposal(id));\n\n        require(proposal.isAccepted());\n        require(proposal.canExecute());\n\n        proposal.execute();\n\n        ProposalExecuted(id);\n    }\n\n    /// @dev Creates a new voting round if now winner was found.\n    /// @param id ID of the proposal.\n    function newVotingRound(uint id) external {\n        BallotInterface ballot = ProposalInterface(proposalManager.getProposal(id)).ballot();\n\n        require(!electoralSystem.hasWinner(ballot));\n\n        uint[2] memory candidates = electoralSystem.topCandidates(ballot);\n        ballot.nextRound(candidates);\n    }\n\n    /// @dev Tallies votes and submits count to proposal.\n    /// @param id Id of the proposal to tally.\n    function tally(uint id) external {\n        require(quorumReached(id));\n        ProposalInterface(proposalManager.getProposal(id)).setWinningOption(winningOption(id));\n    }\n\n    /// @dev Validates if the reached quorum is greater than or equal to the maximum.\n    /// @param id Id of the proposal.\n    /// @return true/false if quorum was reached.\n    function quorumReached(uint id) public view returns (bool) {\n        uint maxQuorum = votingPower().maximumQuorum();\n        uint quorum = ProposalInterface(proposalManager.getProposal(id)).ballot().quorum();\n        uint minimumQuorum = configuration.get(\"minQuorum\");\n\n        return ((quorum * PERCENTAGE_BASE) / maxQuorum) >= minimumQuorum;\n    }\n\n    /// @dev Selects the winning option using the electoral system.\n    /// @param id Id of the proposal\n    /// @return id of the winning option\n    function winningOption(uint id) public view returns (uint) {\n        return electoralSystem.winner(ProposalInterface(proposalManager.getProposal(id)).ballot());\n    }\n\n    function votingRights() public view returns (VotingRightsInterface) {\n        return VotingRightsInterface(modules.getModule(\"rights\"));\n    }\n\n    function votingPower() public view returns (VotingPowerInterface) {\n        return VotingPowerInterface(modules.getModule(\"strategy\"));\n    }\n}\n",
		"sourcePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Organization.sol",
		"ast": {
			"attributes": {
				"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Organization.sol",
				"exportedSymbols": {
					"Organization": [
						1176
					]
				}
			},
			"children": [
				{
					"attributes": {
						"literals": [
							"solidity",
							"^",
							"0.4",
							".18"
						]
					},
					"id": 751,
					"name": "PragmaDirective",
					"src": "0:24:12"
				},
				{
					"attributes": {
						"SourceUnit": 1347,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Ownership/Ownable.sol",
						"file": "./Ownership/Ownable.sol",
						"scope": 1177,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 752,
					"name": "ImportDirective",
					"src": "26:33:12"
				},
				{
					"attributes": {
						"SourceUnit": 121,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/ConfigurationInterface.sol",
						"file": "./ConfigurationInterface.sol",
						"scope": 1177,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 753,
					"name": "ImportDirective",
					"src": "60:38:12"
				},
				{
					"attributes": {
						"SourceUnit": 1232,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/OrganizationInterface.sol",
						"file": "./OrganizationInterface.sol",
						"scope": 1177,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 754,
					"name": "ImportDirective",
					"src": "99:37:12"
				},
				{
					"attributes": {
						"SourceUnit": 2194,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Proposals/ProposalInterface.sol",
						"file": "./Proposals/ProposalInterface.sol",
						"scope": 1177,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 755,
					"name": "ImportDirective",
					"src": "137:43:12"
				},
				{
					"attributes": {
						"SourceUnit": 2668,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Voting/VotingPowerInterface.sol",
						"file": "./Voting/VotingPowerInterface.sol",
						"scope": 1177,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 756,
					"name": "ImportDirective",
					"src": "181:43:12"
				},
				{
					"attributes": {
						"SourceUnit": 2702,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Voting/VotingRightsInterface.sol",
						"file": "./Voting/VotingRightsInterface.sol",
						"scope": 1177,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 757,
					"name": "ImportDirective",
					"src": "225:44:12"
				},
				{
					"attributes": {
						"SourceUnit": 2330,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Registries/ModuleRegistryInterface.sol",
						"file": "./Registries/ModuleRegistryInterface.sol",
						"scope": 1177,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 758,
					"name": "ImportDirective",
					"src": "270:50:12"
				},
				{
					"attributes": {
						"SourceUnit": 212,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/ElectoralSystems/ElectoralSystemInterface.sol",
						"file": "./ElectoralSystems/ElectoralSystemInterface.sol",
						"scope": 1177,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 759,
					"name": "ImportDirective",
					"src": "321:57:12"
				},
				{
					"attributes": {
						"SourceUnit": 693,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Managers/ProposalManagerInterface.sol",
						"file": "./Managers/ProposalManagerInterface.sol",
						"scope": 1177,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 760,
					"name": "ImportDirective",
					"src": "379:49:12"
				},
				{
					"attributes": {
						"contractDependencies": [
							1231,
							1346
						],
						"contractKind": "contract",
						"documentation": null,
						"fullyImplemented": true,
						"linearizedBaseContracts": [
							1176,
							1346,
							1231
						],
						"name": "Organization",
						"scope": 1177
					},
					"children": [
						{
							"attributes": {
								"arguments": [
									null
								]
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "OrganizationInterface",
										"referencedDeclaration": 1231,
										"type": "contract OrganizationInterface"
									},
									"id": 761,
									"name": "UserDefinedTypeName",
									"src": "455:21:12"
								}
							],
							"id": 762,
							"name": "InheritanceSpecifier",
							"src": "455:21:12"
						},
						{
							"attributes": {
								"arguments": [
									null
								]
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "Ownable",
										"referencedDeclaration": 1346,
										"type": "contract Ownable"
									},
									"id": 763,
									"name": "UserDefinedTypeName",
									"src": "478:7:12"
								}
							],
							"id": 764,
							"name": "InheritanceSpecifier",
							"src": "478:7:12"
						},
						{
							"attributes": {
								"constant": true,
								"name": "PERCENTAGE_BASE",
								"scope": 1176,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "uint256",
								"visibility": "internal"
							},
							"children": [
								{
									"attributes": {
										"name": "uint",
										"type": "uint256"
									},
									"id": 765,
									"name": "ElementaryTypeName",
									"src": "493:4:12"
								},
								{
									"attributes": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_rational_1000000000000000000_by_1",
											"typeString": "int_const 1000000000000000000"
										},
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"lValueRequested": false,
										"operator": "**",
										"type": "int_const 1000000000000000000"
									},
									"children": [
										{
											"attributes": {
												"argumentTypes": null,
												"hexvalue": "3130",
												"isConstant": false,
												"isLValue": false,
												"isPure": true,
												"lValueRequested": false,
												"subdenomination": null,
												"token": "number",
												"type": "int_const 10",
												"value": "10"
											},
											"id": 766,
											"name": "Literal",
											"src": "525:2:12"
										},
										{
											"attributes": {
												"argumentTypes": null,
												"hexvalue": "3138",
												"isConstant": false,
												"isLValue": false,
												"isPure": true,
												"lValueRequested": false,
												"subdenomination": null,
												"token": "number",
												"type": "int_const 18",
												"value": "18"
											},
											"id": 767,
											"name": "Literal",
											"src": "529:2:12"
										}
									],
									"id": 768,
									"name": "BinaryOperation",
									"src": "525:6:12"
								}
							],
							"id": 769,
							"name": "VariableDeclaration",
							"src": "493:38:12"
						},
						{
							"attributes": {
								"constant": false,
								"name": "configuration",
								"scope": 1176,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "contract ConfigurationInterface",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "ConfigurationInterface",
										"referencedDeclaration": 120,
										"type": "contract ConfigurationInterface"
									},
									"id": 770,
									"name": "UserDefinedTypeName",
									"src": "538:22:12"
								}
							],
							"id": 771,
							"name": "VariableDeclaration",
							"src": "538:43:12"
						},
						{
							"attributes": {
								"constant": false,
								"name": "modules",
								"scope": 1176,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "contract ModuleRegistryInterface",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "ModuleRegistryInterface",
										"referencedDeclaration": 2329,
										"type": "contract ModuleRegistryInterface"
									},
									"id": 772,
									"name": "UserDefinedTypeName",
									"src": "587:23:12"
								}
							],
							"id": 773,
							"name": "VariableDeclaration",
							"src": "587:38:12"
						},
						{
							"attributes": {
								"constant": false,
								"name": "proposalManager",
								"scope": 1176,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "contract ProposalManagerInterface",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "ProposalManagerInterface",
										"referencedDeclaration": 692,
										"type": "contract ProposalManagerInterface"
									},
									"id": 774,
									"name": "UserDefinedTypeName",
									"src": "631:24:12"
								}
							],
							"id": 775,
							"name": "VariableDeclaration",
							"src": "631:47:12"
						},
						{
							"attributes": {
								"constant": false,
								"name": "electoralSystem",
								"scope": 1176,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "contract ElectoralSystemInterface",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "ElectoralSystemInterface",
										"referencedDeclaration": 211,
										"type": "contract ElectoralSystemInterface"
									},
									"id": 776,
									"name": "UserDefinedTypeName",
									"src": "684:24:12"
								}
							],
							"id": 777,
							"name": "VariableDeclaration",
							"src": "684:47:12"
						},
						{
							"attributes": {
								"anonymous": false,
								"name": "ProposalCreated"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"indexed": false,
												"name": "id",
												"scope": 785,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 778,
													"name": "ElementaryTypeName",
													"src": "760:4:12"
												}
											],
											"id": 779,
											"name": "VariableDeclaration",
											"src": "760:7:12"
										},
										{
											"attributes": {
												"constant": false,
												"indexed": false,
												"name": "proposal",
												"scope": 785,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 780,
													"name": "ElementaryTypeName",
													"src": "769:7:12"
												}
											],
											"id": 781,
											"name": "VariableDeclaration",
											"src": "769:16:12"
										},
										{
											"attributes": {
												"constant": false,
												"indexed": true,
												"name": "creator",
												"scope": 785,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 782,
													"name": "ElementaryTypeName",
													"src": "787:7:12"
												}
											],
											"id": 783,
											"name": "VariableDeclaration",
											"src": "787:23:12"
										}
									],
									"id": 784,
									"name": "ParameterList",
									"src": "759:52:12"
								}
							],
							"id": 785,
							"name": "EventDefinition",
							"src": "738:74:12"
						},
						{
							"attributes": {
								"anonymous": false,
								"name": "ProposalExecuted"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"indexed": false,
												"name": "id",
												"scope": 789,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 786,
													"name": "ElementaryTypeName",
													"src": "840:4:12"
												}
											],
											"id": 787,
											"name": "VariableDeclaration",
											"src": "840:7:12"
										}
									],
									"id": 788,
									"name": "ParameterList",
									"src": "839:9:12"
								}
							],
							"id": 789,
							"name": "EventDefinition",
							"src": "817:32:12"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": true,
								"modifiers": [
									null
								],
								"name": "Organization",
								"payable": false,
								"scope": 1176,
								"stateMutability": "nonpayable",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "_configuration",
												"scope": 811,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract ConfigurationInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "ConfigurationInterface",
														"referencedDeclaration": 120,
														"type": "contract ConfigurationInterface"
													},
													"id": 790,
													"name": "UserDefinedTypeName",
													"src": "886:22:12"
												}
											],
											"id": 791,
											"name": "VariableDeclaration",
											"src": "886:37:12"
										},
										{
											"attributes": {
												"constant": false,
												"name": "_proposalManager",
												"scope": 811,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract ProposalManagerInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "ProposalManagerInterface",
														"referencedDeclaration": 692,
														"type": "contract ProposalManagerInterface"
													},
													"id": 792,
													"name": "UserDefinedTypeName",
													"src": "933:24:12"
												}
											],
											"id": 793,
											"name": "VariableDeclaration",
											"src": "933:41:12"
										},
										{
											"attributes": {
												"constant": false,
												"name": "_modules",
												"scope": 811,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract ModuleRegistryInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "ModuleRegistryInterface",
														"referencedDeclaration": 2329,
														"type": "contract ModuleRegistryInterface"
													},
													"id": 794,
													"name": "UserDefinedTypeName",
													"src": "984:23:12"
												}
											],
											"id": 795,
											"name": "VariableDeclaration",
											"src": "984:32:12"
										}
									],
									"id": 796,
									"name": "ParameterList",
									"src": "876:146:12"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 797,
									"name": "ParameterList",
									"src": "1038:0:12"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "contract ConfigurationInterface"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 771,
																"type": "contract ConfigurationInterface",
																"value": "configuration"
															},
															"id": 798,
															"name": "Identifier",
															"src": "1048:13:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 791,
																"type": "contract ConfigurationInterface",
																"value": "_configuration"
															},
															"id": 799,
															"name": "Identifier",
															"src": "1064:14:12"
														}
													],
													"id": 800,
													"name": "Assignment",
													"src": "1048:30:12"
												}
											],
											"id": 801,
											"name": "ExpressionStatement",
											"src": "1048:30:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "contract ProposalManagerInterface"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 775,
																"type": "contract ProposalManagerInterface",
																"value": "proposalManager"
															},
															"id": 802,
															"name": "Identifier",
															"src": "1088:15:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 793,
																"type": "contract ProposalManagerInterface",
																"value": "_proposalManager"
															},
															"id": 803,
															"name": "Identifier",
															"src": "1106:16:12"
														}
													],
													"id": 804,
													"name": "Assignment",
													"src": "1088:34:12"
												}
											],
											"id": 805,
											"name": "ExpressionStatement",
											"src": "1088:34:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "contract ModuleRegistryInterface"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 773,
																"type": "contract ModuleRegistryInterface",
																"value": "modules"
															},
															"id": 806,
															"name": "Identifier",
															"src": "1132:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 795,
																"type": "contract ModuleRegistryInterface",
																"value": "_modules"
															},
															"id": 807,
															"name": "Identifier",
															"src": "1142:8:12"
														}
													],
													"id": 808,
													"name": "Assignment",
													"src": "1132:18:12"
												}
											],
											"id": 809,
											"name": "ExpressionStatement",
											"src": "1132:18:12"
										}
									],
									"id": 810,
									"name": "Block",
									"src": "1038:119:12"
								}
							],
							"id": 811,
							"name": "FunctionDefinition",
							"src": "855:302:12"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "vote",
								"payable": false,
								"scope": 1176,
								"stateMutability": "nonpayable",
								"superFunction": 1186,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "proposalId",
												"scope": 881,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 812,
													"name": "ElementaryTypeName",
													"src": "1316:4:12"
												}
											],
											"id": 813,
											"name": "VariableDeclaration",
											"src": "1316:15:12"
										},
										{
											"attributes": {
												"constant": false,
												"name": "choice",
												"scope": 881,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 814,
													"name": "ElementaryTypeName",
													"src": "1333:4:12"
												}
											],
											"id": 815,
											"name": "VariableDeclaration",
											"src": "1333:11:12"
										}
									],
									"id": 816,
									"name": "ParameterList",
									"src": "1315:30:12"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 817,
									"name": "ParameterList",
									"src": "1355:0:12"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 818,
															"name": "Identifier",
															"src": "1365:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "isApproved",
																		"referencedDeclaration": 684,
																		"type": "function (uint256) view external returns (bool)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 775,
																				"type": "contract ProposalManagerInterface",
																				"value": "proposalManager"
																			},
																			"id": 819,
																			"name": "Identifier",
																			"src": "1373:15:12"
																		}
																	],
																	"id": 820,
																	"name": "MemberAccess",
																	"src": "1373:26:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 813,
																		"type": "uint256",
																		"value": "proposalId"
																	},
																	"id": 821,
																	"name": "Identifier",
																	"src": "1400:10:12"
																}
															],
															"id": 822,
															"name": "FunctionCall",
															"src": "1373:38:12"
														}
													],
													"id": 823,
													"name": "FunctionCall",
													"src": "1365:47:12"
												}
											],
											"id": 824,
											"name": "ExpressionStatement",
											"src": "1365:47:12"
										},
										{
											"attributes": {
												"assignments": [
													826
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "proposal",
														"scope": 881,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "contract ProposalInterface",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"contractScope": null,
																"name": "ProposalInterface",
																"referencedDeclaration": 2193,
																"type": "contract ProposalInterface"
															},
															"id": 825,
															"name": "UserDefinedTypeName",
															"src": "1423:17:12"
														}
													],
													"id": 826,
													"name": "VariableDeclaration",
													"src": "1423:26:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "contract ProposalInterface",
														"type_conversion": true
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2193,
																"type": "type(contract ProposalInterface)",
																"value": "ProposalInterface"
															},
															"id": 827,
															"name": "Identifier",
															"src": "1452:17:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "address",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "getProposal",
																		"referencedDeclaration": 691,
																		"type": "function (uint256) view external returns (address)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 775,
																				"type": "contract ProposalManagerInterface",
																				"value": "proposalManager"
																			},
																			"id": 828,
																			"name": "Identifier",
																			"src": "1470:15:12"
																		}
																	],
																	"id": 829,
																	"name": "MemberAccess",
																	"src": "1470:27:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 813,
																		"type": "uint256",
																		"value": "proposalId"
																	},
																	"id": 830,
																	"name": "Identifier",
																	"src": "1498:10:12"
																}
															],
															"id": 831,
															"name": "FunctionCall",
															"src": "1470:39:12"
														}
													],
													"id": 832,
													"name": "FunctionCall",
													"src": "1452:58:12"
												}
											],
											"id": 833,
											"name": "VariableDeclarationStatement",
											"src": "1423:87:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 834,
															"name": "Identifier",
															"src": "1521:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_address",
																				"typeString": "address"
																			},
																			{
																				"typeIdentifier": "t_contract$_ProposalInterface_$2193",
																				"typeString": "contract ProposalInterface"
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "canVote",
																		"referencedDeclaration": 2679,
																		"type": "function (address,contract ProposalInterface) view external returns (bool)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"arguments": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "contract VotingRightsInterface",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							null
																						],
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1162,
																						"type": "function () view returns (contract VotingRightsInterface)",
																						"value": "votingRights"
																					},
																					"id": 835,
																					"name": "Identifier",
																					"src": "1529:12:12"
																				}
																			],
																			"id": 836,
																			"name": "FunctionCall",
																			"src": "1529:14:12"
																		}
																	],
																	"id": 837,
																	"name": "MemberAccess",
																	"src": "1529:22:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "sender",
																		"referencedDeclaration": null,
																		"type": "address"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 2713,
																				"type": "msg",
																				"value": "msg"
																			},
																			"id": 838,
																			"name": "Identifier",
																			"src": "1552:3:12"
																		}
																	],
																	"id": 839,
																	"name": "MemberAccess",
																	"src": "1552:10:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 826,
																		"type": "contract ProposalInterface",
																		"value": "proposal"
																	},
																	"id": 840,
																	"name": "Identifier",
																	"src": "1564:8:12"
																}
															],
															"id": 841,
															"name": "FunctionCall",
															"src": "1529:44:12"
														}
													],
													"id": 842,
													"name": "FunctionCall",
													"src": "1521:53:12"
												}
											],
											"id": 843,
											"name": "ExpressionStatement",
											"src": "1521:53:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 844,
															"name": "Identifier",
															"src": "1584:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"arguments": [
																	null
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			null
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "isVoting",
																		"referencedDeclaration": 2157,
																		"type": "function () view external returns (bool)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 826,
																				"type": "contract ProposalInterface",
																				"value": "proposal"
																			},
																			"id": 845,
																			"name": "Identifier",
																			"src": "1592:8:12"
																		}
																	],
																	"id": 846,
																	"name": "MemberAccess",
																	"src": "1592:17:12"
																}
															],
															"id": 847,
															"name": "FunctionCall",
															"src": "1592:19:12"
														}
													],
													"id": 848,
													"name": "FunctionCall",
													"src": "1584:28:12"
												}
											],
											"id": 849,
											"name": "ExpressionStatement",
											"src": "1584:28:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 850,
															"name": "Identifier",
															"src": "1622:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "isValidChoice",
																		"referencedDeclaration": 1845,
																		"type": "function (uint256) view external returns (bool)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"arguments": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "contract BallotInterface",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							null
																						],
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "ballot",
																						"referencedDeclaration": 2167,
																						"type": "function () view external returns (contract BallotInterface)"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 826,
																								"type": "contract ProposalInterface",
																								"value": "proposal"
																							},
																							"id": 851,
																							"name": "Identifier",
																							"src": "1630:8:12"
																						}
																					],
																					"id": 852,
																					"name": "MemberAccess",
																					"src": "1630:15:12"
																				}
																			],
																			"id": 853,
																			"name": "FunctionCall",
																			"src": "1630:17:12"
																		}
																	],
																	"id": 854,
																	"name": "MemberAccess",
																	"src": "1630:31:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 815,
																		"type": "uint256",
																		"value": "choice"
																	},
																	"id": 855,
																	"name": "Identifier",
																	"src": "1662:6:12"
																}
															],
															"id": 856,
															"name": "FunctionCall",
															"src": "1630:39:12"
														}
													],
													"id": 857,
													"name": "FunctionCall",
													"src": "1622:48:12"
												}
											],
											"id": 858,
											"name": "ExpressionStatement",
											"src": "1622:48:12"
										},
										{
											"attributes": {
												"assignments": [
													860
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "weight",
														"scope": 881,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "uint256",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"name": "uint",
																"type": "uint256"
															},
															"id": 859,
															"name": "ElementaryTypeName",
															"src": "1681:4:12"
														}
													],
													"id": 860,
													"name": "VariableDeclaration",
													"src": "1681:11:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "uint256",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	},
																	{
																		"typeIdentifier": "t_contract$_ProposalInterface_$2193",
																		"typeString": "contract ProposalInterface"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "votingWeightOf",
																"referencedDeclaration": 2666,
																"type": "function (address,contract ProposalInterface) view external returns (uint256)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"arguments": [
																			null
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"isStructConstructorCall": false,
																		"lValueRequested": false,
																		"names": [
																			null
																		],
																		"type": "contract VotingPowerInterface",
																		"type_conversion": false
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": [
																					null
																				],
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1175,
																				"type": "function () view returns (contract VotingPowerInterface)",
																				"value": "votingPower"
																			},
																			"id": 861,
																			"name": "Identifier",
																			"src": "1695:11:12"
																		}
																	],
																	"id": 862,
																	"name": "FunctionCall",
																	"src": "1695:13:12"
																}
															],
															"id": 863,
															"name": "MemberAccess",
															"src": "1695:28:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "sender",
																"referencedDeclaration": null,
																"type": "address"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2713,
																		"type": "msg",
																		"value": "msg"
																	},
																	"id": 864,
																	"name": "Identifier",
																	"src": "1724:3:12"
																}
															],
															"id": 865,
															"name": "MemberAccess",
															"src": "1724:10:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 826,
																"type": "contract ProposalInterface",
																"value": "proposal"
															},
															"id": 866,
															"name": "Identifier",
															"src": "1736:8:12"
														}
													],
													"id": 867,
													"name": "FunctionCall",
													"src": "1695:50:12"
												}
											],
											"id": 868,
											"name": "VariableDeclarationStatement",
											"src": "1681:64:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	},
																	{
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	},
																	{
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "vote",
																"referencedDeclaration": 1805,
																"type": "function (address,uint256,uint256) external"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"arguments": [
																			null
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"isStructConstructorCall": false,
																		"lValueRequested": false,
																		"names": [
																			null
																		],
																		"type": "contract BallotInterface",
																		"type_conversion": false
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "ballot",
																				"referencedDeclaration": 2167,
																				"type": "function () view external returns (contract BallotInterface)"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 826,
																						"type": "contract ProposalInterface",
																						"value": "proposal"
																					},
																					"id": 869,
																					"name": "Identifier",
																					"src": "1755:8:12"
																				}
																			],
																			"id": 871,
																			"name": "MemberAccess",
																			"src": "1755:15:12"
																		}
																	],
																	"id": 872,
																	"name": "FunctionCall",
																	"src": "1755:17:12"
																}
															],
															"id": 873,
															"name": "MemberAccess",
															"src": "1755:22:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "sender",
																"referencedDeclaration": null,
																"type": "address"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2713,
																		"type": "msg",
																		"value": "msg"
																	},
																	"id": 874,
																	"name": "Identifier",
																	"src": "1778:3:12"
																}
															],
															"id": 875,
															"name": "MemberAccess",
															"src": "1778:10:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 815,
																"type": "uint256",
																"value": "choice"
															},
															"id": 876,
															"name": "Identifier",
															"src": "1790:6:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 860,
																"type": "uint256",
																"value": "weight"
															},
															"id": 877,
															"name": "Identifier",
															"src": "1798:6:12"
														}
													],
													"id": 878,
													"name": "FunctionCall",
													"src": "1755:50:12"
												}
											],
											"id": 879,
											"name": "ExpressionStatement",
											"src": "1755:50:12"
										}
									],
									"id": 880,
									"name": "Block",
									"src": "1355:457:12"
								}
							],
							"id": 881,
							"name": "FunctionDefinition",
							"src": "1302:510:12"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "unvote",
								"payable": false,
								"scope": 1176,
								"stateMutability": "nonpayable",
								"superFunction": 1191,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "proposalId",
												"scope": 911,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 882,
													"name": "ElementaryTypeName",
													"src": "1940:4:12"
												}
											],
											"id": 883,
											"name": "VariableDeclaration",
											"src": "1940:15:12"
										}
									],
									"id": 884,
									"name": "ParameterList",
									"src": "1939:17:12"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 885,
									"name": "ParameterList",
									"src": "1966:0:12"
								},
								{
									"children": [
										{
											"attributes": {
												"assignments": [
													887
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "proposal",
														"scope": 911,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "contract ProposalInterface",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"contractScope": null,
																"name": "ProposalInterface",
																"referencedDeclaration": 2193,
																"type": "contract ProposalInterface"
															},
															"id": 886,
															"name": "UserDefinedTypeName",
															"src": "1976:17:12"
														}
													],
													"id": 887,
													"name": "VariableDeclaration",
													"src": "1976:26:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "contract ProposalInterface",
														"type_conversion": true
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2193,
																"type": "type(contract ProposalInterface)",
																"value": "ProposalInterface"
															},
															"id": 888,
															"name": "Identifier",
															"src": "2005:17:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "address",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "getProposal",
																		"referencedDeclaration": 691,
																		"type": "function (uint256) view external returns (address)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 775,
																				"type": "contract ProposalManagerInterface",
																				"value": "proposalManager"
																			},
																			"id": 889,
																			"name": "Identifier",
																			"src": "2023:15:12"
																		}
																	],
																	"id": 890,
																	"name": "MemberAccess",
																	"src": "2023:27:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 883,
																		"type": "uint256",
																		"value": "proposalId"
																	},
																	"id": 891,
																	"name": "Identifier",
																	"src": "2051:10:12"
																}
															],
															"id": 892,
															"name": "FunctionCall",
															"src": "2023:39:12"
														}
													],
													"id": 893,
													"name": "FunctionCall",
													"src": "2005:58:12"
												}
											],
											"id": 894,
											"name": "VariableDeclarationStatement",
											"src": "1976:87:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 895,
															"name": "Identifier",
															"src": "2074:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"arguments": [
																	null
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			null
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "isVoting",
																		"referencedDeclaration": 2157,
																		"type": "function () view external returns (bool)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 887,
																				"type": "contract ProposalInterface",
																				"value": "proposal"
																			},
																			"id": 896,
																			"name": "Identifier",
																			"src": "2082:8:12"
																		}
																	],
																	"id": 897,
																	"name": "MemberAccess",
																	"src": "2082:17:12"
																}
															],
															"id": 898,
															"name": "FunctionCall",
															"src": "2082:19:12"
														}
													],
													"id": 899,
													"name": "FunctionCall",
													"src": "2074:28:12"
												}
											],
											"id": 900,
											"name": "ExpressionStatement",
											"src": "2074:28:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "unvote",
																"referencedDeclaration": 1810,
																"type": "function (address) external"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"arguments": [
																			null
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"isStructConstructorCall": false,
																		"lValueRequested": false,
																		"names": [
																			null
																		],
																		"type": "contract BallotInterface",
																		"type_conversion": false
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "ballot",
																				"referencedDeclaration": 2167,
																				"type": "function () view external returns (contract BallotInterface)"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 887,
																						"type": "contract ProposalInterface",
																						"value": "proposal"
																					},
																					"id": 901,
																					"name": "Identifier",
																					"src": "2113:8:12"
																				}
																			],
																			"id": 903,
																			"name": "MemberAccess",
																			"src": "2113:15:12"
																		}
																	],
																	"id": 904,
																	"name": "FunctionCall",
																	"src": "2113:17:12"
																}
															],
															"id": 905,
															"name": "MemberAccess",
															"src": "2113:24:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "sender",
																"referencedDeclaration": null,
																"type": "address"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2713,
																		"type": "msg",
																		"value": "msg"
																	},
																	"id": 906,
																	"name": "Identifier",
																	"src": "2138:3:12"
																}
															],
															"id": 907,
															"name": "MemberAccess",
															"src": "2138:10:12"
														}
													],
													"id": 908,
													"name": "FunctionCall",
													"src": "2113:36:12"
												}
											],
											"id": 909,
											"name": "ExpressionStatement",
											"src": "2113:36:12"
										}
									],
									"id": 910,
									"name": "Block",
									"src": "1966:190:12"
								}
							],
							"id": 911,
							"name": "FunctionDefinition",
							"src": "1924:232:12"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "approve",
								"payable": false,
								"scope": 1176,
								"stateMutability": "nonpayable",
								"superFunction": 1196,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "proposal",
												"scope": 932,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 912,
													"name": "ElementaryTypeName",
													"src": "2275:4:12"
												}
											],
											"id": 913,
											"name": "VariableDeclaration",
											"src": "2275:13:12"
										}
									],
									"id": 914,
									"name": "ParameterList",
									"src": "2274:15:12"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 915,
									"name": "ParameterList",
									"src": "2299:0:12"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 916,
															"name": "Identifier",
															"src": "2309:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_address",
																				"typeString": "address"
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "canApprove",
																		"referencedDeclaration": 2693,
																		"type": "function (address) view external returns (bool)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"arguments": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "contract VotingRightsInterface",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							null
																						],
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1162,
																						"type": "function () view returns (contract VotingRightsInterface)",
																						"value": "votingRights"
																					},
																					"id": 917,
																					"name": "Identifier",
																					"src": "2317:12:12"
																				}
																			],
																			"id": 918,
																			"name": "FunctionCall",
																			"src": "2317:14:12"
																		}
																	],
																	"id": 919,
																	"name": "MemberAccess",
																	"src": "2317:25:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "sender",
																		"referencedDeclaration": null,
																		"type": "address"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 2713,
																				"type": "msg",
																				"value": "msg"
																			},
																			"id": 920,
																			"name": "Identifier",
																			"src": "2343:3:12"
																		}
																	],
																	"id": 921,
																	"name": "MemberAccess",
																	"src": "2343:10:12"
																}
															],
															"id": 922,
															"name": "FunctionCall",
															"src": "2317:37:12"
														}
													],
													"id": 923,
													"name": "FunctionCall",
													"src": "2309:46:12"
												}
											],
											"id": 924,
											"name": "ExpressionStatement",
											"src": "2309:46:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "approve",
																"referencedDeclaration": 677,
																"type": "function (uint256) external"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 775,
																		"type": "contract ProposalManagerInterface",
																		"value": "proposalManager"
																	},
																	"id": 925,
																	"name": "Identifier",
																	"src": "2365:15:12"
																}
															],
															"id": 927,
															"name": "MemberAccess",
															"src": "2365:23:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 913,
																"type": "uint256",
																"value": "proposal"
															},
															"id": 928,
															"name": "Identifier",
															"src": "2389:8:12"
														}
													],
													"id": 929,
													"name": "FunctionCall",
													"src": "2365:33:12"
												}
											],
											"id": 930,
											"name": "ExpressionStatement",
											"src": "2365:33:12"
										}
									],
									"id": 931,
									"name": "Block",
									"src": "2299:106:12"
								}
							],
							"id": 932,
							"name": "FunctionDefinition",
							"src": "2258:147:12"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "propose",
								"payable": false,
								"scope": 1176,
								"stateMutability": "nonpayable",
								"superFunction": 1201,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "proposalAddress",
												"scope": 983,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 933,
													"name": "ElementaryTypeName",
													"src": "2667:7:12"
												}
											],
											"id": 934,
											"name": "VariableDeclaration",
											"src": "2667:23:12"
										}
									],
									"id": 935,
									"name": "ParameterList",
									"src": "2666:25:12"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 936,
									"name": "ParameterList",
									"src": "2701:0:12"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 937,
															"name": "Identifier",
															"src": "2711:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_address",
																				"typeString": "address"
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "canPropose",
																		"referencedDeclaration": 2686,
																		"type": "function (address) view external returns (bool)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"arguments": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "contract VotingRightsInterface",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							null
																						],
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1162,
																						"type": "function () view returns (contract VotingRightsInterface)",
																						"value": "votingRights"
																					},
																					"id": 938,
																					"name": "Identifier",
																					"src": "2719:12:12"
																				}
																			],
																			"id": 939,
																			"name": "FunctionCall",
																			"src": "2719:14:12"
																		}
																	],
																	"id": 940,
																	"name": "MemberAccess",
																	"src": "2719:25:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "sender",
																		"referencedDeclaration": null,
																		"type": "address"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 2713,
																				"type": "msg",
																				"value": "msg"
																			},
																			"id": 941,
																			"name": "Identifier",
																			"src": "2745:3:12"
																		}
																	],
																	"id": 942,
																	"name": "MemberAccess",
																	"src": "2745:10:12"
																}
															],
															"id": 943,
															"name": "FunctionCall",
															"src": "2719:37:12"
														}
													],
													"id": 944,
													"name": "FunctionCall",
													"src": "2711:46:12"
												}
											],
											"id": 945,
											"name": "ExpressionStatement",
											"src": "2711:46:12"
										},
										{
											"attributes": {
												"assignments": [
													947
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "proposal",
														"scope": 983,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "contract ProposalInterface",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"contractScope": null,
																"name": "ProposalInterface",
																"referencedDeclaration": 2193,
																"type": "contract ProposalInterface"
															},
															"id": 946,
															"name": "UserDefinedTypeName",
															"src": "2852:17:12"
														}
													],
													"id": 947,
													"name": "VariableDeclaration",
													"src": "2852:26:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "contract ProposalInterface",
														"type_conversion": true
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_contract$_ProposalInterface_$2193",
																		"typeString": "contract ProposalInterface"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2193,
																"type": "type(contract ProposalInterface)",
																"value": "ProposalInterface"
															},
															"id": 948,
															"name": "Identifier",
															"src": "2881:17:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 947,
																"type": "contract ProposalInterface",
																"value": "proposal"
															},
															"id": 949,
															"name": "Identifier",
															"src": "2899:8:12"
														}
													],
													"id": 950,
													"name": "FunctionCall",
													"src": "2881:27:12"
												}
											],
											"id": 951,
											"name": "VariableDeclarationStatement",
											"src": "2852:56:12"
										},
										{
											"attributes": {
												"assignments": [
													953
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "id",
														"scope": 983,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "uint256",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"name": "uint",
																"type": "uint256"
															},
															"id": 952,
															"name": "ElementaryTypeName",
															"src": "2919:4:12"
														}
													],
													"id": 953,
													"name": "VariableDeclaration",
													"src": "2919:7:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "uint256",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	},
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "add",
																"referencedDeclaration": 672,
																"type": "function (address,address) external returns (uint256)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 775,
																		"type": "contract ProposalManagerInterface",
																		"value": "proposalManager"
																	},
																	"id": 954,
																	"name": "Identifier",
																	"src": "2929:15:12"
																}
															],
															"id": 955,
															"name": "MemberAccess",
															"src": "2929:19:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "sender",
																"referencedDeclaration": null,
																"type": "address"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2713,
																		"type": "msg",
																		"value": "msg"
																	},
																	"id": 956,
																	"name": "Identifier",
																	"src": "2949:3:12"
																}
															],
															"id": 957,
															"name": "MemberAccess",
															"src": "2949:10:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 934,
																"type": "address",
																"value": "proposalAddress"
															},
															"id": 958,
															"name": "Identifier",
															"src": "2961:15:12"
														}
													],
													"id": 959,
													"name": "FunctionCall",
													"src": "2929:48:12"
												}
											],
											"id": 960,
											"name": "VariableDeclarationStatement",
											"src": "2919:58:12"
										},
										{
											"attributes": {
												"falseBody": null
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "!",
														"prefix": true,
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "requiresApproval",
																		"referencedDeclaration": 2700,
																		"type": "function (uint256) view external returns (bool)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"arguments": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "contract VotingRightsInterface",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							null
																						],
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1162,
																						"type": "function () view returns (contract VotingRightsInterface)",
																						"value": "votingRights"
																					},
																					"id": 961,
																					"name": "Identifier",
																					"src": "2993:12:12"
																				}
																			],
																			"id": 962,
																			"name": "FunctionCall",
																			"src": "2993:14:12"
																		}
																	],
																	"id": 963,
																	"name": "MemberAccess",
																	"src": "2993:31:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 953,
																		"type": "uint256",
																		"value": "id"
																	},
																	"id": 964,
																	"name": "Identifier",
																	"src": "3025:2:12"
																}
															],
															"id": 965,
															"name": "FunctionCall",
															"src": "2993:35:12"
														}
													],
													"id": 966,
													"name": "UnaryOperation",
													"src": "2992:36:12"
												},
												{
													"children": [
														{
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"isStructConstructorCall": false,
																		"lValueRequested": false,
																		"names": [
																			null
																		],
																		"type": "tuple()",
																		"type_conversion": false
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": [
																					{
																						"typeIdentifier": "t_uint256",
																						"typeString": "uint256"
																					}
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "approve",
																				"referencedDeclaration": 677,
																				"type": "function (uint256) external"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 775,
																						"type": "contract ProposalManagerInterface",
																						"value": "proposalManager"
																					},
																					"id": 967,
																					"name": "Identifier",
																					"src": "3044:15:12"
																				}
																			],
																			"id": 969,
																			"name": "MemberAccess",
																			"src": "3044:23:12"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 953,
																				"type": "uint256",
																				"value": "id"
																			},
																			"id": 970,
																			"name": "Identifier",
																			"src": "3068:2:12"
																		}
																	],
																	"id": 971,
																	"name": "FunctionCall",
																	"src": "3044:27:12"
																}
															],
															"id": 972,
															"name": "ExpressionStatement",
															"src": "3044:27:12"
														}
													],
													"id": 973,
													"name": "Block",
													"src": "3030:52:12"
												}
											],
											"id": 974,
											"name": "IfStatement",
											"src": "2988:94:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	},
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	},
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 785,
																"type": "function (uint256,address,address)",
																"value": "ProposalCreated"
															},
															"id": 975,
															"name": "Identifier",
															"src": "3092:15:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 953,
																"type": "uint256",
																"value": "id"
															},
															"id": 976,
															"name": "Identifier",
															"src": "3108:2:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 934,
																"type": "address",
																"value": "proposalAddress"
															},
															"id": 977,
															"name": "Identifier",
															"src": "3112:15:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "sender",
																"referencedDeclaration": null,
																"type": "address"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2713,
																		"type": "msg",
																		"value": "msg"
																	},
																	"id": 978,
																	"name": "Identifier",
																	"src": "3129:3:12"
																}
															],
															"id": 979,
															"name": "MemberAccess",
															"src": "3129:10:12"
														}
													],
													"id": 980,
													"name": "FunctionCall",
													"src": "3092:48:12"
												}
											],
											"id": 981,
											"name": "ExpressionStatement",
											"src": "3092:48:12"
										}
									],
									"id": 982,
									"name": "Block",
									"src": "2701:446:12"
								}
							],
							"id": 983,
							"name": "FunctionDefinition",
							"src": "2650:497:12"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "execute",
								"payable": false,
								"scope": 1176,
								"stateMutability": "nonpayable",
								"superFunction": 1206,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "id",
												"scope": 1019,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 984,
													"name": "ElementaryTypeName",
													"src": "3270:4:12"
												}
											],
											"id": 985,
											"name": "VariableDeclaration",
											"src": "3270:7:12"
										}
									],
									"id": 986,
									"name": "ParameterList",
									"src": "3269:9:12"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 987,
									"name": "ParameterList",
									"src": "3288:0:12"
								},
								{
									"children": [
										{
											"attributes": {
												"assignments": [
													989
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "proposal",
														"scope": 1019,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "contract ProposalInterface",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"contractScope": null,
																"name": "ProposalInterface",
																"referencedDeclaration": 2193,
																"type": "contract ProposalInterface"
															},
															"id": 988,
															"name": "UserDefinedTypeName",
															"src": "3298:17:12"
														}
													],
													"id": 989,
													"name": "VariableDeclaration",
													"src": "3298:26:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "contract ProposalInterface",
														"type_conversion": true
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2193,
																"type": "type(contract ProposalInterface)",
																"value": "ProposalInterface"
															},
															"id": 990,
															"name": "Identifier",
															"src": "3327:17:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "address",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "getProposal",
																		"referencedDeclaration": 691,
																		"type": "function (uint256) view external returns (address)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 775,
																				"type": "contract ProposalManagerInterface",
																				"value": "proposalManager"
																			},
																			"id": 991,
																			"name": "Identifier",
																			"src": "3345:15:12"
																		}
																	],
																	"id": 992,
																	"name": "MemberAccess",
																	"src": "3345:27:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 985,
																		"type": "uint256",
																		"value": "id"
																	},
																	"id": 993,
																	"name": "Identifier",
																	"src": "3373:2:12"
																}
															],
															"id": 994,
															"name": "FunctionCall",
															"src": "3345:31:12"
														}
													],
													"id": 995,
													"name": "FunctionCall",
													"src": "3327:50:12"
												}
											],
											"id": 996,
											"name": "VariableDeclarationStatement",
											"src": "3298:79:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 997,
															"name": "Identifier",
															"src": "3388:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"arguments": [
																	null
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			null
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "isAccepted",
																		"referencedDeclaration": 2177,
																		"type": "function () view external returns (bool)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 989,
																				"type": "contract ProposalInterface",
																				"value": "proposal"
																			},
																			"id": 998,
																			"name": "Identifier",
																			"src": "3396:8:12"
																		}
																	],
																	"id": 999,
																	"name": "MemberAccess",
																	"src": "3396:19:12"
																}
															],
															"id": 1000,
															"name": "FunctionCall",
															"src": "3396:21:12"
														}
													],
													"id": 1001,
													"name": "FunctionCall",
													"src": "3388:30:12"
												}
											],
											"id": 1002,
											"name": "ExpressionStatement",
											"src": "3388:30:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 1003,
															"name": "Identifier",
															"src": "3428:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"arguments": [
																	null
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			null
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "canExecute",
																		"referencedDeclaration": 2182,
																		"type": "function () view external returns (bool)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 989,
																				"type": "contract ProposalInterface",
																				"value": "proposal"
																			},
																			"id": 1004,
																			"name": "Identifier",
																			"src": "3436:8:12"
																		}
																	],
																	"id": 1005,
																	"name": "MemberAccess",
																	"src": "3436:19:12"
																}
															],
															"id": 1006,
															"name": "FunctionCall",
															"src": "3436:21:12"
														}
													],
													"id": 1007,
													"name": "FunctionCall",
													"src": "3428:30:12"
												}
											],
											"id": 1008,
											"name": "ExpressionStatement",
											"src": "3428:30:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"arguments": [
															null
														],
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	null
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "execute",
																"referencedDeclaration": 2147,
																"type": "function () external"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 989,
																		"type": "contract ProposalInterface",
																		"value": "proposal"
																	},
																	"id": 1009,
																	"name": "Identifier",
																	"src": "3469:8:12"
																}
															],
															"id": 1011,
															"name": "MemberAccess",
															"src": "3469:16:12"
														}
													],
													"id": 1012,
													"name": "FunctionCall",
													"src": "3469:18:12"
												}
											],
											"id": 1013,
											"name": "ExpressionStatement",
											"src": "3469:18:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 789,
																"type": "function (uint256)",
																"value": "ProposalExecuted"
															},
															"id": 1014,
															"name": "Identifier",
															"src": "3498:16:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 985,
																"type": "uint256",
																"value": "id"
															},
															"id": 1015,
															"name": "Identifier",
															"src": "3515:2:12"
														}
													],
													"id": 1016,
													"name": "FunctionCall",
													"src": "3498:20:12"
												}
											],
											"id": 1017,
											"name": "ExpressionStatement",
											"src": "3498:20:12"
										}
									],
									"id": 1018,
									"name": "Block",
									"src": "3288:237:12"
								}
							],
							"id": 1019,
							"name": "FunctionDefinition",
							"src": "3253:272:12"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "newVotingRound",
								"payable": false,
								"scope": 1176,
								"stateMutability": "nonpayable",
								"superFunction": 1211,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "id",
												"scope": 1060,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1020,
													"name": "ElementaryTypeName",
													"src": "3658:4:12"
												}
											],
											"id": 1021,
											"name": "VariableDeclaration",
											"src": "3658:7:12"
										}
									],
									"id": 1022,
									"name": "ParameterList",
									"src": "3657:9:12"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1023,
									"name": "ParameterList",
									"src": "3676:0:12"
								},
								{
									"children": [
										{
											"attributes": {
												"assignments": [
													1025
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "ballot",
														"scope": 1060,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "contract BallotInterface",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"contractScope": null,
																"name": "BallotInterface",
																"referencedDeclaration": 1870,
																"type": "contract BallotInterface"
															},
															"id": 1024,
															"name": "UserDefinedTypeName",
															"src": "3686:15:12"
														}
													],
													"id": 1025,
													"name": "VariableDeclaration",
													"src": "3686:22:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"arguments": [
															null
														],
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "contract BallotInterface",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	null
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "ballot",
																"referencedDeclaration": 2167,
																"type": "function () view external returns (contract BallotInterface)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"isStructConstructorCall": false,
																		"lValueRequested": false,
																		"names": [
																			null
																		],
																		"type": "contract ProposalInterface",
																		"type_conversion": true
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": [
																					{
																						"typeIdentifier": "t_address",
																						"typeString": "address"
																					}
																				],
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 2193,
																				"type": "type(contract ProposalInterface)",
																				"value": "ProposalInterface"
																			},
																			"id": 1026,
																			"name": "Identifier",
																			"src": "3711:17:12"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "address",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							{
																								"typeIdentifier": "t_uint256",
																								"typeString": "uint256"
																							}
																						],
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "getProposal",
																						"referencedDeclaration": 691,
																						"type": "function (uint256) view external returns (address)"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 775,
																								"type": "contract ProposalManagerInterface",
																								"value": "proposalManager"
																							},
																							"id": 1027,
																							"name": "Identifier",
																							"src": "3729:15:12"
																						}
																					],
																					"id": 1028,
																					"name": "MemberAccess",
																					"src": "3729:27:12"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1021,
																						"type": "uint256",
																						"value": "id"
																					},
																					"id": 1029,
																					"name": "Identifier",
																					"src": "3757:2:12"
																				}
																			],
																			"id": 1030,
																			"name": "FunctionCall",
																			"src": "3729:31:12"
																		}
																	],
																	"id": 1031,
																	"name": "FunctionCall",
																	"src": "3711:50:12"
																}
															],
															"id": 1032,
															"name": "MemberAccess",
															"src": "3711:57:12"
														}
													],
													"id": 1033,
													"name": "FunctionCall",
													"src": "3711:59:12"
												}
											],
											"id": 1034,
											"name": "VariableDeclarationStatement",
											"src": "3686:84:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 1035,
															"name": "Identifier",
															"src": "3781:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": "!",
																"prefix": true,
																"type": "bool"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"isStructConstructorCall": false,
																		"lValueRequested": false,
																		"names": [
																			null
																		],
																		"type": "bool",
																		"type_conversion": false
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": [
																					{
																						"typeIdentifier": "t_contract$_BallotInterface_$1870",
																						"typeString": "contract BallotInterface"
																					}
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "hasWinner",
																				"referencedDeclaration": 210,
																				"type": "function (contract BallotInterface) view external returns (bool)"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 777,
																						"type": "contract ElectoralSystemInterface",
																						"value": "electoralSystem"
																					},
																					"id": 1036,
																					"name": "Identifier",
																					"src": "3790:15:12"
																				}
																			],
																			"id": 1037,
																			"name": "MemberAccess",
																			"src": "3790:25:12"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1025,
																				"type": "contract BallotInterface",
																				"value": "ballot"
																			},
																			"id": 1038,
																			"name": "Identifier",
																			"src": "3816:6:12"
																		}
																	],
																	"id": 1039,
																	"name": "FunctionCall",
																	"src": "3790:33:12"
																}
															],
															"id": 1040,
															"name": "UnaryOperation",
															"src": "3789:34:12"
														}
													],
													"id": 1041,
													"name": "FunctionCall",
													"src": "3781:43:12"
												}
											],
											"id": 1042,
											"name": "ExpressionStatement",
											"src": "3781:43:12"
										},
										{
											"attributes": {
												"assignments": [
													1047
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "candidates",
														"scope": 1060,
														"stateVariable": false,
														"storageLocation": "memory",
														"type": "uint256[2] memory",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"type": "uint256[2] storage pointer"
															},
															"children": [
																{
																	"attributes": {
																		"name": "uint",
																		"type": "uint256"
																	},
																	"id": 1045,
																	"name": "ElementaryTypeName",
																	"src": "3835:4:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"hexvalue": "32",
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"subdenomination": null,
																		"token": "number",
																		"type": "int_const 2",
																		"value": "2"
																	},
																	"id": 1044,
																	"name": "Literal",
																	"src": "3840:1:12"
																}
															],
															"id": 1046,
															"name": "ArrayTypeName",
															"src": "3835:7:12"
														}
													],
													"id": 1047,
													"name": "VariableDeclaration",
													"src": "3835:25:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "uint256[2] memory",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_contract$_BallotInterface_$1870",
																		"typeString": "contract BallotInterface"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "topCandidates",
																"referencedDeclaration": 203,
																"type": "function (contract BallotInterface) view external returns (uint256[2] memory)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 777,
																		"type": "contract ElectoralSystemInterface",
																		"value": "electoralSystem"
																	},
																	"id": 1048,
																	"name": "Identifier",
																	"src": "3863:15:12"
																}
															],
															"id": 1049,
															"name": "MemberAccess",
															"src": "3863:29:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1025,
																"type": "contract BallotInterface",
																"value": "ballot"
															},
															"id": 1050,
															"name": "Identifier",
															"src": "3893:6:12"
														}
													],
													"id": 1051,
													"name": "FunctionCall",
													"src": "3863:37:12"
												}
											],
											"id": 1052,
											"name": "VariableDeclarationStatement",
											"src": "3835:65:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_array$_t_uint256_$2_memory_ptr",
																		"typeString": "uint256[2] memory"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "nextRound",
																"referencedDeclaration": 1817,
																"type": "function (uint256[2] memory) external"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1025,
																		"type": "contract BallotInterface",
																		"value": "ballot"
																	},
																	"id": 1053,
																	"name": "Identifier",
																	"src": "3910:6:12"
																}
															],
															"id": 1055,
															"name": "MemberAccess",
															"src": "3910:16:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1047,
																"type": "uint256[2] memory",
																"value": "candidates"
															},
															"id": 1056,
															"name": "Identifier",
															"src": "3927:10:12"
														}
													],
													"id": 1057,
													"name": "FunctionCall",
													"src": "3910:28:12"
												}
											],
											"id": 1058,
											"name": "ExpressionStatement",
											"src": "3910:28:12"
										}
									],
									"id": 1059,
									"name": "Block",
									"src": "3676:269:12"
								}
							],
							"id": 1060,
							"name": "FunctionDefinition",
							"src": "3634:311:12"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "tally",
								"payable": false,
								"scope": 1176,
								"stateMutability": "nonpayable",
								"superFunction": 1216,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "id",
												"scope": 1084,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1061,
													"name": "ElementaryTypeName",
													"src": "4071:4:12"
												}
											],
											"id": 1062,
											"name": "VariableDeclaration",
											"src": "4071:7:12"
										}
									],
									"id": 1063,
									"name": "ParameterList",
									"src": "4070:9:12"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1064,
									"name": "ParameterList",
									"src": "4089:0:12"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 1065,
															"name": "Identifier",
															"src": "4099:7:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		],
																		"overloadedDeclarations": [
																			1129
																		],
																		"referencedDeclaration": 1129,
																		"type": "function (uint256) view returns (bool)",
																		"value": "quorumReached"
																	},
																	"id": 1066,
																	"name": "Identifier",
																	"src": "4107:13:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1062,
																		"type": "uint256",
																		"value": "id"
																	},
																	"id": 1067,
																	"name": "Identifier",
																	"src": "4121:2:12"
																}
															],
															"id": 1068,
															"name": "FunctionCall",
															"src": "4107:17:12"
														}
													],
													"id": 1069,
													"name": "FunctionCall",
													"src": "4099:26:12"
												}
											],
											"id": 1070,
											"name": "ExpressionStatement",
											"src": "4099:26:12"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "setWinningOption",
																"referencedDeclaration": 2152,
																"type": "function (uint256) external"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"isStructConstructorCall": false,
																		"lValueRequested": false,
																		"names": [
																			null
																		],
																		"type": "contract ProposalInterface",
																		"type_conversion": true
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": [
																					{
																						"typeIdentifier": "t_address",
																						"typeString": "address"
																					}
																				],
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 2193,
																				"type": "type(contract ProposalInterface)",
																				"value": "ProposalInterface"
																			},
																			"id": 1071,
																			"name": "Identifier",
																			"src": "4135:17:12"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "address",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							{
																								"typeIdentifier": "t_uint256",
																								"typeString": "uint256"
																							}
																						],
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "getProposal",
																						"referencedDeclaration": 691,
																						"type": "function (uint256) view external returns (address)"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 775,
																								"type": "contract ProposalManagerInterface",
																								"value": "proposalManager"
																							},
																							"id": 1072,
																							"name": "Identifier",
																							"src": "4153:15:12"
																						}
																					],
																					"id": 1073,
																					"name": "MemberAccess",
																					"src": "4153:27:12"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1062,
																						"type": "uint256",
																						"value": "id"
																					},
																					"id": 1074,
																					"name": "Identifier",
																					"src": "4181:2:12"
																				}
																			],
																			"id": 1075,
																			"name": "FunctionCall",
																			"src": "4153:31:12"
																		}
																	],
																	"id": 1076,
																	"name": "FunctionCall",
																	"src": "4135:50:12"
																}
															],
															"id": 1077,
															"name": "MemberAccess",
															"src": "4135:67:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "uint256",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		],
																		"overloadedDeclarations": [
																			1149
																		],
																		"referencedDeclaration": 1149,
																		"type": "function (uint256) view returns (uint256)",
																		"value": "winningOption"
																	},
																	"id": 1078,
																	"name": "Identifier",
																	"src": "4203:13:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1062,
																		"type": "uint256",
																		"value": "id"
																	},
																	"id": 1079,
																	"name": "Identifier",
																	"src": "4217:2:12"
																}
															],
															"id": 1080,
															"name": "FunctionCall",
															"src": "4203:17:12"
														}
													],
													"id": 1081,
													"name": "FunctionCall",
													"src": "4135:86:12"
												}
											],
											"id": 1082,
											"name": "ExpressionStatement",
											"src": "4135:86:12"
										}
									],
									"id": 1083,
									"name": "Block",
									"src": "4089:139:12"
								}
							],
							"id": 1084,
							"name": "FunctionDefinition",
							"src": "4056:172:12"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "quorumReached",
								"payable": false,
								"scope": 1176,
								"stateMutability": "view",
								"superFunction": 1223,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "id",
												"scope": 1129,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1085,
													"name": "ElementaryTypeName",
													"src": "4431:4:12"
												}
											],
											"id": 1086,
											"name": "VariableDeclaration",
											"src": "4431:7:12"
										}
									],
									"id": 1087,
									"name": "ParameterList",
									"src": "4430:9:12"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1129,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 1088,
													"name": "ElementaryTypeName",
													"src": "4461:4:12"
												}
											],
											"id": 1089,
											"name": "VariableDeclaration",
											"src": "4461:4:12"
										}
									],
									"id": 1090,
									"name": "ParameterList",
									"src": "4460:6:12"
								},
								{
									"children": [
										{
											"attributes": {
												"assignments": [
													1092
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "maxQuorum",
														"scope": 1129,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "uint256",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"name": "uint",
																"type": "uint256"
															},
															"id": 1091,
															"name": "ElementaryTypeName",
															"src": "4477:4:12"
														}
													],
													"id": 1092,
													"name": "VariableDeclaration",
													"src": "4477:14:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"arguments": [
															null
														],
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "uint256",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	null
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "maximumQuorum",
																"referencedDeclaration": 2657,
																"type": "function () view external returns (uint256)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"arguments": [
																			null
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"isStructConstructorCall": false,
																		"lValueRequested": false,
																		"names": [
																			null
																		],
																		"type": "contract VotingPowerInterface",
																		"type_conversion": false
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": [
																					null
																				],
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1175,
																				"type": "function () view returns (contract VotingPowerInterface)",
																				"value": "votingPower"
																			},
																			"id": 1093,
																			"name": "Identifier",
																			"src": "4494:11:12"
																		}
																	],
																	"id": 1094,
																	"name": "FunctionCall",
																	"src": "4494:13:12"
																}
															],
															"id": 1095,
															"name": "MemberAccess",
															"src": "4494:27:12"
														}
													],
													"id": 1096,
													"name": "FunctionCall",
													"src": "4494:29:12"
												}
											],
											"id": 1097,
											"name": "VariableDeclarationStatement",
											"src": "4477:46:12"
										},
										{
											"attributes": {
												"assignments": [
													1099
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "quorum",
														"scope": 1129,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "uint256",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"name": "uint",
																"type": "uint256"
															},
															"id": 1098,
															"name": "ElementaryTypeName",
															"src": "4533:4:12"
														}
													],
													"id": 1099,
													"name": "VariableDeclaration",
													"src": "4533:11:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"arguments": [
															null
														],
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "uint256",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	null
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "quorum",
																"referencedDeclaration": 1855,
																"type": "function () view external returns (uint256)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"arguments": [
																			null
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"isStructConstructorCall": false,
																		"lValueRequested": false,
																		"names": [
																			null
																		],
																		"type": "contract BallotInterface",
																		"type_conversion": false
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "ballot",
																				"referencedDeclaration": 2167,
																				"type": "function () view external returns (contract BallotInterface)"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": false,
																						"isStructConstructorCall": false,
																						"lValueRequested": false,
																						"names": [
																							null
																						],
																						"type": "contract ProposalInterface",
																						"type_conversion": true
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": [
																									{
																										"typeIdentifier": "t_address",
																										"typeString": "address"
																									}
																								],
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 2193,
																								"type": "type(contract ProposalInterface)",
																								"value": "ProposalInterface"
																							},
																							"id": 1100,
																							"name": "Identifier",
																							"src": "4547:17:12"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"isConstant": false,
																								"isLValue": false,
																								"isPure": false,
																								"isStructConstructorCall": false,
																								"lValueRequested": false,
																								"names": [
																									null
																								],
																								"type": "address",
																								"type_conversion": false
																							},
																							"children": [
																								{
																									"attributes": {
																										"argumentTypes": [
																											{
																												"typeIdentifier": "t_uint256",
																												"typeString": "uint256"
																											}
																										],
																										"isConstant": false,
																										"isLValue": false,
																										"isPure": false,
																										"lValueRequested": false,
																										"member_name": "getProposal",
																										"referencedDeclaration": 691,
																										"type": "function (uint256) view external returns (address)"
																									},
																									"children": [
																										{
																											"attributes": {
																												"argumentTypes": null,
																												"overloadedDeclarations": [
																													null
																												],
																												"referencedDeclaration": 775,
																												"type": "contract ProposalManagerInterface",
																												"value": "proposalManager"
																											},
																											"id": 1101,
																											"name": "Identifier",
																											"src": "4565:15:12"
																										}
																									],
																									"id": 1102,
																									"name": "MemberAccess",
																									"src": "4565:27:12"
																								},
																								{
																									"attributes": {
																										"argumentTypes": null,
																										"overloadedDeclarations": [
																											null
																										],
																										"referencedDeclaration": 1086,
																										"type": "uint256",
																										"value": "id"
																									},
																									"id": 1103,
																									"name": "Identifier",
																									"src": "4593:2:12"
																								}
																							],
																							"id": 1104,
																							"name": "FunctionCall",
																							"src": "4565:31:12"
																						}
																					],
																					"id": 1105,
																					"name": "FunctionCall",
																					"src": "4547:50:12"
																				}
																			],
																			"id": 1106,
																			"name": "MemberAccess",
																			"src": "4547:57:12"
																		}
																	],
																	"id": 1107,
																	"name": "FunctionCall",
																	"src": "4547:59:12"
																}
															],
															"id": 1108,
															"name": "MemberAccess",
															"src": "4547:66:12"
														}
													],
													"id": 1109,
													"name": "FunctionCall",
													"src": "4547:68:12"
												}
											],
											"id": 1110,
											"name": "VariableDeclarationStatement",
											"src": "4533:82:12"
										},
										{
											"attributes": {
												"assignments": [
													1112
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "minimumQuorum",
														"scope": 1129,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "uint256",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"name": "uint",
																"type": "uint256"
															},
															"id": 1111,
															"name": "ElementaryTypeName",
															"src": "4625:4:12"
														}
													],
													"id": 1112,
													"name": "VariableDeclaration",
													"src": "4625:18:12"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "uint256",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_stringliteral_14ccd3110435c2c265577f439c6e12453f2669e0c15080a289f18dff6e10494e",
																		"typeString": "literal_string \"minQuorum\""
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "get",
																"referencedDeclaration": 119,
																"type": "function (bytes32) view external returns (uint256)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 771,
																		"type": "contract ConfigurationInterface",
																		"value": "configuration"
																	},
																	"id": 1113,
																	"name": "Identifier",
																	"src": "4646:13:12"
																}
															],
															"id": 1114,
															"name": "MemberAccess",
															"src": "4646:17:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"hexvalue": "6d696e51756f72756d",
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"subdenomination": null,
																"token": "string",
																"type": "literal_string \"minQuorum\"",
																"value": "minQuorum"
															},
															"id": 1115,
															"name": "Literal",
															"src": "4664:11:12"
														}
													],
													"id": 1116,
													"name": "FunctionCall",
													"src": "4646:30:12"
												}
											],
											"id": 1117,
											"name": "VariableDeclarationStatement",
											"src": "4625:51:12"
										},
										{
											"attributes": {
												"functionReturnParameters": 1090
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": ">=",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isInlineArray": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"commonType": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		},
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "/",
																		"type": "uint256"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isInlineArray": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"type": "uint256"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"commonType": {
																							"typeIdentifier": "t_uint256",
																							"typeString": "uint256"
																						},
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": false,
																						"lValueRequested": false,
																						"operator": "*",
																						"type": "uint256"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1099,
																								"type": "uint256",
																								"value": "quorum"
																							},
																							"id": 1118,
																							"name": "Identifier",
																							"src": "4696:6:12"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 769,
																								"type": "uint256",
																								"value": "PERCENTAGE_BASE"
																							},
																							"id": 1119,
																							"name": "Identifier",
																							"src": "4705:15:12"
																						}
																					],
																					"id": 1120,
																					"name": "BinaryOperation",
																					"src": "4696:24:12"
																				}
																			],
																			"id": 1121,
																			"name": "TupleExpression",
																			"src": "4695:26:12"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1092,
																				"type": "uint256",
																				"value": "maxQuorum"
																			},
																			"id": 1122,
																			"name": "Identifier",
																			"src": "4724:9:12"
																		}
																	],
																	"id": 1123,
																	"name": "BinaryOperation",
																	"src": "4695:38:12"
																}
															],
															"id": 1124,
															"name": "TupleExpression",
															"src": "4694:40:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1112,
																"type": "uint256",
																"value": "minimumQuorum"
															},
															"id": 1125,
															"name": "Identifier",
															"src": "4738:13:12"
														}
													],
													"id": 1126,
													"name": "BinaryOperation",
													"src": "4694:57:12"
												}
											],
											"id": 1127,
											"name": "Return",
											"src": "4687:64:12"
										}
									],
									"id": 1128,
									"name": "Block",
									"src": "4467:291:12"
								}
							],
							"id": 1129,
							"name": "FunctionDefinition",
							"src": "4408:350:12"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "winningOption",
								"payable": false,
								"scope": 1176,
								"stateMutability": "view",
								"superFunction": 1230,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "id",
												"scope": 1149,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1130,
													"name": "ElementaryTypeName",
													"src": "4933:4:12"
												}
											],
											"id": 1131,
											"name": "VariableDeclaration",
											"src": "4933:7:12"
										}
									],
									"id": 1132,
									"name": "ParameterList",
									"src": "4932:9:12"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1149,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1133,
													"name": "ElementaryTypeName",
													"src": "4963:4:12"
												}
											],
											"id": 1134,
											"name": "VariableDeclaration",
											"src": "4963:4:12"
										}
									],
									"id": 1135,
									"name": "ParameterList",
									"src": "4962:6:12"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1135
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "uint256",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_contract$_BallotInterface_$1870",
																		"typeString": "contract BallotInterface"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "winner",
																"referencedDeclaration": 194,
																"type": "function (contract BallotInterface) view external returns (uint256)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 777,
																		"type": "contract ElectoralSystemInterface",
																		"value": "electoralSystem"
																	},
																	"id": 1136,
																	"name": "Identifier",
																	"src": "4986:15:12"
																}
															],
															"id": 1137,
															"name": "MemberAccess",
															"src": "4986:22:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"arguments": [
																	null
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "contract BallotInterface",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			null
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "ballot",
																		"referencedDeclaration": 2167,
																		"type": "function () view external returns (contract BallotInterface)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "contract ProposalInterface",
																				"type_conversion": true
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							{
																								"typeIdentifier": "t_address",
																								"typeString": "address"
																							}
																						],
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 2193,
																						"type": "type(contract ProposalInterface)",
																						"value": "ProposalInterface"
																					},
																					"id": 1138,
																					"name": "Identifier",
																					"src": "5009:17:12"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": false,
																						"isStructConstructorCall": false,
																						"lValueRequested": false,
																						"names": [
																							null
																						],
																						"type": "address",
																						"type_conversion": false
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": [
																									{
																										"typeIdentifier": "t_uint256",
																										"typeString": "uint256"
																									}
																								],
																								"isConstant": false,
																								"isLValue": false,
																								"isPure": false,
																								"lValueRequested": false,
																								"member_name": "getProposal",
																								"referencedDeclaration": 691,
																								"type": "function (uint256) view external returns (address)"
																							},
																							"children": [
																								{
																									"attributes": {
																										"argumentTypes": null,
																										"overloadedDeclarations": [
																											null
																										],
																										"referencedDeclaration": 775,
																										"type": "contract ProposalManagerInterface",
																										"value": "proposalManager"
																									},
																									"id": 1139,
																									"name": "Identifier",
																									"src": "5027:15:12"
																								}
																							],
																							"id": 1140,
																							"name": "MemberAccess",
																							"src": "5027:27:12"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1131,
																								"type": "uint256",
																								"value": "id"
																							},
																							"id": 1141,
																							"name": "Identifier",
																							"src": "5055:2:12"
																						}
																					],
																					"id": 1142,
																					"name": "FunctionCall",
																					"src": "5027:31:12"
																				}
																			],
																			"id": 1143,
																			"name": "FunctionCall",
																			"src": "5009:50:12"
																		}
																	],
																	"id": 1144,
																	"name": "MemberAccess",
																	"src": "5009:57:12"
																}
															],
															"id": 1145,
															"name": "FunctionCall",
															"src": "5009:59:12"
														}
													],
													"id": 1146,
													"name": "FunctionCall",
													"src": "4986:83:12"
												}
											],
											"id": 1147,
											"name": "Return",
											"src": "4979:90:12"
										}
									],
									"id": 1148,
									"name": "Block",
									"src": "4969:107:12"
								}
							],
							"id": 1149,
							"name": "FunctionDefinition",
							"src": "4910:166:12"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "votingRights",
								"payable": false,
								"scope": 1176,
								"stateMutability": "view",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1150,
									"name": "ParameterList",
									"src": "5103:2:12"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1162,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract VotingRightsInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "VotingRightsInterface",
														"referencedDeclaration": 2701,
														"type": "contract VotingRightsInterface"
													},
													"id": 1151,
													"name": "UserDefinedTypeName",
													"src": "5127:21:12"
												}
											],
											"id": 1152,
											"name": "VariableDeclaration",
											"src": "5127:21:12"
										}
									],
									"id": 1153,
									"name": "ParameterList",
									"src": "5126:23:12"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1153
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "contract VotingRightsInterface",
														"type_conversion": true
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2701,
																"type": "type(contract VotingRightsInterface)",
																"value": "VotingRightsInterface"
															},
															"id": 1154,
															"name": "Identifier",
															"src": "5167:21:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "address",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_stringliteral_0562706b2846c3726f6f585b9774423ab1ddd749d3d7b2dd0986ff85c88e4078",
																				"typeString": "literal_string \"rights\""
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "getModule",
																		"referencedDeclaration": 2328,
																		"type": "function (bytes32) view external returns (address)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 773,
																				"type": "contract ModuleRegistryInterface",
																				"value": "modules"
																			},
																			"id": 1155,
																			"name": "Identifier",
																			"src": "5189:7:12"
																		}
																	],
																	"id": 1156,
																	"name": "MemberAccess",
																	"src": "5189:17:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"hexvalue": "726967687473",
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": true,
																		"lValueRequested": false,
																		"subdenomination": null,
																		"token": "string",
																		"type": "literal_string \"rights\"",
																		"value": "rights"
																	},
																	"id": 1157,
																	"name": "Literal",
																	"src": "5207:8:12"
																}
															],
															"id": 1158,
															"name": "FunctionCall",
															"src": "5189:27:12"
														}
													],
													"id": 1159,
													"name": "FunctionCall",
													"src": "5167:50:12"
												}
											],
											"id": 1160,
											"name": "Return",
											"src": "5160:57:12"
										}
									],
									"id": 1161,
									"name": "Block",
									"src": "5150:74:12"
								}
							],
							"id": 1162,
							"name": "FunctionDefinition",
							"src": "5082:142:12"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "votingPower",
								"payable": false,
								"scope": 1176,
								"stateMutability": "view",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1163,
									"name": "ParameterList",
									"src": "5250:2:12"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1175,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract VotingPowerInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "VotingPowerInterface",
														"referencedDeclaration": 2667,
														"type": "contract VotingPowerInterface"
													},
													"id": 1164,
													"name": "UserDefinedTypeName",
													"src": "5274:20:12"
												}
											],
											"id": 1165,
											"name": "VariableDeclaration",
											"src": "5274:20:12"
										}
									],
									"id": 1166,
									"name": "ParameterList",
									"src": "5273:22:12"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1166
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "contract VotingPowerInterface",
														"type_conversion": true
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2667,
																"type": "type(contract VotingPowerInterface)",
																"value": "VotingPowerInterface"
															},
															"id": 1167,
															"name": "Identifier",
															"src": "5313:20:12"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "address",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_stringliteral_e16920893711b985df3893d85b39127b3a481e91c3c57640cd8970c06e9e6007",
																				"typeString": "literal_string \"strategy\""
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "getModule",
																		"referencedDeclaration": 2328,
																		"type": "function (bytes32) view external returns (address)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 773,
																				"type": "contract ModuleRegistryInterface",
																				"value": "modules"
																			},
																			"id": 1168,
																			"name": "Identifier",
																			"src": "5334:7:12"
																		}
																	],
																	"id": 1169,
																	"name": "MemberAccess",
																	"src": "5334:17:12"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"hexvalue": "7374726174656779",
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": true,
																		"lValueRequested": false,
																		"subdenomination": null,
																		"token": "string",
																		"type": "literal_string \"strategy\"",
																		"value": "strategy"
																	},
																	"id": 1170,
																	"name": "Literal",
																	"src": "5352:10:12"
																}
															],
															"id": 1171,
															"name": "FunctionCall",
															"src": "5334:29:12"
														}
													],
													"id": 1172,
													"name": "FunctionCall",
													"src": "5313:51:12"
												}
											],
											"id": 1173,
											"name": "Return",
											"src": "5306:58:12"
										}
									],
									"id": 1174,
									"name": "Block",
									"src": "5296:75:12"
								}
							],
							"id": 1175,
							"name": "FunctionDefinition",
							"src": "5230:141:12"
						}
					],
					"id": 1176,
					"name": "ContractDefinition",
					"src": "430:4943:12"
				}
			],
			"id": 1177,
			"name": "SourceUnit",
			"src": "0:5374:12"
		},
		"compiler": {
			"name": "solc",
			"version": "0.4.18+commit.9cf6e910.Emscripten.clang"
		},
		"networks": {},
		"schemaVersion": "1.0.1",
		"updatedAt": "2018-01-18T17:45:14.650Z"
	},
	{
		"contractName": "Proposal",
		"abi": [
			{
				"constant": true,
				"inputs": [],
				"name": "tallied",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "isVoting",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "isExecuted",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "executed",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "isAccepted",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "execute",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "canExecute",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "option",
						"type": "uint256"
					}
				],
				"name": "setWinningOption",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "winningOption",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "isEnded",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "ballot",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "state",
				"outputs": [
					{
						"name": "",
						"type": "uint8"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "executor",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "createdAt",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "timeSpan",
				"outputs": [
					{
						"name": "unit",
						"type": "uint8"
					},
					{
						"name": "start",
						"type": "uint256"
					},
					{
						"name": "end",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"name": "_ballot",
						"type": "address"
					},
					{
						"name": "isBlockNumber",
						"type": "bool"
					},
					{
						"name": "start",
						"type": "uint256"
					},
					{
						"name": "end",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "constructor"
			}
		],
		"bytecode": "0x60606040526000600660006101000a81548160ff0219169083151502179055506000600660016101000a81548160ff021916908315150217905550341561004557600080fd5b6040516080806109bd83398101604052808051906020019091908051906020019091908051906020019091908051906020019091905050600084600660026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600090508315156100cf57600190505b6060604051908101604052808260018111156100e757fe5b815260200184815260200183815250600160008201518160000160006101000a81548160ff0219169083600181111561011c57fe5b02179055506020820151816001015560408201518160020155905050600143036004819055505050505050610867806101566000396000f3006060604052600436106100db576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063178e10ca146100e05780631bbef3991461010d5780631c9feaa51461013a57806331a38c89146101675780635051a5ec1461019457806361461954146101c157806378b90337146101d6578063902cfb88146102035780639fde4ef814610226578063a4fd6f561461024f578063ac3910a21461027c578063c19d93fb146102d1578063c34c08e514610308578063cf09e0d01461035d578063f0eb3af714610386575b600080fd5b34156100eb57600080fd5b6100f36103cb565b604051808215151515815260200191505060405180910390f35b341561011857600080fd5b6101206103de565b604051808215151515815260200191505060405180910390f35b341561014557600080fd5b61014d61044f565b604051808215151515815260200191505060405180910390f35b341561017257600080fd5b61017a610466565b604051808215151515815260200191505060405180910390f35b341561019f57600080fd5b6101a7610479565b604051808215151515815260200191505060405180910390f35b34156101cc57600080fd5b6101d46104a7565b005b34156101e157600080fd5b6101e96105c8565b604051808215151515815260200191505060405180910390f35b341561020e57600080fd5b610224600480803590602001909190505061060b565b005b341561023157600080fd5b610239610751565b6040518082815260200191505060405180910390f35b341561025a57600080fd5b610262610757565b604051808215151515815260200191505060405180910390f35b341561028757600080fd5b61028f6107a6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102dc57600080fd5b6102e46107d0565b604051808260018111156102f457fe5b60ff16815260200191505060405180910390f35b341561031357600080fd5b61031b6107e2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561036857600080fd5b61037061080c565b6040518082815260200191505060405180910390f35b341561039157600080fd5b610399610816565b604051808460018111156103a957fe5b60ff168152602001838152602001828152602001935050505060405180910390f35b600660009054906101000a900460ff1681565b60008060018111156103ec57fe5b600160000160009054906101000a900460ff16600181111561040a57fe5b1415610430576001800154431015801561042957506001600201544311155b905061044c565b6001800154421015801561044957506001600201544211155b90505b90565b6000600660019054906101000a900460ff16905090565b600660019054906101000a900460ff1681565b600080600181111561048757fe5b6000809054906101000a900460ff1660018111156104a157fe5b14905090565b6104af6105c8565b80156104bf57506104be610479565b5b80156104d057506104ce61044f565b155b15156104db57600080fd5b6001600660016101000a81548160ff021916908315150217905550600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634b64e492306040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15156105b257600080fd5b6102c65a03f115156105c357600080fd5b505050565b600080600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415905090565b600660009054906101000a900460ff1615151561062757600080fd5b600660029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632fc59da7826000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b15156106c057600080fd5b6102c65a03f115156106d157600080fd5b50505060405180519050156107085760008060006101000a81548160ff021916908360018111156106fe57fe5b021790555061072c565b60016000806101000a81548160ff0219169083600181111561072657fe5b02179055505b806005819055506001600660006101000a81548160ff02191690831515021790555050565b60055481565b600080600181111561076557fe5b600160000160009054906101000a900460ff16600181111561078357fe5b141561079857436001600201541090506107a3565b426001600201541190505b90565b6000600660029054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900460ff1681565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600454905090565b60018060000160009054906101000a900460ff169080600101549080600201549050835600a165627a7a72305820e239a7531873af938d327724a5c285ca67d11ba86b793cac194401f94c5491220029",
		"deployedBytecode": "0x6060604052600436106100db576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063178e10ca146100e05780631bbef3991461010d5780631c9feaa51461013a57806331a38c89146101675780635051a5ec1461019457806361461954146101c157806378b90337146101d6578063902cfb88146102035780639fde4ef814610226578063a4fd6f561461024f578063ac3910a21461027c578063c19d93fb146102d1578063c34c08e514610308578063cf09e0d01461035d578063f0eb3af714610386575b600080fd5b34156100eb57600080fd5b6100f36103cb565b604051808215151515815260200191505060405180910390f35b341561011857600080fd5b6101206103de565b604051808215151515815260200191505060405180910390f35b341561014557600080fd5b61014d61044f565b604051808215151515815260200191505060405180910390f35b341561017257600080fd5b61017a610466565b604051808215151515815260200191505060405180910390f35b341561019f57600080fd5b6101a7610479565b604051808215151515815260200191505060405180910390f35b34156101cc57600080fd5b6101d46104a7565b005b34156101e157600080fd5b6101e96105c8565b604051808215151515815260200191505060405180910390f35b341561020e57600080fd5b610224600480803590602001909190505061060b565b005b341561023157600080fd5b610239610751565b6040518082815260200191505060405180910390f35b341561025a57600080fd5b610262610757565b604051808215151515815260200191505060405180910390f35b341561028757600080fd5b61028f6107a6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102dc57600080fd5b6102e46107d0565b604051808260018111156102f457fe5b60ff16815260200191505060405180910390f35b341561031357600080fd5b61031b6107e2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561036857600080fd5b61037061080c565b6040518082815260200191505060405180910390f35b341561039157600080fd5b610399610816565b604051808460018111156103a957fe5b60ff168152602001838152602001828152602001935050505060405180910390f35b600660009054906101000a900460ff1681565b60008060018111156103ec57fe5b600160000160009054906101000a900460ff16600181111561040a57fe5b1415610430576001800154431015801561042957506001600201544311155b905061044c565b6001800154421015801561044957506001600201544211155b90505b90565b6000600660019054906101000a900460ff16905090565b600660019054906101000a900460ff1681565b600080600181111561048757fe5b6000809054906101000a900460ff1660018111156104a157fe5b14905090565b6104af6105c8565b80156104bf57506104be610479565b5b80156104d057506104ce61044f565b155b15156104db57600080fd5b6001600660016101000a81548160ff021916908315150217905550600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634b64e492306040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15156105b257600080fd5b6102c65a03f115156105c357600080fd5b505050565b600080600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415905090565b600660009054906101000a900460ff1615151561062757600080fd5b600660029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632fc59da7826000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b15156106c057600080fd5b6102c65a03f115156106d157600080fd5b50505060405180519050156107085760008060006101000a81548160ff021916908360018111156106fe57fe5b021790555061072c565b60016000806101000a81548160ff0219169083600181111561072657fe5b02179055505b806005819055506001600660006101000a81548160ff02191690831515021790555050565b60055481565b600080600181111561076557fe5b600160000160009054906101000a900460ff16600181111561078357fe5b141561079857436001600201541090506107a3565b426001600201541190505b90565b6000600660029054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900460ff1681565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600454905090565b60018060000160009054906101000a900460ff169080600101549080600201549050835600a165627a7a72305820e239a7531873af938d327724a5c285ca67d11ba86b793cac194401f94c5491220029",
		"sourceMap": "153:2603:20:-;;;629:5;607:27;;;;;;;;;;;;;;;;;;;;663:5;640:28;;;;;;;;;;;;;;;;;;;;750:359;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;879:15;861:7;852:6;;:16;;;;;;;;;;;;;;;;;;897;879:34;;928:13;927:14;923:72;;;964:20;957:27;;923:72;1016:46;;;;;;;;;1032:4;1016:46;;;;;;;;;;;;1045:5;1016:46;;;;1057:3;1016:46;;;1005:8;:57;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1100:1;1085:12;:16;1072:9;:30;;;;750:359;;;;;153:2603;;;;;;",
		"deployedSourceMap": "153:2603:20:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;607:27;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1681:284;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2586:81;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;640:28;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2381:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1173:156;;;;;;;;;;;;;;2483:97;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1389:286;;;;;;;;;;;;;;;;;;;;;;;;;;576:25;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1971:210;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2187:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;494:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2281:94;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2673:81;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;518:24;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;607:27;;;;;;;;;;;;;:::o;1681:284::-;1724:4;1761:16;1744:33;;;;;;;;:8;:13;;;;;;;;;;;;:33;;;;;;;;;1740:133;;;1816:8;:14;;;1800:12;:30;;:62;;;;;1850:8;:12;;;1834;:28;;1800:62;1793:69;;;;1740:133;1909:8;:14;;;1890:15;:33;;:68;;;;;1946:8;:12;;;1927:15;:31;;1890:68;1883:75;;1681:284;;:::o;2586:81::-;2629:4;2652:8;;;;;;;;;;;2645:15;;2586:81;:::o;640:28::-;;;;;;;;;;;;;:::o;2381:96::-;2424:4;2456:14;2447:23;;;;;;;;:5;;;;;;;;;;;:23;;;;;;;;;2440:30;;2381:96;:::o;1173:156::-;1219:12;:10;:12::i;:::-;:28;;;;;1235:12;:10;:12::i;:::-;1219:28;:45;;;;;1252:12;:10;:12::i;:::-;1251:13;1219:45;1211:54;;;;;;;;1286:4;1275:8;;:15;;;;;;;;;;;;;;;;;;1300:8;;;;;;;;;;;:16;;;1317:4;1300:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1173:156::o;2483:97::-;2526:4;2570:3;2557:8;;;;;;;;;;;2549:24;;;;2542:31;;2483:97;:::o;1389:286::-;1456:7;;;;;;;;;;;1455:8;1447:17;;;;;;;;1479:6;;;;;;;;;;;:23;;;1503:6;1479:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1475:137;;;1534:14;1526:5;;:22;;;;;;;;;;;;;;;;;;;;;;;;1475:137;;;1587:14;1579:5;;:22;;;;;;;;;;;;;;;;;;;;;;;;1475:137;1638:6;1622:13;:22;;;;1664:4;1654:7;;:14;;;;;;;;;;;;;;;;;;1389:286;:::o;576:25::-;;;;:::o;1971:210::-;2013:4;2050:16;2033:33;;;;;;;;:8;:13;;;;;;;;;;;;:33;;;;;;;;;2029:98;;;2104:12;2089:8;:12;;;:27;2082:34;;;;2029:98;2159:15;2144:8;:12;;;:30;2137:37;;1971:210;;:::o;2187:88::-;2228:15;2262:6;;;;;;;;;;;2255:13;;2187:88;:::o;494:18::-;;;;;;;;;;;;;:::o;2281:94::-;2324:17;2360:8;;;;;;;;;;;2353:15;;2281:94;:::o;2673:81::-;2715:4;2738:9;;2731:16;;2673:81;:::o;518:24::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
		"source": "pragma solidity ^0.4.18;\n\nimport \"./ProposalInterface.sol\";\n\n// @todo lets clean this up. Potentially turn it into a struct to keep it more lightweight.\ncontract Proposal is ProposalInterface {\n\n    // @todo when we have plamsa we may be able to remove this, as we could potentially guarantee a stable blocktime then.\n    struct TimeSpan {\n        UnitOfTime unit;\n        uint start;\n        uint end;\n    }\n\n    enum UnitOfTime { Block, Timestamp }\n    enum State { Accepted, Rejected }\n\n    State public state;\n    TimeSpan public timeSpan;\n\n    uint public createdAt;\n    uint public winningOption;\n    bool public tallied = false;\n    bool public executed = false;\n\n    BallotInterface public ballot;\n    ExecutorInterface public executor;\n\n    function Proposal(BallotInterface _ballot, bool isBlockNumber, uint start, uint end) public {\n        ballot = _ballot;\n\n        UnitOfTime unit = UnitOfTime.Block;\n        if (!isBlockNumber) {\n            unit = UnitOfTime.Timestamp;\n        }\n\n        timeSpan = TimeSpan({unit: unit, start: start, end: end});\n        createdAt = (block.number - 1);\n    }\n\n    // @todo remove this, lets put this into Org contract\n    function execute() external {\n        require(canExecute() && isAccepted() && !isExecuted());\n        executed = true;\n        executor.execute(this);\n    }\n\n    // @todo this is ugly, only make it settable once\n    function setWinningOption(uint option) external {\n        require(!tallied);\n\n        if (ballot.optionWillAccept(option)) {\n            state = State.Accepted;\n        } else {\n            state = State.Rejected;\n        }\n\n        winningOption = option;\n        tallied = true;\n    }\n\n    function isVoting() external view returns (bool) {\n        if (timeSpan.unit == UnitOfTime.Block) {\n            return block.number >= timeSpan.start && block.number <= timeSpan.end;\n        }\n\n        return block.timestamp >= timeSpan.start && block.timestamp <= timeSpan.end;\n    }\n\n    function isEnded() external view returns (bool) {\n        if (timeSpan.unit == UnitOfTime.Block) {\n            return timeSpan.end < block.number;\n        }\n\n        return timeSpan.end > block.timestamp;\n    }\n\n    function ballot() external view returns (BallotInterface) {\n        return ballot;\n    }\n\n    function executor() external view returns (ExecutorInterface) {\n        return executor;\n    }\n\n    function isAccepted() public view returns (bool) {\n        return state == State.Accepted;\n    }\n\n    function canExecute() public view returns (bool) {\n        return address(executor) != 0x0;\n    }\n\n    function isExecuted() public view returns (bool) {\n        return executed;\n    }\n\n    function createdAt() public view returns (uint) {\n        return createdAt;\n    }\n}\n",
		"sourcePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Proposals/Proposal.sol",
		"ast": {
			"attributes": {
				"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Proposals/Proposal.sol",
				"exportedSymbols": {
					"Proposal": [
						2140
					]
				}
			},
			"children": [
				{
					"attributes": {
						"literals": [
							"solidity",
							"^",
							"0.4",
							".18"
						]
					},
					"id": 1880,
					"name": "PragmaDirective",
					"src": "0:24:20"
				},
				{
					"attributes": {
						"SourceUnit": 2194,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Proposals/ProposalInterface.sol",
						"file": "./ProposalInterface.sol",
						"scope": 2141,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 1881,
					"name": "ImportDirective",
					"src": "26:33:20"
				},
				{
					"attributes": {
						"contractDependencies": [
							2193
						],
						"contractKind": "contract",
						"documentation": null,
						"fullyImplemented": true,
						"linearizedBaseContracts": [
							2140,
							2193
						],
						"name": "Proposal",
						"scope": 2141
					},
					"children": [
						{
							"attributes": {
								"arguments": [
									null
								]
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "ProposalInterface",
										"referencedDeclaration": 2193,
										"type": "contract ProposalInterface"
									},
									"id": 1882,
									"name": "UserDefinedTypeName",
									"src": "174:17:20"
								}
							],
							"id": 1883,
							"name": "InheritanceSpecifier",
							"src": "174:17:20"
						},
						{
							"attributes": {
								"canonicalName": "Proposal.TimeSpan",
								"name": "TimeSpan",
								"scope": 2140,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"constant": false,
										"name": "unit",
										"scope": 1890,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "enum Proposal.UnitOfTime",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"contractScope": null,
												"name": "UnitOfTime",
												"referencedDeclaration": 1893,
												"type": "enum Proposal.UnitOfTime"
											},
											"id": 1884,
											"name": "UserDefinedTypeName",
											"src": "348:10:20"
										}
									],
									"id": 1885,
									"name": "VariableDeclaration",
									"src": "348:15:20"
								},
								{
									"attributes": {
										"constant": false,
										"name": "start",
										"scope": 1890,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "uint256",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "uint",
												"type": "uint256"
											},
											"id": 1886,
											"name": "ElementaryTypeName",
											"src": "373:4:20"
										}
									],
									"id": 1887,
									"name": "VariableDeclaration",
									"src": "373:10:20"
								},
								{
									"attributes": {
										"constant": false,
										"name": "end",
										"scope": 1890,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "uint256",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "uint",
												"type": "uint256"
											},
											"id": 1888,
											"name": "ElementaryTypeName",
											"src": "393:4:20"
										}
									],
									"id": 1889,
									"name": "VariableDeclaration",
									"src": "393:8:20"
								}
							],
							"id": 1890,
							"name": "StructDefinition",
							"src": "322:86:20"
						},
						{
							"attributes": {
								"canonicalName": "Proposal.UnitOfTime",
								"name": "UnitOfTime"
							},
							"children": [
								{
									"attributes": {
										"name": "Block"
									},
									"id": 1891,
									"name": "EnumValue",
									"src": "432:5:20"
								},
								{
									"attributes": {
										"name": "Timestamp"
									},
									"id": 1892,
									"name": "EnumValue",
									"src": "439:9:20"
								}
							],
							"id": 1893,
							"name": "EnumDefinition",
							"src": "414:36:20"
						},
						{
							"attributes": {
								"canonicalName": "Proposal.State",
								"name": "State"
							},
							"children": [
								{
									"attributes": {
										"name": "Accepted"
									},
									"id": 1894,
									"name": "EnumValue",
									"src": "468:8:20"
								},
								{
									"attributes": {
										"name": "Rejected"
									},
									"id": 1895,
									"name": "EnumValue",
									"src": "478:8:20"
								}
							],
							"id": 1896,
							"name": "EnumDefinition",
							"src": "455:33:20"
						},
						{
							"attributes": {
								"constant": false,
								"name": "state",
								"scope": 2140,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "enum Proposal.State",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "State",
										"referencedDeclaration": 1896,
										"type": "enum Proposal.State"
									},
									"id": 1897,
									"name": "UserDefinedTypeName",
									"src": "494:5:20"
								}
							],
							"id": 1898,
							"name": "VariableDeclaration",
							"src": "494:18:20"
						},
						{
							"attributes": {
								"constant": false,
								"name": "timeSpan",
								"scope": 2140,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "struct Proposal.TimeSpan storage ref",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "TimeSpan",
										"referencedDeclaration": 1890,
										"type": "struct Proposal.TimeSpan storage pointer"
									},
									"id": 1899,
									"name": "UserDefinedTypeName",
									"src": "518:8:20"
								}
							],
							"id": 1900,
							"name": "VariableDeclaration",
							"src": "518:24:20"
						},
						{
							"attributes": {
								"constant": false,
								"name": "createdAt",
								"scope": 2140,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "uint256",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"name": "uint",
										"type": "uint256"
									},
									"id": 1901,
									"name": "ElementaryTypeName",
									"src": "549:4:20"
								}
							],
							"id": 1902,
							"name": "VariableDeclaration",
							"src": "549:21:20"
						},
						{
							"attributes": {
								"constant": false,
								"name": "winningOption",
								"scope": 2140,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "uint256",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"name": "uint",
										"type": "uint256"
									},
									"id": 1903,
									"name": "ElementaryTypeName",
									"src": "576:4:20"
								}
							],
							"id": 1904,
							"name": "VariableDeclaration",
							"src": "576:25:20"
						},
						{
							"attributes": {
								"constant": false,
								"name": "tallied",
								"scope": 2140,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "bool",
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"name": "bool",
										"type": "bool"
									},
									"id": 1905,
									"name": "ElementaryTypeName",
									"src": "607:4:20"
								},
								{
									"attributes": {
										"argumentTypes": null,
										"hexvalue": "66616c7365",
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"lValueRequested": false,
										"subdenomination": null,
										"token": "bool",
										"type": "bool",
										"value": "false"
									},
									"id": 1906,
									"name": "Literal",
									"src": "629:5:20"
								}
							],
							"id": 1907,
							"name": "VariableDeclaration",
							"src": "607:27:20"
						},
						{
							"attributes": {
								"constant": false,
								"name": "executed",
								"scope": 2140,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "bool",
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"name": "bool",
										"type": "bool"
									},
									"id": 1908,
									"name": "ElementaryTypeName",
									"src": "640:4:20"
								},
								{
									"attributes": {
										"argumentTypes": null,
										"hexvalue": "66616c7365",
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"lValueRequested": false,
										"subdenomination": null,
										"token": "bool",
										"type": "bool",
										"value": "false"
									},
									"id": 1909,
									"name": "Literal",
									"src": "663:5:20"
								}
							],
							"id": 1910,
							"name": "VariableDeclaration",
							"src": "640:28:20"
						},
						{
							"attributes": {
								"constant": false,
								"name": "ballot",
								"scope": 2140,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "contract BallotInterface",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "BallotInterface",
										"referencedDeclaration": 1870,
										"type": "contract BallotInterface"
									},
									"id": 1911,
									"name": "UserDefinedTypeName",
									"src": "675:15:20"
								}
							],
							"id": 1912,
							"name": "VariableDeclaration",
							"src": "675:29:20"
						},
						{
							"attributes": {
								"constant": false,
								"name": "executor",
								"scope": 2140,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "contract ExecutorInterface",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "ExecutorInterface",
										"referencedDeclaration": 1878,
										"type": "contract ExecutorInterface"
									},
									"id": 1913,
									"name": "UserDefinedTypeName",
									"src": "710:17:20"
								}
							],
							"id": 1914,
							"name": "VariableDeclaration",
							"src": "710:33:20"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": true,
								"modifiers": [
									null
								],
								"name": "Proposal",
								"payable": false,
								"scope": 2140,
								"stateMutability": "nonpayable",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "_ballot",
												"scope": 1960,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract BallotInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "BallotInterface",
														"referencedDeclaration": 1870,
														"type": "contract BallotInterface"
													},
													"id": 1915,
													"name": "UserDefinedTypeName",
													"src": "768:15:20"
												}
											],
											"id": 1916,
											"name": "VariableDeclaration",
											"src": "768:23:20"
										},
										{
											"attributes": {
												"constant": false,
												"name": "isBlockNumber",
												"scope": 1960,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 1917,
													"name": "ElementaryTypeName",
													"src": "793:4:20"
												}
											],
											"id": 1918,
											"name": "VariableDeclaration",
											"src": "793:18:20"
										},
										{
											"attributes": {
												"constant": false,
												"name": "start",
												"scope": 1960,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1919,
													"name": "ElementaryTypeName",
													"src": "813:4:20"
												}
											],
											"id": 1920,
											"name": "VariableDeclaration",
											"src": "813:10:20"
										},
										{
											"attributes": {
												"constant": false,
												"name": "end",
												"scope": 1960,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1921,
													"name": "ElementaryTypeName",
													"src": "825:4:20"
												}
											],
											"id": 1922,
											"name": "VariableDeclaration",
											"src": "825:8:20"
										}
									],
									"id": 1923,
									"name": "ParameterList",
									"src": "767:67:20"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1924,
									"name": "ParameterList",
									"src": "842:0:20"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "contract BallotInterface"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1912,
																"type": "contract BallotInterface",
																"value": "ballot"
															},
															"id": 1925,
															"name": "Identifier",
															"src": "852:6:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1916,
																"type": "contract BallotInterface",
																"value": "_ballot"
															},
															"id": 1926,
															"name": "Identifier",
															"src": "861:7:20"
														}
													],
													"id": 1927,
													"name": "Assignment",
													"src": "852:16:20"
												}
											],
											"id": 1928,
											"name": "ExpressionStatement",
											"src": "852:16:20"
										},
										{
											"attributes": {
												"assignments": [
													1930
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "unit",
														"scope": 1960,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "enum Proposal.UnitOfTime",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"contractScope": null,
																"name": "UnitOfTime",
																"referencedDeclaration": 1893,
																"type": "enum Proposal.UnitOfTime"
															},
															"id": 1929,
															"name": "UserDefinedTypeName",
															"src": "879:10:20"
														}
													],
													"id": 1930,
													"name": "VariableDeclaration",
													"src": "879:15:20"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": true,
														"lValueRequested": false,
														"member_name": "Block",
														"referencedDeclaration": null,
														"type": "enum Proposal.UnitOfTime"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1893,
																"type": "type(enum Proposal.UnitOfTime)",
																"value": "UnitOfTime"
															},
															"id": 1931,
															"name": "Identifier",
															"src": "897:10:20"
														}
													],
													"id": 1932,
													"name": "MemberAccess",
													"src": "897:16:20"
												}
											],
											"id": 1933,
											"name": "VariableDeclarationStatement",
											"src": "879:34:20"
										},
										{
											"attributes": {
												"falseBody": null
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "!",
														"prefix": true,
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1918,
																"type": "bool",
																"value": "isBlockNumber"
															},
															"id": 1934,
															"name": "Identifier",
															"src": "928:13:20"
														}
													],
													"id": 1935,
													"name": "UnaryOperation",
													"src": "927:14:20"
												},
												{
													"children": [
														{
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "=",
																		"type": "enum Proposal.UnitOfTime"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1930,
																				"type": "enum Proposal.UnitOfTime",
																				"value": "unit"
																			},
																			"id": 1936,
																			"name": "Identifier",
																			"src": "957:4:20"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": true,
																				"lValueRequested": false,
																				"member_name": "Timestamp",
																				"referencedDeclaration": null,
																				"type": "enum Proposal.UnitOfTime"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1893,
																						"type": "type(enum Proposal.UnitOfTime)",
																						"value": "UnitOfTime"
																					},
																					"id": 1937,
																					"name": "Identifier",
																					"src": "964:10:20"
																				}
																			],
																			"id": 1938,
																			"name": "MemberAccess",
																			"src": "964:20:20"
																		}
																	],
																	"id": 1939,
																	"name": "Assignment",
																	"src": "957:27:20"
																}
															],
															"id": 1940,
															"name": "ExpressionStatement",
															"src": "957:27:20"
														}
													],
													"id": 1941,
													"name": "Block",
													"src": "943:52:20"
												}
											],
											"id": 1942,
											"name": "IfStatement",
											"src": "923:72:20"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "struct Proposal.TimeSpan storage ref"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1900,
																"type": "struct Proposal.TimeSpan storage ref",
																"value": "timeSpan"
															},
															"id": 1943,
															"name": "Identifier",
															"src": "1005:8:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": true,
																"lValueRequested": false,
																"names": [
																	"unit",
																	"start",
																	"end"
																],
																"type": "struct Proposal.TimeSpan memory",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1890,
																		"type": "type(struct Proposal.TimeSpan storage pointer)",
																		"value": "TimeSpan"
																	},
																	"id": 1944,
																	"name": "Identifier",
																	"src": "1016:8:20"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1930,
																		"type": "enum Proposal.UnitOfTime",
																		"value": "unit"
																	},
																	"id": 1945,
																	"name": "Identifier",
																	"src": "1032:4:20"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1920,
																		"type": "uint256",
																		"value": "start"
																	},
																	"id": 1946,
																	"name": "Identifier",
																	"src": "1045:5:20"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1922,
																		"type": "uint256",
																		"value": "end"
																	},
																	"id": 1947,
																	"name": "Identifier",
																	"src": "1057:3:20"
																}
															],
															"id": 1948,
															"name": "FunctionCall",
															"src": "1016:46:20"
														}
													],
													"id": 1949,
													"name": "Assignment",
													"src": "1005:57:20"
												}
											],
											"id": 1950,
											"name": "ExpressionStatement",
											"src": "1005:57:20"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	1902
																],
																"referencedDeclaration": 1902,
																"type": "uint256",
																"value": "createdAt"
															},
															"id": 1951,
															"name": "Identifier",
															"src": "1072:9:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isInlineArray": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"commonType": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		},
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "-",
																		"type": "uint256"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "number",
																				"referencedDeclaration": null,
																				"type": "uint256"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 2705,
																						"type": "block",
																						"value": "block"
																					},
																					"id": 1952,
																					"name": "Identifier",
																					"src": "1085:5:20"
																				}
																			],
																			"id": 1953,
																			"name": "MemberAccess",
																			"src": "1085:12:20"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"hexvalue": "31",
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": true,
																				"lValueRequested": false,
																				"subdenomination": null,
																				"token": "number",
																				"type": "int_const 1",
																				"value": "1"
																			},
																			"id": 1954,
																			"name": "Literal",
																			"src": "1100:1:20"
																		}
																	],
																	"id": 1955,
																	"name": "BinaryOperation",
																	"src": "1085:16:20"
																}
															],
															"id": 1956,
															"name": "TupleExpression",
															"src": "1084:18:20"
														}
													],
													"id": 1957,
													"name": "Assignment",
													"src": "1072:30:20"
												}
											],
											"id": 1958,
											"name": "ExpressionStatement",
											"src": "1072:30:20"
										}
									],
									"id": 1959,
									"name": "Block",
									"src": "842:267:20"
								}
							],
							"id": 1960,
							"name": "FunctionDefinition",
							"src": "750:359:20"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "execute",
								"payable": false,
								"scope": 2140,
								"stateMutability": "nonpayable",
								"superFunction": 2147,
								"visibility": "external"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1961,
									"name": "ParameterList",
									"src": "1189:2:20"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1962,
									"name": "ParameterList",
									"src": "1201:0:20"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 1963,
															"name": "Identifier",
															"src": "1211:7:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"commonType": {
																	"typeIdentifier": "t_bool",
																	"typeString": "bool"
																},
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": "&&",
																"type": "bool"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"commonType": {
																			"typeIdentifier": "t_bool",
																			"typeString": "bool"
																		},
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "&&",
																		"type": "bool"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"arguments": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "bool",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							null
																						],
																						"overloadedDeclarations": [
																							2123
																						],
																						"referencedDeclaration": 2123,
																						"type": "function () view returns (bool)",
																						"value": "canExecute"
																					},
																					"id": 1964,
																					"name": "Identifier",
																					"src": "1219:10:20"
																				}
																			],
																			"id": 1965,
																			"name": "FunctionCall",
																			"src": "1219:12:20"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"arguments": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "bool",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							null
																						],
																						"overloadedDeclarations": [
																							2111
																						],
																						"referencedDeclaration": 2111,
																						"type": "function () view returns (bool)",
																						"value": "isAccepted"
																					},
																					"id": 1966,
																					"name": "Identifier",
																					"src": "1235:10:20"
																				}
																			],
																			"id": 1967,
																			"name": "FunctionCall",
																			"src": "1235:12:20"
																		}
																	],
																	"id": 1968,
																	"name": "BinaryOperation",
																	"src": "1219:28:20"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "!",
																		"prefix": true,
																		"type": "bool"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"arguments": [
																					null
																				],
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": false,
																				"lValueRequested": false,
																				"names": [
																					null
																				],
																				"type": "bool",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": [
																							null
																						],
																						"overloadedDeclarations": [
																							2131
																						],
																						"referencedDeclaration": 2131,
																						"type": "function () view returns (bool)",
																						"value": "isExecuted"
																					},
																					"id": 1969,
																					"name": "Identifier",
																					"src": "1252:10:20"
																				}
																			],
																			"id": 1970,
																			"name": "FunctionCall",
																			"src": "1252:12:20"
																		}
																	],
																	"id": 1971,
																	"name": "UnaryOperation",
																	"src": "1251:13:20"
																}
															],
															"id": 1972,
															"name": "BinaryOperation",
															"src": "1219:45:20"
														}
													],
													"id": 1973,
													"name": "FunctionCall",
													"src": "1211:54:20"
												}
											],
											"id": 1974,
											"name": "ExpressionStatement",
											"src": "1211:54:20"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1910,
																"type": "bool",
																"value": "executed"
															},
															"id": 1975,
															"name": "Identifier",
															"src": "1275:8:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"hexvalue": "74727565",
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"subdenomination": null,
																"token": "bool",
																"type": "bool",
																"value": "true"
															},
															"id": 1976,
															"name": "Literal",
															"src": "1286:4:20"
														}
													],
													"id": 1977,
													"name": "Assignment",
													"src": "1275:15:20"
												}
											],
											"id": 1978,
											"name": "ExpressionStatement",
											"src": "1275:15:20"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_contract$_Proposal_$2140",
																		"typeString": "contract Proposal"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "execute",
																"referencedDeclaration": 1877,
																"type": "function (address) external"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1914,
																		"type": "contract ExecutorInterface",
																		"value": "executor"
																	},
																	"id": 1979,
																	"name": "Identifier",
																	"src": "1300:8:20"
																}
															],
															"id": 1981,
															"name": "MemberAccess",
															"src": "1300:16:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2776,
																"type": "contract Proposal",
																"value": "this"
															},
															"id": 1982,
															"name": "Identifier",
															"src": "1317:4:20"
														}
													],
													"id": 1983,
													"name": "FunctionCall",
													"src": "1300:22:20"
												}
											],
											"id": 1984,
											"name": "ExpressionStatement",
											"src": "1300:22:20"
										}
									],
									"id": 1985,
									"name": "Block",
									"src": "1201:128:20"
								}
							],
							"id": 1986,
							"name": "FunctionDefinition",
							"src": "1173:156:20"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "setWinningOption",
								"payable": false,
								"scope": 2140,
								"stateMutability": "nonpayable",
								"superFunction": 2152,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "option",
												"scope": 2022,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1987,
													"name": "ElementaryTypeName",
													"src": "1415:4:20"
												}
											],
											"id": 1988,
											"name": "VariableDeclaration",
											"src": "1415:11:20"
										}
									],
									"id": 1989,
									"name": "ParameterList",
									"src": "1414:13:20"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1990,
									"name": "ParameterList",
									"src": "1437:0:20"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 1991,
															"name": "Identifier",
															"src": "1447:7:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": "!",
																"prefix": true,
																"type": "bool"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1907,
																		"type": "bool",
																		"value": "tallied"
																	},
																	"id": 1992,
																	"name": "Identifier",
																	"src": "1456:7:20"
																}
															],
															"id": 1993,
															"name": "UnaryOperation",
															"src": "1455:8:20"
														}
													],
													"id": 1994,
													"name": "FunctionCall",
													"src": "1447:17:20"
												}
											],
											"id": 1995,
											"name": "ExpressionStatement",
											"src": "1447:17:20"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "bool",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "optionWillAccept",
																"referencedDeclaration": 1824,
																"type": "function (uint256) view external returns (bool)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1912,
																		"type": "contract BallotInterface",
																		"value": "ballot"
																	},
																	"id": 1996,
																	"name": "Identifier",
																	"src": "1479:6:20"
																}
															],
															"id": 1997,
															"name": "MemberAccess",
															"src": "1479:23:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1988,
																"type": "uint256",
																"value": "option"
															},
															"id": 1998,
															"name": "Identifier",
															"src": "1503:6:20"
														}
													],
													"id": 1999,
													"name": "FunctionCall",
													"src": "1479:31:20"
												},
												{
													"children": [
														{
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "=",
																		"type": "enum Proposal.State"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1898,
																				"type": "enum Proposal.State",
																				"value": "state"
																			},
																			"id": 2000,
																			"name": "Identifier",
																			"src": "1526:5:20"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": true,
																				"lValueRequested": false,
																				"member_name": "Accepted",
																				"referencedDeclaration": null,
																				"type": "enum Proposal.State"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1896,
																						"type": "type(enum Proposal.State)",
																						"value": "State"
																					},
																					"id": 2001,
																					"name": "Identifier",
																					"src": "1534:5:20"
																				}
																			],
																			"id": 2002,
																			"name": "MemberAccess",
																			"src": "1534:14:20"
																		}
																	],
																	"id": 2003,
																	"name": "Assignment",
																	"src": "1526:22:20"
																}
															],
															"id": 2004,
															"name": "ExpressionStatement",
															"src": "1526:22:20"
														}
													],
													"id": 2005,
													"name": "Block",
													"src": "1512:47:20"
												},
												{
													"children": [
														{
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "=",
																		"type": "enum Proposal.State"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1898,
																				"type": "enum Proposal.State",
																				"value": "state"
																			},
																			"id": 2006,
																			"name": "Identifier",
																			"src": "1579:5:20"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": true,
																				"lValueRequested": false,
																				"member_name": "Rejected",
																				"referencedDeclaration": null,
																				"type": "enum Proposal.State"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1896,
																						"type": "type(enum Proposal.State)",
																						"value": "State"
																					},
																					"id": 2007,
																					"name": "Identifier",
																					"src": "1587:5:20"
																				}
																			],
																			"id": 2008,
																			"name": "MemberAccess",
																			"src": "1587:14:20"
																		}
																	],
																	"id": 2009,
																	"name": "Assignment",
																	"src": "1579:22:20"
																}
															],
															"id": 2010,
															"name": "ExpressionStatement",
															"src": "1579:22:20"
														}
													],
													"id": 2011,
													"name": "Block",
													"src": "1565:47:20"
												}
											],
											"id": 2012,
											"name": "IfStatement",
											"src": "1475:137:20"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1904,
																"type": "uint256",
																"value": "winningOption"
															},
															"id": 2013,
															"name": "Identifier",
															"src": "1622:13:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1988,
																"type": "uint256",
																"value": "option"
															},
															"id": 2014,
															"name": "Identifier",
															"src": "1638:6:20"
														}
													],
													"id": 2015,
													"name": "Assignment",
													"src": "1622:22:20"
												}
											],
											"id": 2016,
											"name": "ExpressionStatement",
											"src": "1622:22:20"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1907,
																"type": "bool",
																"value": "tallied"
															},
															"id": 2017,
															"name": "Identifier",
															"src": "1654:7:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"hexvalue": "74727565",
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"subdenomination": null,
																"token": "bool",
																"type": "bool",
																"value": "true"
															},
															"id": 2018,
															"name": "Literal",
															"src": "1664:4:20"
														}
													],
													"id": 2019,
													"name": "Assignment",
													"src": "1654:14:20"
												}
											],
											"id": 2020,
											"name": "ExpressionStatement",
											"src": "1654:14:20"
										}
									],
									"id": 2021,
									"name": "Block",
									"src": "1437:238:20"
								}
							],
							"id": 2022,
							"name": "FunctionDefinition",
							"src": "1389:286:20"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "isVoting",
								"payable": false,
								"scope": 2140,
								"stateMutability": "view",
								"superFunction": 2157,
								"visibility": "external"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2023,
									"name": "ParameterList",
									"src": "1698:2:20"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2059,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 2024,
													"name": "ElementaryTypeName",
													"src": "1724:4:20"
												}
											],
											"id": 2025,
											"name": "VariableDeclaration",
											"src": "1724:4:20"
										}
									],
									"id": 2026,
									"name": "ParameterList",
									"src": "1723:6:20"
								},
								{
									"children": [
										{
											"attributes": {
												"falseBody": null
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_enum$_UnitOfTime_$1893",
															"typeString": "enum Proposal.UnitOfTime"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "==",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "unit",
																"referencedDeclaration": 1885,
																"type": "enum Proposal.UnitOfTime"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1900,
																		"type": "struct Proposal.TimeSpan storage ref",
																		"value": "timeSpan"
																	},
																	"id": 2027,
																	"name": "Identifier",
																	"src": "1744:8:20"
																}
															],
															"id": 2028,
															"name": "MemberAccess",
															"src": "1744:13:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"member_name": "Block",
																"referencedDeclaration": null,
																"type": "enum Proposal.UnitOfTime"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1893,
																		"type": "type(enum Proposal.UnitOfTime)",
																		"value": "UnitOfTime"
																	},
																	"id": 2029,
																	"name": "Identifier",
																	"src": "1761:10:20"
																}
															],
															"id": 2030,
															"name": "MemberAccess",
															"src": "1761:16:20"
														}
													],
													"id": 2031,
													"name": "BinaryOperation",
													"src": "1744:33:20"
												},
												{
													"children": [
														{
															"attributes": {
																"functionReturnParameters": 2026
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"commonType": {
																			"typeIdentifier": "t_bool",
																			"typeString": "bool"
																		},
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "&&",
																		"type": "bool"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"commonType": {
																					"typeIdentifier": "t_uint256",
																					"typeString": "uint256"
																				},
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"operator": ">=",
																				"type": "bool"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "number",
																						"referencedDeclaration": null,
																						"type": "uint256"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 2705,
																								"type": "block",
																								"value": "block"
																							},
																							"id": 2032,
																							"name": "Identifier",
																							"src": "1800:5:20"
																						}
																					],
																					"id": 2033,
																					"name": "MemberAccess",
																					"src": "1800:12:20"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "start",
																						"referencedDeclaration": 1887,
																						"type": "uint256"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1900,
																								"type": "struct Proposal.TimeSpan storage ref",
																								"value": "timeSpan"
																							},
																							"id": 2034,
																							"name": "Identifier",
																							"src": "1816:8:20"
																						}
																					],
																					"id": 2035,
																					"name": "MemberAccess",
																					"src": "1816:14:20"
																				}
																			],
																			"id": 2036,
																			"name": "BinaryOperation",
																			"src": "1800:30:20"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"commonType": {
																					"typeIdentifier": "t_uint256",
																					"typeString": "uint256"
																				},
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"operator": "<=",
																				"type": "bool"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "number",
																						"referencedDeclaration": null,
																						"type": "uint256"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 2705,
																								"type": "block",
																								"value": "block"
																							},
																							"id": 2037,
																							"name": "Identifier",
																							"src": "1834:5:20"
																						}
																					],
																					"id": 2038,
																					"name": "MemberAccess",
																					"src": "1834:12:20"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "end",
																						"referencedDeclaration": 1889,
																						"type": "uint256"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1900,
																								"type": "struct Proposal.TimeSpan storage ref",
																								"value": "timeSpan"
																							},
																							"id": 2039,
																							"name": "Identifier",
																							"src": "1850:8:20"
																						}
																					],
																					"id": 2040,
																					"name": "MemberAccess",
																					"src": "1850:12:20"
																				}
																			],
																			"id": 2041,
																			"name": "BinaryOperation",
																			"src": "1834:28:20"
																		}
																	],
																	"id": 2042,
																	"name": "BinaryOperation",
																	"src": "1800:62:20"
																}
															],
															"id": 2043,
															"name": "Return",
															"src": "1793:69:20"
														}
													],
													"id": 2044,
													"name": "Block",
													"src": "1779:94:20"
												}
											],
											"id": 2045,
											"name": "IfStatement",
											"src": "1740:133:20"
										},
										{
											"attributes": {
												"functionReturnParameters": 2026
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_bool",
															"typeString": "bool"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "&&",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"commonType": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																},
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": ">=",
																"type": "bool"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "timestamp",
																		"referencedDeclaration": null,
																		"type": "uint256"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 2705,
																				"type": "block",
																				"value": "block"
																			},
																			"id": 2046,
																			"name": "Identifier",
																			"src": "1890:5:20"
																		}
																	],
																	"id": 2047,
																	"name": "MemberAccess",
																	"src": "1890:15:20"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "start",
																		"referencedDeclaration": 1887,
																		"type": "uint256"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1900,
																				"type": "struct Proposal.TimeSpan storage ref",
																				"value": "timeSpan"
																			},
																			"id": 2048,
																			"name": "Identifier",
																			"src": "1909:8:20"
																		}
																	],
																	"id": 2049,
																	"name": "MemberAccess",
																	"src": "1909:14:20"
																}
															],
															"id": 2050,
															"name": "BinaryOperation",
															"src": "1890:33:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"commonType": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																},
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": "<=",
																"type": "bool"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "timestamp",
																		"referencedDeclaration": null,
																		"type": "uint256"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 2705,
																				"type": "block",
																				"value": "block"
																			},
																			"id": 2051,
																			"name": "Identifier",
																			"src": "1927:5:20"
																		}
																	],
																	"id": 2052,
																	"name": "MemberAccess",
																	"src": "1927:15:20"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "end",
																		"referencedDeclaration": 1889,
																		"type": "uint256"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1900,
																				"type": "struct Proposal.TimeSpan storage ref",
																				"value": "timeSpan"
																			},
																			"id": 2053,
																			"name": "Identifier",
																			"src": "1946:8:20"
																		}
																	],
																	"id": 2054,
																	"name": "MemberAccess",
																	"src": "1946:12:20"
																}
															],
															"id": 2055,
															"name": "BinaryOperation",
															"src": "1927:31:20"
														}
													],
													"id": 2056,
													"name": "BinaryOperation",
													"src": "1890:68:20"
												}
											],
											"id": 2057,
											"name": "Return",
											"src": "1883:75:20"
										}
									],
									"id": 2058,
									"name": "Block",
									"src": "1730:235:20"
								}
							],
							"id": 2059,
							"name": "FunctionDefinition",
							"src": "1681:284:20"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "isEnded",
								"payable": false,
								"scope": 2140,
								"stateMutability": "view",
								"superFunction": 2162,
								"visibility": "external"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2060,
									"name": "ParameterList",
									"src": "1987:2:20"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2084,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 2061,
													"name": "ElementaryTypeName",
													"src": "2013:4:20"
												}
											],
											"id": 2062,
											"name": "VariableDeclaration",
											"src": "2013:4:20"
										}
									],
									"id": 2063,
									"name": "ParameterList",
									"src": "2012:6:20"
								},
								{
									"children": [
										{
											"attributes": {
												"falseBody": null
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_enum$_UnitOfTime_$1893",
															"typeString": "enum Proposal.UnitOfTime"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "==",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "unit",
																"referencedDeclaration": 1885,
																"type": "enum Proposal.UnitOfTime"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1900,
																		"type": "struct Proposal.TimeSpan storage ref",
																		"value": "timeSpan"
																	},
																	"id": 2064,
																	"name": "Identifier",
																	"src": "2033:8:20"
																}
															],
															"id": 2065,
															"name": "MemberAccess",
															"src": "2033:13:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"member_name": "Block",
																"referencedDeclaration": null,
																"type": "enum Proposal.UnitOfTime"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1893,
																		"type": "type(enum Proposal.UnitOfTime)",
																		"value": "UnitOfTime"
																	},
																	"id": 2066,
																	"name": "Identifier",
																	"src": "2050:10:20"
																}
															],
															"id": 2067,
															"name": "MemberAccess",
															"src": "2050:16:20"
														}
													],
													"id": 2068,
													"name": "BinaryOperation",
													"src": "2033:33:20"
												},
												{
													"children": [
														{
															"attributes": {
																"functionReturnParameters": 2063
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"commonType": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		},
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "<",
																		"type": "bool"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "end",
																				"referencedDeclaration": 1889,
																				"type": "uint256"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1900,
																						"type": "struct Proposal.TimeSpan storage ref",
																						"value": "timeSpan"
																					},
																					"id": 2069,
																					"name": "Identifier",
																					"src": "2089:8:20"
																				}
																			],
																			"id": 2070,
																			"name": "MemberAccess",
																			"src": "2089:12:20"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "number",
																				"referencedDeclaration": null,
																				"type": "uint256"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 2705,
																						"type": "block",
																						"value": "block"
																					},
																					"id": 2071,
																					"name": "Identifier",
																					"src": "2104:5:20"
																				}
																			],
																			"id": 2072,
																			"name": "MemberAccess",
																			"src": "2104:12:20"
																		}
																	],
																	"id": 2073,
																	"name": "BinaryOperation",
																	"src": "2089:27:20"
																}
															],
															"id": 2074,
															"name": "Return",
															"src": "2082:34:20"
														}
													],
													"id": 2075,
													"name": "Block",
													"src": "2068:59:20"
												}
											],
											"id": 2076,
											"name": "IfStatement",
											"src": "2029:98:20"
										},
										{
											"attributes": {
												"functionReturnParameters": 2063
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": ">",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "end",
																"referencedDeclaration": 1889,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1900,
																		"type": "struct Proposal.TimeSpan storage ref",
																		"value": "timeSpan"
																	},
																	"id": 2077,
																	"name": "Identifier",
																	"src": "2144:8:20"
																}
															],
															"id": 2078,
															"name": "MemberAccess",
															"src": "2144:12:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "timestamp",
																"referencedDeclaration": null,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2705,
																		"type": "block",
																		"value": "block"
																	},
																	"id": 2079,
																	"name": "Identifier",
																	"src": "2159:5:20"
																}
															],
															"id": 2080,
															"name": "MemberAccess",
															"src": "2159:15:20"
														}
													],
													"id": 2081,
													"name": "BinaryOperation",
													"src": "2144:30:20"
												}
											],
											"id": 2082,
											"name": "Return",
											"src": "2137:37:20"
										}
									],
									"id": 2083,
									"name": "Block",
									"src": "2019:162:20"
								}
							],
							"id": 2084,
							"name": "FunctionDefinition",
							"src": "1971:210:20"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "ballot",
								"payable": false,
								"scope": 2140,
								"stateMutability": "view",
								"superFunction": 2167,
								"visibility": "external"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2085,
									"name": "ParameterList",
									"src": "2202:2:20"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2092,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract BallotInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "BallotInterface",
														"referencedDeclaration": 1870,
														"type": "contract BallotInterface"
													},
													"id": 2086,
													"name": "UserDefinedTypeName",
													"src": "2228:15:20"
												}
											],
											"id": 2087,
											"name": "VariableDeclaration",
											"src": "2228:15:20"
										}
									],
									"id": 2088,
									"name": "ParameterList",
									"src": "2227:17:20"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 2088
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"overloadedDeclarations": [
															null
														],
														"referencedDeclaration": 1912,
														"type": "contract BallotInterface",
														"value": "ballot"
													},
													"id": 2089,
													"name": "Identifier",
													"src": "2262:6:20"
												}
											],
											"id": 2090,
											"name": "Return",
											"src": "2255:13:20"
										}
									],
									"id": 2091,
									"name": "Block",
									"src": "2245:30:20"
								}
							],
							"id": 2092,
							"name": "FunctionDefinition",
							"src": "2187:88:20"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "executor",
								"payable": false,
								"scope": 2140,
								"stateMutability": "view",
								"superFunction": 2172,
								"visibility": "external"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2093,
									"name": "ParameterList",
									"src": "2298:2:20"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2100,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract ExecutorInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "ExecutorInterface",
														"referencedDeclaration": 1878,
														"type": "contract ExecutorInterface"
													},
													"id": 2094,
													"name": "UserDefinedTypeName",
													"src": "2324:17:20"
												}
											],
											"id": 2095,
											"name": "VariableDeclaration",
											"src": "2324:17:20"
										}
									],
									"id": 2096,
									"name": "ParameterList",
									"src": "2323:19:20"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 2096
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"overloadedDeclarations": [
															null
														],
														"referencedDeclaration": 1914,
														"type": "contract ExecutorInterface",
														"value": "executor"
													},
													"id": 2097,
													"name": "Identifier",
													"src": "2360:8:20"
												}
											],
											"id": 2098,
											"name": "Return",
											"src": "2353:15:20"
										}
									],
									"id": 2099,
									"name": "Block",
									"src": "2343:32:20"
								}
							],
							"id": 2100,
							"name": "FunctionDefinition",
							"src": "2281:94:20"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "isAccepted",
								"payable": false,
								"scope": 2140,
								"stateMutability": "view",
								"superFunction": 2177,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2101,
									"name": "ParameterList",
									"src": "2400:2:20"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2111,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 2102,
													"name": "ElementaryTypeName",
													"src": "2424:4:20"
												}
											],
											"id": 2103,
											"name": "VariableDeclaration",
											"src": "2424:4:20"
										}
									],
									"id": 2104,
									"name": "ParameterList",
									"src": "2423:6:20"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 2104
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_enum$_State_$1896",
															"typeString": "enum Proposal.State"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "==",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1898,
																"type": "enum Proposal.State",
																"value": "state"
															},
															"id": 2105,
															"name": "Identifier",
															"src": "2447:5:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"member_name": "Accepted",
																"referencedDeclaration": null,
																"type": "enum Proposal.State"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1896,
																		"type": "type(enum Proposal.State)",
																		"value": "State"
																	},
																	"id": 2106,
																	"name": "Identifier",
																	"src": "2456:5:20"
																}
															],
															"id": 2107,
															"name": "MemberAccess",
															"src": "2456:14:20"
														}
													],
													"id": 2108,
													"name": "BinaryOperation",
													"src": "2447:23:20"
												}
											],
											"id": 2109,
											"name": "Return",
											"src": "2440:30:20"
										}
									],
									"id": 2110,
									"name": "Block",
									"src": "2430:47:20"
								}
							],
							"id": 2111,
							"name": "FunctionDefinition",
							"src": "2381:96:20"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "canExecute",
								"payable": false,
								"scope": 2140,
								"stateMutability": "view",
								"superFunction": 2182,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2112,
									"name": "ParameterList",
									"src": "2502:2:20"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2123,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 2113,
													"name": "ElementaryTypeName",
													"src": "2526:4:20"
												}
											],
											"id": 2114,
											"name": "VariableDeclaration",
											"src": "2526:4:20"
										}
									],
									"id": 2115,
									"name": "ParameterList",
									"src": "2525:6:20"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 2115
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_address",
															"typeString": "address"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "!=",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "address",
																"type_conversion": true
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_contract$_ExecutorInterface_$1878",
																				"typeString": "contract ExecutorInterface"
																			}
																		],
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": true,
																		"lValueRequested": false,
																		"type": "type(address)",
																		"value": "address"
																	},
																	"id": 2116,
																	"name": "ElementaryTypeNameExpression",
																	"src": "2549:7:20"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1914,
																		"type": "contract ExecutorInterface",
																		"value": "executor"
																	},
																	"id": 2117,
																	"name": "Identifier",
																	"src": "2557:8:20"
																}
															],
															"id": 2118,
															"name": "FunctionCall",
															"src": "2549:17:20"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"hexvalue": "307830",
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"subdenomination": null,
																"token": "number",
																"type": "int_const 0",
																"value": "0x0"
															},
															"id": 2119,
															"name": "Literal",
															"src": "2570:3:20"
														}
													],
													"id": 2120,
													"name": "BinaryOperation",
													"src": "2549:24:20"
												}
											],
											"id": 2121,
											"name": "Return",
											"src": "2542:31:20"
										}
									],
									"id": 2122,
									"name": "Block",
									"src": "2532:48:20"
								}
							],
							"id": 2123,
							"name": "FunctionDefinition",
							"src": "2483:97:20"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "isExecuted",
								"payable": false,
								"scope": 2140,
								"stateMutability": "view",
								"superFunction": 2187,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2124,
									"name": "ParameterList",
									"src": "2605:2:20"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2131,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 2125,
													"name": "ElementaryTypeName",
													"src": "2629:4:20"
												}
											],
											"id": 2126,
											"name": "VariableDeclaration",
											"src": "2629:4:20"
										}
									],
									"id": 2127,
									"name": "ParameterList",
									"src": "2628:6:20"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 2127
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"overloadedDeclarations": [
															null
														],
														"referencedDeclaration": 1910,
														"type": "bool",
														"value": "executed"
													},
													"id": 2128,
													"name": "Identifier",
													"src": "2652:8:20"
												}
											],
											"id": 2129,
											"name": "Return",
											"src": "2645:15:20"
										}
									],
									"id": 2130,
									"name": "Block",
									"src": "2635:32:20"
								}
							],
							"id": 2131,
							"name": "FunctionDefinition",
							"src": "2586:81:20"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "createdAt",
								"payable": false,
								"scope": 2140,
								"stateMutability": "view",
								"superFunction": 2192,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2132,
									"name": "ParameterList",
									"src": "2691:2:20"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2139,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 2133,
													"name": "ElementaryTypeName",
													"src": "2715:4:20"
												}
											],
											"id": 2134,
											"name": "VariableDeclaration",
											"src": "2715:4:20"
										}
									],
									"id": 2135,
									"name": "ParameterList",
									"src": "2714:6:20"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 2135
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"overloadedDeclarations": [
															1902
														],
														"referencedDeclaration": 1902,
														"type": "uint256",
														"value": "createdAt"
													},
													"id": 2136,
													"name": "Identifier",
													"src": "2738:9:20"
												}
											],
											"id": 2137,
											"name": "Return",
											"src": "2731:16:20"
										}
									],
									"id": 2138,
									"name": "Block",
									"src": "2721:33:20"
								}
							],
							"id": 2139,
							"name": "FunctionDefinition",
							"src": "2673:81:20"
						}
					],
					"id": 2140,
					"name": "ContractDefinition",
					"src": "153:2603:20"
				}
			],
			"id": 2141,
			"name": "SourceUnit",
			"src": "0:2757:20"
		},
		"compiler": {
			"name": "solc",
			"version": "0.4.18+commit.9cf6e910.Emscripten.clang"
		},
		"networks": {},
		"schemaVersion": "1.0.1",
		"updatedAt": "2018-01-18T17:45:14.653Z"
	},
	{
		"contractName": "ProposalManager",
		"abi": [
			{
				"constant": true,
				"inputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"name": "proposals",
				"outputs": [
					{
						"name": "approved",
						"type": "bool"
					},
					{
						"name": "creator",
						"type": "address"
					},
					{
						"name": "proposal",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "addr",
						"type": "address"
					}
				],
				"name": "isOwner",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "creator",
						"type": "address"
					},
					{
						"name": "proposal",
						"type": "address"
					}
				],
				"name": "add",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "nextId",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "isApproved",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "owner",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "getProposal",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "newOwner",
						"type": "address"
					}
				],
				"name": "transferOwnership",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}
		],
		"bytecode": "0x60606040526000600155336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506106ec806100586000396000f300606060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063013cf08b1461009e5780632f54bf6e1461013f57806352c28fab1461019057806361b8ce8c146101fc5780637910867b146102255780638da5cb5b14610260578063b759f954146102b5578063c7f758a8146102d8578063f2fde38b1461033b575b600080fd5b34156100a957600080fd5b6100bf6004808035906020019091905050610374565b60405180841515151581526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390f35b341561014a57600080fd5b610176600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103eb565b604051808215151515815260200191505060405180910390f35b341561019b57600080fd5b6101e6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610444565b6040518082815260200191505060405180910390f35b341561020757600080fd5b61020f61058b565b6040518082815260200191505060405180910390f35b341561023057600080fd5b6102466004808035906020019091905050610591565b604051808215151515815260200191505060405180910390f35b341561026b57600080fd5b6102736105be565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102c057600080fd5b6102d660048080359060200190919050506105e3565b005b34156102e357600080fd5b6102f96004808035906020019091905050610629565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561034657600080fd5b610372600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610669565b005b60026020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b60008173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050919050565b600080610450336103eb565b151561045b57600080fd5b60015490506001600081548092919060010191905055506060604051908101604052806000151581526020018573ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff168152506002600083815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050508091505092915050565b60015481565b60006002600083815260200190815260200160002060000160009054906101000a900460ff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6105ec336103eb565b15156105f757600080fd5b60016002600083815260200190815260200160002060000160006101000a81548160ff02191690831515021790555050565b60006002600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b610672336103eb565b151561067d57600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582064f12d6d51ff481610f5393203cd697e94906413a5676ec53ab9c21b862f73460029",
		"deployedBytecode": "0x606060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063013cf08b1461009e5780632f54bf6e1461013f57806352c28fab1461019057806361b8ce8c146101fc5780637910867b146102255780638da5cb5b14610260578063b759f954146102b5578063c7f758a8146102d8578063f2fde38b1461033b575b600080fd5b34156100a957600080fd5b6100bf6004808035906020019091905050610374565b60405180841515151581526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390f35b341561014a57600080fd5b610176600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103eb565b604051808215151515815260200191505060405180910390f35b341561019b57600080fd5b6101e6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610444565b6040518082815260200191505060405180910390f35b341561020757600080fd5b61020f61058b565b6040518082815260200191505060405180910390f35b341561023057600080fd5b6102466004808035906020019091905050610591565b604051808215151515815260200191505060405180910390f35b341561026b57600080fd5b6102736105be565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102c057600080fd5b6102d660048080359060200190919050506105e3565b005b34156102e357600080fd5b6102f96004808035906020019091905050610629565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561034657600080fd5b610372600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610669565b005b60026020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b60008173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050919050565b600080610450336103eb565b151561045b57600080fd5b60015490506001600081548092919060010191905055506060604051908101604052806000151581526020018573ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff168152506002600083815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050508091505092915050565b60015481565b60006002600083815260200190815260200160002060000160009054906101000a900460ff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6105ec336103eb565b15156105f757600080fd5b60016002600083815260200190815260200160002060000160006101000a81548160ff02191690831515021790555050565b60006002600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b610672336103eb565b151561067d57600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582064f12d6d51ff481610f5393203cd697e94906413a5676ec53ab9c21b862f73460029",
		"sourceMap": "103:1388:9:-;;;301:1;280:22;;202:10:15;194:5;;:18;;;;;;;;;;;;;;;;;;103:1388:9;;;;;;",
		"deployedSourceMap": "103:1388:9:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;309:47;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;326:95:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;547:295:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;280:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1154:104;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;50:20:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;920:91:9;;;;;;;;;;;;;;;;;;;;;;;;;;1381:108;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;225:95:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;309:47:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;326:95:15:-;378:4;410;401:13;;:5;;;;;;;;;;;:13;;;394:20;;326:95;;;:::o;547:295:9:-;623:4;639:7;114:19:15;122:10;114:7;:19::i;:::-;106:28;;;;;;;;649:6:9;;639:16;;665:6;;:8;;;;;;;;;;;;;700:115;;;;;;;;;799:5;700:115;;;;;;736:7;700:115;;;;;;767:8;700:115;;;;;684:9;:13;694:2;684:13;;;;;;;;;;;:131;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;833:2;826:9;;547:295;;;;;:::o;280:22::-;;;;:::o;1154:104::-;1206:4;1229:9;:13;1239:2;1229:13;;;;;;;;;;;:22;;;;;;;;;;;;1222:29;;1154:104;;;:::o;50:20:15:-;;;;;;;;;;;;;:::o;920:91:9:-;114:19:15;122:10;114:7;:19::i;:::-;106:28;;;;;;;;1000:4:9;975:9;:13;985:2;975:13;;;;;;;;;;;:22;;;:29;;;;;;;;;;;;;;;;;;920:91;:::o;1381:108::-;1434:7;1460:9;:13;1470:2;1460:13;;;;;;;;;;;:22;;;;;;;;;;;;1453:29;;1381:108;;;:::o;225:95:15:-;114:19;122:10;114:7;:19::i;:::-;106:28;;;;;;;;305:8;297:5;;:16;;;;;;;;;;;;;;;;;;225:95;:::o",
		"source": "pragma solidity ^0.4.18;\n\nimport \"../Ownership/Ownable.sol\";\nimport \"./ProposalManagerInterface.sol\";\n\ncontract ProposalManager is ProposalManagerInterface, Ownable {\n\n    struct ProposalData {\n        bool approved;\n\n        address creator;\n        address proposal;\n    }\n\n    uint public nextId = 0;\n\n    mapping (uint => ProposalData) public proposals;\n\n    /// @dev Adds a new proposal.\n    /// @param creator Address of the proposal creator.\n    /// @param proposal Address of the proposal contract.\n    /// @return id of the proposal.\n    function add(address creator, address proposal) external onlyOwner returns (uint) {\n        uint id = nextId;\n        nextId++;\n\n        proposals[id] = ProposalData({\n            creator: creator,\n            proposal: proposal,\n            approved: false\n        });\n\n        return id;\n    }\n\n    /// @dev Approves a proposal.\n    /// @param id Id of the proposal.\n    function approve(uint id) external onlyOwner {\n        proposals[id].approved = true;\n    }\n\n    /// @dev Checks if a proposal has been approved.\n    /// @param id Id of the proposal.\n    /// @return bool if proposal is approved.\n    function isApproved(uint id) external view returns (bool) {\n        return proposals[id].approved;\n    }\n\n    /// @dev Returns proposal address\n    /// @param id If of the proposal.\n    /// @return address of the proposal.\n    function getProposal(uint id) external view returns (address) {\n        return proposals[id].proposal;\n    }\n}\n",
		"sourcePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Managers/ProposalManager.sol",
		"ast": {
			"attributes": {
				"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Managers/ProposalManager.sol",
				"exportedSymbols": {
					"ProposalManager": [
						661
					]
				}
			},
			"children": [
				{
					"attributes": {
						"literals": [
							"solidity",
							"^",
							"0.4",
							".18"
						]
					},
					"id": 568,
					"name": "PragmaDirective",
					"src": "0:24:9"
				},
				{
					"attributes": {
						"SourceUnit": 1347,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Ownership/Ownable.sol",
						"file": "../Ownership/Ownable.sol",
						"scope": 662,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 569,
					"name": "ImportDirective",
					"src": "26:34:9"
				},
				{
					"attributes": {
						"SourceUnit": 693,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Managers/ProposalManagerInterface.sol",
						"file": "./ProposalManagerInterface.sol",
						"scope": 662,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 570,
					"name": "ImportDirective",
					"src": "61:40:9"
				},
				{
					"attributes": {
						"contractDependencies": [
							692,
							1346
						],
						"contractKind": "contract",
						"documentation": null,
						"fullyImplemented": true,
						"linearizedBaseContracts": [
							661,
							1346,
							692
						],
						"name": "ProposalManager",
						"scope": 662
					},
					"children": [
						{
							"attributes": {
								"arguments": [
									null
								]
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "ProposalManagerInterface",
										"referencedDeclaration": 692,
										"type": "contract ProposalManagerInterface"
									},
									"id": 571,
									"name": "UserDefinedTypeName",
									"src": "131:24:9"
								}
							],
							"id": 572,
							"name": "InheritanceSpecifier",
							"src": "131:24:9"
						},
						{
							"attributes": {
								"arguments": [
									null
								]
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "Ownable",
										"referencedDeclaration": 1346,
										"type": "contract Ownable"
									},
									"id": 573,
									"name": "UserDefinedTypeName",
									"src": "157:7:9"
								}
							],
							"id": 574,
							"name": "InheritanceSpecifier",
							"src": "157:7:9"
						},
						{
							"attributes": {
								"canonicalName": "ProposalManager.ProposalData",
								"name": "ProposalData",
								"scope": 661,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"constant": false,
										"name": "approved",
										"scope": 581,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "bool",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "bool",
												"type": "bool"
											},
											"id": 575,
											"name": "ElementaryTypeName",
											"src": "202:4:9"
										}
									],
									"id": 576,
									"name": "VariableDeclaration",
									"src": "202:13:9"
								},
								{
									"attributes": {
										"constant": false,
										"name": "creator",
										"scope": 581,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "address",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "address",
												"type": "address"
											},
											"id": 577,
											"name": "ElementaryTypeName",
											"src": "226:7:9"
										}
									],
									"id": 578,
									"name": "VariableDeclaration",
									"src": "226:15:9"
								},
								{
									"attributes": {
										"constant": false,
										"name": "proposal",
										"scope": 581,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "address",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "address",
												"type": "address"
											},
											"id": 579,
											"name": "ElementaryTypeName",
											"src": "251:7:9"
										}
									],
									"id": 580,
									"name": "VariableDeclaration",
									"src": "251:16:9"
								}
							],
							"id": 581,
							"name": "StructDefinition",
							"src": "172:102:9"
						},
						{
							"attributes": {
								"constant": false,
								"name": "nextId",
								"scope": 661,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "uint256",
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"name": "uint",
										"type": "uint256"
									},
									"id": 582,
									"name": "ElementaryTypeName",
									"src": "280:4:9"
								},
								{
									"attributes": {
										"argumentTypes": null,
										"hexvalue": "30",
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"lValueRequested": false,
										"subdenomination": null,
										"token": "number",
										"type": "int_const 0",
										"value": "0"
									},
									"id": 583,
									"name": "Literal",
									"src": "301:1:9"
								}
							],
							"id": 584,
							"name": "VariableDeclaration",
							"src": "280:22:9"
						},
						{
							"attributes": {
								"constant": false,
								"name": "proposals",
								"scope": 661,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "mapping(uint256 => struct ProposalManager.ProposalData storage ref)",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"type": "mapping(uint256 => struct ProposalManager.ProposalData storage ref)"
									},
									"children": [
										{
											"attributes": {
												"name": "uint",
												"type": "uint256"
											},
											"id": 585,
											"name": "ElementaryTypeName",
											"src": "318:4:9"
										},
										{
											"attributes": {
												"contractScope": null,
												"name": "ProposalData",
												"referencedDeclaration": 581,
												"type": "struct ProposalManager.ProposalData storage pointer"
											},
											"id": 586,
											"name": "UserDefinedTypeName",
											"src": "326:12:9"
										}
									],
									"id": 587,
									"name": "Mapping",
									"src": "309:30:9"
								}
							],
							"id": 588,
							"name": "VariableDeclaration",
							"src": "309:47:9"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"name": "add",
								"payable": false,
								"scope": 661,
								"stateMutability": "nonpayable",
								"superFunction": 672,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "creator",
												"scope": 619,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 589,
													"name": "ElementaryTypeName",
													"src": "560:7:9"
												}
											],
											"id": 590,
											"name": "VariableDeclaration",
											"src": "560:15:9"
										},
										{
											"attributes": {
												"constant": false,
												"name": "proposal",
												"scope": 619,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 591,
													"name": "ElementaryTypeName",
													"src": "577:7:9"
												}
											],
											"id": 592,
											"name": "VariableDeclaration",
											"src": "577:16:9"
										}
									],
									"id": 593,
									"name": "ParameterList",
									"src": "559:35:9"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 619,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 596,
													"name": "ElementaryTypeName",
													"src": "623:4:9"
												}
											],
											"id": 597,
											"name": "VariableDeclaration",
											"src": "623:4:9"
										}
									],
									"id": 598,
									"name": "ParameterList",
									"src": "622:6:9"
								},
								{
									"attributes": {
										"arguments": [
											null
										]
									},
									"children": [
										{
											"attributes": {
												"argumentTypes": null,
												"overloadedDeclarations": [
													null
												],
												"referencedDeclaration": 1312,
												"type": "modifier ()",
												"value": "onlyOwner"
											},
											"id": 594,
											"name": "Identifier",
											"src": "604:9:9"
										}
									],
									"id": 595,
									"name": "ModifierInvocation",
									"src": "604:9:9"
								},
								{
									"children": [
										{
											"attributes": {
												"assignments": [
													600
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "id",
														"scope": 619,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "uint256",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"name": "uint",
																"type": "uint256"
															},
															"id": 599,
															"name": "ElementaryTypeName",
															"src": "639:4:9"
														}
													],
													"id": 600,
													"name": "VariableDeclaration",
													"src": "639:7:9"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"overloadedDeclarations": [
															null
														],
														"referencedDeclaration": 584,
														"type": "uint256",
														"value": "nextId"
													},
													"id": 601,
													"name": "Identifier",
													"src": "649:6:9"
												}
											],
											"id": 602,
											"name": "VariableDeclarationStatement",
											"src": "639:16:9"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "++",
														"prefix": false,
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 584,
																"type": "uint256",
																"value": "nextId"
															},
															"id": 603,
															"name": "Identifier",
															"src": "665:6:9"
														}
													],
													"id": 604,
													"name": "UnaryOperation",
													"src": "665:8:9"
												}
											],
											"id": 605,
											"name": "ExpressionStatement",
											"src": "665:8:9"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "struct ProposalManager.ProposalData storage ref"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"type": "struct ProposalManager.ProposalData storage ref"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 588,
																		"type": "mapping(uint256 => struct ProposalManager.ProposalData storage ref)",
																		"value": "proposals"
																	},
																	"id": 606,
																	"name": "Identifier",
																	"src": "684:9:9"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 600,
																		"type": "uint256",
																		"value": "id"
																	},
																	"id": 607,
																	"name": "Identifier",
																	"src": "694:2:9"
																}
															],
															"id": 608,
															"name": "IndexAccess",
															"src": "684:13:9"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": true,
																"lValueRequested": false,
																"names": [
																	"creator",
																	"proposal",
																	"approved"
																],
																"type": "struct ProposalManager.ProposalData memory",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 581,
																		"type": "type(struct ProposalManager.ProposalData storage pointer)",
																		"value": "ProposalData"
																	},
																	"id": 609,
																	"name": "Identifier",
																	"src": "700:12:9"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 590,
																		"type": "address",
																		"value": "creator"
																	},
																	"id": 610,
																	"name": "Identifier",
																	"src": "736:7:9"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 592,
																		"type": "address",
																		"value": "proposal"
																	},
																	"id": 611,
																	"name": "Identifier",
																	"src": "767:8:9"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"hexvalue": "66616c7365",
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": true,
																		"lValueRequested": false,
																		"subdenomination": null,
																		"token": "bool",
																		"type": "bool",
																		"value": "false"
																	},
																	"id": 612,
																	"name": "Literal",
																	"src": "799:5:9"
																}
															],
															"id": 613,
															"name": "FunctionCall",
															"src": "700:115:9"
														}
													],
													"id": 614,
													"name": "Assignment",
													"src": "684:131:9"
												}
											],
											"id": 615,
											"name": "ExpressionStatement",
											"src": "684:131:9"
										},
										{
											"attributes": {
												"functionReturnParameters": 598
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"overloadedDeclarations": [
															null
														],
														"referencedDeclaration": 600,
														"type": "uint256",
														"value": "id"
													},
													"id": 616,
													"name": "Identifier",
													"src": "833:2:9"
												}
											],
											"id": 617,
											"name": "Return",
											"src": "826:9:9"
										}
									],
									"id": 618,
									"name": "Block",
									"src": "629:213:9"
								}
							],
							"id": 619,
							"name": "FunctionDefinition",
							"src": "547:295:9"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"name": "approve",
								"payable": false,
								"scope": 661,
								"stateMutability": "nonpayable",
								"superFunction": 677,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "id",
												"scope": 634,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 620,
													"name": "ElementaryTypeName",
													"src": "937:4:9"
												}
											],
											"id": 621,
											"name": "VariableDeclaration",
											"src": "937:7:9"
										}
									],
									"id": 622,
									"name": "ParameterList",
									"src": "936:9:9"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 625,
									"name": "ParameterList",
									"src": "965:0:9"
								},
								{
									"attributes": {
										"arguments": [
											null
										]
									},
									"children": [
										{
											"attributes": {
												"argumentTypes": null,
												"overloadedDeclarations": [
													null
												],
												"referencedDeclaration": 1312,
												"type": "modifier ()",
												"value": "onlyOwner"
											},
											"id": 623,
											"name": "Identifier",
											"src": "955:9:9"
										}
									],
									"id": 624,
									"name": "ModifierInvocation",
									"src": "955:9:9"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"member_name": "approved",
																"referencedDeclaration": 576,
																"type": "bool"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct ProposalManager.ProposalData storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 588,
																				"type": "mapping(uint256 => struct ProposalManager.ProposalData storage ref)",
																				"value": "proposals"
																			},
																			"id": 626,
																			"name": "Identifier",
																			"src": "975:9:9"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 621,
																				"type": "uint256",
																				"value": "id"
																			},
																			"id": 627,
																			"name": "Identifier",
																			"src": "985:2:9"
																		}
																	],
																	"id": 628,
																	"name": "IndexAccess",
																	"src": "975:13:9"
																}
															],
															"id": 629,
															"name": "MemberAccess",
															"src": "975:22:9"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"hexvalue": "74727565",
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"subdenomination": null,
																"token": "bool",
																"type": "bool",
																"value": "true"
															},
															"id": 630,
															"name": "Literal",
															"src": "1000:4:9"
														}
													],
													"id": 631,
													"name": "Assignment",
													"src": "975:29:9"
												}
											],
											"id": 632,
											"name": "ExpressionStatement",
											"src": "975:29:9"
										}
									],
									"id": 633,
									"name": "Block",
									"src": "965:46:9"
								}
							],
							"id": 634,
							"name": "FunctionDefinition",
							"src": "920:91:9"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "isApproved",
								"payable": false,
								"scope": 661,
								"stateMutability": "view",
								"superFunction": 684,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "id",
												"scope": 647,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 635,
													"name": "ElementaryTypeName",
													"src": "1174:4:9"
												}
											],
											"id": 636,
											"name": "VariableDeclaration",
											"src": "1174:7:9"
										}
									],
									"id": 637,
									"name": "ParameterList",
									"src": "1173:9:9"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 647,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 638,
													"name": "ElementaryTypeName",
													"src": "1206:4:9"
												}
											],
											"id": 639,
											"name": "VariableDeclaration",
											"src": "1206:4:9"
										}
									],
									"id": 640,
									"name": "ParameterList",
									"src": "1205:6:9"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 640
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"member_name": "approved",
														"referencedDeclaration": 576,
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"type": "struct ProposalManager.ProposalData storage ref"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 588,
																		"type": "mapping(uint256 => struct ProposalManager.ProposalData storage ref)",
																		"value": "proposals"
																	},
																	"id": 641,
																	"name": "Identifier",
																	"src": "1229:9:9"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 636,
																		"type": "uint256",
																		"value": "id"
																	},
																	"id": 642,
																	"name": "Identifier",
																	"src": "1239:2:9"
																}
															],
															"id": 643,
															"name": "IndexAccess",
															"src": "1229:13:9"
														}
													],
													"id": 644,
													"name": "MemberAccess",
													"src": "1229:22:9"
												}
											],
											"id": 645,
											"name": "Return",
											"src": "1222:29:9"
										}
									],
									"id": 646,
									"name": "Block",
									"src": "1212:46:9"
								}
							],
							"id": 647,
							"name": "FunctionDefinition",
							"src": "1154:104:9"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "getProposal",
								"payable": false,
								"scope": 661,
								"stateMutability": "view",
								"superFunction": 691,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "id",
												"scope": 660,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 648,
													"name": "ElementaryTypeName",
													"src": "1402:4:9"
												}
											],
											"id": 649,
											"name": "VariableDeclaration",
											"src": "1402:7:9"
										}
									],
									"id": 650,
									"name": "ParameterList",
									"src": "1401:9:9"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 660,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 651,
													"name": "ElementaryTypeName",
													"src": "1434:7:9"
												}
											],
											"id": 652,
											"name": "VariableDeclaration",
											"src": "1434:7:9"
										}
									],
									"id": 653,
									"name": "ParameterList",
									"src": "1433:9:9"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 653
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"member_name": "proposal",
														"referencedDeclaration": 580,
														"type": "address"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"type": "struct ProposalManager.ProposalData storage ref"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 588,
																		"type": "mapping(uint256 => struct ProposalManager.ProposalData storage ref)",
																		"value": "proposals"
																	},
																	"id": 654,
																	"name": "Identifier",
																	"src": "1460:9:9"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 649,
																		"type": "uint256",
																		"value": "id"
																	},
																	"id": 655,
																	"name": "Identifier",
																	"src": "1470:2:9"
																}
															],
															"id": 656,
															"name": "IndexAccess",
															"src": "1460:13:9"
														}
													],
													"id": 657,
													"name": "MemberAccess",
													"src": "1460:22:9"
												}
											],
											"id": 658,
											"name": "Return",
											"src": "1453:29:9"
										}
									],
									"id": 659,
									"name": "Block",
									"src": "1443:46:9"
								}
							],
							"id": 660,
							"name": "FunctionDefinition",
							"src": "1381:108:9"
						}
					],
					"id": 661,
					"name": "ContractDefinition",
					"src": "103:1388:9"
				}
			],
			"id": 662,
			"name": "SourceUnit",
			"src": "0:1492:9"
		},
		"compiler": {
			"name": "solc",
			"version": "0.4.18+commit.9cf6e910.Emscripten.clang"
		},
		"networks": {},
		"schemaVersion": "1.0.1",
		"updatedAt": "2018-01-18T17:45:14.649Z"
	},
	{
		"contractName": "Version",
		"abi": [
			{
				"constant": false,
				"inputs": [
					{
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "destroyOrganization",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "organizationFactory",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "rights",
						"type": "address"
					},
					{
						"name": "power",
						"type": "address"
					}
				],
				"name": "createOrganization",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "lastId",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"name": "_organizationFactory",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": false,
						"name": "id",
						"type": "uint256"
					},
					{
						"indexed": false,
						"name": "organization",
						"type": "address"
					}
				],
				"name": "OrganizationCreated",
				"type": "event"
			}
		],
		"bytecode": "0x6060604052341561000f57600080fd5b60405160208061046e8339810160405280805190602001909190505080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506103f28061007c6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633c5b82ff1461006757806381d6bb501461008a578063b224ea23146100df578063c1292cc314610137575b600080fd5b341561007257600080fd5b6100886004808035906020019091905050610160565b005b341561009557600080fd5b61009d610199565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100ea57600080fd5b610135600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101bf565b005b341561014257600080fd5b61014a6103a5565b6040518082815260200191505060405180910390f35b6002600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905550565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b224ea2385856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b15156102bb57600080fd5b6102c65a03f115156102cc57600080fd5b5050506040518051905091506102e06103ab565b9050816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f0ce81df677347dd4476e2f5358d95e39aa67d12bfbb33cb7eb78e5b3140abb3a8183604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a150505050565b60005481565b600080600081548092919060010191905055506000549050905600a165627a7a72305820fa6716057b80ec7e00327017a73f20ca7fc346bc1ce6f83f8ed4124246e8a91a0029",
		"deployedBytecode": "0x606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633c5b82ff1461006757806381d6bb501461008a578063b224ea23146100df578063c1292cc314610137575b600080fd5b341561007257600080fd5b6100886004808035906020019091905050610160565b005b341561009557600080fd5b61009d610199565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100ea57600080fd5b610135600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101bf565b005b341561014257600080fd5b61014a6103a5565b6040518082815260200191505060405180910390f35b6002600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905550565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b224ea2385856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b15156102bb57600080fd5b6102c65a03f115156102cc57600080fd5b5050506040518051905091506102e06103ab565b9050816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f0ce81df677347dd4476e2f5358d95e39aa67d12bfbb33cb7eb78e5b3140abb3a8183604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a150505050565b60005481565b600080600081548092919060010191905055506000549050905600a165627a7a72305820fa6716057b80ec7e00327017a73f20ca7fc346bc1ce6f83f8ed4124246e8a91a0029",
		"sourceMap": "229:883:29:-;;;449:134;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;556:20;534:19;;:42;;;;;;;;;;;;;;;;;;449:134;229:883;;;;;;",
		"deployedSourceMap": "229:883:29:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;889:126;;;;;;;;;;;;;;;;;;;;;;;;;;278:55;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;589:294;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;253:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;889:126;991:13;:17;1005:2;991:17;;;;;;;;;;;;984:24;;;;;;;;;;;889:126;:::o;278:55::-;;;;;;;;;;;;;:::o;589:294::-;695:25;787:7;723:19;;;;;;;;;;;:38;;;762:6;770:5;723:53;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;695:81;;797:8;:6;:8::i;:::-;787:18;;835:3;815:13;:17;829:2;815:17;;;;;;;;;;;;:23;;;;;;;;;;;;;;;;;;848:28;868:2;872:3;848:28;;;;;;;;;;;;;;;;;;;;;;;;;;;;589:294;;;;:::o;253:18::-;;;;:::o;1021:89::-;1056:4;1072:6;;:8;;;;;;;;;;;;;1097:6;;1090:13;;1021:89;:::o",
		"source": "pragma solidity ^0.4.18;\n\nimport \"../Organization.sol\";\nimport \"../Configuration.sol\";\nimport \"../Managers/ProposalManager.sol\";\nimport \"../Registries/ModuleRegistry.sol\";\nimport \"../Factories/OrganizationFactoryInterface.sol\";\n\ncontract Version {\n\n    uint public lastId;\n\n    OrganizationFactoryInterface public organizationFactory;\n\n    mapping (uint => address) organizations;\n\n    event OrganizationCreated(uint id, address organization);\n\n    function Version(OrganizationFactoryInterface _organizationFactory) public {\n        organizationFactory = _organizationFactory;\n    }\n\n    function createOrganization(VotingRightsInterface rights, VotingPowerInterface power) external {\n\n        OrganizationInterface org = organizationFactory.createOrganization(rights, power);\n\n        uint id = nextId();\n        organizations[id] = org;\n        OrganizationCreated(id, org);\n    }\n\n    function destroyOrganization(uint id) external {\n        // @todo trigger selfdestruct\n        delete organizations[id];\n    }\n\n    function nextId() private returns (uint) {\n        lastId++;\n        return lastId;\n    }\n}\n",
		"sourcePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Version/Version.sol",
		"ast": {
			"attributes": {
				"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Version/Version.sol",
				"exportedSymbols": {
					"Version": [
						2649
					]
				}
			},
			"children": [
				{
					"attributes": {
						"literals": [
							"solidity",
							"^",
							"0.4",
							".18"
						]
					},
					"id": 2565,
					"name": "PragmaDirective",
					"src": "0:24:29"
				},
				{
					"attributes": {
						"SourceUnit": 1177,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Organization.sol",
						"file": "../Organization.sol",
						"scope": 2650,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 2566,
					"name": "ImportDirective",
					"src": "26:29:29"
				},
				{
					"attributes": {
						"SourceUnit": 104,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Configuration.sol",
						"file": "../Configuration.sol",
						"scope": 2650,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 2567,
					"name": "ImportDirective",
					"src": "56:30:29"
				},
				{
					"attributes": {
						"SourceUnit": 662,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Managers/ProposalManager.sol",
						"file": "../Managers/ProposalManager.sol",
						"scope": 2650,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 2568,
					"name": "ImportDirective",
					"src": "87:41:29"
				},
				{
					"attributes": {
						"SourceUnit": 2312,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Registries/ModuleRegistry.sol",
						"file": "../Registries/ModuleRegistry.sol",
						"scope": 2650,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 2569,
					"name": "ImportDirective",
					"src": "129:42:29"
				},
				{
					"attributes": {
						"SourceUnit": 567,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Factories/OrganizationFactoryInterface.sol",
						"file": "../Factories/OrganizationFactoryInterface.sol",
						"scope": 2650,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 2570,
					"name": "ImportDirective",
					"src": "172:55:29"
				},
				{
					"attributes": {
						"baseContracts": [
							null
						],
						"contractDependencies": [
							null
						],
						"contractKind": "contract",
						"documentation": null,
						"fullyImplemented": true,
						"linearizedBaseContracts": [
							2649
						],
						"name": "Version",
						"scope": 2650
					},
					"children": [
						{
							"attributes": {
								"constant": false,
								"name": "lastId",
								"scope": 2649,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "uint256",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"name": "uint",
										"type": "uint256"
									},
									"id": 2571,
									"name": "ElementaryTypeName",
									"src": "253:4:29"
								}
							],
							"id": 2572,
							"name": "VariableDeclaration",
							"src": "253:18:29"
						},
						{
							"attributes": {
								"constant": false,
								"name": "organizationFactory",
								"scope": 2649,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "contract OrganizationFactoryInterface",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "OrganizationFactoryInterface",
										"referencedDeclaration": 566,
										"type": "contract OrganizationFactoryInterface"
									},
									"id": 2573,
									"name": "UserDefinedTypeName",
									"src": "278:28:29"
								}
							],
							"id": 2574,
							"name": "VariableDeclaration",
							"src": "278:55:29"
						},
						{
							"attributes": {
								"constant": false,
								"name": "organizations",
								"scope": 2649,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "mapping(uint256 => address)",
								"value": null,
								"visibility": "internal"
							},
							"children": [
								{
									"attributes": {
										"type": "mapping(uint256 => address)"
									},
									"children": [
										{
											"attributes": {
												"name": "uint",
												"type": "uint256"
											},
											"id": 2575,
											"name": "ElementaryTypeName",
											"src": "349:4:29"
										},
										{
											"attributes": {
												"name": "address",
												"type": "address"
											},
											"id": 2576,
											"name": "ElementaryTypeName",
											"src": "357:7:29"
										}
									],
									"id": 2577,
									"name": "Mapping",
									"src": "340:25:29"
								}
							],
							"id": 2578,
							"name": "VariableDeclaration",
							"src": "340:39:29"
						},
						{
							"attributes": {
								"anonymous": false,
								"name": "OrganizationCreated"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"indexed": false,
												"name": "id",
												"scope": 2584,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 2579,
													"name": "ElementaryTypeName",
													"src": "412:4:29"
												}
											],
											"id": 2580,
											"name": "VariableDeclaration",
											"src": "412:7:29"
										},
										{
											"attributes": {
												"constant": false,
												"indexed": false,
												"name": "organization",
												"scope": 2584,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 2581,
													"name": "ElementaryTypeName",
													"src": "421:7:29"
												}
											],
											"id": 2582,
											"name": "VariableDeclaration",
											"src": "421:20:29"
										}
									],
									"id": 2583,
									"name": "ParameterList",
									"src": "411:31:29"
								}
							],
							"id": 2584,
							"name": "EventDefinition",
							"src": "386:57:29"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": true,
								"modifiers": [
									null
								],
								"name": "Version",
								"payable": false,
								"scope": 2649,
								"stateMutability": "nonpayable",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "_organizationFactory",
												"scope": 2594,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract OrganizationFactoryInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "OrganizationFactoryInterface",
														"referencedDeclaration": 566,
														"type": "contract OrganizationFactoryInterface"
													},
													"id": 2585,
													"name": "UserDefinedTypeName",
													"src": "466:28:29"
												}
											],
											"id": 2586,
											"name": "VariableDeclaration",
											"src": "466:49:29"
										}
									],
									"id": 2587,
									"name": "ParameterList",
									"src": "465:51:29"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2588,
									"name": "ParameterList",
									"src": "524:0:29"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "contract OrganizationFactoryInterface"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2574,
																"type": "contract OrganizationFactoryInterface",
																"value": "organizationFactory"
															},
															"id": 2589,
															"name": "Identifier",
															"src": "534:19:29"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2586,
																"type": "contract OrganizationFactoryInterface",
																"value": "_organizationFactory"
															},
															"id": 2590,
															"name": "Identifier",
															"src": "556:20:29"
														}
													],
													"id": 2591,
													"name": "Assignment",
													"src": "534:42:29"
												}
											],
											"id": 2592,
											"name": "ExpressionStatement",
											"src": "534:42:29"
										}
									],
									"id": 2593,
									"name": "Block",
									"src": "524:59:29"
								}
							],
							"id": 2594,
							"name": "FunctionDefinition",
							"src": "449:134:29"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "createOrganization",
								"payable": false,
								"scope": 2649,
								"stateMutability": "nonpayable",
								"superFunction": null,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "rights",
												"scope": 2626,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract VotingRightsInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "VotingRightsInterface",
														"referencedDeclaration": 2701,
														"type": "contract VotingRightsInterface"
													},
													"id": 2595,
													"name": "UserDefinedTypeName",
													"src": "617:21:29"
												}
											],
											"id": 2596,
											"name": "VariableDeclaration",
											"src": "617:28:29"
										},
										{
											"attributes": {
												"constant": false,
												"name": "power",
												"scope": 2626,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract VotingPowerInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "VotingPowerInterface",
														"referencedDeclaration": 2667,
														"type": "contract VotingPowerInterface"
													},
													"id": 2597,
													"name": "UserDefinedTypeName",
													"src": "647:20:29"
												}
											],
											"id": 2598,
											"name": "VariableDeclaration",
											"src": "647:26:29"
										}
									],
									"id": 2599,
									"name": "ParameterList",
									"src": "616:58:29"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2600,
									"name": "ParameterList",
									"src": "684:0:29"
								},
								{
									"children": [
										{
											"attributes": {
												"assignments": [
													2602
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "org",
														"scope": 2626,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "contract OrganizationInterface",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"contractScope": null,
																"name": "OrganizationInterface",
																"referencedDeclaration": 1231,
																"type": "contract OrganizationInterface"
															},
															"id": 2601,
															"name": "UserDefinedTypeName",
															"src": "695:21:29"
														}
													],
													"id": 2602,
													"name": "VariableDeclaration",
													"src": "695:25:29"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "contract OrganizationInterface",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_contract$_VotingRightsInterface_$2701",
																		"typeString": "contract VotingRightsInterface"
																	},
																	{
																		"typeIdentifier": "t_contract$_VotingPowerInterface_$2667",
																		"typeString": "contract VotingPowerInterface"
																	}
																],
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "createOrganization",
																"referencedDeclaration": 565,
																"type": "function (contract VotingRightsInterface,contract VotingPowerInterface) external returns (contract OrganizationInterface)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2574,
																		"type": "contract OrganizationFactoryInterface",
																		"value": "organizationFactory"
																	},
																	"id": 2603,
																	"name": "Identifier",
																	"src": "723:19:29"
																}
															],
															"id": 2604,
															"name": "MemberAccess",
															"src": "723:38:29"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2596,
																"type": "contract VotingRightsInterface",
																"value": "rights"
															},
															"id": 2605,
															"name": "Identifier",
															"src": "762:6:29"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2598,
																"type": "contract VotingPowerInterface",
																"value": "power"
															},
															"id": 2606,
															"name": "Identifier",
															"src": "770:5:29"
														}
													],
													"id": 2607,
													"name": "FunctionCall",
													"src": "723:53:29"
												}
											],
											"id": 2608,
											"name": "VariableDeclarationStatement",
											"src": "695:81:29"
										},
										{
											"attributes": {
												"assignments": [
													2610
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "id",
														"scope": 2626,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "uint256",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"name": "uint",
																"type": "uint256"
															},
															"id": 2609,
															"name": "ElementaryTypeName",
															"src": "787:4:29"
														}
													],
													"id": 2610,
													"name": "VariableDeclaration",
													"src": "787:7:29"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"arguments": [
															null
														],
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "uint256",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	null
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2648,
																"type": "function () returns (uint256)",
																"value": "nextId"
															},
															"id": 2611,
															"name": "Identifier",
															"src": "797:6:29"
														}
													],
													"id": 2612,
													"name": "FunctionCall",
													"src": "797:8:29"
												}
											],
											"id": 2613,
											"name": "VariableDeclarationStatement",
											"src": "787:18:29"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "address"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"type": "address"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2578,
																		"type": "mapping(uint256 => address)",
																		"value": "organizations"
																	},
																	"id": 2614,
																	"name": "Identifier",
																	"src": "815:13:29"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2610,
																		"type": "uint256",
																		"value": "id"
																	},
																	"id": 2615,
																	"name": "Identifier",
																	"src": "829:2:29"
																}
															],
															"id": 2616,
															"name": "IndexAccess",
															"src": "815:17:29"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2602,
																"type": "contract OrganizationInterface",
																"value": "org"
															},
															"id": 2617,
															"name": "Identifier",
															"src": "835:3:29"
														}
													],
													"id": 2618,
													"name": "Assignment",
													"src": "815:23:29"
												}
											],
											"id": 2619,
											"name": "ExpressionStatement",
											"src": "815:23:29"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	},
																	{
																		"typeIdentifier": "t_contract$_OrganizationInterface_$1231",
																		"typeString": "contract OrganizationInterface"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2584,
																"type": "function (uint256,address)",
																"value": "OrganizationCreated"
															},
															"id": 2620,
															"name": "Identifier",
															"src": "848:19:29"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2610,
																"type": "uint256",
																"value": "id"
															},
															"id": 2621,
															"name": "Identifier",
															"src": "868:2:29"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2602,
																"type": "contract OrganizationInterface",
																"value": "org"
															},
															"id": 2622,
															"name": "Identifier",
															"src": "872:3:29"
														}
													],
													"id": 2623,
													"name": "FunctionCall",
													"src": "848:28:29"
												}
											],
											"id": 2624,
											"name": "ExpressionStatement",
											"src": "848:28:29"
										}
									],
									"id": 2625,
									"name": "Block",
									"src": "684:199:29"
								}
							],
							"id": 2626,
							"name": "FunctionDefinition",
							"src": "589:294:29"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "destroyOrganization",
								"payable": false,
								"scope": 2649,
								"stateMutability": "nonpayable",
								"superFunction": null,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "id",
												"scope": 2637,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 2627,
													"name": "ElementaryTypeName",
													"src": "918:4:29"
												}
											],
											"id": 2628,
											"name": "VariableDeclaration",
											"src": "918:7:29"
										}
									],
									"id": 2629,
									"name": "ParameterList",
									"src": "917:9:29"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2630,
									"name": "ParameterList",
									"src": "936:0:29"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "delete",
														"prefix": true,
														"type": "tuple()"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"type": "address"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2578,
																		"type": "mapping(uint256 => address)",
																		"value": "organizations"
																	},
																	"id": 2631,
																	"name": "Identifier",
																	"src": "991:13:29"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 2628,
																		"type": "uint256",
																		"value": "id"
																	},
																	"id": 2632,
																	"name": "Identifier",
																	"src": "1005:2:29"
																}
															],
															"id": 2633,
															"name": "IndexAccess",
															"src": "991:17:29"
														}
													],
													"id": 2634,
													"name": "UnaryOperation",
													"src": "984:24:29"
												}
											],
											"id": 2635,
											"name": "ExpressionStatement",
											"src": "984:24:29"
										}
									],
									"id": 2636,
									"name": "Block",
									"src": "936:79:29"
								}
							],
							"id": 2637,
							"name": "FunctionDefinition",
							"src": "889:126:29"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "nextId",
								"payable": false,
								"scope": 2649,
								"stateMutability": "nonpayable",
								"superFunction": null,
								"visibility": "private"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2638,
									"name": "ParameterList",
									"src": "1036:2:29"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2648,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 2639,
													"name": "ElementaryTypeName",
													"src": "1056:4:29"
												}
											],
											"id": 2640,
											"name": "VariableDeclaration",
											"src": "1056:4:29"
										}
									],
									"id": 2641,
									"name": "ParameterList",
									"src": "1055:6:29"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "++",
														"prefix": false,
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2572,
																"type": "uint256",
																"value": "lastId"
															},
															"id": 2642,
															"name": "Identifier",
															"src": "1072:6:29"
														}
													],
													"id": 2643,
													"name": "UnaryOperation",
													"src": "1072:8:29"
												}
											],
											"id": 2644,
											"name": "ExpressionStatement",
											"src": "1072:8:29"
										},
										{
											"attributes": {
												"functionReturnParameters": 2641
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"overloadedDeclarations": [
															null
														],
														"referencedDeclaration": 2572,
														"type": "uint256",
														"value": "lastId"
													},
													"id": 2645,
													"name": "Identifier",
													"src": "1097:6:29"
												}
											],
											"id": 2646,
											"name": "Return",
											"src": "1090:13:29"
										}
									],
									"id": 2647,
									"name": "Block",
									"src": "1062:48:29"
								}
							],
							"id": 2648,
							"name": "FunctionDefinition",
							"src": "1021:89:29"
						}
					],
					"id": 2649,
					"name": "ContractDefinition",
					"src": "229:883:29"
				}
			],
			"id": 2650,
			"name": "SourceUnit",
			"src": "0:1113:29"
		},
		"compiler": {
			"name": "solc",
			"version": "0.4.18+commit.9cf6e910.Emscripten.clang"
		},
		"networks": {},
		"schemaVersion": "1.0.1",
		"updatedAt": "2018-01-18T17:45:14.654Z"
	},
	{
		"contractName": "VotingPower",
		"abi": [
			{
				"constant": true,
				"inputs": [
					{
						"name": "voter",
						"type": "address"
					},
					{
						"name": "proposal",
						"type": "address"
					}
				],
				"name": "votingWeightOf",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "maximumQuorum",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			}
		],
		"bytecode": "0x",
		"deployedBytecode": "0x",
		"sourceMap": "",
		"deployedSourceMap": "",
		"source": "pragma solidity ^0.4.18;\n\nimport \"../Proposals/ProposalInterface.sol\";\n\ninterface VotingPowerInterface {\n\n    function maximumQuorum() public view returns (uint);\n    function votingWeightOf(address voter, ProposalInterface proposal) public view returns (uint);\n\n}\n",
		"sourcePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Voting/VotingPowerInterface.sol",
		"ast": {
			"attributes": {
				"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Voting/VotingPowerInterface.sol",
				"exportedSymbols": {
					"VotingPowerInterface": [
						2667
					]
				}
			},
			"children": [
				{
					"attributes": {
						"literals": [
							"solidity",
							"^",
							"0.4",
							".18"
						]
					},
					"id": 2651,
					"name": "PragmaDirective",
					"src": "0:24:30"
				},
				{
					"attributes": {
						"SourceUnit": 2194,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Proposals/ProposalInterface.sol",
						"file": "../Proposals/ProposalInterface.sol",
						"scope": 2668,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 2652,
					"name": "ImportDirective",
					"src": "26:44:30"
				},
				{
					"attributes": {
						"baseContracts": [
							null
						],
						"contractDependencies": [
							null
						],
						"contractKind": "interface",
						"documentation": null,
						"fullyImplemented": false,
						"linearizedBaseContracts": [
							2667
						],
						"name": "VotingPowerInterface",
						"scope": 2668
					},
					"children": [
						{
							"attributes": {
								"body": null,
								"constant": true,
								"implemented": false,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "maximumQuorum",
								"payable": false,
								"scope": 2667,
								"stateMutability": "view",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 2653,
									"name": "ParameterList",
									"src": "132:2:30"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2657,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 2654,
													"name": "ElementaryTypeName",
													"src": "156:4:30"
												}
											],
											"id": 2655,
											"name": "VariableDeclaration",
											"src": "156:4:30"
										}
									],
									"id": 2656,
									"name": "ParameterList",
									"src": "155:6:30"
								}
							],
							"id": 2657,
							"name": "FunctionDefinition",
							"src": "110:52:30"
						},
						{
							"attributes": {
								"body": null,
								"constant": true,
								"implemented": false,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "votingWeightOf",
								"payable": false,
								"scope": 2667,
								"stateMutability": "view",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "voter",
												"scope": 2666,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 2658,
													"name": "ElementaryTypeName",
													"src": "191:7:30"
												}
											],
											"id": 2659,
											"name": "VariableDeclaration",
											"src": "191:13:30"
										},
										{
											"attributes": {
												"constant": false,
												"name": "proposal",
												"scope": 2666,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract ProposalInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "ProposalInterface",
														"referencedDeclaration": 2193,
														"type": "contract ProposalInterface"
													},
													"id": 2660,
													"name": "UserDefinedTypeName",
													"src": "206:17:30"
												}
											],
											"id": 2661,
											"name": "VariableDeclaration",
											"src": "206:26:30"
										}
									],
									"id": 2662,
									"name": "ParameterList",
									"src": "190:43:30"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2666,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 2663,
													"name": "ElementaryTypeName",
													"src": "255:4:30"
												}
											],
											"id": 2664,
											"name": "VariableDeclaration",
											"src": "255:4:30"
										}
									],
									"id": 2665,
									"name": "ParameterList",
									"src": "254:6:30"
								}
							],
							"id": 2666,
							"name": "FunctionDefinition",
							"src": "167:94:30"
						}
					],
					"id": 2667,
					"name": "ContractDefinition",
					"src": "72:192:30"
				}
			],
			"id": 2668,
			"name": "SourceUnit",
			"src": "0:265:30"
		},
		"compiler": {
			"name": "solc",
			"version": "0.4.18+commit.9cf6e910.Emscripten.clang"
		},
		"networks": {},
		"schemaVersion": "1.0.1",
		"updatedAt": "2018-01-18T17:45:14.654Z"
	},
	{
		"contractName": "VotingRights",
		"abi": [
			{
				"constant": true,
				"inputs": [
					{
						"name": "proposal",
						"type": "uint256"
					}
				],
				"name": "requiresApproval",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "proposer",
						"type": "address"
					}
				],
				"name": "canPropose",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "voter",
						"type": "address"
					},
					{
						"name": "proposal",
						"type": "address"
					}
				],
				"name": "canVote",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "approver",
						"type": "address"
					}
				],
				"name": "canApprove",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			}
		],
		"bytecode": "0x",
		"deployedBytecode": "0x",
		"sourceMap": "",
		"deployedSourceMap": "",
		"source": "pragma solidity ^0.4.18;\n\nimport \"../Proposals/ProposalInterface.sol\";\n\ninterface VotingRightsInterface {\n\n    function canVote(address voter, ProposalInterface proposal) public view returns (bool);\n    function canPropose(address proposer) public view returns (bool);\n\n    // @todo consider do we need these functions here\n    function canApprove(address approver) public view returns (bool);\n    function requiresApproval(uint proposal) public view returns (bool);\n\n}\n",
		"sourcePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Voting/VotingRightsInterface.sol",
		"ast": {
			"attributes": {
				"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Voting/VotingRightsInterface.sol",
				"exportedSymbols": {
					"VotingRightsInterface": [
						2701
					]
				}
			},
			"children": [
				{
					"attributes": {
						"literals": [
							"solidity",
							"^",
							"0.4",
							".18"
						]
					},
					"id": 2669,
					"name": "PragmaDirective",
					"src": "0:24:31"
				},
				{
					"attributes": {
						"SourceUnit": 2194,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Proposals/ProposalInterface.sol",
						"file": "../Proposals/ProposalInterface.sol",
						"scope": 2702,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 2670,
					"name": "ImportDirective",
					"src": "26:44:31"
				},
				{
					"attributes": {
						"baseContracts": [
							null
						],
						"contractDependencies": [
							null
						],
						"contractKind": "interface",
						"documentation": null,
						"fullyImplemented": false,
						"linearizedBaseContracts": [
							2701
						],
						"name": "VotingRightsInterface",
						"scope": 2702
					},
					"children": [
						{
							"attributes": {
								"body": null,
								"constant": true,
								"implemented": false,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "canVote",
								"payable": false,
								"scope": 2701,
								"stateMutability": "view",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "voter",
												"scope": 2679,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 2671,
													"name": "ElementaryTypeName",
													"src": "128:7:31"
												}
											],
											"id": 2672,
											"name": "VariableDeclaration",
											"src": "128:13:31"
										},
										{
											"attributes": {
												"constant": false,
												"name": "proposal",
												"scope": 2679,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "contract ProposalInterface",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"contractScope": null,
														"name": "ProposalInterface",
														"referencedDeclaration": 2193,
														"type": "contract ProposalInterface"
													},
													"id": 2673,
													"name": "UserDefinedTypeName",
													"src": "143:17:31"
												}
											],
											"id": 2674,
											"name": "VariableDeclaration",
											"src": "143:26:31"
										}
									],
									"id": 2675,
									"name": "ParameterList",
									"src": "127:43:31"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2679,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 2676,
													"name": "ElementaryTypeName",
													"src": "192:4:31"
												}
											],
											"id": 2677,
											"name": "VariableDeclaration",
											"src": "192:4:31"
										}
									],
									"id": 2678,
									"name": "ParameterList",
									"src": "191:6:31"
								}
							],
							"id": 2679,
							"name": "FunctionDefinition",
							"src": "111:87:31"
						},
						{
							"attributes": {
								"body": null,
								"constant": true,
								"implemented": false,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "canPropose",
								"payable": false,
								"scope": 2701,
								"stateMutability": "view",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "proposer",
												"scope": 2686,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 2680,
													"name": "ElementaryTypeName",
													"src": "223:7:31"
												}
											],
											"id": 2681,
											"name": "VariableDeclaration",
											"src": "223:16:31"
										}
									],
									"id": 2682,
									"name": "ParameterList",
									"src": "222:18:31"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2686,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 2683,
													"name": "ElementaryTypeName",
													"src": "262:4:31"
												}
											],
											"id": 2684,
											"name": "VariableDeclaration",
											"src": "262:4:31"
										}
									],
									"id": 2685,
									"name": "ParameterList",
									"src": "261:6:31"
								}
							],
							"id": 2686,
							"name": "FunctionDefinition",
							"src": "203:65:31"
						},
						{
							"attributes": {
								"body": null,
								"constant": true,
								"implemented": false,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "canApprove",
								"payable": false,
								"scope": 2701,
								"stateMutability": "view",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "approver",
												"scope": 2693,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 2687,
													"name": "ElementaryTypeName",
													"src": "348:7:31"
												}
											],
											"id": 2688,
											"name": "VariableDeclaration",
											"src": "348:16:31"
										}
									],
									"id": 2689,
									"name": "ParameterList",
									"src": "347:18:31"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2693,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 2690,
													"name": "ElementaryTypeName",
													"src": "387:4:31"
												}
											],
											"id": 2691,
											"name": "VariableDeclaration",
											"src": "387:4:31"
										}
									],
									"id": 2692,
									"name": "ParameterList",
									"src": "386:6:31"
								}
							],
							"id": 2693,
							"name": "FunctionDefinition",
							"src": "328:65:31"
						},
						{
							"attributes": {
								"body": null,
								"constant": true,
								"implemented": false,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "requiresApproval",
								"payable": false,
								"scope": 2701,
								"stateMutability": "view",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "proposal",
												"scope": 2700,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 2694,
													"name": "ElementaryTypeName",
													"src": "424:4:31"
												}
											],
											"id": 2695,
											"name": "VariableDeclaration",
											"src": "424:13:31"
										}
									],
									"id": 2696,
									"name": "ParameterList",
									"src": "423:15:31"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 2700,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 2697,
													"name": "ElementaryTypeName",
													"src": "460:4:31"
												}
											],
											"id": 2698,
											"name": "VariableDeclaration",
											"src": "460:4:31"
										}
									],
									"id": 2699,
									"name": "ParameterList",
									"src": "459:6:31"
								}
							],
							"id": 2700,
							"name": "FunctionDefinition",
							"src": "398:68:31"
						}
					],
					"id": 2701,
					"name": "ContractDefinition",
					"src": "72:397:31"
				}
			],
			"id": 2702,
			"name": "SourceUnit",
			"src": "0:470:31"
		},
		"compiler": {
			"name": "solc",
			"version": "0.4.18+commit.9cf6e910.Emscripten.clang"
		},
		"networks": {},
		"schemaVersion": "1.0.1",
		"updatedAt": "2018-01-18T17:45:14.655Z"
	},
	{
		"contractName": "Ballot",
		"abi": [
			{
				"constant": true,
				"inputs": [
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "getData",
				"outputs": [
					{
						"name": "",
						"type": "bytes32"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "quorum",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "voter",
						"type": "address"
					},
					{
						"name": "choice",
						"type": "uint256"
					},
					{
						"name": "weight",
						"type": "uint256"
					}
				],
				"name": "vote",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "addr",
						"type": "address"
					}
				],
				"name": "isOwner",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "optionWillAccept",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "choice",
						"type": "uint256"
					}
				],
				"name": "votes",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "owner",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "choices",
						"type": "uint256[2]"
					}
				],
				"name": "nextRound",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "voter",
						"type": "address"
					}
				],
				"name": "voted",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "voter",
						"type": "address"
					}
				],
				"name": "unvote",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "getLabel",
				"outputs": [
					{
						"name": "",
						"type": "bytes32"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "index",
						"type": "uint256"
					}
				],
				"name": "isValidChoice",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "votingRound",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "optionsLength",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "newOwner",
						"type": "address"
					}
				],
				"name": "transferOwnership",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"name": "labels",
						"type": "bytes32[]"
					},
					{
						"name": "data",
						"type": "bytes32[]"
					},
					{
						"name": "willAccept",
						"type": "bool[]"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "constructor"
			}
		],
		"bytecode": "0x6060604052341561000f57600080fd5b604051610ce1380380610ce183398101604052808051820191906020018051820191906020018051820191905050600080336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083518551148015610092575082518551145b151561009d57600080fd5b6000600281905550845160036000600254815260200190815260200160002060020181905550600091505b600360006002548152602001908152602001600020600201548210156101ff576001905082828151811015156100fa57fe5b90602001906020020151151561010f57600090505b60806040519081016040528060008152602001868481518110151561013057fe5b90602001906020020151600019168152602001858481518110151561015157fe5b9060200190602002015160001916815260200182600181111561017057fe5b815250600360006002548152602001908152602001600020600101600084815260200190815260200160002060008201518160000155602082015181600101906000191690556040820151816002019060001916905560608201518160030160006101000a81548160ff021916908360018111156101ea57fe5b021790555090505081806001019250506100c8565b5050505050610ace806102136000396000f3006060604052600436106100db576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630178fe3f146100e05780631703a0181461011f5780632a4a1b73146101485780632f54bf6e146101935780632fc59da7146101e45780635df813301461021f5780638da5cb5b14610256578063a2bbeb42146102ab578063aec2ccae146102cc578063aed2377d1461031d578063b21bf7fa14610356578063b922f6fd14610395578063c535c733146103d0578063c55dd801146103f9578063f2fde38b14610422575b600080fd5b34156100eb57600080fd5b610101600480803590602001909190505061045b565b60405180826000191660001916815260200191505060405180910390f35b341561012a57600080fd5b610132610491565b6040518082815260200191505060405180910390f35b341561015357600080fd5b610191600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803590602001909190505061049b565b005b341561019e57600080fd5b6101ca600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105a3565b604051808215151515815260200191505060405180910390f35b34156101ef57600080fd5b61020560048080359060200190919050506105fc565b604051808215151515815260200191505060405180910390f35b341561022a57600080fd5b6102406004808035906020019091905050610657565b6040518082815260200191505060405180910390f35b341561026157600080fd5b61026961068d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102b657600080fd5b6102ca6004808060400190919050506106b2565b005b34156102d757600080fd5b610303600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610824565b604051808215151515815260200191505060405180910390f35b341561032857600080fd5b610354600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610888565b005b341561036157600080fd5b61037760048080359060200190919050506109cb565b60405180826000191660001916815260200191505060405180910390f35b34156103a057600080fd5b6103b66004808035906020019091905050610a01565b604051808215151515815260200191505060405180910390f35b34156103db57600080fd5b6103e3610a25565b6040518082815260200191505060405180910390f35b341561040457600080fd5b61040c610a2b565b6040518082815260200191505060405180910390f35b341561042d57600080fd5b610459600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a4b565b005b60006003600060025481526020019081526020016000206001016000838152602001908152602001600020600201549050919050565b6000600154905090565b6104a4336105a3565b15156104af57600080fd5b6104b883610824565b1515156104c457600080fd5b6000811115156104d357600080fd5b806001600082825401925050819055508060036000600254815260200190815260200160002060010160008481526020019081526020016000206000016000828254019250508190555060408051908101604052808281526020018381525060036000600254815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000015560208201518160010155905050505050565b60008173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050919050565b600060018081111561060a57fe5b600360006002548152602001908152602001600020600101600084815260200190815260200160002060030160009054906101000a900460ff16600181111561064f57fe5b149050919050565b60006003600060025481526020019081526020016000206001016000838152602001908152602001600020600001549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060006106c0336105a3565b15156106cb57600080fd5b6002549250600160025401600281905550600260036000600254815260200190815260200160002060020181905550600091505b600282101561081e57600360008481526020019081526020016000206001016000858460028110151561072e57fe5b60200201358152602001908152602001600020905060806040519081016040528060008152602001826001015460001916815260200182600201546000191681526020018260030160009054906101000a900460ff16600181111561078f57fe5b815250600360006002548152602001908152602001600020600101600084815260200190815260200160002060008201518160000155602082015181600101906000191690556040820151816002019060001916905560608201518160030160006101000a81548160ff0219169083600181111561080957fe5b021790555090505081806001019250506106ff565b50505050565b60008060036000600254815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154119050919050565b6000610893336105a3565b151561089e57600080fd5b6108a782610824565b15156108b257600080fd5b60036000600254815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050806000015460016000828254039250508190555080600001546003600060025481526020019081526020016000206001016000836001015481526020019081526020016000206000016000828254039250508190555060036000600254815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160009055600182016000905550505050565b60006003600060025481526020019081526020016000206001016000838152602001908152602001600020600101549050919050565b60008160036000600254815260200190815260200160002060020154119050919050565b60025481565b600060036000600254815260200190815260200160002060020154905090565b610a54336105a3565b1515610a5f57600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582013edd627704f210fc3a84d6e6234584941b7ea371ff47470c5677b73b55d5a8b0029",
		"deployedBytecode": "0x6060604052600436106100db576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630178fe3f146100e05780631703a0181461011f5780632a4a1b73146101485780632f54bf6e146101935780632fc59da7146101e45780635df813301461021f5780638da5cb5b14610256578063a2bbeb42146102ab578063aec2ccae146102cc578063aed2377d1461031d578063b21bf7fa14610356578063b922f6fd14610395578063c535c733146103d0578063c55dd801146103f9578063f2fde38b14610422575b600080fd5b34156100eb57600080fd5b610101600480803590602001909190505061045b565b60405180826000191660001916815260200191505060405180910390f35b341561012a57600080fd5b610132610491565b6040518082815260200191505060405180910390f35b341561015357600080fd5b610191600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803590602001909190505061049b565b005b341561019e57600080fd5b6101ca600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105a3565b604051808215151515815260200191505060405180910390f35b34156101ef57600080fd5b61020560048080359060200190919050506105fc565b604051808215151515815260200191505060405180910390f35b341561022a57600080fd5b6102406004808035906020019091905050610657565b6040518082815260200191505060405180910390f35b341561026157600080fd5b61026961068d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102b657600080fd5b6102ca6004808060400190919050506106b2565b005b34156102d757600080fd5b610303600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610824565b604051808215151515815260200191505060405180910390f35b341561032857600080fd5b610354600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610888565b005b341561036157600080fd5b61037760048080359060200190919050506109cb565b60405180826000191660001916815260200191505060405180910390f35b34156103a057600080fd5b6103b66004808035906020019091905050610a01565b604051808215151515815260200191505060405180910390f35b34156103db57600080fd5b6103e3610a25565b6040518082815260200191505060405180910390f35b341561040457600080fd5b61040c610a2b565b6040518082815260200191505060405180910390f35b341561042d57600080fd5b610459600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a4b565b005b60006003600060025481526020019081526020016000206001016000838152602001908152602001600020600201549050919050565b6000600154905090565b6104a4336105a3565b15156104af57600080fd5b6104b883610824565b1515156104c457600080fd5b6000811115156104d357600080fd5b806001600082825401925050819055508060036000600254815260200190815260200160002060010160008481526020019081526020016000206000016000828254019250508190555060408051908101604052808281526020018381525060036000600254815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000015560208201518160010155905050505050565b60008173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050919050565b600060018081111561060a57fe5b600360006002548152602001908152602001600020600101600084815260200190815260200160002060030160009054906101000a900460ff16600181111561064f57fe5b149050919050565b60006003600060025481526020019081526020016000206001016000838152602001908152602001600020600001549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060006106c0336105a3565b15156106cb57600080fd5b6002549250600160025401600281905550600260036000600254815260200190815260200160002060020181905550600091505b600282101561081e57600360008481526020019081526020016000206001016000858460028110151561072e57fe5b60200201358152602001908152602001600020905060806040519081016040528060008152602001826001015460001916815260200182600201546000191681526020018260030160009054906101000a900460ff16600181111561078f57fe5b815250600360006002548152602001908152602001600020600101600084815260200190815260200160002060008201518160000155602082015181600101906000191690556040820151816002019060001916905560608201518160030160006101000a81548160ff0219169083600181111561080957fe5b021790555090505081806001019250506106ff565b50505050565b60008060036000600254815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154119050919050565b6000610893336105a3565b151561089e57600080fd5b6108a782610824565b15156108b257600080fd5b60036000600254815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050806000015460016000828254039250508190555080600001546003600060025481526020019081526020016000206001016000836001015481526020019081526020016000206000016000828254039250508190555060036000600254815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160009055600182016000905550505050565b60006003600060025481526020019081526020016000206001016000838152602001908152602001600020600101549050919050565b60008160036000600254815260200190815260200160002060020154119050919050565b60025481565b600060036000600254815260200190815260200160002060020154905090565b610a54336105a3565b1515610a5f57600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582013edd627704f210fc3a84d6e6234584941b7ea371ff47470c5677b73b55d5a8b0029",
		"sourceMap": "99:3859:17:-;;;592:567;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;854:6;924:9;202:10:15;194:5;;:18;;;;;;;;;;;;;;;;;;703:4:17;:11;686:6;:13;:28;:66;;;;;735:10;:17;718:6;:13;:34;686:66;678:75;;;;;;;;778:1;764:11;:15;;;;825:6;:13;789:6;:19;796:11;;789:19;;;;;;;;;;;:33;;:49;;;;863:1;854:10;;849:304;870:6;:19;877:11;;870:19;;;;;;;;;;;:33;;;866:1;:37;849:304;;;936:11;924:23;;966:10;977:1;966:13;;;;;;;;;;;;;;;;;;965:14;961:71;;;1006:11;999:18;;961:71;1079:63;;;;;;;;;1094:1;1079:63;;;;1104:6;1111:1;1104:9;;;;;;;;;;;;;;;;;;1079:63;;;;;;;1121:4;1126:1;1121:7;;;;;;;;;;;;;;;;;;1079:63;;;;;;;1136:4;1079:63;;;;;;;;;;;1046:6;:19;1053:11;;1046:19;;;;;;;;;;;:27;;:30;1074:1;1046:30;;;;;;;;;;;:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;905:3;;;;;;;849:304;;;592:567;;;;;99:3859;;;;;;",
		"deployedSourceMap": "99:3859:17:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2991:124;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3373:77;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1296:314;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;326:95:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2708:145:17;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3598:122;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;50:20:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2130:572:17;;;;;;;;;;;;;;;;;;;;;;;;3832:124;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1708:304;;;;;;;;;;;;;;;;;;;;;;;;;;;;2859:126;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3121:129;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;525:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3256:111;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;225:95:15;;;;;;;;;;;;;;;;;;;;;;;;;;;;2991:124:17;3043:7;3069:6;:19;3076:11;;3069:19;;;;;;;;;;;:27;;:34;3097:5;3069:34;;;;;;;;;;;:39;;;3062:46;;2991:124;;;:::o;3373:77::-;3414:4;3437:6;;3430:13;;3373:77;:::o;1296:314::-;114:19:15;122:10;114:7;:19::i;:::-;106:28;;;;;;;;1389:12:17;1395:5;1389;:12::i;:::-;1388:13;1380:22;;;;;;;;1429:1;1420:6;:10;1412:19;;;;;;;;1452:6;1442;;:16;;;;;;;;;;;1514:6;1469;:19;1476:11;;1469:19;;;;;;;;;;;:27;;:35;1497:6;1469:35;;;;;;;;;;;:41;;;:51;;;;;;;;;;;1565:38;;;;;;;;;1595:6;1565:38;;;;1579:6;1565:38;;;1530:6;:19;1537:11;;1530:19;;;;;;;;;;;:25;;:32;1556:5;1530:32;;;;;;;;;;;;;;;:73;;;;;;;;;;;;;;;;;;;1296:314;;;:::o;326:95:15:-;378:4;410;401:13;;:5;;;;;;;;;;;:13;;;394:20;;326:95;;;:::o;2708:145:17:-;2769:4;2835:11;2792:54;;;;;;;;:6;:19;2799:11;;2792:19;;;;;;;;;;;:27;;:34;2820:5;2792:34;;;;;;;;;;;:39;;;;;;;;;;;;:54;;;;;;;;;2785:61;;2708:145;;;:::o;3598:122::-;3649:4;3672:6;:19;3679:11;;3672:19;;;;;;;;;;;:27;;:35;3700:6;3672:35;;;;;;;;;;;:41;;;3665:48;;3598:122;;;:::o;50:20:15:-;;;;;;;;;;;;;:::o;2130:572:17:-;2196:27;2353:6;2404:23;114:19:15;122:10;114:7;:19::i;:::-;106:28;;;;;;;;2226:11:17;;2196:41;;2275:1;2261:11;;:15;2247:11;:29;;;;2323:14;2287:6;:19;2294:11;;2287:19;;;;;;;;;;;:33;;:50;;;;2362:1;2353:10;;2348:348;2369:14;2365:1;:18;2348:348;;;2430:6;:27;2437:19;2430:27;;;;;;;;;;;:35;;:47;2466:7;2474:1;2466:10;;;;;;;;;;;;;2430:47;;;;;;;;;;;2404:73;;2524:161;;;;;;;;;2556:1;2524:161;;;;2582:8;:14;;;2524:161;;;;;;;2620:8;:13;;;2524:161;;;;;;;2657:8;:13;;;;;;;;;;;;2524:161;;;;;;;;;;;2491:6;:19;2498:11;;2491:19;;;;;;;;;;;:27;;:30;2519:1;2491:30;;;;;;;;;;;:194;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2385:3;;;;;;;2348:348;;;2130:572;;;;:::o;3832:124::-;3883:4;3948:1;3906:6;:19;3913:11;;3906:19;;;;;;;;;;;:25;;:32;3932:5;3906:32;;;;;;;;;;;;;;;:39;;;:43;3899:50;;3832:124;;;:::o;1708:304::-;1800:17;114:19:15;122:10;114:7;:19::i;:::-;106:28;;;;;;;;1776:12:17;1782:5;1776;:12::i;:::-;1768:21;;;;;;;;1820:6;:19;1827:11;;1820:19;;;;;;;;;;;:25;;:32;1846:5;1820:32;;;;;;;;;;;;;;;1800:52;;1873:4;:11;;;1863:6;;:21;;;;;;;;;;;1944:4;:11;;;1894:6;:19;1901:11;;1894:19;;;;;;;;;;;:27;;:40;1922:4;:11;;;1894:40;;;;;;;;;;;:46;;;:61;;;;;;;;;;;1973:6;:19;1980:11;;1973:19;;;;;;;;;;;:25;;:32;1999:5;1973:32;;;;;;;;;;;;;;;;1966:39;;;;;;;;;;;;;;1708:304;;:::o;2859:126::-;2912:7;2938:6;:19;2945:11;;2938:19;;;;;;;;;;;:27;;:34;2966:5;2938:34;;;;;;;;;;;:40;;;2931:47;;2859:126;;;:::o;3121:129::-;3179:4;3238:5;3202:6;:19;3209:11;;3202:19;;;;;;;;;;;:33;;;:41;3195:48;;3121:129;;;:::o;525:23::-;;;;:::o;3256:111::-;3304:4;3327:6;:19;3334:11;;3327:19;;;;;;;;;;;:33;;;3320:40;;3256:111;:::o;225:95:15:-;114:19;122:10;114:7;:19::i;:::-;106:28;;;;;;;;305:8;297:5;;:16;;;;;;;;;;;;;;;;;;225:95;:::o",
		"source": "pragma solidity ^0.4.18;\n\nimport \"./../../Ownership/Ownable.sol\";\nimport \"./BallotInterface.sol\";\n\ncontract Ballot is Ownable, BallotInterface {\n\n    enum Mode {Reject, Accept}\n\n    struct Option {\n        uint256 votes;\n        bytes32 label;\n        bytes32 data;\n        Mode mode;\n    }\n\n    struct Vote {\n        uint weight;\n        uint choice;\n    }\n\n    struct Round {\n        mapping (address => Vote) votes;\n        mapping (uint => Option) options;\n\n        uint optionsLength;\n    }\n\n    uint public quorum;\n    uint public votingRound;\n\n    mapping (uint => Round) rounds;\n\n    function Ballot(bytes32[] labels, bytes32[] data, bool[] willAccept) public {\n        require(labels.length == data.length && labels.length == willAccept.length);\n\n        votingRound = 0;\n        rounds[votingRound].optionsLength = labels.length;\n\n        for (uint i = 0; i < rounds[votingRound].optionsLength; i++) {\n            Mode mode = Mode.Accept;\n            if (!willAccept[i]) {\n                mode = Mode.Reject;\n            }\n\n            rounds[votingRound].options[i] = Option({votes: 0, label: labels[i], data: data[i], mode: mode});\n        }\n    }\n\n    /// @dev Votes for a specified choice\n    /// @param voter Address of the voter.\n    /// @param choice Voters selected option.\n    function vote(address voter, uint choice, uint weight) external onlyOwner {\n        require(!voted(voter));\n        require(weight > 0);\n\n        quorum += weight;\n\n        rounds[votingRound].options[choice].votes += weight;\n        rounds[votingRound].votes[voter] = Vote({choice: choice, weight: weight});\n    }\n\n    /// @dev Undoes a voters votes for a choice.\n    /// @param voter Address of the voter.\n    function unvote(address voter) external onlyOwner {\n        require(voted(voter));\n\n        Vote storage vote = rounds[votingRound].votes[voter];\n\n        quorum -= vote.weight;\n        rounds[votingRound].options[vote.choice].votes -= vote.weight;\n\n        delete rounds[votingRound].votes[voter];\n    }\n\n    /// @dev Starts a new voting round with choices.\n    /// @param choices Choices included in the next round.\n    function nextRound(uint[2] choices) external onlyOwner {\n\n        uint256 previousVotingRound = votingRound;\n        votingRound = votingRound + 1;\n\n        rounds[votingRound].optionsLength = choices.length;\n\n        for (uint i = 0; i < choices.length; i++) {\n            Option storage previous = rounds[previousVotingRound].options[choices[i]];\n            rounds[votingRound].options[i] = Option({\n                votes: 0,\n                label: previous.label,\n                data: previous.data,\n                mode: previous.mode\n            });\n        }\n    }\n\n    function optionWillAccept(uint index) external view returns (bool) {\n        return rounds[votingRound].options[index].mode == Mode.Accept;\n    }\n\n    function getLabel(uint index) external view returns (bytes32) {\n        return rounds[votingRound].options[index].label;\n    }\n\n    function getData(uint index) external view returns (bytes32) {\n        return rounds[votingRound].options[index].data;\n    }\n\n    function isValidChoice(uint index) external view returns (bool) {\n        return rounds[votingRound].optionsLength > index;\n    }\n\n    function optionsLength() external view returns (uint) {\n        return rounds[votingRound].optionsLength;\n    }\n\n    function quorum() external view returns (uint) {\n        return quorum;\n    }\n\n    /// @dev Amount votes count for a option on a proposal.\n    /// @param choice Selected option.\n    /// @return count of votes for option.\n    function votes(uint choice) external view returns (uint) {\n        return rounds[votingRound].options[choice].votes;\n    }\n\n    /// @dev Whether a voter has voted on a specific proposal.\n    /// @param voter Address of the voter.\n    function voted(address voter) public view returns (bool) {\n        return rounds[votingRound].votes[voter].weight > 0;\n    }\n}\n",
		"sourcePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Proposals/Ballot/Ballot.sol",
		"ast": {
			"attributes": {
				"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Proposals/Ballot/Ballot.sol",
				"exportedSymbols": {
					"Ballot": [
						1794
					]
				}
			},
			"children": [
				{
					"attributes": {
						"literals": [
							"solidity",
							"^",
							"0.4",
							".18"
						]
					},
					"id": 1376,
					"name": "PragmaDirective",
					"src": "0:24:17"
				},
				{
					"attributes": {
						"SourceUnit": 1347,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Ownership/Ownable.sol",
						"file": "./../../Ownership/Ownable.sol",
						"scope": 1795,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 1377,
					"name": "ImportDirective",
					"src": "26:39:17"
				},
				{
					"attributes": {
						"SourceUnit": 1871,
						"absolutePath": "/Users/Sam/Development/WebFolder/Harbour/Contracts/contracts/Proposals/Ballot/BallotInterface.sol",
						"file": "./BallotInterface.sol",
						"scope": 1795,
						"symbolAliases": [
							null
						],
						"unitAlias": ""
					},
					"id": 1378,
					"name": "ImportDirective",
					"src": "66:31:17"
				},
				{
					"attributes": {
						"contractDependencies": [
							1346,
							1870
						],
						"contractKind": "contract",
						"documentation": null,
						"fullyImplemented": true,
						"linearizedBaseContracts": [
							1794,
							1870,
							1346
						],
						"name": "Ballot",
						"scope": 1795
					},
					"children": [
						{
							"attributes": {
								"arguments": [
									null
								]
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "Ownable",
										"referencedDeclaration": 1346,
										"type": "contract Ownable"
									},
									"id": 1379,
									"name": "UserDefinedTypeName",
									"src": "118:7:17"
								}
							],
							"id": 1380,
							"name": "InheritanceSpecifier",
							"src": "118:7:17"
						},
						{
							"attributes": {
								"arguments": [
									null
								]
							},
							"children": [
								{
									"attributes": {
										"contractScope": null,
										"name": "BallotInterface",
										"referencedDeclaration": 1870,
										"type": "contract BallotInterface"
									},
									"id": 1381,
									"name": "UserDefinedTypeName",
									"src": "127:15:17"
								}
							],
							"id": 1382,
							"name": "InheritanceSpecifier",
							"src": "127:15:17"
						},
						{
							"attributes": {
								"canonicalName": "Ballot.Mode",
								"name": "Mode"
							},
							"children": [
								{
									"attributes": {
										"name": "Reject"
									},
									"id": 1383,
									"name": "EnumValue",
									"src": "161:6:17"
								},
								{
									"attributes": {
										"name": "Accept"
									},
									"id": 1384,
									"name": "EnumValue",
									"src": "169:6:17"
								}
							],
							"id": 1385,
							"name": "EnumDefinition",
							"src": "150:26:17"
						},
						{
							"attributes": {
								"canonicalName": "Ballot.Option",
								"name": "Option",
								"scope": 1794,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"constant": false,
										"name": "votes",
										"scope": 1394,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "uint256",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "uint256",
												"type": "uint256"
											},
											"id": 1386,
											"name": "ElementaryTypeName",
											"src": "206:7:17"
										}
									],
									"id": 1387,
									"name": "VariableDeclaration",
									"src": "206:13:17"
								},
								{
									"attributes": {
										"constant": false,
										"name": "label",
										"scope": 1394,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "bytes32",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "bytes32",
												"type": "bytes32"
											},
											"id": 1388,
											"name": "ElementaryTypeName",
											"src": "229:7:17"
										}
									],
									"id": 1389,
									"name": "VariableDeclaration",
									"src": "229:13:17"
								},
								{
									"attributes": {
										"constant": false,
										"name": "data",
										"scope": 1394,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "bytes32",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "bytes32",
												"type": "bytes32"
											},
											"id": 1390,
											"name": "ElementaryTypeName",
											"src": "252:7:17"
										}
									],
									"id": 1391,
									"name": "VariableDeclaration",
									"src": "252:12:17"
								},
								{
									"attributes": {
										"constant": false,
										"name": "mode",
										"scope": 1394,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "enum Ballot.Mode",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"contractScope": null,
												"name": "Mode",
												"referencedDeclaration": 1385,
												"type": "enum Ballot.Mode"
											},
											"id": 1392,
											"name": "UserDefinedTypeName",
											"src": "274:4:17"
										}
									],
									"id": 1393,
									"name": "VariableDeclaration",
									"src": "274:9:17"
								}
							],
							"id": 1394,
							"name": "StructDefinition",
							"src": "182:108:17"
						},
						{
							"attributes": {
								"canonicalName": "Ballot.Vote",
								"name": "Vote",
								"scope": 1794,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"constant": false,
										"name": "weight",
										"scope": 1399,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "uint256",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "uint",
												"type": "uint256"
											},
											"id": 1395,
											"name": "ElementaryTypeName",
											"src": "318:4:17"
										}
									],
									"id": 1396,
									"name": "VariableDeclaration",
									"src": "318:11:17"
								},
								{
									"attributes": {
										"constant": false,
										"name": "choice",
										"scope": 1399,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "uint256",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "uint",
												"type": "uint256"
											},
											"id": 1397,
											"name": "ElementaryTypeName",
											"src": "339:4:17"
										}
									],
									"id": 1398,
									"name": "VariableDeclaration",
									"src": "339:11:17"
								}
							],
							"id": 1399,
							"name": "StructDefinition",
							"src": "296:61:17"
						},
						{
							"attributes": {
								"canonicalName": "Ballot.Round",
								"name": "Round",
								"scope": 1794,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"constant": false,
										"name": "votes",
										"scope": 1410,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "mapping(address => struct Ballot.Vote storage ref)",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"type": "mapping(address => struct Ballot.Vote storage ref)"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 1400,
													"name": "ElementaryTypeName",
													"src": "395:7:17"
												},
												{
													"attributes": {
														"contractScope": null,
														"name": "Vote",
														"referencedDeclaration": 1399,
														"type": "struct Ballot.Vote storage pointer"
													},
													"id": 1401,
													"name": "UserDefinedTypeName",
													"src": "406:4:17"
												}
											],
											"id": 1402,
											"name": "Mapping",
											"src": "386:25:17"
										}
									],
									"id": 1403,
									"name": "VariableDeclaration",
									"src": "386:31:17"
								},
								{
									"attributes": {
										"constant": false,
										"name": "options",
										"scope": 1410,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "mapping(uint256 => struct Ballot.Option storage ref)",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"type": "mapping(uint256 => struct Ballot.Option storage ref)"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1404,
													"name": "ElementaryTypeName",
													"src": "436:4:17"
												},
												{
													"attributes": {
														"contractScope": null,
														"name": "Option",
														"referencedDeclaration": 1394,
														"type": "struct Ballot.Option storage pointer"
													},
													"id": 1405,
													"name": "UserDefinedTypeName",
													"src": "444:6:17"
												}
											],
											"id": 1406,
											"name": "Mapping",
											"src": "427:24:17"
										}
									],
									"id": 1407,
									"name": "VariableDeclaration",
									"src": "427:32:17"
								},
								{
									"attributes": {
										"constant": false,
										"name": "optionsLength",
										"scope": 1410,
										"stateVariable": false,
										"storageLocation": "default",
										"type": "uint256",
										"value": null,
										"visibility": "internal"
									},
									"children": [
										{
											"attributes": {
												"name": "uint",
												"type": "uint256"
											},
											"id": 1408,
											"name": "ElementaryTypeName",
											"src": "470:4:17"
										}
									],
									"id": 1409,
									"name": "VariableDeclaration",
									"src": "470:18:17"
								}
							],
							"id": 1410,
							"name": "StructDefinition",
							"src": "363:132:17"
						},
						{
							"attributes": {
								"constant": false,
								"name": "quorum",
								"scope": 1794,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "uint256",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"name": "uint",
										"type": "uint256"
									},
									"id": 1411,
									"name": "ElementaryTypeName",
									"src": "501:4:17"
								}
							],
							"id": 1412,
							"name": "VariableDeclaration",
							"src": "501:18:17"
						},
						{
							"attributes": {
								"constant": false,
								"name": "votingRound",
								"scope": 1794,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "uint256",
								"value": null,
								"visibility": "public"
							},
							"children": [
								{
									"attributes": {
										"name": "uint",
										"type": "uint256"
									},
									"id": 1413,
									"name": "ElementaryTypeName",
									"src": "525:4:17"
								}
							],
							"id": 1414,
							"name": "VariableDeclaration",
							"src": "525:23:17"
						},
						{
							"attributes": {
								"constant": false,
								"name": "rounds",
								"scope": 1794,
								"stateVariable": true,
								"storageLocation": "default",
								"type": "mapping(uint256 => struct Ballot.Round storage ref)",
								"value": null,
								"visibility": "internal"
							},
							"children": [
								{
									"attributes": {
										"type": "mapping(uint256 => struct Ballot.Round storage ref)"
									},
									"children": [
										{
											"attributes": {
												"name": "uint",
												"type": "uint256"
											},
											"id": 1415,
											"name": "ElementaryTypeName",
											"src": "564:4:17"
										},
										{
											"attributes": {
												"contractScope": null,
												"name": "Round",
												"referencedDeclaration": 1410,
												"type": "struct Ballot.Round storage pointer"
											},
											"id": 1416,
											"name": "UserDefinedTypeName",
											"src": "572:5:17"
										}
									],
									"id": 1417,
									"name": "Mapping",
									"src": "555:23:17"
								}
							],
							"id": 1418,
							"name": "VariableDeclaration",
							"src": "555:30:17"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": true,
								"modifiers": [
									null
								],
								"name": "Ballot",
								"payable": false,
								"scope": 1794,
								"stateMutability": "nonpayable",
								"superFunction": null,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "labels",
												"scope": 1506,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bytes32[] memory",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"length": null,
														"type": "bytes32[] storage pointer"
													},
													"children": [
														{
															"attributes": {
																"name": "bytes32",
																"type": "bytes32"
															},
															"id": 1419,
															"name": "ElementaryTypeName",
															"src": "608:7:17"
														}
													],
													"id": 1420,
													"name": "ArrayTypeName",
													"src": "608:9:17"
												}
											],
											"id": 1421,
											"name": "VariableDeclaration",
											"src": "608:16:17"
										},
										{
											"attributes": {
												"constant": false,
												"name": "data",
												"scope": 1506,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bytes32[] memory",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"length": null,
														"type": "bytes32[] storage pointer"
													},
													"children": [
														{
															"attributes": {
																"name": "bytes32",
																"type": "bytes32"
															},
															"id": 1422,
															"name": "ElementaryTypeName",
															"src": "626:7:17"
														}
													],
													"id": 1423,
													"name": "ArrayTypeName",
													"src": "626:9:17"
												}
											],
											"id": 1424,
											"name": "VariableDeclaration",
											"src": "626:14:17"
										},
										{
											"attributes": {
												"constant": false,
												"name": "willAccept",
												"scope": 1506,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool[] memory",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"length": null,
														"type": "bool[] storage pointer"
													},
													"children": [
														{
															"attributes": {
																"name": "bool",
																"type": "bool"
															},
															"id": 1425,
															"name": "ElementaryTypeName",
															"src": "642:4:17"
														}
													],
													"id": 1426,
													"name": "ArrayTypeName",
													"src": "642:6:17"
												}
											],
											"id": 1427,
											"name": "VariableDeclaration",
											"src": "642:17:17"
										}
									],
									"id": 1428,
									"name": "ParameterList",
									"src": "607:53:17"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1429,
									"name": "ParameterList",
									"src": "668:0:17"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 1430,
															"name": "Identifier",
															"src": "678:7:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"commonType": {
																	"typeIdentifier": "t_bool",
																	"typeString": "bool"
																},
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": "&&",
																"type": "bool"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"commonType": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		},
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "==",
																		"type": "bool"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "length",
																				"referencedDeclaration": null,
																				"type": "uint256"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1421,
																						"type": "bytes32[] memory",
																						"value": "labels"
																					},
																					"id": 1431,
																					"name": "Identifier",
																					"src": "686:6:17"
																				}
																			],
																			"id": 1432,
																			"name": "MemberAccess",
																			"src": "686:13:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "length",
																				"referencedDeclaration": null,
																				"type": "uint256"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1424,
																						"type": "bytes32[] memory",
																						"value": "data"
																					},
																					"id": 1433,
																					"name": "Identifier",
																					"src": "703:4:17"
																				}
																			],
																			"id": 1434,
																			"name": "MemberAccess",
																			"src": "703:11:17"
																		}
																	],
																	"id": 1435,
																	"name": "BinaryOperation",
																	"src": "686:28:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"commonType": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		},
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "==",
																		"type": "bool"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "length",
																				"referencedDeclaration": null,
																				"type": "uint256"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1421,
																						"type": "bytes32[] memory",
																						"value": "labels"
																					},
																					"id": 1436,
																					"name": "Identifier",
																					"src": "718:6:17"
																				}
																			],
																			"id": 1437,
																			"name": "MemberAccess",
																			"src": "718:13:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "length",
																				"referencedDeclaration": null,
																				"type": "uint256"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1427,
																						"type": "bool[] memory",
																						"value": "willAccept"
																					},
																					"id": 1438,
																					"name": "Identifier",
																					"src": "735:10:17"
																				}
																			],
																			"id": 1439,
																			"name": "MemberAccess",
																			"src": "735:17:17"
																		}
																	],
																	"id": 1440,
																	"name": "BinaryOperation",
																	"src": "718:34:17"
																}
															],
															"id": 1441,
															"name": "BinaryOperation",
															"src": "686:66:17"
														}
													],
													"id": 1442,
													"name": "FunctionCall",
													"src": "678:75:17"
												}
											],
											"id": 1443,
											"name": "ExpressionStatement",
											"src": "678:75:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1414,
																"type": "uint256",
																"value": "votingRound"
															},
															"id": 1444,
															"name": "Identifier",
															"src": "764:11:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"hexvalue": "30",
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"subdenomination": null,
																"token": "number",
																"type": "int_const 0",
																"value": "0"
															},
															"id": 1445,
															"name": "Literal",
															"src": "778:1:17"
														}
													],
													"id": 1446,
													"name": "Assignment",
													"src": "764:15:17"
												}
											],
											"id": 1447,
											"name": "ExpressionStatement",
											"src": "764:15:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"member_name": "optionsLength",
																"referencedDeclaration": 1409,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct Ballot.Round storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1418,
																				"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																				"value": "rounds"
																			},
																			"id": 1448,
																			"name": "Identifier",
																			"src": "789:6:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1414,
																				"type": "uint256",
																				"value": "votingRound"
																			},
																			"id": 1449,
																			"name": "Identifier",
																			"src": "796:11:17"
																		}
																	],
																	"id": 1450,
																	"name": "IndexAccess",
																	"src": "789:19:17"
																}
															],
															"id": 1451,
															"name": "MemberAccess",
															"src": "789:33:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "length",
																"referencedDeclaration": null,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1421,
																		"type": "bytes32[] memory",
																		"value": "labels"
																	},
																	"id": 1452,
																	"name": "Identifier",
																	"src": "825:6:17"
																}
															],
															"id": 1453,
															"name": "MemberAccess",
															"src": "825:13:17"
														}
													],
													"id": 1454,
													"name": "Assignment",
													"src": "789:49:17"
												}
											],
											"id": 1455,
											"name": "ExpressionStatement",
											"src": "789:49:17"
										},
										{
											"children": [
												{
													"attributes": {
														"assignments": [
															1457
														]
													},
													"children": [
														{
															"attributes": {
																"constant": false,
																"name": "i",
																"scope": 1506,
																"stateVariable": false,
																"storageLocation": "default",
																"type": "uint256",
																"value": null,
																"visibility": "internal"
															},
															"children": [
																{
																	"attributes": {
																		"name": "uint",
																		"type": "uint256"
																	},
																	"id": 1456,
																	"name": "ElementaryTypeName",
																	"src": "854:4:17"
																}
															],
															"id": 1457,
															"name": "VariableDeclaration",
															"src": "854:6:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"hexvalue": "30",
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"subdenomination": null,
																"token": "number",
																"type": "int_const 0",
																"value": "0"
															},
															"id": 1458,
															"name": "Literal",
															"src": "863:1:17"
														}
													],
													"id": 1459,
													"name": "VariableDeclarationStatement",
													"src": "854:10:17"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "<",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1457,
																"type": "uint256",
																"value": "i"
															},
															"id": 1460,
															"name": "Identifier",
															"src": "866:1:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "optionsLength",
																"referencedDeclaration": 1409,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct Ballot.Round storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1418,
																				"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																				"value": "rounds"
																			},
																			"id": 1461,
																			"name": "Identifier",
																			"src": "870:6:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1414,
																				"type": "uint256",
																				"value": "votingRound"
																			},
																			"id": 1462,
																			"name": "Identifier",
																			"src": "877:11:17"
																		}
																	],
																	"id": 1463,
																	"name": "IndexAccess",
																	"src": "870:19:17"
																}
															],
															"id": 1464,
															"name": "MemberAccess",
															"src": "870:33:17"
														}
													],
													"id": 1465,
													"name": "BinaryOperation",
													"src": "866:37:17"
												},
												{
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": "++",
																"prefix": false,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1457,
																		"type": "uint256",
																		"value": "i"
																	},
																	"id": 1466,
																	"name": "Identifier",
																	"src": "905:1:17"
																}
															],
															"id": 1467,
															"name": "UnaryOperation",
															"src": "905:3:17"
														}
													],
													"id": 1468,
													"name": "ExpressionStatement",
													"src": "905:3:17"
												},
												{
													"children": [
														{
															"attributes": {
																"assignments": [
																	1470
																]
															},
															"children": [
																{
																	"attributes": {
																		"constant": false,
																		"name": "mode",
																		"scope": 1506,
																		"stateVariable": false,
																		"storageLocation": "default",
																		"type": "enum Ballot.Mode",
																		"value": null,
																		"visibility": "internal"
																	},
																	"children": [
																		{
																			"attributes": {
																				"contractScope": null,
																				"name": "Mode",
																				"referencedDeclaration": 1385,
																				"type": "enum Ballot.Mode"
																			},
																			"id": 1469,
																			"name": "UserDefinedTypeName",
																			"src": "924:4:17"
																		}
																	],
																	"id": 1470,
																	"name": "VariableDeclaration",
																	"src": "924:9:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": true,
																		"lValueRequested": false,
																		"member_name": "Accept",
																		"referencedDeclaration": null,
																		"type": "enum Ballot.Mode"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1385,
																				"type": "type(enum Ballot.Mode)",
																				"value": "Mode"
																			},
																			"id": 1471,
																			"name": "Identifier",
																			"src": "936:4:17"
																		}
																	],
																	"id": 1472,
																	"name": "MemberAccess",
																	"src": "936:11:17"
																}
															],
															"id": 1473,
															"name": "VariableDeclarationStatement",
															"src": "924:23:17"
														},
														{
															"attributes": {
																"falseBody": null
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "!",
																		"prefix": true,
																		"type": "bool"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"type": "bool"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1427,
																						"type": "bool[] memory",
																						"value": "willAccept"
																					},
																					"id": 1474,
																					"name": "Identifier",
																					"src": "966:10:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1457,
																						"type": "uint256",
																						"value": "i"
																					},
																					"id": 1475,
																					"name": "Identifier",
																					"src": "977:1:17"
																				}
																			],
																			"id": 1476,
																			"name": "IndexAccess",
																			"src": "966:13:17"
																		}
																	],
																	"id": 1477,
																	"name": "UnaryOperation",
																	"src": "965:14:17"
																},
																{
																	"children": [
																		{
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": false,
																						"lValueRequested": false,
																						"operator": "=",
																						"type": "enum Ballot.Mode"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1470,
																								"type": "enum Ballot.Mode",
																								"value": "mode"
																							},
																							"id": 1478,
																							"name": "Identifier",
																							"src": "999:4:17"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"isConstant": false,
																								"isLValue": false,
																								"isPure": true,
																								"lValueRequested": false,
																								"member_name": "Reject",
																								"referencedDeclaration": null,
																								"type": "enum Ballot.Mode"
																							},
																							"children": [
																								{
																									"attributes": {
																										"argumentTypes": null,
																										"overloadedDeclarations": [
																											null
																										],
																										"referencedDeclaration": 1385,
																										"type": "type(enum Ballot.Mode)",
																										"value": "Mode"
																									},
																									"id": 1479,
																									"name": "Identifier",
																									"src": "1006:4:17"
																								}
																							],
																							"id": 1480,
																							"name": "MemberAccess",
																							"src": "1006:11:17"
																						}
																					],
																					"id": 1481,
																					"name": "Assignment",
																					"src": "999:18:17"
																				}
																			],
																			"id": 1482,
																			"name": "ExpressionStatement",
																			"src": "999:18:17"
																		}
																	],
																	"id": 1483,
																	"name": "Block",
																	"src": "981:51:17"
																}
															],
															"id": 1484,
															"name": "IfStatement",
															"src": "961:71:17"
														},
														{
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "=",
																		"type": "struct Ballot.Option storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": true,
																				"type": "struct Ballot.Option storage ref"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "options",
																						"referencedDeclaration": 1407,
																						"type": "mapping(uint256 => struct Ballot.Option storage ref)"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"isConstant": false,
																								"isLValue": true,
																								"isPure": false,
																								"lValueRequested": false,
																								"type": "struct Ballot.Round storage ref"
																							},
																							"children": [
																								{
																									"attributes": {
																										"argumentTypes": null,
																										"overloadedDeclarations": [
																											null
																										],
																										"referencedDeclaration": 1418,
																										"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																										"value": "rounds"
																									},
																									"id": 1485,
																									"name": "Identifier",
																									"src": "1046:6:17"
																								},
																								{
																									"attributes": {
																										"argumentTypes": null,
																										"overloadedDeclarations": [
																											null
																										],
																										"referencedDeclaration": 1414,
																										"type": "uint256",
																										"value": "votingRound"
																									},
																									"id": 1486,
																									"name": "Identifier",
																									"src": "1053:11:17"
																								}
																							],
																							"id": 1487,
																							"name": "IndexAccess",
																							"src": "1046:19:17"
																						}
																					],
																					"id": 1488,
																					"name": "MemberAccess",
																					"src": "1046:27:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1457,
																						"type": "uint256",
																						"value": "i"
																					},
																					"id": 1489,
																					"name": "Identifier",
																					"src": "1074:1:17"
																				}
																			],
																			"id": 1490,
																			"name": "IndexAccess",
																			"src": "1046:30:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": true,
																				"lValueRequested": false,
																				"names": [
																					"votes",
																					"label",
																					"data",
																					"mode"
																				],
																				"type": "struct Ballot.Option memory",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1394,
																						"type": "type(struct Ballot.Option storage pointer)",
																						"value": "Option"
																					},
																					"id": 1491,
																					"name": "Identifier",
																					"src": "1079:6:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"hexvalue": "30",
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": true,
																						"lValueRequested": false,
																						"subdenomination": null,
																						"token": "number",
																						"type": "int_const 0",
																						"value": "0"
																					},
																					"id": 1492,
																					"name": "Literal",
																					"src": "1094:1:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"type": "bytes32"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1421,
																								"type": "bytes32[] memory",
																								"value": "labels"
																							},
																							"id": 1493,
																							"name": "Identifier",
																							"src": "1104:6:17"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1457,
																								"type": "uint256",
																								"value": "i"
																							},
																							"id": 1494,
																							"name": "Identifier",
																							"src": "1111:1:17"
																						}
																					],
																					"id": 1495,
																					"name": "IndexAccess",
																					"src": "1104:9:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"type": "bytes32"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1424,
																								"type": "bytes32[] memory",
																								"value": "data"
																							},
																							"id": 1496,
																							"name": "Identifier",
																							"src": "1121:4:17"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1457,
																								"type": "uint256",
																								"value": "i"
																							},
																							"id": 1497,
																							"name": "Identifier",
																							"src": "1126:1:17"
																						}
																					],
																					"id": 1498,
																					"name": "IndexAccess",
																					"src": "1121:7:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1470,
																						"type": "enum Ballot.Mode",
																						"value": "mode"
																					},
																					"id": 1499,
																					"name": "Identifier",
																					"src": "1136:4:17"
																				}
																			],
																			"id": 1500,
																			"name": "FunctionCall",
																			"src": "1079:63:17"
																		}
																	],
																	"id": 1501,
																	"name": "Assignment",
																	"src": "1046:96:17"
																}
															],
															"id": 1502,
															"name": "ExpressionStatement",
															"src": "1046:96:17"
														}
													],
													"id": 1503,
													"name": "Block",
													"src": "910:243:17"
												}
											],
											"id": 1504,
											"name": "ForStatement",
											"src": "849:304:17"
										}
									],
									"id": 1505,
									"name": "Block",
									"src": "668:491:17"
								}
							],
							"id": 1506,
							"name": "FunctionDefinition",
							"src": "592:567:17"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"name": "vote",
								"payable": false,
								"scope": 1794,
								"stateMutability": "nonpayable",
								"superFunction": 1805,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "voter",
												"scope": 1557,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 1507,
													"name": "ElementaryTypeName",
													"src": "1310:7:17"
												}
											],
											"id": 1508,
											"name": "VariableDeclaration",
											"src": "1310:13:17"
										},
										{
											"attributes": {
												"constant": false,
												"name": "choice",
												"scope": 1557,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1509,
													"name": "ElementaryTypeName",
													"src": "1325:4:17"
												}
											],
											"id": 1510,
											"name": "VariableDeclaration",
											"src": "1325:11:17"
										},
										{
											"attributes": {
												"constant": false,
												"name": "weight",
												"scope": 1557,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1511,
													"name": "ElementaryTypeName",
													"src": "1338:4:17"
												}
											],
											"id": 1512,
											"name": "VariableDeclaration",
											"src": "1338:11:17"
										}
									],
									"id": 1513,
									"name": "ParameterList",
									"src": "1309:41:17"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1516,
									"name": "ParameterList",
									"src": "1370:0:17"
								},
								{
									"attributes": {
										"arguments": [
											null
										]
									},
									"children": [
										{
											"attributes": {
												"argumentTypes": null,
												"overloadedDeclarations": [
													null
												],
												"referencedDeclaration": 1312,
												"type": "modifier ()",
												"value": "onlyOwner"
											},
											"id": 1514,
											"name": "Identifier",
											"src": "1360:9:17"
										}
									],
									"id": 1515,
									"name": "ModifierInvocation",
									"src": "1360:9:17"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 1517,
															"name": "Identifier",
															"src": "1380:7:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": "!",
																"prefix": true,
																"type": "bool"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"isStructConstructorCall": false,
																		"lValueRequested": false,
																		"names": [
																			null
																		],
																		"type": "bool",
																		"type_conversion": false
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": [
																					{
																						"typeIdentifier": "t_address",
																						"typeString": "address"
																					}
																				],
																				"overloadedDeclarations": [
																					1793
																				],
																				"referencedDeclaration": 1793,
																				"type": "function (address) view returns (bool)",
																				"value": "voted"
																			},
																			"id": 1518,
																			"name": "Identifier",
																			"src": "1389:5:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1508,
																				"type": "address",
																				"value": "voter"
																			},
																			"id": 1519,
																			"name": "Identifier",
																			"src": "1395:5:17"
																		}
																	],
																	"id": 1520,
																	"name": "FunctionCall",
																	"src": "1389:12:17"
																}
															],
															"id": 1521,
															"name": "UnaryOperation",
															"src": "1388:13:17"
														}
													],
													"id": 1522,
													"name": "FunctionCall",
													"src": "1380:22:17"
												}
											],
											"id": 1523,
											"name": "ExpressionStatement",
											"src": "1380:22:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 1524,
															"name": "Identifier",
															"src": "1412:7:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"commonType": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																},
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": ">",
																"type": "bool"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1512,
																		"type": "uint256",
																		"value": "weight"
																	},
																	"id": 1525,
																	"name": "Identifier",
																	"src": "1420:6:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"hexvalue": "30",
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": true,
																		"lValueRequested": false,
																		"subdenomination": null,
																		"token": "number",
																		"type": "int_const 0",
																		"value": "0"
																	},
																	"id": 1526,
																	"name": "Literal",
																	"src": "1429:1:17"
																}
															],
															"id": 1527,
															"name": "BinaryOperation",
															"src": "1420:10:17"
														}
													],
													"id": 1528,
													"name": "FunctionCall",
													"src": "1412:19:17"
												}
											],
											"id": 1529,
											"name": "ExpressionStatement",
											"src": "1412:19:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "+=",
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1412,
																"type": "uint256",
																"value": "quorum"
															},
															"id": 1530,
															"name": "Identifier",
															"src": "1442:6:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1512,
																"type": "uint256",
																"value": "weight"
															},
															"id": 1531,
															"name": "Identifier",
															"src": "1452:6:17"
														}
													],
													"id": 1532,
													"name": "Assignment",
													"src": "1442:16:17"
												}
											],
											"id": 1533,
											"name": "ExpressionStatement",
											"src": "1442:16:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "+=",
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"member_name": "votes",
																"referencedDeclaration": 1387,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct Ballot.Option storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "options",
																				"referencedDeclaration": 1407,
																				"type": "mapping(uint256 => struct Ballot.Option storage ref)"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"type": "struct Ballot.Round storage ref"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1418,
																								"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																								"value": "rounds"
																							},
																							"id": 1534,
																							"name": "Identifier",
																							"src": "1469:6:17"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1414,
																								"type": "uint256",
																								"value": "votingRound"
																							},
																							"id": 1535,
																							"name": "Identifier",
																							"src": "1476:11:17"
																						}
																					],
																					"id": 1536,
																					"name": "IndexAccess",
																					"src": "1469:19:17"
																				}
																			],
																			"id": 1537,
																			"name": "MemberAccess",
																			"src": "1469:27:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1510,
																				"type": "uint256",
																				"value": "choice"
																			},
																			"id": 1538,
																			"name": "Identifier",
																			"src": "1497:6:17"
																		}
																	],
																	"id": 1539,
																	"name": "IndexAccess",
																	"src": "1469:35:17"
																}
															],
															"id": 1540,
															"name": "MemberAccess",
															"src": "1469:41:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1512,
																"type": "uint256",
																"value": "weight"
															},
															"id": 1541,
															"name": "Identifier",
															"src": "1514:6:17"
														}
													],
													"id": 1542,
													"name": "Assignment",
													"src": "1469:51:17"
												}
											],
											"id": 1543,
											"name": "ExpressionStatement",
											"src": "1469:51:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "struct Ballot.Vote storage ref"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"type": "struct Ballot.Vote storage ref"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "votes",
																		"referencedDeclaration": 1403,
																		"type": "mapping(address => struct Ballot.Vote storage ref)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"type": "struct Ballot.Round storage ref"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1418,
																						"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																						"value": "rounds"
																					},
																					"id": 1544,
																					"name": "Identifier",
																					"src": "1530:6:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1414,
																						"type": "uint256",
																						"value": "votingRound"
																					},
																					"id": 1545,
																					"name": "Identifier",
																					"src": "1537:11:17"
																				}
																			],
																			"id": 1546,
																			"name": "IndexAccess",
																			"src": "1530:19:17"
																		}
																	],
																	"id": 1547,
																	"name": "MemberAccess",
																	"src": "1530:25:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1508,
																		"type": "address",
																		"value": "voter"
																	},
																	"id": 1548,
																	"name": "Identifier",
																	"src": "1556:5:17"
																}
															],
															"id": 1549,
															"name": "IndexAccess",
															"src": "1530:32:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": true,
																"lValueRequested": false,
																"names": [
																	"choice",
																	"weight"
																],
																"type": "struct Ballot.Vote memory",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1399,
																		"type": "type(struct Ballot.Vote storage pointer)",
																		"value": "Vote"
																	},
																	"id": 1550,
																	"name": "Identifier",
																	"src": "1565:4:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1510,
																		"type": "uint256",
																		"value": "choice"
																	},
																	"id": 1551,
																	"name": "Identifier",
																	"src": "1579:6:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1512,
																		"type": "uint256",
																		"value": "weight"
																	},
																	"id": 1552,
																	"name": "Identifier",
																	"src": "1595:6:17"
																}
															],
															"id": 1553,
															"name": "FunctionCall",
															"src": "1565:38:17"
														}
													],
													"id": 1554,
													"name": "Assignment",
													"src": "1530:73:17"
												}
											],
											"id": 1555,
											"name": "ExpressionStatement",
											"src": "1530:73:17"
										}
									],
									"id": 1556,
									"name": "Block",
									"src": "1370:240:17"
								}
							],
							"id": 1557,
							"name": "FunctionDefinition",
							"src": "1296:314:17"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"name": "unvote",
								"payable": false,
								"scope": 1794,
								"stateMutability": "nonpayable",
								"superFunction": 1810,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "voter",
												"scope": 1605,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 1558,
													"name": "ElementaryTypeName",
													"src": "1724:7:17"
												}
											],
											"id": 1559,
											"name": "VariableDeclaration",
											"src": "1724:13:17"
										}
									],
									"id": 1560,
									"name": "ParameterList",
									"src": "1723:15:17"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1563,
									"name": "ParameterList",
									"src": "1758:0:17"
								},
								{
									"attributes": {
										"arguments": [
											null
										]
									},
									"children": [
										{
											"attributes": {
												"argumentTypes": null,
												"overloadedDeclarations": [
													null
												],
												"referencedDeclaration": 1312,
												"type": "modifier ()",
												"value": "onlyOwner"
											},
											"id": 1561,
											"name": "Identifier",
											"src": "1748:9:17"
										}
									],
									"id": 1562,
									"name": "ModifierInvocation",
									"src": "1748:9:17"
								},
								{
									"children": [
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"isStructConstructorCall": false,
														"lValueRequested": false,
														"names": [
															null
														],
														"type": "tuple()",
														"type_conversion": false
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": [
																	{
																		"typeIdentifier": "t_bool",
																		"typeString": "bool"
																	}
																],
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 2716,
																"type": "function (bool) pure",
																"value": "require"
															},
															"id": 1564,
															"name": "Identifier",
															"src": "1768:7:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"isStructConstructorCall": false,
																"lValueRequested": false,
																"names": [
																	null
																],
																"type": "bool",
																"type_conversion": false
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_address",
																				"typeString": "address"
																			}
																		],
																		"overloadedDeclarations": [
																			1793
																		],
																		"referencedDeclaration": 1793,
																		"type": "function (address) view returns (bool)",
																		"value": "voted"
																	},
																	"id": 1565,
																	"name": "Identifier",
																	"src": "1776:5:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1559,
																		"type": "address",
																		"value": "voter"
																	},
																	"id": 1566,
																	"name": "Identifier",
																	"src": "1782:5:17"
																}
															],
															"id": 1567,
															"name": "FunctionCall",
															"src": "1776:12:17"
														}
													],
													"id": 1568,
													"name": "FunctionCall",
													"src": "1768:21:17"
												}
											],
											"id": 1569,
											"name": "ExpressionStatement",
											"src": "1768:21:17"
										},
										{
											"attributes": {
												"assignments": [
													1571
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "vote",
														"scope": 1605,
														"stateVariable": false,
														"storageLocation": "storage",
														"type": "struct Ballot.Vote storage pointer",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"contractScope": null,
																"name": "Vote",
																"referencedDeclaration": 1399,
																"type": "struct Ballot.Vote storage pointer"
															},
															"id": 1570,
															"name": "UserDefinedTypeName",
															"src": "1800:4:17"
														}
													],
													"id": 1571,
													"name": "VariableDeclaration",
													"src": "1800:17:17"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"type": "struct Ballot.Vote storage ref"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "votes",
																"referencedDeclaration": 1403,
																"type": "mapping(address => struct Ballot.Vote storage ref)"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct Ballot.Round storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1418,
																				"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																				"value": "rounds"
																			},
																			"id": 1572,
																			"name": "Identifier",
																			"src": "1820:6:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1414,
																				"type": "uint256",
																				"value": "votingRound"
																			},
																			"id": 1573,
																			"name": "Identifier",
																			"src": "1827:11:17"
																		}
																	],
																	"id": 1574,
																	"name": "IndexAccess",
																	"src": "1820:19:17"
																}
															],
															"id": 1575,
															"name": "MemberAccess",
															"src": "1820:25:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1559,
																"type": "address",
																"value": "voter"
															},
															"id": 1576,
															"name": "Identifier",
															"src": "1846:5:17"
														}
													],
													"id": 1577,
													"name": "IndexAccess",
													"src": "1820:32:17"
												}
											],
											"id": 1578,
											"name": "VariableDeclarationStatement",
											"src": "1800:52:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "-=",
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1412,
																"type": "uint256",
																"value": "quorum"
															},
															"id": 1579,
															"name": "Identifier",
															"src": "1863:6:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "weight",
																"referencedDeclaration": 1396,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1571,
																		"type": "struct Ballot.Vote storage pointer",
																		"value": "vote"
																	},
																	"id": 1580,
																	"name": "Identifier",
																	"src": "1873:4:17"
																}
															],
															"id": 1581,
															"name": "MemberAccess",
															"src": "1873:11:17"
														}
													],
													"id": 1582,
													"name": "Assignment",
													"src": "1863:21:17"
												}
											],
											"id": 1583,
											"name": "ExpressionStatement",
											"src": "1863:21:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "-=",
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"member_name": "votes",
																"referencedDeclaration": 1387,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct Ballot.Option storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "options",
																				"referencedDeclaration": 1407,
																				"type": "mapping(uint256 => struct Ballot.Option storage ref)"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"type": "struct Ballot.Round storage ref"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1418,
																								"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																								"value": "rounds"
																							},
																							"id": 1584,
																							"name": "Identifier",
																							"src": "1894:6:17"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1414,
																								"type": "uint256",
																								"value": "votingRound"
																							},
																							"id": 1585,
																							"name": "Identifier",
																							"src": "1901:11:17"
																						}
																					],
																					"id": 1586,
																					"name": "IndexAccess",
																					"src": "1894:19:17"
																				}
																			],
																			"id": 1587,
																			"name": "MemberAccess",
																			"src": "1894:27:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "choice",
																				"referencedDeclaration": 1398,
																				"type": "uint256"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1571,
																						"type": "struct Ballot.Vote storage pointer",
																						"value": "vote"
																					},
																					"id": 1588,
																					"name": "Identifier",
																					"src": "1922:4:17"
																				}
																			],
																			"id": 1589,
																			"name": "MemberAccess",
																			"src": "1922:11:17"
																		}
																	],
																	"id": 1590,
																	"name": "IndexAccess",
																	"src": "1894:40:17"
																}
															],
															"id": 1591,
															"name": "MemberAccess",
															"src": "1894:46:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "weight",
																"referencedDeclaration": 1396,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1571,
																		"type": "struct Ballot.Vote storage pointer",
																		"value": "vote"
																	},
																	"id": 1592,
																	"name": "Identifier",
																	"src": "1944:4:17"
																}
															],
															"id": 1593,
															"name": "MemberAccess",
															"src": "1944:11:17"
														}
													],
													"id": 1594,
													"name": "Assignment",
													"src": "1894:61:17"
												}
											],
											"id": 1595,
											"name": "ExpressionStatement",
											"src": "1894:61:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "delete",
														"prefix": true,
														"type": "tuple()"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"type": "struct Ballot.Vote storage ref"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "votes",
																		"referencedDeclaration": 1403,
																		"type": "mapping(address => struct Ballot.Vote storage ref)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"type": "struct Ballot.Round storage ref"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1418,
																						"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																						"value": "rounds"
																					},
																					"id": 1596,
																					"name": "Identifier",
																					"src": "1973:6:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1414,
																						"type": "uint256",
																						"value": "votingRound"
																					},
																					"id": 1597,
																					"name": "Identifier",
																					"src": "1980:11:17"
																				}
																			],
																			"id": 1598,
																			"name": "IndexAccess",
																			"src": "1973:19:17"
																		}
																	],
																	"id": 1599,
																	"name": "MemberAccess",
																	"src": "1973:25:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1559,
																		"type": "address",
																		"value": "voter"
																	},
																	"id": 1600,
																	"name": "Identifier",
																	"src": "1999:5:17"
																}
															],
															"id": 1601,
															"name": "IndexAccess",
															"src": "1973:32:17"
														}
													],
													"id": 1602,
													"name": "UnaryOperation",
													"src": "1966:39:17"
												}
											],
											"id": 1603,
											"name": "ExpressionStatement",
											"src": "1966:39:17"
										}
									],
									"id": 1604,
									"name": "Block",
									"src": "1758:254:17"
								}
							],
							"id": 1605,
							"name": "FunctionDefinition",
							"src": "1708:304:17"
						},
						{
							"attributes": {
								"constant": false,
								"implemented": true,
								"isConstructor": false,
								"name": "nextRound",
								"payable": false,
								"scope": 1794,
								"stateMutability": "nonpayable",
								"superFunction": 1817,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "choices",
												"scope": 1674,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256[2] calldata",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"type": "uint256[2] storage pointer"
													},
													"children": [
														{
															"attributes": {
																"name": "uint",
																"type": "uint256"
															},
															"id": 1606,
															"name": "ElementaryTypeName",
															"src": "2149:4:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"hexvalue": "32",
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"subdenomination": null,
																"token": "number",
																"type": "int_const 2",
																"value": "2"
															},
															"id": 1607,
															"name": "Literal",
															"src": "2154:1:17"
														}
													],
													"id": 1608,
													"name": "ArrayTypeName",
													"src": "2149:7:17"
												}
											],
											"id": 1609,
											"name": "VariableDeclaration",
											"src": "2149:15:17"
										}
									],
									"id": 1610,
									"name": "ParameterList",
									"src": "2148:17:17"
								},
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1613,
									"name": "ParameterList",
									"src": "2185:0:17"
								},
								{
									"attributes": {
										"arguments": [
											null
										]
									},
									"children": [
										{
											"attributes": {
												"argumentTypes": null,
												"overloadedDeclarations": [
													null
												],
												"referencedDeclaration": 1312,
												"type": "modifier ()",
												"value": "onlyOwner"
											},
											"id": 1611,
											"name": "Identifier",
											"src": "2175:9:17"
										}
									],
									"id": 1612,
									"name": "ModifierInvocation",
									"src": "2175:9:17"
								},
								{
									"children": [
										{
											"attributes": {
												"assignments": [
													1615
												]
											},
											"children": [
												{
													"attributes": {
														"constant": false,
														"name": "previousVotingRound",
														"scope": 1674,
														"stateVariable": false,
														"storageLocation": "default",
														"type": "uint256",
														"value": null,
														"visibility": "internal"
													},
													"children": [
														{
															"attributes": {
																"name": "uint256",
																"type": "uint256"
															},
															"id": 1614,
															"name": "ElementaryTypeName",
															"src": "2196:7:17"
														}
													],
													"id": 1615,
													"name": "VariableDeclaration",
													"src": "2196:27:17"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"overloadedDeclarations": [
															null
														],
														"referencedDeclaration": 1414,
														"type": "uint256",
														"value": "votingRound"
													},
													"id": 1616,
													"name": "Identifier",
													"src": "2226:11:17"
												}
											],
											"id": 1617,
											"name": "VariableDeclarationStatement",
											"src": "2196:41:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1414,
																"type": "uint256",
																"value": "votingRound"
															},
															"id": 1618,
															"name": "Identifier",
															"src": "2247:11:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"commonType": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																},
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": "+",
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1414,
																		"type": "uint256",
																		"value": "votingRound"
																	},
																	"id": 1619,
																	"name": "Identifier",
																	"src": "2261:11:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"hexvalue": "31",
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": true,
																		"lValueRequested": false,
																		"subdenomination": null,
																		"token": "number",
																		"type": "int_const 1",
																		"value": "1"
																	},
																	"id": 1620,
																	"name": "Literal",
																	"src": "2275:1:17"
																}
															],
															"id": 1621,
															"name": "BinaryOperation",
															"src": "2261:15:17"
														}
													],
													"id": 1622,
													"name": "Assignment",
													"src": "2247:29:17"
												}
											],
											"id": 1623,
											"name": "ExpressionStatement",
											"src": "2247:29:17"
										},
										{
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "=",
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": true,
																"member_name": "optionsLength",
																"referencedDeclaration": 1409,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct Ballot.Round storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1418,
																				"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																				"value": "rounds"
																			},
																			"id": 1624,
																			"name": "Identifier",
																			"src": "2287:6:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1414,
																				"type": "uint256",
																				"value": "votingRound"
																			},
																			"id": 1625,
																			"name": "Identifier",
																			"src": "2294:11:17"
																		}
																	],
																	"id": 1626,
																	"name": "IndexAccess",
																	"src": "2287:19:17"
																}
															],
															"id": 1627,
															"name": "MemberAccess",
															"src": "2287:33:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "length",
																"referencedDeclaration": null,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1609,
																		"type": "uint256[2] calldata",
																		"value": "choices"
																	},
																	"id": 1628,
																	"name": "Identifier",
																	"src": "2323:7:17"
																}
															],
															"id": 1629,
															"name": "MemberAccess",
															"src": "2323:14:17"
														}
													],
													"id": 1630,
													"name": "Assignment",
													"src": "2287:50:17"
												}
											],
											"id": 1631,
											"name": "ExpressionStatement",
											"src": "2287:50:17"
										},
										{
											"children": [
												{
													"attributes": {
														"assignments": [
															1633
														]
													},
													"children": [
														{
															"attributes": {
																"constant": false,
																"name": "i",
																"scope": 1674,
																"stateVariable": false,
																"storageLocation": "default",
																"type": "uint256",
																"value": null,
																"visibility": "internal"
															},
															"children": [
																{
																	"attributes": {
																		"name": "uint",
																		"type": "uint256"
																	},
																	"id": 1632,
																	"name": "ElementaryTypeName",
																	"src": "2353:4:17"
																}
															],
															"id": 1633,
															"name": "VariableDeclaration",
															"src": "2353:6:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"hexvalue": "30",
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"subdenomination": null,
																"token": "number",
																"type": "int_const 0",
																"value": "0"
															},
															"id": 1634,
															"name": "Literal",
															"src": "2362:1:17"
														}
													],
													"id": 1635,
													"name": "VariableDeclarationStatement",
													"src": "2353:10:17"
												},
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "<",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1633,
																"type": "uint256",
																"value": "i"
															},
															"id": 1636,
															"name": "Identifier",
															"src": "2365:1:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "length",
																"referencedDeclaration": null,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1609,
																		"type": "uint256[2] calldata",
																		"value": "choices"
																	},
																	"id": 1637,
																	"name": "Identifier",
																	"src": "2369:7:17"
																}
															],
															"id": 1638,
															"name": "MemberAccess",
															"src": "2369:14:17"
														}
													],
													"id": 1639,
													"name": "BinaryOperation",
													"src": "2365:18:17"
												},
												{
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"operator": "++",
																"prefix": false,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1633,
																		"type": "uint256",
																		"value": "i"
																	},
																	"id": 1640,
																	"name": "Identifier",
																	"src": "2385:1:17"
																}
															],
															"id": 1641,
															"name": "UnaryOperation",
															"src": "2385:3:17"
														}
													],
													"id": 1642,
													"name": "ExpressionStatement",
													"src": "2385:3:17"
												},
												{
													"children": [
														{
															"attributes": {
																"assignments": [
																	1644
																]
															},
															"children": [
																{
																	"attributes": {
																		"constant": false,
																		"name": "previous",
																		"scope": 1674,
																		"stateVariable": false,
																		"storageLocation": "storage",
																		"type": "struct Ballot.Option storage pointer",
																		"value": null,
																		"visibility": "internal"
																	},
																	"children": [
																		{
																			"attributes": {
																				"contractScope": null,
																				"name": "Option",
																				"referencedDeclaration": 1394,
																				"type": "struct Ballot.Option storage pointer"
																			},
																			"id": 1643,
																			"name": "UserDefinedTypeName",
																			"src": "2404:6:17"
																		}
																	],
																	"id": 1644,
																	"name": "VariableDeclaration",
																	"src": "2404:23:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct Ballot.Option storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "options",
																				"referencedDeclaration": 1407,
																				"type": "mapping(uint256 => struct Ballot.Option storage ref)"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"type": "struct Ballot.Round storage ref"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1418,
																								"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																								"value": "rounds"
																							},
																							"id": 1645,
																							"name": "Identifier",
																							"src": "2430:6:17"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1615,
																								"type": "uint256",
																								"value": "previousVotingRound"
																							},
																							"id": 1646,
																							"name": "Identifier",
																							"src": "2437:19:17"
																						}
																					],
																					"id": 1647,
																					"name": "IndexAccess",
																					"src": "2430:27:17"
																				}
																			],
																			"id": 1648,
																			"name": "MemberAccess",
																			"src": "2430:35:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"lValueRequested": false,
																				"type": "uint256"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1609,
																						"type": "uint256[2] calldata",
																						"value": "choices"
																					},
																					"id": 1649,
																					"name": "Identifier",
																					"src": "2466:7:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1633,
																						"type": "uint256",
																						"value": "i"
																					},
																					"id": 1650,
																					"name": "Identifier",
																					"src": "2474:1:17"
																				}
																			],
																			"id": 1651,
																			"name": "IndexAccess",
																			"src": "2466:10:17"
																		}
																	],
																	"id": 1652,
																	"name": "IndexAccess",
																	"src": "2430:47:17"
																}
															],
															"id": 1653,
															"name": "VariableDeclarationStatement",
															"src": "2404:73:17"
														},
														{
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"operator": "=",
																		"type": "struct Ballot.Option storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": true,
																				"type": "struct Ballot.Option storage ref"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "options",
																						"referencedDeclaration": 1407,
																						"type": "mapping(uint256 => struct Ballot.Option storage ref)"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"isConstant": false,
																								"isLValue": true,
																								"isPure": false,
																								"lValueRequested": false,
																								"type": "struct Ballot.Round storage ref"
																							},
																							"children": [
																								{
																									"attributes": {
																										"argumentTypes": null,
																										"overloadedDeclarations": [
																											null
																										],
																										"referencedDeclaration": 1418,
																										"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																										"value": "rounds"
																									},
																									"id": 1654,
																									"name": "Identifier",
																									"src": "2491:6:17"
																								},
																								{
																									"attributes": {
																										"argumentTypes": null,
																										"overloadedDeclarations": [
																											null
																										],
																										"referencedDeclaration": 1414,
																										"type": "uint256",
																										"value": "votingRound"
																									},
																									"id": 1655,
																									"name": "Identifier",
																									"src": "2498:11:17"
																								}
																							],
																							"id": 1656,
																							"name": "IndexAccess",
																							"src": "2491:19:17"
																						}
																					],
																					"id": 1657,
																					"name": "MemberAccess",
																					"src": "2491:27:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1633,
																						"type": "uint256",
																						"value": "i"
																					},
																					"id": 1658,
																					"name": "Identifier",
																					"src": "2519:1:17"
																				}
																			],
																			"id": 1659,
																			"name": "IndexAccess",
																			"src": "2491:30:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": false,
																				"isPure": false,
																				"isStructConstructorCall": true,
																				"lValueRequested": false,
																				"names": [
																					"votes",
																					"label",
																					"data",
																					"mode"
																				],
																				"type": "struct Ballot.Option memory",
																				"type_conversion": false
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1394,
																						"type": "type(struct Ballot.Option storage pointer)",
																						"value": "Option"
																					},
																					"id": 1660,
																					"name": "Identifier",
																					"src": "2524:6:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"hexvalue": "30",
																						"isConstant": false,
																						"isLValue": false,
																						"isPure": true,
																						"lValueRequested": false,
																						"subdenomination": null,
																						"token": "number",
																						"type": "int_const 0",
																						"value": "0"
																					},
																					"id": 1661,
																					"name": "Literal",
																					"src": "2556:1:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "label",
																						"referencedDeclaration": 1389,
																						"type": "bytes32"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1644,
																								"type": "struct Ballot.Option storage pointer",
																								"value": "previous"
																							},
																							"id": 1662,
																							"name": "Identifier",
																							"src": "2582:8:17"
																						}
																					],
																					"id": 1663,
																					"name": "MemberAccess",
																					"src": "2582:14:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "data",
																						"referencedDeclaration": 1391,
																						"type": "bytes32"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1644,
																								"type": "struct Ballot.Option storage pointer",
																								"value": "previous"
																							},
																							"id": 1664,
																							"name": "Identifier",
																							"src": "2620:8:17"
																						}
																					],
																					"id": 1665,
																					"name": "MemberAccess",
																					"src": "2620:13:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"member_name": "mode",
																						"referencedDeclaration": 1393,
																						"type": "enum Ballot.Mode"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1644,
																								"type": "struct Ballot.Option storage pointer",
																								"value": "previous"
																							},
																							"id": 1666,
																							"name": "Identifier",
																							"src": "2657:8:17"
																						}
																					],
																					"id": 1667,
																					"name": "MemberAccess",
																					"src": "2657:13:17"
																				}
																			],
																			"id": 1668,
																			"name": "FunctionCall",
																			"src": "2524:161:17"
																		}
																	],
																	"id": 1669,
																	"name": "Assignment",
																	"src": "2491:194:17"
																}
															],
															"id": 1670,
															"name": "ExpressionStatement",
															"src": "2491:194:17"
														}
													],
													"id": 1671,
													"name": "Block",
													"src": "2390:306:17"
												}
											],
											"id": 1672,
											"name": "ForStatement",
											"src": "2348:348:17"
										}
									],
									"id": 1673,
									"name": "Block",
									"src": "2185:517:17"
								}
							],
							"id": 1674,
							"name": "FunctionDefinition",
							"src": "2130:572:17"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "optionWillAccept",
								"payable": false,
								"scope": 1794,
								"stateMutability": "view",
								"superFunction": 1824,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "index",
												"scope": 1693,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1675,
													"name": "ElementaryTypeName",
													"src": "2734:4:17"
												}
											],
											"id": 1676,
											"name": "VariableDeclaration",
											"src": "2734:10:17"
										}
									],
									"id": 1677,
									"name": "ParameterList",
									"src": "2733:12:17"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1693,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 1678,
													"name": "ElementaryTypeName",
													"src": "2769:4:17"
												}
											],
											"id": 1679,
											"name": "VariableDeclaration",
											"src": "2769:4:17"
										}
									],
									"id": 1680,
									"name": "ParameterList",
									"src": "2768:6:17"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1680
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_enum$_Mode_$1385",
															"typeString": "enum Ballot.Mode"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": "==",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "mode",
																"referencedDeclaration": 1393,
																"type": "enum Ballot.Mode"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct Ballot.Option storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "options",
																				"referencedDeclaration": 1407,
																				"type": "mapping(uint256 => struct Ballot.Option storage ref)"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"type": "struct Ballot.Round storage ref"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1418,
																								"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																								"value": "rounds"
																							},
																							"id": 1681,
																							"name": "Identifier",
																							"src": "2792:6:17"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1414,
																								"type": "uint256",
																								"value": "votingRound"
																							},
																							"id": 1682,
																							"name": "Identifier",
																							"src": "2799:11:17"
																						}
																					],
																					"id": 1683,
																					"name": "IndexAccess",
																					"src": "2792:19:17"
																				}
																			],
																			"id": 1684,
																			"name": "MemberAccess",
																			"src": "2792:27:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1676,
																				"type": "uint256",
																				"value": "index"
																			},
																			"id": 1685,
																			"name": "Identifier",
																			"src": "2820:5:17"
																		}
																	],
																	"id": 1686,
																	"name": "IndexAccess",
																	"src": "2792:34:17"
																}
															],
															"id": 1687,
															"name": "MemberAccess",
															"src": "2792:39:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"member_name": "Accept",
																"referencedDeclaration": null,
																"type": "enum Ballot.Mode"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1385,
																		"type": "type(enum Ballot.Mode)",
																		"value": "Mode"
																	},
																	"id": 1688,
																	"name": "Identifier",
																	"src": "2835:4:17"
																}
															],
															"id": 1689,
															"name": "MemberAccess",
															"src": "2835:11:17"
														}
													],
													"id": 1690,
													"name": "BinaryOperation",
													"src": "2792:54:17"
												}
											],
											"id": 1691,
											"name": "Return",
											"src": "2785:61:17"
										}
									],
									"id": 1692,
									"name": "Block",
									"src": "2775:78:17"
								}
							],
							"id": 1693,
							"name": "FunctionDefinition",
							"src": "2708:145:17"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "getLabel",
								"payable": false,
								"scope": 1794,
								"stateMutability": "view",
								"superFunction": 1831,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "index",
												"scope": 1709,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1694,
													"name": "ElementaryTypeName",
													"src": "2877:4:17"
												}
											],
											"id": 1695,
											"name": "VariableDeclaration",
											"src": "2877:10:17"
										}
									],
									"id": 1696,
									"name": "ParameterList",
									"src": "2876:12:17"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1709,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bytes32",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bytes32",
														"type": "bytes32"
													},
													"id": 1697,
													"name": "ElementaryTypeName",
													"src": "2912:7:17"
												}
											],
											"id": 1698,
											"name": "VariableDeclaration",
											"src": "2912:7:17"
										}
									],
									"id": 1699,
									"name": "ParameterList",
									"src": "2911:9:17"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1699
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"member_name": "label",
														"referencedDeclaration": 1389,
														"type": "bytes32"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"type": "struct Ballot.Option storage ref"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "options",
																		"referencedDeclaration": 1407,
																		"type": "mapping(uint256 => struct Ballot.Option storage ref)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"type": "struct Ballot.Round storage ref"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1418,
																						"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																						"value": "rounds"
																					},
																					"id": 1700,
																					"name": "Identifier",
																					"src": "2938:6:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1414,
																						"type": "uint256",
																						"value": "votingRound"
																					},
																					"id": 1701,
																					"name": "Identifier",
																					"src": "2945:11:17"
																				}
																			],
																			"id": 1702,
																			"name": "IndexAccess",
																			"src": "2938:19:17"
																		}
																	],
																	"id": 1703,
																	"name": "MemberAccess",
																	"src": "2938:27:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1695,
																		"type": "uint256",
																		"value": "index"
																	},
																	"id": 1704,
																	"name": "Identifier",
																	"src": "2966:5:17"
																}
															],
															"id": 1705,
															"name": "IndexAccess",
															"src": "2938:34:17"
														}
													],
													"id": 1706,
													"name": "MemberAccess",
													"src": "2938:40:17"
												}
											],
											"id": 1707,
											"name": "Return",
											"src": "2931:47:17"
										}
									],
									"id": 1708,
									"name": "Block",
									"src": "2921:64:17"
								}
							],
							"id": 1709,
							"name": "FunctionDefinition",
							"src": "2859:126:17"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "getData",
								"payable": false,
								"scope": 1794,
								"stateMutability": "view",
								"superFunction": 1838,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "index",
												"scope": 1725,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1710,
													"name": "ElementaryTypeName",
													"src": "3008:4:17"
												}
											],
											"id": 1711,
											"name": "VariableDeclaration",
											"src": "3008:10:17"
										}
									],
									"id": 1712,
									"name": "ParameterList",
									"src": "3007:12:17"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1725,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bytes32",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bytes32",
														"type": "bytes32"
													},
													"id": 1713,
													"name": "ElementaryTypeName",
													"src": "3043:7:17"
												}
											],
											"id": 1714,
											"name": "VariableDeclaration",
											"src": "3043:7:17"
										}
									],
									"id": 1715,
									"name": "ParameterList",
									"src": "3042:9:17"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1715
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"member_name": "data",
														"referencedDeclaration": 1391,
														"type": "bytes32"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"type": "struct Ballot.Option storage ref"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "options",
																		"referencedDeclaration": 1407,
																		"type": "mapping(uint256 => struct Ballot.Option storage ref)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"type": "struct Ballot.Round storage ref"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1418,
																						"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																						"value": "rounds"
																					},
																					"id": 1716,
																					"name": "Identifier",
																					"src": "3069:6:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1414,
																						"type": "uint256",
																						"value": "votingRound"
																					},
																					"id": 1717,
																					"name": "Identifier",
																					"src": "3076:11:17"
																				}
																			],
																			"id": 1718,
																			"name": "IndexAccess",
																			"src": "3069:19:17"
																		}
																	],
																	"id": 1719,
																	"name": "MemberAccess",
																	"src": "3069:27:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1711,
																		"type": "uint256",
																		"value": "index"
																	},
																	"id": 1720,
																	"name": "Identifier",
																	"src": "3097:5:17"
																}
															],
															"id": 1721,
															"name": "IndexAccess",
															"src": "3069:34:17"
														}
													],
													"id": 1722,
													"name": "MemberAccess",
													"src": "3069:39:17"
												}
											],
											"id": 1723,
											"name": "Return",
											"src": "3062:46:17"
										}
									],
									"id": 1724,
									"name": "Block",
									"src": "3052:63:17"
								}
							],
							"id": 1725,
							"name": "FunctionDefinition",
							"src": "2991:124:17"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "isValidChoice",
								"payable": false,
								"scope": 1794,
								"stateMutability": "view",
								"superFunction": 1845,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "index",
												"scope": 1740,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1726,
													"name": "ElementaryTypeName",
													"src": "3144:4:17"
												}
											],
											"id": 1727,
											"name": "VariableDeclaration",
											"src": "3144:10:17"
										}
									],
									"id": 1728,
									"name": "ParameterList",
									"src": "3143:12:17"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1740,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 1729,
													"name": "ElementaryTypeName",
													"src": "3179:4:17"
												}
											],
											"id": 1730,
											"name": "VariableDeclaration",
											"src": "3179:4:17"
										}
									],
									"id": 1731,
									"name": "ParameterList",
									"src": "3178:6:17"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1731
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": ">",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "optionsLength",
																"referencedDeclaration": 1409,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct Ballot.Round storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1418,
																				"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																				"value": "rounds"
																			},
																			"id": 1732,
																			"name": "Identifier",
																			"src": "3202:6:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1414,
																				"type": "uint256",
																				"value": "votingRound"
																			},
																			"id": 1733,
																			"name": "Identifier",
																			"src": "3209:11:17"
																		}
																	],
																	"id": 1734,
																	"name": "IndexAccess",
																	"src": "3202:19:17"
																}
															],
															"id": 1735,
															"name": "MemberAccess",
															"src": "3202:33:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"overloadedDeclarations": [
																	null
																],
																"referencedDeclaration": 1727,
																"type": "uint256",
																"value": "index"
															},
															"id": 1736,
															"name": "Identifier",
															"src": "3238:5:17"
														}
													],
													"id": 1737,
													"name": "BinaryOperation",
													"src": "3202:41:17"
												}
											],
											"id": 1738,
											"name": "Return",
											"src": "3195:48:17"
										}
									],
									"id": 1739,
									"name": "Block",
									"src": "3185:65:17"
								}
							],
							"id": 1740,
							"name": "FunctionDefinition",
							"src": "3121:129:17"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "optionsLength",
								"payable": false,
								"scope": 1794,
								"stateMutability": "view",
								"superFunction": 1850,
								"visibility": "external"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1741,
									"name": "ParameterList",
									"src": "3278:2:17"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1751,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1742,
													"name": "ElementaryTypeName",
													"src": "3304:4:17"
												}
											],
											"id": 1743,
											"name": "VariableDeclaration",
											"src": "3304:4:17"
										}
									],
									"id": 1744,
									"name": "ParameterList",
									"src": "3303:6:17"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1744
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"member_name": "optionsLength",
														"referencedDeclaration": 1409,
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"type": "struct Ballot.Round storage ref"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1418,
																		"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																		"value": "rounds"
																	},
																	"id": 1745,
																	"name": "Identifier",
																	"src": "3327:6:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1414,
																		"type": "uint256",
																		"value": "votingRound"
																	},
																	"id": 1746,
																	"name": "Identifier",
																	"src": "3334:11:17"
																}
															],
															"id": 1747,
															"name": "IndexAccess",
															"src": "3327:19:17"
														}
													],
													"id": 1748,
													"name": "MemberAccess",
													"src": "3327:33:17"
												}
											],
											"id": 1749,
											"name": "Return",
											"src": "3320:40:17"
										}
									],
									"id": 1750,
									"name": "Block",
									"src": "3310:57:17"
								}
							],
							"id": 1751,
							"name": "FunctionDefinition",
							"src": "3256:111:17"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "quorum",
								"payable": false,
								"scope": 1794,
								"stateMutability": "view",
								"superFunction": 1855,
								"visibility": "external"
							},
							"children": [
								{
									"attributes": {
										"parameters": [
											null
										]
									},
									"children": [],
									"id": 1752,
									"name": "ParameterList",
									"src": "3388:2:17"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1759,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1753,
													"name": "ElementaryTypeName",
													"src": "3414:4:17"
												}
											],
											"id": 1754,
											"name": "VariableDeclaration",
											"src": "3414:4:17"
										}
									],
									"id": 1755,
									"name": "ParameterList",
									"src": "3413:6:17"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1755
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"overloadedDeclarations": [
															null
														],
														"referencedDeclaration": 1412,
														"type": "uint256",
														"value": "quorum"
													},
													"id": 1756,
													"name": "Identifier",
													"src": "3437:6:17"
												}
											],
											"id": 1757,
											"name": "Return",
											"src": "3430:13:17"
										}
									],
									"id": 1758,
									"name": "Block",
									"src": "3420:30:17"
								}
							],
							"id": 1759,
							"name": "FunctionDefinition",
							"src": "3373:77:17"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "votes",
								"payable": false,
								"scope": 1794,
								"stateMutability": "view",
								"superFunction": 1862,
								"visibility": "external"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "choice",
												"scope": 1775,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1760,
													"name": "ElementaryTypeName",
													"src": "3613:4:17"
												}
											],
											"id": 1761,
											"name": "VariableDeclaration",
											"src": "3613:11:17"
										}
									],
									"id": 1762,
									"name": "ParameterList",
									"src": "3612:13:17"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1775,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "uint256",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "uint",
														"type": "uint256"
													},
													"id": 1763,
													"name": "ElementaryTypeName",
													"src": "3649:4:17"
												}
											],
											"id": 1764,
											"name": "VariableDeclaration",
											"src": "3649:4:17"
										}
									],
									"id": 1765,
									"name": "ParameterList",
									"src": "3648:6:17"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1765
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"member_name": "votes",
														"referencedDeclaration": 1387,
														"type": "uint256"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"type": "struct Ballot.Option storage ref"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"member_name": "options",
																		"referencedDeclaration": 1407,
																		"type": "mapping(uint256 => struct Ballot.Option storage ref)"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"type": "struct Ballot.Round storage ref"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1418,
																						"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																						"value": "rounds"
																					},
																					"id": 1766,
																					"name": "Identifier",
																					"src": "3672:6:17"
																				},
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"overloadedDeclarations": [
																							null
																						],
																						"referencedDeclaration": 1414,
																						"type": "uint256",
																						"value": "votingRound"
																					},
																					"id": 1767,
																					"name": "Identifier",
																					"src": "3679:11:17"
																				}
																			],
																			"id": 1768,
																			"name": "IndexAccess",
																			"src": "3672:19:17"
																		}
																	],
																	"id": 1769,
																	"name": "MemberAccess",
																	"src": "3672:27:17"
																},
																{
																	"attributes": {
																		"argumentTypes": null,
																		"overloadedDeclarations": [
																			null
																		],
																		"referencedDeclaration": 1761,
																		"type": "uint256",
																		"value": "choice"
																	},
																	"id": 1770,
																	"name": "Identifier",
																	"src": "3700:6:17"
																}
															],
															"id": 1771,
															"name": "IndexAccess",
															"src": "3672:35:17"
														}
													],
													"id": 1772,
													"name": "MemberAccess",
													"src": "3672:41:17"
												}
											],
											"id": 1773,
											"name": "Return",
											"src": "3665:48:17"
										}
									],
									"id": 1774,
									"name": "Block",
									"src": "3655:65:17"
								}
							],
							"id": 1775,
							"name": "FunctionDefinition",
							"src": "3598:122:17"
						},
						{
							"attributes": {
								"constant": true,
								"implemented": true,
								"isConstructor": false,
								"modifiers": [
									null
								],
								"name": "voted",
								"payable": false,
								"scope": 1794,
								"stateMutability": "view",
								"superFunction": 1869,
								"visibility": "public"
							},
							"children": [
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "voter",
												"scope": 1793,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "address",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "address",
														"type": "address"
													},
													"id": 1776,
													"name": "ElementaryTypeName",
													"src": "3847:7:17"
												}
											],
											"id": 1777,
											"name": "VariableDeclaration",
											"src": "3847:13:17"
										}
									],
									"id": 1778,
									"name": "ParameterList",
									"src": "3846:15:17"
								},
								{
									"children": [
										{
											"attributes": {
												"constant": false,
												"name": "",
												"scope": 1793,
												"stateVariable": false,
												"storageLocation": "default",
												"type": "bool",
												"value": null,
												"visibility": "internal"
											},
											"children": [
												{
													"attributes": {
														"name": "bool",
														"type": "bool"
													},
													"id": 1779,
													"name": "ElementaryTypeName",
													"src": "3883:4:17"
												}
											],
											"id": 1780,
											"name": "VariableDeclaration",
											"src": "3883:4:17"
										}
									],
									"id": 1781,
									"name": "ParameterList",
									"src": "3882:6:17"
								},
								{
									"children": [
										{
											"attributes": {
												"functionReturnParameters": 1781
											},
											"children": [
												{
													"attributes": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														},
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"operator": ">",
														"type": "bool"
													},
													"children": [
														{
															"attributes": {
																"argumentTypes": null,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"member_name": "weight",
																"referencedDeclaration": 1396,
																"type": "uint256"
															},
															"children": [
																{
																	"attributes": {
																		"argumentTypes": null,
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"type": "struct Ballot.Vote storage ref"
																	},
																	"children": [
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"isConstant": false,
																				"isLValue": true,
																				"isPure": false,
																				"lValueRequested": false,
																				"member_name": "votes",
																				"referencedDeclaration": 1403,
																				"type": "mapping(address => struct Ballot.Vote storage ref)"
																			},
																			"children": [
																				{
																					"attributes": {
																						"argumentTypes": null,
																						"isConstant": false,
																						"isLValue": true,
																						"isPure": false,
																						"lValueRequested": false,
																						"type": "struct Ballot.Round storage ref"
																					},
																					"children": [
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1418,
																								"type": "mapping(uint256 => struct Ballot.Round storage ref)",
																								"value": "rounds"
																							},
																							"id": 1782,
																							"name": "Identifier",
																							"src": "3906:6:17"
																						},
																						{
																							"attributes": {
																								"argumentTypes": null,
																								"overloadedDeclarations": [
																									null
																								],
																								"referencedDeclaration": 1414,
																								"type": "uint256",
																								"value": "votingRound"
																							},
																							"id": 1783,
																							"name": "Identifier",
																							"src": "3913:11:17"
																						}
																					],
																					"id": 1784,
																					"name": "IndexAccess",
																					"src": "3906:19:17"
																				}
																			],
																			"id": 1785,
																			"name": "MemberAccess",
																			"src": "3906:25:17"
																		},
																		{
																			"attributes": {
																				"argumentTypes": null,
																				"overloadedDeclarations": [
																					null
																				],
																				"referencedDeclaration": 1777,
																				"type": "address",
																				"value": "voter"
																			},
																			"id": 1786,
																			"name": "Identifier",
																			"src": "3932:5:17"
																		}
																	],
																	"id": 1787,
																	"name": "IndexAccess",
																	"src": "3906:32:17"
																}
															],
															"id": 1788,
															"name": "MemberAccess",
															"src": "3906:39:17"
														},
														{
															"attributes": {
																"argumentTypes": null,
																"hexvalue": "30",
																"isConstant": false,
																"isLValue": false,
																"isPure": true,
																"lValueRequested": false,
																"subdenomination": null,
																"token": "number",
																"type": "int_const 0",
																"value": "0"
															},
															"id": 1789,
															"name": "Literal",
															"src": "3948:1:17"
														}
													],
													"id": 1790,
													"name": "BinaryOperation",
													"src": "3906:43:17"
												}
											],
											"id": 1791,
											"name": "Return",
											"src": "3899:50:17"
										}
									],
									"id": 1792,
									"name": "Block",
									"src": "3889:67:17"
								}
							],
							"id": 1793,
							"name": "FunctionDefinition",
							"src": "3832:124:17"
						}
					],
					"id": 1794,
					"name": "ContractDefinition",
					"src": "99:3859:17"
				}
			],
			"id": 1795,
			"name": "SourceUnit",
			"src": "0:3959:17"
		},
		"compiler": {
			"name": "solc",
			"version": "0.4.18+commit.9cf6e910.Emscripten.clang"
		},
		"networks": {},
		"schemaVersion": "1.0.1",
		"updatedAt": "2018-01-18T17:45:14.651Z"
	}
];
/* harmony export (immutable) */ __webpack_exports__["a"] = data;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Deploy__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_web3_Contract_Methods__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_web3_Contract_Events__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_web3_Contract_Properties__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_web3_Contract_Options__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_web3_Contract_ContractModel__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_web3_Transaction_TransactionResponse__ = __webpack_require__(46);








class Web3Factory {

	/**
	 * @param {Web3} web3
	 */
	constructor(web3) {
		this.web3 = web3;
	}

	/**
	 * @returns {Deploy}
	 */
	createDeploy() {
		return new __WEBPACK_IMPORTED_MODULE_0__lib_web3_Deploy__["a" /* default */](this.web3);
	}

	/**
	 * @param {Array} abi
	 * @param {string} address
	 * @returns {ContractModel}
	 */
	createContractModel(abi, address) {
		const contract = new this.web3.eth.Contract(
			abi,
			address
		);

		return new __WEBPACK_IMPORTED_MODULE_5__lib_web3_Contract_ContractModel__["a" /* ContractModel */](contract, abi);
	}

	/**
	 * @param {Web3.eth.Contract} contract
	 * @param {Array} abi
	 * @returns {Methods}
	 */
	createContractMethods(contract, abi) {
		return new __WEBPACK_IMPORTED_MODULE_1__lib_web3_Contract_Methods__["a" /* Methods */](contract, abi, this);
	}

	/**
	 * @param {Web3.eth.Contract} contract
	 * @returns {Events}
	 */
	createContractEvents(contract) {
		return new __WEBPACK_IMPORTED_MODULE_2__lib_web3_Contract_Events__["a" /* Events */](contract);
	}

	/**
	 * @param {Web3.eth.Contract} contract
	 * @returns {Options}
	 */
	createContractOptions(contract) {
		return new __WEBPACK_IMPORTED_MODULE_4__lib_web3_Contract_Options__["a" /* Options */](contract)
	}

	/**
	 * @param {Web3.eth.Contract} contract
	 * @returns {Properties}
	 */
	createContractProperties(contract) {
		return new __WEBPACK_IMPORTED_MODULE_3__lib_web3_Contract_Properties__["a" /* Properties */](contract);
	}

	/**
	 * @param {Promise} transactionResponse
	 * @returns {TransactionResponse}
	 */
	createTransactionResponse(transactionResponse) {
		return new __WEBPACK_IMPORTED_MODULE_6__lib_web3_Transaction_TransactionResponse__["a" /* TransactionResponse */](transactionResponse);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Web3Factory;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Deploy {

    /**
     * @param {Web3} web3
     */
    constructor(web3) {
        this.web3 = web3;
    }

    /**
     * @param {array} contractMap 
     * @param {string} from
     * @return {Object}
     */
    deployContracts(contractMap, from) {
        let self = this;

        return new Promise((resolve, reject) => {
            let contractAddress = [];
            contractMap.forEach((contract, key) => {
                self.deploy(contract.bytecode, contract.arguments, from).then((result) => {
                    contractAddress[contract.name] = result.contractAddress;
                    if(key == (contractMap.length - 1)) {
                        resolve(contractAddress);
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    }

    /**
     * @param {string} bytecode 
     * @param {Object} deployArguments
     * @param {number} gas
     * @param {number} gasPrice
     * @param {string} from
     * @return {Promise}
     */
    deploy(bytecode, deployArguments, gas, gasPrice, from) {
        return new this.web3.eth.sendTransaction(
            {
                from: from,
                data: bytecode,
                gas: gas,
                gasPrice: gasPrice,
                deployArguments 
            }
        );
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Deploy;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Methods {

	/**
	 * @param {Web3.eth.Contract} contract
	 * @param {Array} abi
	 * @param {Web3Factory} web3Factory
	 */
	constructor(contract, abi, web3Factory) {
		this.contract = contract;
		this.abi = abi;
		this.web3Factory = web3Factory;
	}

	/**
	 * Execute method and decide if it is to call or send as transaction
	 * @param {string} methodName
	 * @param {array} methodArguments
	 * @param {string} from
	 * @param {string} gas
	 * @param {string} gasPrice
	 * @returns {Promise}
	 */
	executeMethod(methodName, methodArguments, from = null, gas = null, gasPrice = null) {
		if (this.getMethodMetaData(methodName).constant) {
			return this.callMethod(methodName, methodArguments);
		}

		return this.sendTransaction(methodName, methodArguments, from, gas, gasPrice);
	}

	/**
	 * Get method form contract
	 * @param {string} methodName
	 * @returns {Object}
	 */
	getMethod(methodName) {
		return this.contract.methods[methodName];
	}

	/**
	 * Get method metadata from abi
	 * @param {string} methodName
	 * @returns {Object}
	 */
	getMethodMetaData(methodName) {
		let methods = this.abi.filter((method) => {
				return method.type === "function"
			}
		);

		return methods.filter((method) => {
				return method.name === methodName
			}
		)[0];
	}

	/**
	 * Apply arguments to contract method
	 * @param {string} methodName
	 * @param {params} methodArguments
	 * @return {Object}
	 */
	getMethodWithArguments(methodName, methodArguments) {
		return this.contract.methods[methodName](...methodArguments);
	}

	/**
	 * Get estimate gas for method
	 * @param {string} methodName
	 * @param {array} methodArguments
	 * @return {Object}
	 */
	estimateGas(methodName, methodArguments) {
		return this.getMethodWithArguments(methodName, methodArguments).estimateGas();
	}

	/**
	 * Call method on contract
	 * @param {string} methodName
	 * @param {array} methodArguments
	 * @return {Object}
	 */
	callMethod(methodName, methodArguments) {
		return this.getMethodWithArguments(methodName, methodArguments).call();
	}

	/**
	 * Send transaction to call an method
	 * @param {string} methodName
	 * @param {array} methodArguments
	 * @param {string} from
	 * @param {string} gas
	 * @param {string} gasPrice
	 * @return {TransactionResponse}
	 */
	sendTransaction(methodName, methodArguments, from, gas, gasPrice) {
		return this.web3Factory.createTransactionResponse(this.getMethodWithArguments(methodName, methodArguments).send({
			from: from,
			gas: gas,
			gasPrice: gasPrice
		}));
	}

	/**
	 * @param {string} methodName
	 * @param {array} methodArguments
	 * @return {Object}
	 */
	encodeAbi(methodName, methodArguments) {
		return this.getMethodWithArguments(methodName, methodArguments).encodeAbi();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Methods;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Events {

	/**
	 * @param {Web3.eth.Contract} contract
	 */
	constructor(contract) {
		this.contract = contract;
	}

	/**
	 * Listen for event on contract
	 * @param {string} eventName
	 * @param {Object} options
	 * @return {Object}
	 */
	listenForEvent(eventName, options = undefined) {
		return this.contract.events[eventName](options);
	}

	/**
	 * Listen only once if an event is fired
	 * @param {string} eventName
	 * @param {Object} options
	 * @return {Object}
	 */
	listenOnceForEvent(eventName, options = undefined) {
		return this.contract.once(eventName, options);
	}

	/**
	 * Listen for all events
	 * @param {Object} options
	 * @return {Object}
	 */
	listenForAllEvents(options = undefined) {
		return this.contract.allEvents(options);
	}

	/**
	 * Get history of an event
	 * @param {string} eventName
	 * @param {Object} options
	 * @return {Object}
	 */
	getPastEvents(eventName, options) {
		return this.contract.getPastEvents(eventName, options);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Events;




/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);


class Properties {

	/**
	 * @param {Web3.eth.Contract} contract
	 */
	constructor(contract) {
		this.contract = contract;
	}

	/**
	 * @param {string} propertyName
	 * @returns {Promise}
	 */
	get(propertyName) {
		return this.contract.methods[propertyName]().call();
	}

	/**
	 * Return all entry from contract map based on public counter property
	 * @param {string} counter
	 * @param {string} propertyName
	 * @returns {Promise}
	 */
	getMap(counter, propertyName) {
		return new Promise((resolve, reject) => {
			this.contract.methods[counter]().call().then(async counter => {
				const map = [];
				for (let i = counter; i > 0; i--) {
					map.push(await this.contract.methods[propertyName]().call())
				}
				resolve(map);
			}).catch(reject);
		});
	}

	/**
	 * Get map as observable for better UX
	 * @param {string} counter
	 * @param {string} propertyName
	 */
	getMapAsObservable(counter, propertyName) {
		return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].create(observer => {
			this.contract.methods[counter]().call().then(async counter => {
				for (let i = counter; i > 0; i--) {
					observer.next(await this.contract.methods[propertyName]().call())
				}
				observer.complete();
			})
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Properties;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Options {

	/**
	 * @param {Web3.Contract} contract
	 */
	constructor(contract) {
		this.contract = contract;
	}

	/**
	 * Get contract options
	 * @return {Object}
	 */
	getOptions() {
		return this.contract.options
	}

	/**
	 * Get Contract option
	 * @param {string} optionName
	 * @return {Object}
	 */
	getOption(optionName) {
		return this.contract.options[optionName]
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Options;



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ContractModel {

	/**
	 * @param {Web3.eth.Contract} contract
	 * @param {Array} abi
	 */
	constructor(contract, abi) {
		this.contract = contract;
		this.abi = abi;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ContractModel;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TransactionResponse {

	/**
	 * @param {Promise} transactionPromise
	 */
	constructor(transactionPromise) {
		this.transactionPromise = transactionPromise;
	}

	/**
	 * @returns {Promise}
	 */
	getReturnValues() {
		return new Promise((resolve, reject) => {
			this.transactionPromise.then(transactionResponse => {
				const returnValues = [];
				Object.keys(transactionResponse.events).forEach(key => {
					if (isNaN(key)) {
						returnValues[key] = transactionResponse.events[key].returnValues;
					}
				});

				resolve(returnValues);
			}).catch(error => reject(error));
		});
	}

	/**
	 * @returns {Promise}
	 */
	getTransactionHeader() {
		return new Promise((resolve, reject) => {
			this.transactionPromise.then(transactionResponse => {
				delete transactionResponse.events;
				resolve(transactionResponse);
			}).catch(error => reject(error));
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TransactionResponse;



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contracts_managers_ProposalManager__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contracts_proposals_Proposal__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contracts_version_Version__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contracts_voting_VotingRights__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contracts_voting_VotingPower__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contracts_Organization__ = __webpack_require__(4);







class ContractFactory {

	/**
	 * @param {Web3} web3
	 * @param {Array} contractData
	 * @param {Web3Factory} web3Factory
	 */
	constructor(web3, contractData, web3Factory) {
		this.web3 = web3;
		this.web3Factory = web3Factory;
		this.contractData = contractData;
	}

	/**
	 * @param {string} address
	 * @returns {Organization}
	 */
	createOrganization(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('Organization'),
			address
		);

		return new __WEBPACK_IMPORTED_MODULE_5__contracts_Organization__["a" /* default */](
			this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi),
			this.web3Factory.createContractProperties(contractModel.contract),
			this
		);
	}

	/**
	 * @param {string} address
	 * @returns {ProposalManager}
	 */
	createProposalManager(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('ProposalManager'),
			address
		);

		return new __WEBPACK_IMPORTED_MODULE_0__contracts_managers_ProposalManager__["a" /* default */](
			this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi),
			this.web3Factory.createContractProperties(contractModel.contract),
			this
		);
	}

	/**
	 * @param {string} address
	 * @returns {Proposal}
	 */
	createProposal(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('Proposal'),
			address
		);

		return new __WEBPACK_IMPORTED_MODULE_1__contracts_proposals_Proposal__["a" /* default */](this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
	}

	/**
	 * @param {string} address
	 * @returns {Version}
	 */
	createVersion(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('Version'),
			address
		);

		return new __WEBPACK_IMPORTED_MODULE_2__contracts_version_Version__["a" /* default */](this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
	}

	/**
	 * @param {string} address
	 * @returns {VotingRights}
	 */
	createVotingRights(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('VotingRights'),
			address
		);

		return new __WEBPACK_IMPORTED_MODULE_3__contracts_voting_VotingRights__["a" /* default */](this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
	}

	/**
	 * @param {string} address
	 * @returns {VotingPower}
	 */
	createVotingPower(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('VotingPower'),
			address
		);

		return new __WEBPACK_IMPORTED_MODULE_4__contracts_voting_VotingPower__["a" /* default */](this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
	}

	/**
	 * @param {string} address
	 * @returns {Ballot}
	 */
	createBallot(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('Ballot'),
			address
		);

		return new Ballot(
			this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi),
			this.web3Factory.createContractProperties(contractModel.contract)
		);
	}

	/**
	 * @param {string} contractName
	 * @returns {Array|*}
	 */
	getAbiFromContractData(contractName) {
		return this.contractData.filter((contract) => contract.contractName == contractName)[0].abi;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ContractFactory;



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);



class ProposalManager extends __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__["a" /* AbstractContract */] {

	/**
	 * @param {Methods} methods
	 * @param {Properties} properties
	 * @param {ContractFactory} contractFactory
	 */
	constructor(methods, properties, contractFactory) {
		super();
		this.methods = methods;
		this.properties = properties;
		this.contractFactory = contractFactory;
	}

	/**
	 * @returns {Observable}
	 */
	get proposals () {
		return this.properties.getMapAsObservable('nextId', 'proposals').map(proposal => {
			return this.contractFactory.createProposal(proposal);
		});
	}

	/**
	 * @param {string} creator
	 * @param {string} proposal
	 * @param {string} from
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @returns {Promise}
	 */
	add(creator, proposal, from, gas, gasPrice) {
		return this.methods.executeMethod('add', [creator, proposal], from, gas, gasPrice);
	}

	/**
	 * @param {number} id
	 * @param {string} from
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @returns {Promise}
	 */
	approve(id, from, gas, gasPrice) {
		return this.methods.executeMethod('approve' [id], from, gas, gasPrice);
	}

	/**
	 * @param {number} id
	 * @returns {Promise}
	 */
	isApproved(id) {
		return this.methods.executeMethod('isApproved' [id]);
	}

	/**
	 * @param {number} id
	 * @returns {Promise}
	 */
	async getProposal(id) {
		return await this.proposals[id];
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProposalManager;



/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var map_1 = __webpack_require__(50);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var map_1 = __webpack_require__(51);
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return map_1.map(project, thisArg)(this);
}
exports.map = map;
//# sourceMappingURL=map.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
exports.MapOperator = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=map.js.map

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__ = __webpack_require__(1);


class Proposal extends __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__["a" /* AbstractContract */] {

	/**
	 * @param {Methods} methods
	 */
	constructor(methods) {
		super();
		this.methods = methods;
	}

	/**
	 * @returns {Promise}
	 */
	isEnded() {
		return this.methods.executeMethod('isEnded', []);
	}

	/**
	 * @returns {Promise}
	 */
	isVoting() {
		return this.methods.executeMethod('isVoting', []);
	}

	/**
	 * @returns {Promise}
	 */
	isExecuted() {
		return this.methods.executeMethod('isExecuted', []);
	}

	/**
	 * @returns {Promise}
	 */
	canExecute() {
		return this.methods.executeMethod('canExecute', []);
	}

	/**
	 * @returns {Promise}
	 */
	createdAt() {
		return this.methods.executeMethod('createdAt', []);
	}

	/**
	 * @returns {Promise}
	 */
	isAccepted() {
		return this.methods.executeMethod('isAccepted', []);
	}

	/**
	 * @returns {Promise}
	 */
	executor() {
		return this.methods.executeMethod('executor', []);
	}

	/**
	 * @returns {Promise}
	 */
	ballot() {
		return this.methods.executeMethod('ballot', []);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Proposal;



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__ = __webpack_require__(1);


class Version extends __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract_AbstractContract__["a" /* AbstractContract */] {

    /**
     * @param {Methods} methods
     */
    constructor(methods) {
        super();
        this.methods = methods;
    }

    /**
     * @param {string} votingRightsAddress
     * @param {string} votingStrategyAddress
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @return {Promise}
     */
    createOrganization(votingRightsAddress, votingStrategyAddress, from, gas, gasPrice) {
        return this.methods.executeMethod(
            'createOrganization',
            [
                votingRightsAddress,
                votingStrategyAddress
            ],
            from,
            gas,
            gasPrice
        );
    }

    /**
     * @param {number} contractId
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @return {Promise}
     */
    destroyOrganization(contractId, from, gas, gasPrice) {
        return this.methods.executeMethod('destroyOrganization', [contractId], from, gas, gasPrice);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Version;



/***/ })
/******/ ]);
});