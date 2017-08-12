(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Harbour"] = factory();
	else
		root["Harbour"] = factory();
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_ConnectionModel__ = __webpack_require__(1);


class Contract {

    /**
     * @param {Web3} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    constructor(web3Connection) {
        if (!(web3Connection instanceof __WEBPACK_IMPORTED_MODULE_0__models_ConnectionModel__["a" /* default */])) {
            throw new Error('Argument web3Connection should be an instance of ConnectionModel');
        }

        this.from = web3Connection.getFrom();
        this.abi = web3Connection.getAbi();
        this.web3 = web3Connection.getWeb3();
        this.contract = new web3.eth.Contract(this.abi, web3Connection.getAddress());
        this.address = this.contract._address;
    }

    /**
     * Run function from contract
     * @param {string} methodName 
     * @param {params} methodArguments 
     * @return {Object}
     */
    getMethod(methodName, methodArguments) {
        return this.contract.methods[methodName].apply(this.contract, methodArguments);
    }

    /**
    * @return {Object} 
    */
    getOptions() {
        return this.contract.options;
    }

    /**
     * Get Contract option
     * @param {string} optionName 
     * @return {Object}
     */
    getOption(optionName) {
        return this.contract.options[optionName];
    }

    /**
     * Get estimate gas for method
     * @param {string} methodName 
     * @param {array} methodArguments 
     * @return {Object}
     */
    estimateGas(methodName, methodArguments) {
        return this.getMethod(methodNamename, methodArguments).estimateGas();
    }

    /**
     * Call method on contract
     * @param {string} methodName 
     * @param {array} methodArguments
     * @return {Object}
     */
    callMethod(methodName, methodArguments) {
        return this.getMethod(methodName, methodArguments).call();
    }

    /**
     * Send transaction to the contract an run an method
     * @param {string} methodName 
     * @param {array} methodArguments 
     * @return {Object}
     */
    sendTransaction(methodName, methodArguments) {
        return this.getMethod(methodName, methodArguments).send({ from: this.from });
    }

    /**
     * 
     * @param {string} methodName 
     * @param {array} methodArguments 
     * @return {Object}
     */
    encodeAbi(methodName, methodArguments) {
        return this.getMethod(methodName, methodArguments).encodeAbi();
    }

    /**
     * Clone contract and return new contractAdapter instance
     * @return {Object}
     */
    clone(web3Contract) {
        let clonedContract = web3Contract.clone();
        let contractAdapterClone = Object.assign({}, this);
        contractAdapterClone.contract = clonedContract;
        contractAdapterClone.address = clonedContract._address;
        return contractAdapterClone;
    }

    /**
     * Deploy new contract on the blockchain
     * @param {number} gasPrice 
     * @param {number} gas 
     * @param {string} data 
     * @param {array} deployArguments
     * @return {Object} 
     */
    deploy(gasPrice, gas, data, deployArguments) {
        return this.clone(this.contract.deploy({
            data: data,
            arguments: deployArguments
        }).send({
            from: this.from,
            gas: gas,
            gasPrice: gasPrice
        }));
    }

    /**
     * Listen for event on contract
     * @param {string} eventName 
     * @param {object} options 
     * @return {Object}
     */
    listenForEvent(eventName, options = undefined) {
        return this.contract.events[eventName](options);
    }

    /**
     * Listen only once if an event is fired
     * @param {string} eventName 
     * @param {object} options 
     * @return {Object}
     */
    listenOnceForEvent(eventName, options = undefined) {
        return this.contract.once(eventName, options);
    }

    /**
     * Listen for all events
     * @param {object} options 
     * @return {Object}
     */
    listenForAllEvents(options = undefined) {
        return this.contract.allEvents(options);
    }

    /**
     * Get history of an event
     * @param {string} eventName 
     * @param {object} options 
     * @return {Object}
     */
    getPastEvents(eventName, options) {
        return this.contract.getPastEvents(eventName, options);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Contract;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class ConnectionModel {

    /**
     * @param {Object} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    constructor(web3, abi, address, from) {
        this.web3 = web3;
        this.abi = abi;
        this.address = address;
        this.from = from;
    }

    /**
     * @return {Object}
     */
    getWeb3() {
        return this.web3;
    }

    /**
     * @return {array}
     */
    getAbi() {
        return this.abi;
    }

    /**
     * @return {string}
     */
    getAddress() {
        return this.address;
    }

    /**
     * @return {string}
     */
    getFrom() {
        return this.from;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConnectionModel;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web3_Contract__ = __webpack_require__(0);


class Congress extends __WEBPACK_IMPORTED_MODULE_0__web3_Contract__["a" /* default */] {

    /**
     * @param {number} proposal 
     * @param {number} choice 
     * @return {Promise}
     */
    vote(proposal, choice) {
        return this.sendTransaction('vote', [proposal, choice]);
    }

    /**
     * @param {string} name 
     * @param {*} payload 
     * @return {Promise}
     */
    propose(name, payload) {
        return this.sendTransaction('propose', [name, payload]);
    }

    /**
     * @param {number} proposalFactory 
     * @param {*} payload 
     * @return {Promise}
     */
    createProposal(proposalFactory, payload) {
        return this.sendTransaction('createProposal', [proposalFactory, payload]);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Congress;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web3_Contract__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web3_models_ConnectionModel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_Congress__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionModel", function() { return __WEBPACK_IMPORTED_MODULE_1__web3_models_ConnectionModel__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Congress", function() { return __WEBPACK_IMPORTED_MODULE_2__api_Congress__["a"]; });





//Export public modules


/***/ })
/******/ ]);
});