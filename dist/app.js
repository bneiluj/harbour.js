/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


class Application {
    init() {
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8546"));
        this.connectConfigurationContract();
    }

    connectConfigurationContract() {
        var configurationContract = new this.web3.eth.Contract([{ "constant": false, "inputs": [{ "name": "_address", "type": "address" }], "name": "removeAdmin", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_key", "type": "bytes32" }], "name": "unprotect", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_address", "type": "address" }], "name": "isAdmin", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_key", "type": "bytes32" }, { "name": "_value", "type": "uint256" }], "name": "set", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_address", "type": "address" }], "name": "isOwner", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_address", "type": "address" }], "name": "addAdmin", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_key", "type": "bytes32" }], "name": "protect", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_key", "type": "bytes32" }], "name": "get", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }]);
        configurationContract._address = '0xb25170c12010c80a8f242debc219d3c88fb1caee';
        configurationContract.methods.isAdmin('0x28181a0143fEe43565861b0FCfeC6040E3c44258').call({ from: '0x28181a0143fee43565861b0fcfec6040e3c44258' }, function (error, result) {
            console.log(error);
            console.log(result);
        });
    }
}

var app = new Application();
app.init();

/***/ })
/******/ ]);