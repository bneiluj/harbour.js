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
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_ConnectionModel__ = __webpack_require__(/*! ./models/ConnectionModel */ 4);\n\n\nclass Contract {\n\n    /**\n     * @param {Web3} web3 \n     * @param {array} abi \n     * @param {string} address \n     * @param {number} gasPrice \n     * @param {string} from \n     */\n    constructor(web3Connection) {\n        if (!(web3Connection instanceof __WEBPACK_IMPORTED_MODULE_0__models_ConnectionModel__[\"a\" /* default */])) {\n            throw new Error('Argument web3Connection should be an instance of ConnectionModel');\n        }\n\n        this.from = web3Connection.getFrom();\n        this.abi = web3Connection.getAbi();\n        this.web3 = web3Connection.getWeb3();\n        this.contract = new web3.eth.Contract(this.abi, web3Connection.getAddress());\n        this.address = this.contract._address;\n    }\n\n    /**\n     * Run function from contract\n     * @param {string} methodName \n     * @param {params} methodArguments \n     * @return {Object}\n     */\n    getMethod(methodName, methodArguments) {\n        return this.contract.methods[methodName].apply(this.contract, methodArguments);\n    }\n\n    /**\n    * @return {Object} \n    */\n    getOptions() {\n        return this.contract.options;\n    }\n\n    /**\n     * Get Contract option\n     * @param {string} optionName \n     * @return {Object}\n     */\n    getOption(optionName) {\n        return this.contract.options[optionName];\n    }\n\n    /**\n     * Get estimate gas for method\n     * @param {string} methodName \n     * @param {array} methodArguments \n     * @return {Object}\n     */\n    estimateGas(methodName, methodArguments) {\n        return this.getMethod(methodNamename, methodArguments).estimateGas();\n    }\n\n    /**\n     * Call method on contract\n     * @param {string} methodName \n     * @param {array} methodArguments\n     * @return {Object}\n     */\n    callMethod(methodName, methodArguments) {\n        return this.getMethod(methodName, methodArguments).call();\n    }\n\n    /**\n     * Send transaction to the contract an run an method\n     * @param {string} methodName \n     * @param {array} methodArguments \n     * @return {Object}\n     */\n    sendTransaction(methodName, methodArguments) {\n        return this.getMethod(methodName, methodArguments).send({ from: this.from });\n    }\n\n    /**\n     * \n     * @param {string} methodName \n     * @param {array} methodArguments \n     * @return {Object}\n     */\n    encodeAbi(methodName, methodArguments) {\n        return this.getMethod(methodName, methodArguments).encodeAbi();\n    }\n\n    /**\n     * Clone contract and return new contractAdapter instance\n     * @return {Object}\n     */\n    clone(web3Contract) {\n        let clonedContract = web3Contract.clone();\n        let contractAdapterClone = Object.assign({}, this);\n        contractAdapterClone.contract = clonedContract;\n        contractAdapterClone.address = clonedContract._address;\n        return contractAdapterClone;\n    }\n\n    /**\n     * Deploy new contract on the blockchain\n     * @param {number} gasPrice \n     * @param {number} gas \n     * @param {string} data \n     * @param {array} deployArguments\n     * @return {Object} \n     */\n    deploy(gasPrice, gas, data, deployArguments) {\n        return this.clone(this.contract.deploy({\n            data: data,\n            arguments: deployArguments\n        }).send({\n            from: this.from,\n            gas: gas,\n            gasPrice: gasPrice\n        }));\n    }\n\n    /**\n     * Listen for event on contract\n     * @param {string} eventName \n     * @param {object} options \n     * @return {Object}\n     */\n    listenForEvent(eventName, options = undefined) {\n        return this.contract.events[eventName](options);\n    }\n\n    /**\n     * Listen only once if an event is fired\n     * @param {string} eventName \n     * @param {object} options \n     * @return {Object}\n     */\n    listenOnceForEvent(eventName, options = undefined) {\n        return this.contract.once(eventName, options);\n    }\n\n    /**\n     * Listen for all events\n     * @param {object} options \n     * @return {Object}\n     */\n    listenForAllEvents(options = undefined) {\n        return this.contract.allEvents(options);\n    }\n\n    /**\n     * Get history of an event\n     * @param {string} eventName \n     * @param {object} options \n     * @return {Object}\n     */\n    getPastEvents(eventName, options) {\n        return this.contract.getPastEvents(eventName, options);\n    }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Contract;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvd2ViMy9Db250cmFjdC5qcz9hNGI2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25uZWN0aW9uTW9kZWwgZnJvbSAnLi9tb2RlbHMvQ29ubmVjdGlvbk1vZGVsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJhY3Qge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtXZWIzfSB3ZWIzIFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGFiaSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZ2FzUHJpY2UgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb20gXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2ViM0Nvbm5lY3Rpb24pIHtcbiAgICAgICAgaWYgKCEod2ViM0Nvbm5lY3Rpb24gaW5zdGFuY2VvZiBDb25uZWN0aW9uTW9kZWwpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IHdlYjNDb25uZWN0aW9uIHNob3VsZCBiZSBhbiBpbnN0YW5jZSBvZiBDb25uZWN0aW9uTW9kZWwnKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZnJvbSA9IHdlYjNDb25uZWN0aW9uLmdldEZyb20oKTtcbiAgICAgICAgdGhpcy5hYmkgPSB3ZWIzQ29ubmVjdGlvbi5nZXRBYmkoKTtcbiAgICAgICAgdGhpcy53ZWIzID0gd2ViM0Nvbm5lY3Rpb24uZ2V0V2ViMygpO1xuICAgICAgICB0aGlzLmNvbnRyYWN0ID0gbmV3IHdlYjMuZXRoLkNvbnRyYWN0KFxuICAgICAgICAgICAgdGhpcy5hYmksXG4gICAgICAgICAgICB3ZWIzQ29ubmVjdGlvbi5nZXRBZGRyZXNzKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gdGhpcy5jb250cmFjdC5fYWRkcmVzcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW4gZnVuY3Rpb24gZnJvbSBjb250cmFjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFxuICAgICAqIEBwYXJhbSB7cGFyYW1zfSBtZXRob2RBcmd1bWVudHMgXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldE1ldGhvZChtZXRob2ROYW1lLCAgbWV0aG9kQXJndW1lbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyYWN0Lm1ldGhvZHNbbWV0aG9kTmFtZV0uYXBwbHkodGhpcy5jb250cmFjdCwgbWV0aG9kQXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEByZXR1cm4ge09iamVjdH0gXG4gICAgKi9cbiAgICBnZXRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cmFjdC5vcHRpb25zXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IENvbnRyYWN0IG9wdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25OYW1lIFxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRPcHRpb24ob3B0aW9uTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cmFjdC5vcHRpb25zW29wdGlvbk5hbWVdXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGVzdGltYXRlIGdhcyBmb3IgbWV0aG9kXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgXG4gICAgICogQHBhcmFtIHthcnJheX0gbWV0aG9kQXJndW1lbnRzIFxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBlc3RpbWF0ZUdhcyhtZXRob2ROYW1lLCBtZXRob2RBcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kKG1ldGhvZE5hbWVuYW1lLCBtZXRob2RBcmd1bWVudHMpLmVzdGltYXRlR2FzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCBtZXRob2Qgb24gY29udHJhY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBtZXRob2RBcmd1bWVudHNcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgY2FsbE1ldGhvZChtZXRob2ROYW1lLCBtZXRob2RBcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kKG1ldGhvZE5hbWUsIG1ldGhvZEFyZ3VtZW50cykuY2FsbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgdHJhbnNhY3Rpb24gdG8gdGhlIGNvbnRyYWN0IGFuIHJ1biBhbiBtZXRob2RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBtZXRob2RBcmd1bWVudHMgXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNlbmRUcmFuc2FjdGlvbihtZXRob2ROYW1lLCBtZXRob2RBcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kKG1ldGhvZE5hbWUsIG1ldGhvZEFyZ3VtZW50cykuc2VuZCh7ZnJvbTogdGhpcy5mcm9tfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgXG4gICAgICogQHBhcmFtIHthcnJheX0gbWV0aG9kQXJndW1lbnRzIFxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBlbmNvZGVBYmkobWV0aG9kTmFtZSwgbWV0aG9kQXJndW1lbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1ldGhvZChtZXRob2ROYW1lLCBtZXRob2RBcmd1bWVudHMpLmVuY29kZUFiaSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb25lIGNvbnRyYWN0IGFuZCByZXR1cm4gbmV3IGNvbnRyYWN0QWRhcHRlciBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBjbG9uZSh3ZWIzQ29udHJhY3QpIHtcbiAgICAgICAgbGV0IGNsb25lZENvbnRyYWN0ID0gd2ViM0NvbnRyYWN0LmNsb25lKCk7XG4gICAgICAgIGxldCBjb250cmFjdEFkYXB0ZXJDbG9uZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMpO1xuICAgICAgICBjb250cmFjdEFkYXB0ZXJDbG9uZS5jb250cmFjdCA9IGNsb25lZENvbnRyYWN0O1xuICAgICAgICBjb250cmFjdEFkYXB0ZXJDbG9uZS5hZGRyZXNzID0gY2xvbmVkQ29udHJhY3QuX2FkZHJlc3M7XG4gICAgICAgIHJldHVybiBjb250cmFjdEFkYXB0ZXJDbG9uZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXBsb3kgbmV3IGNvbnRyYWN0IG9uIHRoZSBibG9ja2NoYWluXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGdhc1ByaWNlIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBnYXMgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgXG4gICAgICogQHBhcmFtIHthcnJheX0gZGVwbG95QXJndW1lbnRzXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBcbiAgICAgKi9cbiAgICBkZXBsb3koZ2FzUHJpY2UsIGdhcywgZGF0YSwgZGVwbG95QXJndW1lbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKHRoaXMuY29udHJhY3QuZGVwbG95KHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBhcmd1bWVudHM6IGRlcGxveUFyZ3VtZW50c1xuICAgICAgICB9KVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiB0aGlzLmZyb20sXG4gICAgICAgICAgICBnYXM6IGdhcyxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZVxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIGZvciBldmVudCBvbiBjb250cmFjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGxpc3RlbkZvckV2ZW50KGV2ZW50TmFtZSwgb3B0aW9ucyA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cmFjdC5ldmVudHNbZXZlbnROYW1lXShvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gb25seSBvbmNlIGlmIGFuIGV2ZW50IGlzIGZpcmVkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgbGlzdGVuT25jZUZvckV2ZW50KGV2ZW50TmFtZSwgb3B0aW9ucyA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cmFjdC5vbmNlKGV2ZW50TmFtZSxvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gZm9yIGFsbCBldmVudHNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgbGlzdGVuRm9yQWxsRXZlbnRzKG9wdGlvbnMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJhY3QuYWxsRXZlbnRzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBoaXN0b3J5IG9mIGFuIGV2ZW50XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0UGFzdEV2ZW50cyhldmVudE5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJhY3QuZ2V0UGFzdEV2ZW50cyhldmVudE5hbWUsb3B0aW9ucyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYi93ZWIzL0NvbnRyYWN0LmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUEvSkE7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */,
/* 2 */
/* exports provided: default */
/* exports used: default */
/*!*****************************!*\
  !*** ./lib/api/Congress.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web3_Contract__ = __webpack_require__(/*! ../web3/Contract */ 0);\n\n\nclass Congress extends __WEBPACK_IMPORTED_MODULE_0__web3_Contract__[\"a\" /* default */] {\n\n    /**\n     * @param {number} proposal \n     * @param {number} choice \n     * @return {Promise}\n     */\n    vote(proposal, choice) {\n        return this.sendTransaction('vote', [proposal, choice]);\n    }\n\n    /**\n     * @param {string} name \n     * @param {*} payload \n     * @return {Promise}\n     */\n    propose(name, payload) {\n        return this.sendTransaction('propose', [name, payload]);\n    }\n\n    /**\n     * @param {number} proposalFactory \n     * @param {*} payload \n     * @return {Promise}\n     */\n    createProposal(proposalFactory, payload) {\n        return this.sendTransaction('createProposal', [proposalFactory, payload]);\n    }\n\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Congress;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvYXBpL0NvbmdyZXNzLmpzP2E4NGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRyYWN0IGZyb20gJy4uL3dlYjMvQ29udHJhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25ncmVzcyBleHRlbmRzIENvbnRyYWN0IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcm9wb3NhbCBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2hvaWNlIFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgdm90ZShwcm9wb3NhbCwgY2hvaWNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRUcmFuc2FjdGlvbigndm90ZScsIFtwcm9wb3NhbCwgY2hvaWNlXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHsqfSBwYXlsb2FkIFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgcHJvcG9zZShuYW1lLCBwYXlsb2FkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRUcmFuc2FjdGlvbigncHJvcG9zZScsIFtuYW1lLCBwYXlsb2FkXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHByb3Bvc2FsRmFjdG9yeSBcbiAgICAgKiBAcGFyYW0geyp9IHBheWxvYWQgXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVQcm9wb3NhbChwcm9wb3NhbEZhY3RvcnksIHBheWxvYWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFRyYW5zYWN0aW9uKCdjcmVhdGVQcm9wb3NhbCcsIFtwcm9wb3NhbEZhY3RvcnksIHBheWxvYWRdKTtcbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2FwaS9Db25ncmVzcy5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQTVCQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/* exports provided: ConnectionModel, Congress */
/* all exports used */
/*!************************!*\
  !*** ./lib/harbour.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web3_Contract__ = __webpack_require__(/*! ./web3/Contract */ 0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web3_models_ConnectionModel__ = __webpack_require__(/*! ./web3/models/ConnectionModel */ 4);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_Congress__ = __webpack_require__(/*! ./api/Congress */ 2);\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, \"ConnectionModel\", function() { return __WEBPACK_IMPORTED_MODULE_1__web3_models_ConnectionModel__[\"a\"]; });\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, \"Congress\", function() { return __WEBPACK_IMPORTED_MODULE_2__api_Congress__[\"a\"]; });\n\n\n\n\n\n//Export public modules\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvaGFyYm91ci5qcz9lODAzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENvbnRyYWN0IGZyb20gJy4vd2ViMy9Db250cmFjdCc7XG5pbXBvcnQgQ29ubmVjdGlvbk1vZGVsIGZyb20gJy4vd2ViMy9tb2RlbHMvQ29ubmVjdGlvbk1vZGVsJztcbmltcG9ydCBDb25ncmVzcyBmcm9tICcuL2FwaS9Db25ncmVzcyc7XG5cbi8vRXhwb3J0IHB1YmxpYyBtb2R1bGVzXG5leHBvcnQge1xuICAgIENvbm5lY3Rpb25Nb2RlbCxcbiAgICBcbiAgICBDb25ncmVzc1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2hhcmJvdXIuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/* exports provided: default */
/* exports used: default */
/*!********************************************!*\
  !*** ./lib/web3/models/ConnectionModel.js ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("\nclass ConnectionModel {\n\n    /**\n     * @param {Object} web3 \n     * @param {array} abi \n     * @param {string} address \n     * @param {number} gasPrice \n     * @param {string} from \n     */\n    constructor(web3, abi, address, from) {\n        this.web3 = web3;\n        this.abi = abi;\n        this.address = address;\n        this.from = from;\n    }\n\n    /**\n     * @return {Object}\n     */\n    getWeb3() {\n        return this.web3;\n    }\n\n    /**\n     * @return {array}\n     */\n    getAbi() {\n        return this.abi;\n    }\n\n    /**\n     * @return {string}\n     */\n    getAddress() {\n        return this.address;\n    }\n\n    /**\n     * @return {string}\n     */\n    getFrom() {\n        return this.from;\n    }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = ConnectionModel;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9saWIvd2ViMy9tb2RlbHMvQ29ubmVjdGlvbk1vZGVsLmpzPzhlNDgiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25uZWN0aW9uTW9kZWwge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHdlYjMgXG4gICAgICogQHBhcmFtIHthcnJheX0gYWJpIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBnYXNQcmljZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3ZWIzLCBhYmksIGFkZHJlc3MsIGZyb20pIHtcbiAgICAgICAgdGhpcy53ZWIzID0gd2ViMztcbiAgICAgICAgdGhpcy5hYmkgPSBhYmk7XG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldFdlYjMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndlYjM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7YXJyYXl9XG4gICAgICovXG4gICAgZ2V0QWJpKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hYmk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldEFkZHJlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZHJlc3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldEZyb20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyb207XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWIvd2ViMy9tb2RlbHMvQ29ubmVjdGlvbk1vZGVsLmpzIl0sIm1hcHBpbmdzIjoiO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBMUNBOzsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///4\n");

/***/ })
/******/ ]);
});