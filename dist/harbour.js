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
/* exports provided: default */
/* exports used: default */
/*!*************************************!*\
  !*** ./lib/web3/ContractAdapter.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("\nclass ContractAdapter {\n\n    /**\n     * @param {Web3} web3 \n     * @param {array} abi \n     * @param {string} address \n     * @param {number} gasPrice \n     * @param {string} from \n     */\n    constructor(web3, abi, address, from, gasPrice = undefined) {\n        this.from = from;\n        this.abi = abi;\n        this.contract = new web3.eth.Contract(this.abi, address, {\n            gasPrice: gasPrice,\n            from: this.from\n        });\n        this.address = this.contract._address;\n    }\n\n    /**\n     * Run function from contract\n     * @param {string} methodName \n     * @param {params} methodArguments \n     * @return \\Provide\n     */\n    getMethod(methodName, methodArguments) {\n        return this.contract.methods[methodName].apply(this.contract, methodArguments);\n    }\n\n    /**\n    * @return \\Provide \n    */\n    getOptions() {\n        return this.contract.options;\n    }\n\n    /**\n     * Get Contract option\n     * @param {string} optionName \n     * @return \\Provide\n     */\n    getOption(optionName) {\n        return this.contract.options[optionName];\n    }\n\n    /**\n     * Get estimate gas for method\n     * @param {string} methodName \n     * @param {array} methodArguments \n     * @return \\Provide\n     */\n    estimateGas(methodName, methodArguments) {\n        return this.getMethod(methodNamename, methodArguments).estimateGas({ from: this.from });\n    }\n\n    /**\n     * Call method on contract\n     * @param {string} methodName \n     * @param {array} methodArguments\n     * @return \\Provide \n     */\n    callMethod(methodName, methodArguments) {\n        return this.getMethod(methodName, methodArguments).call({ from: this.from });\n    }\n\n    /**\n     * Send transaction to the contract an run an method\n     * @param {string} methodName \n     * @param {array} methodArguments \n     * @return \\Provide\n     */\n    sendTransaction(methodName, methodArguments) {\n        return this.getMethod(methodName, methodArguments).send({ from: this.from });\n    }\n\n    /**\n     * \n     * @param {string} methodName \n     * @param {array} methodArguments \n     * @return \\Provide\n     */\n    encodeAbi(methodName, methodArguments) {\n        return this.getMethod(methodName, methodArguments).encodeAbi();\n    }\n\n    /**\n     * Clone contract and return new contractAdapter instance\n     * @return ContractAdapter\n     */\n    clone() {\n        let clonedContract = this.contract.clone();\n        let contractAdapterClone = Object.assign({}, this);\n        contractAdapterClone.contract = clonedContract;\n        contractAdapterClone.address = clonedContract._address;\n        return contractAdapterClone;\n    }\n\n    /**\n     * Deploy new contract on the blockchain\n     * @param {number} gasPrice \n     * @param {number} gas \n     * @param {string} data \n     * @param {array} methodArguments\n     * @return \\Provide\n     */\n    deploy(gasPrice, gas, data, methodArguments) {\n        return this.contract.deploy({\n            data: data,\n            arguments: methodArguments\n        }).send({\n            from: this.from,\n            gas: gas,\n            gasPrice: gasPrice\n        });\n    }\n\n    /**\n     * Listen for event on contract\n     * @param {string} eventName \n     * @param {object} options \n     * @return \\Provide\n     */\n    listenForEvent(eventName, options = undefined) {\n        return this.contract.events[eventName](options);\n    }\n\n    /**\n     * Listen only once if an event is fired\n     * @param {string} eventName \n     * @param {object} options \n     * @return \\Provide\n     */\n    listenOnceForEvent(eventName, options = undefined) {\n        return this.contract.once(eventName, options);\n    }\n\n    /**\n     * Listen for all events\n     * @param {object} options \n     * @return \\Provide\n     */\n    listenForAllEvents(options = undefined) {\n        return this.contract.allEvents(options);\n    }\n\n    /**\n     * Get history of an event\n     * @param {string} eventName \n     * @param {object} options \n     * @return \\Provide\n     */\n    getPastEvents(eventName, options) {\n        return this.contract.getPastEvents(eventName, options);\n    }\n\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = ContractAdapter;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvd2ViMy9Db250cmFjdEFkYXB0ZXIuanM/Y2Y3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyYWN0QWRhcHRlciB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1dlYjN9IHdlYjMgXG4gICAgICogQHBhcmFtIHthcnJheX0gYWJpIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBnYXNQcmljZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3ZWIzLCBhYmksIGFkZHJlc3MsIGZyb20sIGdhc1ByaWNlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgICAgIHRoaXMuYWJpID0gYWJpO1xuICAgICAgICB0aGlzLmNvbnRyYWN0ID0gbmV3IHdlYjMuZXRoLkNvbnRyYWN0KFxuICAgICAgICAgICAgdGhpcy5hYmksXG4gICAgICAgICAgICBhZGRyZXNzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGdhc1ByaWNlOmdhc1ByaWNlLFxuICAgICAgICAgICAgICAgIGZyb206IHRoaXMuZnJvbVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZHJlc3MgPSB0aGlzLmNvbnRyYWN0Ll9hZGRyZXNzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1biBmdW5jdGlvbiBmcm9tIGNvbnRyYWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgXG4gICAgICogQHBhcmFtIHtwYXJhbXN9IG1ldGhvZEFyZ3VtZW50cyBcbiAgICAgKiBAcmV0dXJuIFxcUHJvdmlkZVxuICAgICAqL1xuICAgIGdldE1ldGhvZChtZXRob2ROYW1lLCAgbWV0aG9kQXJndW1lbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyYWN0Lm1ldGhvZHNbbWV0aG9kTmFtZV0uYXBwbHkodGhpcy5jb250cmFjdCwgbWV0aG9kQXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEByZXR1cm4gXFxQcm92aWRlIFxuICAgICovXG4gICAgZ2V0T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJhY3Qub3B0aW9uc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBDb250cmFjdCBvcHRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uTmFtZSBcbiAgICAgKiBAcmV0dXJuIFxcUHJvdmlkZVxuICAgICAqL1xuICAgIGdldE9wdGlvbihvcHRpb25OYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyYWN0Lm9wdGlvbnNbb3B0aW9uTmFtZV1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZXN0aW1hdGUgZ2FzIGZvciBtZXRob2RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBtZXRob2RBcmd1bWVudHMgXG4gICAgICogQHJldHVybiBcXFByb3ZpZGVcbiAgICAgKi9cbiAgICBlc3RpbWF0ZUdhcyhtZXRob2ROYW1lLCBtZXRob2RBcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kKG1ldGhvZE5hbWVuYW1lLCBtZXRob2RBcmd1bWVudHMpLmVzdGltYXRlR2FzKHtmcm9tOiB0aGlzLmZyb219KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsIG1ldGhvZCBvbiBjb250cmFjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IG1ldGhvZEFyZ3VtZW50c1xuICAgICAqIEByZXR1cm4gXFxQcm92aWRlIFxuICAgICAqL1xuICAgIGNhbGxNZXRob2QobWV0aG9kTmFtZSwgbWV0aG9kQXJndW1lbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1ldGhvZChtZXRob2ROYW1lLCBtZXRob2RBcmd1bWVudHMpLmNhbGwoe2Zyb206IHRoaXMuZnJvbX0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgdHJhbnNhY3Rpb24gdG8gdGhlIGNvbnRyYWN0IGFuIHJ1biBhbiBtZXRob2RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBtZXRob2RBcmd1bWVudHMgXG4gICAgICogQHJldHVybiBcXFByb3ZpZGVcbiAgICAgKi9cbiAgICBzZW5kVHJhbnNhY3Rpb24obWV0aG9kTmFtZSwgbWV0aG9kQXJndW1lbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1ldGhvZChtZXRob2ROYW1lLCBtZXRob2RBcmd1bWVudHMpLnNlbmQoe2Zyb206IHRoaXMuZnJvbX0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IG1ldGhvZEFyZ3VtZW50cyBcbiAgICAgKiBAcmV0dXJuIFxcUHJvdmlkZVxuICAgICAqL1xuICAgIGVuY29kZUFiaShtZXRob2ROYW1lLCBtZXRob2RBcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kKG1ldGhvZE5hbWUsIG1ldGhvZEFyZ3VtZW50cykuZW5jb2RlQWJpKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvbmUgY29udHJhY3QgYW5kIHJldHVybiBuZXcgY29udHJhY3RBZGFwdGVyIGluc3RhbmNlXG4gICAgICogQHJldHVybiBDb250cmFjdEFkYXB0ZXJcbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgbGV0IGNsb25lZENvbnRyYWN0ID0gdGhpcy5jb250cmFjdC5jbG9uZSgpO1xuICAgICAgICBsZXQgY29udHJhY3RBZGFwdGVyQ2xvbmUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzKTtcbiAgICAgICAgY29udHJhY3RBZGFwdGVyQ2xvbmUuY29udHJhY3QgPSBjbG9uZWRDb250cmFjdDtcbiAgICAgICAgY29udHJhY3RBZGFwdGVyQ2xvbmUuYWRkcmVzcyA9IGNsb25lZENvbnRyYWN0Ll9hZGRyZXNzO1xuICAgICAgICByZXR1cm4gY29udHJhY3RBZGFwdGVyQ2xvbmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVwbG95IG5ldyBjb250cmFjdCBvbiB0aGUgYmxvY2tjaGFpblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBnYXNQcmljZSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZ2FzIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhIFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IG1ldGhvZEFyZ3VtZW50c1xuICAgICAqIEByZXR1cm4gXFxQcm92aWRlXG4gICAgICovXG4gICAgZGVwbG95KGdhc1ByaWNlLCBnYXMsIGRhdGEsIG1ldGhvZEFyZ3VtZW50cykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cmFjdC5kZXBsb3koe1xuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIGFyZ3VtZW50czogbWV0aG9kQXJndW1lbnRzXG4gICAgICAgIH0pXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHRoaXMuZnJvbSxcbiAgICAgICAgICAgIGdhczogZ2FzLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiBmb3IgZXZlbnQgb24gY29udHJhY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFxuICAgICAqIEByZXR1cm4gXFxQcm92aWRlXG4gICAgICovXG4gICAgbGlzdGVuRm9yRXZlbnQoZXZlbnROYW1lLCBvcHRpb25zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyYWN0LmV2ZW50c1tldmVudE5hbWVdKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiBvbmx5IG9uY2UgaWYgYW4gZXZlbnQgaXMgZmlyZWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFxuICAgICAqIEByZXR1cm4gXFxQcm92aWRlXG4gICAgICovXG4gICAgbGlzdGVuT25jZUZvckV2ZW50KGV2ZW50TmFtZSwgb3B0aW9ucyA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cmFjdC5vbmNlKGV2ZW50TmFtZSxvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gZm9yIGFsbCBldmVudHNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBcbiAgICAgKiBAcmV0dXJuIFxcUHJvdmlkZVxuICAgICAqL1xuICAgIGxpc3RlbkZvckFsbEV2ZW50cyhvcHRpb25zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyYWN0LmFsbEV2ZW50cyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgaGlzdG9yeSBvZiBhbiBldmVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgXG4gICAgICogQHJldHVybiBcXFByb3ZpZGVcbiAgICAgKi9cbiAgICBnZXRQYXN0RXZlbnRzKGV2ZW50TmFtZSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cmFjdC5nZXRQYXN0RXZlbnRzKGV2ZW50TmFtZSxvcHRpb25zKTtcbiAgICB9XG5cbiAgICBcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWIvd2ViMy9Db250cmFjdEFkYXB0ZXIuanMiXSwibWFwcGluZ3MiOiI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBL0pBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/* exports provided: default */
