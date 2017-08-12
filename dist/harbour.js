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
/*!******************************!*\
  !*** ./lib/web3/Contract.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_ContractConnectionModel__ = __webpack_require__(/*! ./models/ContractConnectionModel */ 1);\n\n\nclass Contract {\n\n    /**\n     * @param {Web3} web3 \n     * @param {array} abi \n     * @param {string} address \n     * @param {number} gasPrice \n     * @param {string} from \n     */\n    constructor(web3Connection) {\n        if (!web3Connection instanceof __WEBPACK_IMPORTED_MODULE_0__models_ContractConnectionModel__[\"a\" /* default */]) {\n            throw new Error('Argument web3Connection should be an instance of ContractConnectionModel');\n        }\n        this.from = web3Connection.getFrom();\n        this.abi = web3Connection.getAbi();\n        this.web3 = web3Connection.getWeb3();\n        this.contract = new web3.eth.Contract(this.abi, web3Connection.getAddress());\n        this.address = this.contract._address;\n    }\n\n    /**\n     * Run function from contract\n     * @param {string} methodName \n     * @param {params} methodArguments \n     * @return {Object}\n     */\n    getMethod(methodName, methodArguments) {\n        return this.contract.methods[methodName].apply(this.contract, methodArguments);\n    }\n\n    /**\n    * @return {Object} \n    */\n    getOptions() {\n        return this.contract.options;\n    }\n\n    /**\n     * Get Contract option\n     * @param {string} optionName \n     * @return {Object}\n     */\n    getOption(optionName) {\n        return this.contract.options[optionName];\n    }\n\n    /**\n     * Get estimate gas for method\n     * @param {string} methodName \n     * @param {array} methodArguments \n     * @return {Object}\n     */\n    estimateGas(methodName, methodArguments) {\n        return this.getMethod(methodNamename, methodArguments).estimateGas();\n    }\n\n    /**\n     * Call method on contract\n     * @param {string} methodName \n     * @param {array} methodArguments\n     * @return {Object}\n     */\n    callMethod(methodName, methodArguments) {\n        return this.getMethod(methodName, methodArguments).call();\n    }\n\n    /**\n     * Send transaction to the contract an run an method\n     * @param {string} methodName \n     * @param {array} methodArguments \n     * @return {Object}\n     */\n    sendTransaction(methodName, methodArguments) {\n        return this.getMethod(methodName, methodArguments).send({ from: this.from });\n    }\n\n    /**\n     * \n     * @param {string} methodName \n     * @param {array} methodArguments \n     * @return {Object}\n     */\n    encodeAbi(methodName, methodArguments) {\n        return this.getMethod(methodName, methodArguments).encodeAbi();\n    }\n\n    /**\n     * Clone contract and return new contractAdapter instance\n     * @return {Object}\n     */\n    clone(web3Contract) {\n        let clonedContract = web3Contract.clone();\n        let contractAdapterClone = Object.assign({}, this);\n        contractAdapterClone.contract = clonedContract;\n        contractAdapterClone.address = clonedContract._address;\n        return contractAdapterClone;\n    }\n\n    /**\n     * Deploy new contract on the blockchain\n     * @param {number} gasPrice \n     * @param {number} gas \n     * @param {string} data \n     * @param {array} deployArguments\n     * @return {Object} \n     */\n    deploy(gasPrice, gas, data, deployArguments) {\n        return this.clone(this.contract.deploy({\n            data: data,\n            arguments: deployArguments\n        }).send({\n            from: this.from,\n            gas: gas,\n            gasPrice: gasPrice\n        }));\n    }\n\n    /**\n     * Listen for event on contract\n     * @param {string} eventName \n     * @param {object} options \n     * @return {Object}\n     */\n    listenForEvent(eventName, options = undefined) {\n        return this.contract.events[eventName](options);\n    }\n\n    /**\n     * Listen only once if an event is fired\n     * @param {string} eventName \n     * @param {object} options \n     * @return {Object}\n     */\n    listenOnceForEvent(eventName, options = undefined) {\n        return this.contract.once(eventName, options);\n    }\n\n    /**\n     * Listen for all events\n     * @param {object} options \n     * @return {Object}\n     */\n    listenForAllEvents(options = undefined) {\n        return this.contract.allEvents(options);\n    }\n\n    /**\n     * Get history of an event\n     * @param {string} eventName \n     * @param {object} options \n     * @return {Object}\n     */\n    getPastEvents(eventName, options) {\n        return this.contract.getPastEvents(eventName, options);\n    }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Contract;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvd2ViMy9Db250cmFjdC5qcz9hNGI2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb250cmFjdENvbm5lY3Rpb25Nb2RlbCBmcm9tICcuL21vZGVscy9Db250cmFjdENvbm5lY3Rpb25Nb2RlbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyYWN0IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7V2ViM30gd2ViMyBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBhYmkgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGdhc1ByaWNlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdlYjNDb25uZWN0aW9uKSB7XG4gICAgICAgIGlmICghd2ViM0Nvbm5lY3Rpb24gaW5zdGFuY2VvZiBDb250cmFjdENvbm5lY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCB3ZWIzQ29ubmVjdGlvbiBzaG91bGQgYmUgYW4gaW5zdGFuY2Ugb2YgQ29udHJhY3RDb25uZWN0aW9uTW9kZWwnKSA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mcm9tID0gd2ViM0Nvbm5lY3Rpb24uZ2V0RnJvbSgpO1xuICAgICAgICB0aGlzLmFiaSA9IHdlYjNDb25uZWN0aW9uLmdldEFiaSgpO1xuICAgICAgICB0aGlzLndlYjMgPSB3ZWIzQ29ubmVjdGlvbi5nZXRXZWIzKCk7XG4gICAgICAgIHRoaXMuY29udHJhY3QgPSBuZXcgd2ViMy5ldGguQ29udHJhY3QoXG4gICAgICAgICAgICB0aGlzLmFiaSxcbiAgICAgICAgICAgIHdlYjNDb25uZWN0aW9uLmdldEFkZHJlc3MoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZHJlc3MgPSB0aGlzLmNvbnRyYWN0Ll9hZGRyZXNzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1biBmdW5jdGlvbiBmcm9tIGNvbnRyYWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgXG4gICAgICogQHBhcmFtIHtwYXJhbXN9IG1ldGhvZEFyZ3VtZW50cyBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0TWV0aG9kKG1ldGhvZE5hbWUsICBtZXRob2RBcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJhY3QubWV0aG9kc1ttZXRob2ROYW1lXS5hcHBseSh0aGlzLmNvbnRyYWN0LCBtZXRob2RBcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogQHJldHVybiB7T2JqZWN0fSBcbiAgICAqL1xuICAgIGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyYWN0Lm9wdGlvbnNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgQ29udHJhY3Qgb3B0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbk5hbWUgXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldE9wdGlvbihvcHRpb25OYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyYWN0Lm9wdGlvbnNbb3B0aW9uTmFtZV1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZXN0aW1hdGUgZ2FzIGZvciBtZXRob2RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBtZXRob2RBcmd1bWVudHMgXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGVzdGltYXRlR2FzKG1ldGhvZE5hbWUsIG1ldGhvZEFyZ3VtZW50cykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNZXRob2QobWV0aG9kTmFtZW5hbWUsIG1ldGhvZEFyZ3VtZW50cykuZXN0aW1hdGVHYXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsIG1ldGhvZCBvbiBjb250cmFjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IG1ldGhvZEFyZ3VtZW50c1xuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBjYWxsTWV0aG9kKG1ldGhvZE5hbWUsIG1ldGhvZEFyZ3VtZW50cykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNZXRob2QobWV0aG9kTmFtZSwgbWV0aG9kQXJndW1lbnRzKS5jYWxsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZCB0cmFuc2FjdGlvbiB0byB0aGUgY29udHJhY3QgYW4gcnVuIGFuIG1ldGhvZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IG1ldGhvZEFyZ3VtZW50cyBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2VuZFRyYW5zYWN0aW9uKG1ldGhvZE5hbWUsIG1ldGhvZEFyZ3VtZW50cykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNZXRob2QobWV0aG9kTmFtZSwgbWV0aG9kQXJndW1lbnRzKS5zZW5kKHtmcm9tOiB0aGlzLmZyb219KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBtZXRob2RBcmd1bWVudHMgXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGVuY29kZUFiaShtZXRob2ROYW1lLCBtZXRob2RBcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kKG1ldGhvZE5hbWUsIG1ldGhvZEFyZ3VtZW50cykuZW5jb2RlQWJpKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvbmUgY29udHJhY3QgYW5kIHJldHVybiBuZXcgY29udHJhY3RBZGFwdGVyIGluc3RhbmNlXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGNsb25lKHdlYjNDb250cmFjdCkge1xuICAgICAgICBsZXQgY2xvbmVkQ29udHJhY3QgPSB3ZWIzQ29udHJhY3QuY2xvbmUoKTtcbiAgICAgICAgbGV0IGNvbnRyYWN0QWRhcHRlckNsb25lID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcyk7XG4gICAgICAgIGNvbnRyYWN0QWRhcHRlckNsb25lLmNvbnRyYWN0ID0gY2xvbmVkQ29udHJhY3Q7XG4gICAgICAgIGNvbnRyYWN0QWRhcHRlckNsb25lLmFkZHJlc3MgPSBjbG9uZWRDb250cmFjdC5fYWRkcmVzcztcbiAgICAgICAgcmV0dXJuIGNvbnRyYWN0QWRhcHRlckNsb25lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlcGxveSBuZXcgY29udHJhY3Qgb24gdGhlIGJsb2NrY2hhaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZ2FzUHJpY2UgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGdhcyBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YSBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBkZXBsb3lBcmd1bWVudHNcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFxuICAgICAqL1xuICAgIGRlcGxveShnYXNQcmljZSwgZ2FzLCBkYXRhLCBkZXBsb3lBcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUodGhpcy5jb250cmFjdC5kZXBsb3koe1xuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIGFyZ3VtZW50czogZGVwbG95QXJndW1lbnRzXG4gICAgICAgIH0pXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHRoaXMuZnJvbSxcbiAgICAgICAgICAgIGdhczogZ2FzLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gZm9yIGV2ZW50IG9uIGNvbnRyYWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgbGlzdGVuRm9yRXZlbnQoZXZlbnROYW1lLCBvcHRpb25zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyYWN0LmV2ZW50c1tldmVudE5hbWVdKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiBvbmx5IG9uY2UgaWYgYW4gZXZlbnQgaXMgZmlyZWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBsaXN0ZW5PbmNlRm9yRXZlbnQoZXZlbnROYW1lLCBvcHRpb25zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyYWN0Lm9uY2UoZXZlbnROYW1lLG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiBmb3IgYWxsIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBsaXN0ZW5Gb3JBbGxFdmVudHMob3B0aW9ucyA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cmFjdC5hbGxFdmVudHMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGhpc3Rvcnkgb2YgYW4gZXZlbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRQYXN0RXZlbnRzKGV2ZW50TmFtZSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cmFjdC5nZXRQYXN0RXZlbnRzKGV2ZW50TmFtZSxvcHRpb25zKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL3dlYjMvQ29udHJhY3QuanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUE5SkE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/* exports provided: default */
/* exports used: default */
/*!****************************************************!*\
  !*** ./lib/web3/models/ContractConnectionModel.js ***!
  \****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("\nclass ContractConnectionModel {\n\n    /**\n     * @param {Object} web3 \n     * @param {array} abi \n     * @param {string} address \n     * @param {number} gasPrice \n     * @param {string} from \n     */\n    constructor(web3, abi, address, from) {\n        this.web3 = web3;\n        this.abi = abi;\n        this.address = address;\n        this.from = from;\n    }\n\n    /**\n     * @return {Object}\n     */\n    getWeb3() {\n        return this.web3;\n    }\n\n    /**\n     * @return {array}\n     */\n    getAbi() {\n        return this.abi;\n    }\n\n    /**\n     * @return {string}\n     */\n    getAddress() {\n        return this.address;\n    }\n\n    /**\n     * @return {string}\n     */\n    getFrom() {\n        return this.from;\n    }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = ContractConnectionModel;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvd2ViMy9tb2RlbHMvQ29udHJhY3RDb25uZWN0aW9uTW9kZWwuanM/NTM2MSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyYWN0Q29ubmVjdGlvbk1vZGVsIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB3ZWIzIFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGFiaSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZ2FzUHJpY2UgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb20gXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2ViMywgYWJpLCBhZGRyZXNzLCBmcm9tKSB7XG4gICAgICAgIHRoaXMud2ViMyA9IHdlYjM7XG4gICAgICAgIHRoaXMuYWJpID0gYWJpO1xuICAgICAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzO1xuICAgICAgICB0aGlzLmZyb20gPSBmcm9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRXZWIzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53ZWIzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge2FycmF5fVxuICAgICAqL1xuICAgIGdldEFiaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRBZGRyZXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRyZXNzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRGcm9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcm9tO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL3dlYjMvbW9kZWxzL0NvbnRyYWN0Q29ubmVjdGlvbk1vZGVsLmpzIl0sIm1hcHBpbmdzIjoiO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBMUNBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/* exports provided: default */
/* exports used: default */
/*!*****************************!*\
  !*** ./lib/api/Congress.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web3_Contract__ = __webpack_require__(/*! ../web3/Contract */ 0);\n\n\nclass Congress extends __WEBPACK_IMPORTED_MODULE_0__web3_Contract__[\"a\" /* default */] {\n\n    /**\n     * @param {Object} web3Connection \n     */\n    constructor(web3Connection) {\n        super(web3Connection);\n    }\n\n    /**\n     * @param {number} proposal \n     * @param {number} choice \n     * @return {Promise}\n     */\n    vote(proposal, choice) {\n        return this.sendTransaction('vote', [proposal, choice]);\n    }\n\n    /**\n     * @param {string} name \n     * @param {*} payload \n     * @return {Promise}\n     */\n    propose(name, payload) {\n        return this.sendTransaction('propose', [name, payload]);\n    }\n\n    /**\n     * @param {number} proposalFactory \n     * @param {*} payload \n     * @return {Promise}\n     */\n    createProposal(proposalFactory, payload) {\n        return this.sendTransaction('createProposal', [proposalFactory, payload]);\n    }\n\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Congress;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvYXBpL0NvbmdyZXNzLmpzP2E4NGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRyYWN0IGZyb20gJy4uL3dlYjMvQ29udHJhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25ncmVzcyBleHRlbmRzIENvbnRyYWN0IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB3ZWIzQ29ubmVjdGlvbiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3ZWIzQ29ubmVjdGlvbikge1xuICAgICAgICBzdXBlcih3ZWIzQ29ubmVjdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHByb3Bvc2FsIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjaG9pY2UgXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICB2b3RlKHByb3Bvc2FsLCBjaG9pY2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFRyYW5zYWN0aW9uKCd2b3RlJywgW3Byb3Bvc2FsLCBjaG9pY2VdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0geyp9IHBheWxvYWQgXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwcm9wb3NlKG5hbWUsIHBheWxvYWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFRyYW5zYWN0aW9uKCdwcm9wb3NlJywgW25hbWUsIHBheWxvYWRdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJvcG9zYWxGYWN0b3J5IFxuICAgICAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGNyZWF0ZVByb3Bvc2FsKHByb3Bvc2FsRmFjdG9yeSwgcGF5bG9hZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kVHJhbnNhY3Rpb24oJ2NyZWF0ZVByb3Bvc2FsJywgW3Byb3Bvc2FsRmFjdG9yeSwgcGF5bG9hZF0pO1xuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWIvYXBpL0NvbmdyZXNzLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBbkNBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/* exports provided: ContractConnectionModel, Congress */
/* all exports used */
/*!************************!*\
  !*** ./lib/harbour.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web3_Contract__ = __webpack_require__(/*! ./web3/Contract */ 0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web3_models_ContractConnectionModel__ = __webpack_require__(/*! ./web3/models/ContractConnectionModel */ 1);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_Congress__ = __webpack_require__(/*! ./api/Congress */ 2);\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, \"ContractConnectionModel\", function() { return __WEBPACK_IMPORTED_MODULE_1__web3_models_ContractConnectionModel__[\"a\"]; });\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, \"Congress\", function() { return __WEBPACK_IMPORTED_MODULE_2__api_Congress__[\"a\"]; });\n\n\n\n\n\n//Export public modules\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvaGFyYm91ci5qcz9lODAzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENvbnRyYWN0IGZyb20gJy4vd2ViMy9Db250cmFjdCc7XG5pbXBvcnQgQ29udHJhY3RDb25uZWN0aW9uTW9kZWwgZnJvbSAnLi93ZWIzL21vZGVscy9Db250cmFjdENvbm5lY3Rpb25Nb2RlbCc7XG5pbXBvcnQgQ29uZ3Jlc3MgZnJvbSAnLi9hcGkvQ29uZ3Jlc3MnO1xuXG4vL0V4cG9ydCBwdWJsaWMgbW9kdWxlc1xuZXhwb3J0IHtcbiAgICBDb250cmFjdENvbm5lY3Rpb25Nb2RlbCxcbiAgICBDb25ncmVzc1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2hhcmJvdXIuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///3\n");

/***/ })
/******/ ]);
});