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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class ContractAdapter {

    /**
     * @param {Web3} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    constructor(web3, abi, address, gasPrice = undefined, from = undefined) {
        this.from = from;
        this.abi = abi;
        this.contract = new web3.eth.Contract(this.abi, address, {
            gasPrice: gasPrice,
            from: this.from
        });
        this.address = this.contract._address;
    }

    /**
     * Run function from contract
     * @param {string} methodName 
     * @param {params} contractArguments 
     * @return \Provide
     */
    getMethod(methodName, contractArguments) {
        this.contract.methods[methodName].apply(this.contract, contractArguments);
    }

    /**
    * @return \Provide 
    */
    getOptions() {
        return this.contract.options;
    }

    /**
     * Get Contract option
     * @param {string} optionName 
     * @return \Provide
     */
    getOption(optionName) {
        return this.contract.options[optionName];
    }

    /**
     * Get estimate gas for method
     * @param {string} methodName 
     * @param {array} contractArguments 
     * @return \Provide
     */
    estimateGas(methodName, contractArguments) {
        return this.getMethod(methodNamename, contractArguments).estimateGas({ from: this.from });
    }

    /**
     * Call method on contract
     * @param {string} methodName 
     * @param {array} contractArguments
     * @return \Provide 
     */
    callMethod(methodName, contractArguments) {
        return this.getMethod(methodNamename, contractArguments).call({ from: this.from });
    }

    /**
     * Send transaction to the contract an run an method
     * @param {string} methodName 
     * @param {array} contractArguments 
     * @return \Provide
     */
    sendTransaction(methodName, contractArguments) {
        return this.getMethod(methodName, contractArguments).send({ from: this.from });
    }

    /**
     * 
     * @param {string} methodName 
     * @param {array} contractArguments 
     * @return \Provide
     */
    encodeAbi(methodName, contractArguments) {
        return this.getMethod(methodName, contractArguments).encodeAbi();
    }

    /**
     * Clone contract and return new contractAdapter instance
     * @return ContractAdapter
     */
    clone() {
        let clonedContract = this.contract.clone();
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
     * @param {array} contractArguments
     * @return \Provide
     */
    deploy(gasPrice, gas, data, contractArguments) {
        return this.contract.deploy({
            data: data,
            arguments: contractArguments
        }).send({
            from: this.from,
            gas: gas,
            gasPrice: gasPrice
        });
    }

    /**
     * Listen for event on contract
     * @param {string} eventName 
     * @param {object} options 
     * @return \Provide
     */
    listenForEvent(eventName, options = undefined) {
        return this.contract.events[eventName](options);
    }

    /**
     * Listen only once if an event is fired
     * @param {string} eventName 
     * @param {object} options 
     * @return \Provide
     */
    listenOnceForEvent(eventName, options = undefined) {
        return this.contract.once(eventName, options);
    }

    /**
     * Listen for all events
     * @param {object} options 
     * @return \Provide
     */
    listenForAllEvents(options = undefined) {
        return this.contract.allEvents(options);
    }

    /**
     * Get history of an event
     * @param {string} eventName 
     * @param {object} options 
     * @return \Provide
     */
    getPastEvents(eventName, options) {
        return this.contract.getPastEvents(eventName, options);
    }

    getAvaibleEvents() {
        // research
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ContractAdapter;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ContractAdapter__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ContractAdapter", function() { return __WEBPACK_IMPORTED_MODULE_0_ContractAdapter__["a"]; });




/***/ })
/******/ ]);
});