/* exports used: default */
/*!*****************************!*\
  !*** ./lib/api/Congress.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web3_ContractAdapter__ = __webpack_require__(/*! ../web3/ContractAdapter */ 0);\n\n\nclass Congress extends __WEBPACK_IMPORTED_MODULE_0__web3_ContractAdapter__[\"a\" /* default */] {\n\n    /**\n     * @param {Object} web3Connection \n     */\n    constructor(web3Connection) {\n        super(web3Connection.getWeb3(), web3Connection.getAbi(), web3Connection.getAddress(), web3Connection.getGasPrice(), web3Connection.getFrom());\n    }\n\n    /**\n     * @param {number} proposal \n     * @param {number} choice \n     */\n    vote(proposal, choice) {\n        return this.sendTransaction('vote', [proposal, choice]);\n    }\n\n    /**\n     * @param {string} name \n     * @param {*} payload \n     */\n    propose(name, payload) {\n        return this.sendTransaction('propose', [name, payload]);\n    }\n\n    /**\n     * @param {Object} proposalFactory \n     * @param {*} payload \n     */\n    createProposal(proposalFactory, payload) {\n        return this.sendTransaction('createProposal', [proposalFactory, payload]);\n    }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Congress;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvYXBpL0NvbmdyZXNzLmpzP2E4NGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRyYWN0QWRhcHRlciBmcm9tICcuLi93ZWIzL0NvbnRyYWN0QWRhcHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmdyZXNzIGV4dGVuZHMgQ29udHJhY3RBZGFwdGVyIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB3ZWIzQ29ubmVjdGlvbiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3ZWIzQ29ubmVjdGlvbikge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHdlYjNDb25uZWN0aW9uLmdldFdlYjMoKSxcbiAgICAgICAgICAgIHdlYjNDb25uZWN0aW9uLmdldEFiaSgpLFxuICAgICAgICAgICAgd2ViM0Nvbm5lY3Rpb24uZ2V0QWRkcmVzcygpLFxuICAgICAgICAgICAgd2ViM0Nvbm5lY3Rpb24uZ2V0R2FzUHJpY2UoKSxcbiAgICAgICAgICAgIHdlYjNDb25uZWN0aW9uLmdldEZyb20oKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHByb3Bvc2FsIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjaG9pY2UgXG4gICAgICovXG4gICAgdm90ZShwcm9wb3NhbCwgY2hvaWNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRUcmFuc2FjdGlvbigndm90ZScsIFtwcm9wb3NhbCwgY2hvaWNlXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHsqfSBwYXlsb2FkIFxuICAgICAqL1xuICAgIHByb3Bvc2UobmFtZSwgcGF5bG9hZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kVHJhbnNhY3Rpb24oJ3Byb3Bvc2UnLCBbbmFtZSwgcGF5bG9hZF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wb3NhbEZhY3RvcnkgXG4gICAgICogQHBhcmFtIHsqfSBwYXlsb2FkIFxuICAgICAqL1xuICAgIGNyZWF0ZVByb3Bvc2FsKHByb3Bvc2FsRmFjdG9yeSwgcGF5bG9hZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kVHJhbnNhY3Rpb24oJ2NyZWF0ZVByb3Bvc2FsJywgW3Byb3Bvc2FsRmFjdG9yeSwgcGF5bG9hZF0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2FwaS9Db25ncmVzcy5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBTUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFwQ0E7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/* exports provided: default */
/* exports used: default */
/*!***************************************************!*\
  !*** ./lib/api/models/ContractConnectionModel.js ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("\nclass ContractConnectionModel {\n\n    /**\n     * @param {Object} web3 \n     * @param {array} abi \n     * @param {string} address \n     * @param {number} gasPrice \n     * @param {string} from \n     */\n    constructor(web3, abi, address, gasPrice = undefined, from = undefined) {\n        this.web3 = web3;\n        this.abi = abi;\n        this.address = address;\n        this.gasPrice = gasPrice;\n        this.from = from;\n    }\n\n    /**\n     * @return {Object}\n     */\n    getWeb3() {\n        return this.web3;\n    }\n\n    /**\n     * @return {array}\n     */\n    getAbi() {\n        return this.abi;\n    }\n\n    /**\n     * @return {string}\n     */\n    getAddress() {\n        return this.address;\n    }\n\n    /**\n     * @return {number}\n     */\n    getGasPrice() {\n        return this.gasPrice;\n    }\n\n    /**\n     * @return {string}\n     */\n    getFrom() {\n        return this.from;\n    }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = ContractConnectionModel;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvYXBpL21vZGVscy9Db250cmFjdENvbm5lY3Rpb25Nb2RlbC5qcz84YjI3Il0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJhY3RDb25uZWN0aW9uTW9kZWwge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHdlYjMgXG4gICAgICogQHBhcmFtIHthcnJheX0gYWJpIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBnYXNQcmljZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3ZWIzLCBhYmksIGFkZHJlc3MsIGdhc1ByaWNlID0gdW5kZWZpbmVkLCBmcm9tID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMud2ViMyA9IHdlYjM7XG4gICAgICAgIHRoaXMuYWJpID0gYWJpO1xuICAgICAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzO1xuICAgICAgICB0aGlzLmdhc1ByaWNlID0gZ2FzUHJpY2U7XG4gICAgICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldFdlYjMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndlYjM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7YXJyYXl9XG4gICAgICovXG4gICAgZ2V0QWJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hYmk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldEFkZHJlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZHJlc3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldEdhc1ByaWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYXNQcmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0RnJvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYi9hcGkvbW9kZWxzL0NvbnRyYWN0Q29ubmVjdGlvbk1vZGVsLmpzIl0sIm1hcHBpbmdzIjoiO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFsREE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/* exports provided: ContractConnectionModel, Congress */
/* all exports used */
/*!************************!*\
  !*** ./lib/harbour.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web3_ContractAdapter__ = __webpack_require__(/*! ./web3/ContractAdapter */ 0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_models_ContractConnectionModel__ = __webpack_require__(/*! ./api/models/ContractConnectionModel */ 2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_Congress__ = __webpack_require__(/*! ./api/Congress */ 1);\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, \"ContractConnectionModel\", function() { return __WEBPACK_IMPORTED_MODULE_1__api_models_ContractConnectionModel__[\"a\"]; });\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, \"Congress\", function() { return __WEBPACK_IMPORTED_MODULE_2__api_Congress__[\"a\"]; });\n\n\n\n\n\n//Export public modules\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvaGFyYm91ci5qcz9lODAzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENvbnRyYWN0QWRhcHRlciBmcm9tICcuL3dlYjMvQ29udHJhY3RBZGFwdGVyJztcbmltcG9ydCBDb250cmFjdENvbm5lY3Rpb25Nb2RlbCBmcm9tICcuL2FwaS9tb2RlbHMvQ29udHJhY3RDb25uZWN0aW9uTW9kZWwnO1xuaW1wb3J0IENvbmdyZXNzIGZyb20gJy4vYXBpL0NvbmdyZXNzJztcblxuLy9FeHBvcnQgcHVibGljIG1vZHVsZXNcbmV4cG9ydCB7XG4gICAgQ29udHJhY3RDb25uZWN0aW9uTW9kZWwsXG4gICAgQ29uZ3Jlc3Ncbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYi9oYXJib3VyLmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///3\n");

/***/ })
/******/ ]);
});