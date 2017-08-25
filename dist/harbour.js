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
<<<<<<< HEAD
throw new Error("Cannot find module \"../web3/Contract\"");


class Congress extends __WEBPACK_IMPORTED_MODULE_0__web3_Contract___default.a {

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
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_ConnectionModel__ = __webpack_require__(1);


class Contract {

    /**
     * @param {Web3} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    constructor(web3Connection, contractABI, versionAddress) {
        if (!(web3Connection instanceof __WEBPACK_IMPORTED_MODULE_0__models_ConnectionModel__["a" /* default */])) {
            throw new Error('Argument web3Connection should be an instance of ConnectionModel');
        }

        this.from = web3Connection.getFrom();
        this.abi = contractABI;
        this.web3 = web3Connection.getWeb3();
        this.contract = new web3.eth.Contract(this.abi, versionAddress);
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
        return this.getMethod(methodName, methodArguments).send({
            from: this.from,
            gas: 4700000,
            gasPrice: 1000000
        });
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
     * @param {string} bytecode 
     * @param {array} deployArguments
     * @return {Object} 
     */
    deploy(bytecode, deployArguments) {
        return this.contract.deploy({ data: bytecode, arguments: deployArguments }).send({
            from: this.from
        });
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
>>>>>>> parent of 2df86a2... Some refactoring


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
<<<<<<< HEAD
throw new Error("Cannot find module \"../web3/Contract\"");


class Version extends __WEBPACK_IMPORTED_MODULE_0__web3_Contract___default.a {

   /**
    * @param {string} votingRightsAddress 
    * @param {string} votingStrategyAddress 
    * @return {Promise}
    */
   createCongress(votingRightsAddress, votingStrategyAddress) {
      return this.sendTransaction('createCongress', [votingRightsAddress, votingStrategyAddress]);
   }

   /**
    * @param {number} contractId 
    * @return {Promise}
    */
   destroyCongress(contractId) {
      return this.sendTransaction('destroyContract', [contractId]);
   }

   /**
    * @param {number} congressId 
    * @return {Promise}
    */
   getCongress(congressId) {
      return this.callMethod('getCongress', [congressId]);
   }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Version;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ContractData {

    constructor() {
        this.dataSource = [{
            name: 'votingRight',
            bytecode: '6060604052341561000f57600080fd5b604051610309380380610309833981016040528080518201919050505b60008090505b81518110156100b7576001600080848481518110151561004e57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b8080600101915050610032565b5b50505b61023f806100ca6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806342b4632e14610054578063adfaa72e146100a5578063d936547e146100f6575b600080fd5b341561005f57600080fd5b61008b600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610147565b604051808215151515815260200191505060405180910390f35b34156100b057600080fd5b6100dc600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061019d565b604051808215151515815260200191505060405180910390f35b341561010157600080fd5b61012d600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101f3565b604051808215151515815260200191505060405180910390f35b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690505b919050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690505b919050565b60006020528060005260406000206000915054906101000a900460ff16815600a165627a7a7230582036f0e31d90b2fc298f39fe2eab3ca27df22f723c2245c58cdc01f8e1c255d3420029',
            abi: [{ "constant": true, "inputs": [{ "name": "proposer", "type": "address" }], "name": "canPropose", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "voter", "type": "address" }], "name": "canVote", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "whitelisted", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "whitelisters", "type": "address[]" }], "payable": false, "type": "constructor" }]
        }, {
            name: 'votingStrategy',
            bytecode: '6060604052341561000f57600080fd5b5b6101678061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680637eae191114610054578063d4a8dd981461008f578063faeae2f1146100ca575b600080fd5b341561005f57600080fd5b6100756004808035906020019091905050610117565b604051808215151515815260200191505060405180910390f35b341561009a57600080fd5b6100b06004808035906020019091905050610123565b604051808215151515815260200191505060405180910390f35b34156100d557600080fd5b610101600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061012f565b6040518082815260200191505060405180910390f35b6000600190505b919050565b6000600190505b919050565b6000600190505b9190505600a165627a7a72305820954d6bcac9e5e41ba3306c2c2125dad921a981b06827e08f8712fab45bad20a80029',
            abi: [{ "constant": true, "inputs": [{ "name": "proposal", "type": "uint256" }], "name": "proposalPassed", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "proposal", "type": "uint256" }], "name": "quorumReached", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "voter", "type": "address" }], "name": "votingWeightOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }]
        }, {
            name: 'version',
            bytecode: '0x6060604052341561000f57600080fd5b5b611fa88061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630ed7b8491461005f5780637c5fd2bc146100cb578063c1292cc31461012e578063ef188d2914610157575b600080fd5b341561006a57600080fd5b6100b5600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061017a565b6040518082815260200191505060405180910390f35b34156100d657600080fd5b6100ec600480803590602001909190505061037e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561013957600080fd5b6101416103bb565b6040518082815260200191505060405180910390f35b341561016257600080fd5b61017860048080359060200190919050506103c1565b005b60008060006101876103fa565b9150610191610417565b604051809103906000f08015156101a757600080fd5b6101af610427565b604051809103906000f08015156101c557600080fd5b86866101cf610437565b808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f08015156102b457600080fd5b90507f744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce46388282604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a18060008084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508192505b505092915050565b600080600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b60015481565b60008082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b50565b600060016000815480929190600101919050555060015490505b90565b6040516106e68061044883390190565b6040516109f080610b2e83390190565b604051610a5f8061151e83390190560060606040525b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610690806100566000396000f300606060405236156100a2576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631785f53c146100a75780631e5e23d9146100e057806324d7806c14610107578063273f4940146101585780632f54bf6e1461018857806370480275146101d957806381fa7382146102125780638da5cb5b146102395780638eaa6ac01461028e578063f2fde38b146102c9575b600080fd5b34156100b257600080fd5b6100de600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610302565b005b34156100eb57600080fd5b610105600480803560001916906020019091905050610373565b005b341561011257600080fd5b61013e600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103c0565b604051808215151515815260200191505060405180910390f35b341561016357600080fd5b610186600480803560001916906020019091908035906020019091905050610417565b005b341561019357600080fd5b6101bf600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104a9565b604051808215151515815260200191505060405180910390f35b34156101e457600080fd5b610210600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610503565b005b341561021d57600080fd5b610237600480803560001916906020019091905050610573565b005b341561024457600080fd5b61024c6105c0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561029957600080fd5b6102b36004808035600019169060200190919050506105e5565b6040518082815260200191505060405180910390f35b34156102d457600080fd5b610300600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061060b565b005b61030b336104a9565b151561031657600080fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b50565b61037c336104a9565b151561038757600080fd5b600060036000836000191660001916815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b50565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690505b919050565b81610421336104a9565b1580156104345750610432336103c0565b155b1561043e57600080fd5b610447336103c0565b8015610478575060036000826000191660001916815260200190815260200160002060009054906101000a900460ff165b1561048257600080fd5b81600260008560001916600019168152602001908152602001600020819055505b5b505050565b60008173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161490505b919050565b61050c336104a9565b151561051757600080fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b50565b61057c336104a9565b151561058757600080fd5b600160036000836000191660001916815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006002600083600019166000191681526020019081526020016000205490505b919050565b610614336104a9565b151561061f57600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b505600a165627a7a72305820ece5c7b9f387c0fd04a34960d1802566289b7e20f0876e202f0bbe843ae1ecef00296060604052341561000f57600080fd5b5b6109d18061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063693ec85e1461005457806380599e4b14610191578063da4631c9146101ee575b600080fd5b341561005f57600080fd5b6100af600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506102cc565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156101545780820151818401525b602081019050610138565b50505050905090810190601f1680156101815780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b341561019c57600080fd5b6101ec600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506104c8565b005b34156101f957600080fd5b6102ca600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610636565b005b6000806102d761083c565b6102df610850565b6000856040518082805190602001908083835b60208310151561031857805182525b6020820191506020810190506020830392506102f2565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020606060405190810160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561049c5780601f106104715761010080835404028352916020019161049c565b820191906000526020600020905b81548152906001019060200180831161047f57829003601f168201915b50505050508152505090508060000151816020015182604001518090509350935093505b509193909250565b6000816040518082805190602001908083835b60208310151561050157805182525b6020820191506020810190506020830392506104db565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560028201600061059391906108a4565b50507fc125b068dddf05a3cf7ade11e9afd6dae0de614a5f2b1a856872038716a855ae816040518080602001828103825283818151815260200191508051906020019080838360005b838110156105f85780820151818401525b6020810190506105dc565b50505050905090810190601f1680156106255780820380516001836020036101000a031916815260200191505b509250505060405180910390a15b50565b6060604051908101604052808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001828152506000856040518082805190602001908083835b6020831015156106b757805182525b602082019150602081019050602083039250610691565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020190805190602001906107949291906108ec565b509050507f7e462b77205d9bc889740e6a08a3415c6040322fa001a664ca7838319e80d5f9846040518080602001828103825283818151815260200191508051906020019080838360005b838110156107fb5780820151818401525b6020810190506107df565b50505050905090810190601f1680156108285780820380516001836020036101000a031916815260200191505b509250505060405180910390a15b50505050565b602060405190810160405280600081525090565b606060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200161089e61096c565b81525090565b50805460018160011615610100020316600290046000825580601f106108ca57506108e9565b601f0160209004906000526020600020908101906108e89190610980565b5b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061092d57805160ff191683800117855561095b565b8280016001018555821561095b579182015b8281111561095a57825182559160200191906001019061093f565b5b5090506109689190610980565b5090565b602060405190810160405280600081525090565b6109a291905b8082111561099e576000816000905550600101610986565b5090565b905600a165627a7a72305820a947c548020c773c9d5e5f228f4623b803f5f415ccee2191733b897bfac8c43200296060604052341561000f57600080fd5b604051608080610a5f833981016040528080519060200190919080519060200190919080519060200190919080519060200190919050505b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b83600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060604051908101604052808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815250600160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050505b505050505b610848806102176000396000f30060606040523615610081576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063013cf08b146100865780632f54bf6e146100e95780636c70bee91461013a5780638da5cb5b1461018f578063943e8216146101e4578063d02b897614610213578063f2fde38b14610255575b600080fd5b341561009157600080fd5b6100a7600480803590602001909190505061028e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100f457600080fd5b610120600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102ce565b604051808215151515815260200191505060405180910390f35b341561014557600080fd5b61014d610328565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561019a57600080fd5b6101a261034e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101ef57600080fd5b610211600480803590602001909190803560ff16906020019091905050610373565b005b341561021e57600080fd5b610253600480803590602001908201803590602001919091929080359060200190820180359060200191909192905050610528565b005b341561026057600080fd5b61028c600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610732565b005b60048181548110151561029d57fe5b906000526020600020900160005b915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161490505b919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663adfaa72e336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561043a57600080fd5b6102c65a03f1151561044b57600080fd5b50505060405180519050151561046057600080fd5b60048281548110151561046f57fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b3f98adc826040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260ff1660ff168152602001915050600060405180830381600087803b151561050f57600080fd5b6102c65a03f1151561052057600080fd5b5050505b5050565b6000806000600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663693ec85e88886000604051606001526040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825284848281815260200192508082843782019150509350505050606060405180830381600087803b15156105e357600080fd5b6102c65a03f115156105f457600080fd5b505050604051805190602001805190602001805190505050925060048054905091506106528386868080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505061078b565b90506004805480600101828161066891906107cb565b916000526020600020900160005b83909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550503373ffffffffffffffffffffffffffffffffffffffff167fc8c078bfee58e5822588f08b4509ed1eb5058e03f666cca84dd2d44bf5c288a883898960405180848152602001806020018281038252848482818152602001925080828437820191505094505050505060405180910390a25b50505050505050565b61073b336102ce565b151561074657600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600080600080845191506000905081600086516020880160008a6127105a03f190506001811415156107bc57600080fd5b60205192505b50505092915050565b8154818355818115116107f2578183600052602060002091820191016107f191906107f7565b5b505050565b61081991905b808211156108155760008160009055506001016107fd565b5090565b905600a165627a7a723058202f3faec2929010186b2d6c9106ffdad8b662a352fa6adc36d1e2bceef5f534ee0029a165627a7a72305820b1ed394a6db0de62d581388d78c628df24f9a236f448e7cc435c4930da329b3e0029',
            abi: [{ "constant": false, "inputs": [{ "name": "votingRights", "type": "address" }, { "name": "votingStrategy", "type": "address" }], "name": "createCongress", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getCongress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "lastId", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "destroyCongress", "outputs": [], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "congress", "type": "address" }], "name": "CongressCreated", "type": "event" }]
        }, {}];
    }

    /**
     * Get contract data object and add arguments if defined.
     * @param {string} name 
     * @param {any} contractDeployArguments 
     * @return {Object}
     */
    getContractDataObjectByName(name, contractDeployArguments = undefined) {
        let contractData = this.dataSource.filter(contract => contract.name == name);

        if (typeof contractDeployArguments != undefined) {
            contractData[0]['arguments'] = contractDeployArguments;
        }

        if (contractData.length > 1 && typeof contractDeployArguments == undefined) {
            throw new Error('Duplicated entries in storage!');
        }

        return contractData[0];
    }

    /**
     * @param {string} name 
     * @return {Object}
     */
    getContractAbiByName(name) {
        return this.getContractDataObjectByName(name).abi;
    }

    /**
     * @param {string} name 
     * @return {Object}
     */
    getContractByteCodeByName(name) {
        return this.getContractDataObjectByName(name).bytecode;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ContractData;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_Congress__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_Version__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_ContractData__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ContractData", function() { return __WEBPACK_IMPORTED_MODULE_2__storage_ContractData__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Congress", function() { return __WEBPACK_IMPORTED_MODULE_0__api_Congress__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Version", function() { return __WEBPACK_IMPORTED_MODULE_1__api_Version__["a"]; });
// Harbour




=======

class ConnectionModel {

    /**
     * @param {Object} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    constructor(web3, from) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web3_Contract__ = __webpack_require__(0);


class Version extends __WEBPACK_IMPORTED_MODULE_0__web3_Contract__["a" /* default */] {

     /**
      * @param {string} votingRightsAddress 
      * @param {string} votingStrategyAddress 
      * @return {Promise}
      */
     createCongress(votingRightsAddress, votingStrategyAddress) {
          return this.sendTransaction('createCongress', [votingRightsAddress, votingStrategyAddress]);
     }

     /**
      * @param {number} contractId 
      * @return {Promise}
      */
     destroyCongress(contractId) {
          return this.sendTransaction('destroyContract', [contractId]);
     }

     /**
      * @param {number} congressId 
      * @return {Promise}
      */
     getCongress(congressId) {
          return this.callMethod('getCongress', [congressId]);
     }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Version;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ContractData {

    constructor() {
        this.dataSource = [{
            name: 'votingRight',
            bytecode: '6060604052341561000f57600080fd5b604051610309380380610309833981016040528080518201919050505b60008090505b81518110156100b7576001600080848481518110151561004e57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b8080600101915050610032565b5b50505b61023f806100ca6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806342b4632e14610054578063adfaa72e146100a5578063d936547e146100f6575b600080fd5b341561005f57600080fd5b61008b600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610147565b604051808215151515815260200191505060405180910390f35b34156100b057600080fd5b6100dc600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061019d565b604051808215151515815260200191505060405180910390f35b341561010157600080fd5b61012d600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101f3565b604051808215151515815260200191505060405180910390f35b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690505b919050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690505b919050565b60006020528060005260406000206000915054906101000a900460ff16815600a165627a7a7230582036f0e31d90b2fc298f39fe2eab3ca27df22f723c2245c58cdc01f8e1c255d3420029',
            abi: [{ "constant": true, "inputs": [{ "name": "proposer", "type": "address" }], "name": "canPropose", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "voter", "type": "address" }], "name": "canVote", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "whitelisted", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "whitelisters", "type": "address[]" }], "payable": false, "type": "constructor" }]
        }, {
            name: 'votingStrategy',
            bytecode: '6060604052341561000f57600080fd5b5b6101678061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680637eae191114610054578063d4a8dd981461008f578063faeae2f1146100ca575b600080fd5b341561005f57600080fd5b6100756004808035906020019091905050610117565b604051808215151515815260200191505060405180910390f35b341561009a57600080fd5b6100b06004808035906020019091905050610123565b604051808215151515815260200191505060405180910390f35b34156100d557600080fd5b610101600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061012f565b6040518082815260200191505060405180910390f35b6000600190505b919050565b6000600190505b919050565b6000600190505b9190505600a165627a7a72305820954d6bcac9e5e41ba3306c2c2125dad921a981b06827e08f8712fab45bad20a80029',
            abi: [{ "constant": true, "inputs": [{ "name": "proposal", "type": "uint256" }], "name": "proposalPassed", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "proposal", "type": "uint256" }], "name": "quorumReached", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "voter", "type": "address" }], "name": "votingWeightOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }]
        }, {
            name: 'version',
            bytecode: '6060604052341561000f57600080fd5b5b611fa88061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630ed7b8491461005f5780637c5fd2bc146100cb578063c1292cc31461012e578063ef188d2914610157575b600080fd5b341561006a57600080fd5b6100b5600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061017a565b6040518082815260200191505060405180910390f35b34156100d657600080fd5b6100ec600480803590602001909190505061037e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561013957600080fd5b6101416103bb565b6040518082815260200191505060405180910390f35b341561016257600080fd5b61017860048080359060200190919050506103c1565b005b60008060006101876103fa565b9150610191610417565b604051809103906000f08015156101a757600080fd5b6101af610427565b604051809103906000f08015156101c557600080fd5b86866101cf610437565b808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f08015156102b457600080fd5b90507f744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce46388282604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a18060008084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508192505b505092915050565b600080600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b60015481565b60008082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b50565b600060016000815480929190600101919050555060015490505b90565b6040516106e68061044883390190565b6040516109f080610b2e83390190565b604051610a5f8061151e83390190560060606040525b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610690806100566000396000f300606060405236156100a2576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631785f53c146100a75780631e5e23d9146100e057806324d7806c14610107578063273f4940146101585780632f54bf6e1461018857806370480275146101d957806381fa7382146102125780638da5cb5b146102395780638eaa6ac01461028e578063f2fde38b146102c9575b600080fd5b34156100b257600080fd5b6100de600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610302565b005b34156100eb57600080fd5b610105600480803560001916906020019091905050610373565b005b341561011257600080fd5b61013e600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103c0565b604051808215151515815260200191505060405180910390f35b341561016357600080fd5b610186600480803560001916906020019091908035906020019091905050610417565b005b341561019357600080fd5b6101bf600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104a9565b604051808215151515815260200191505060405180910390f35b34156101e457600080fd5b610210600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610503565b005b341561021d57600080fd5b610237600480803560001916906020019091905050610573565b005b341561024457600080fd5b61024c6105c0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561029957600080fd5b6102b36004808035600019169060200190919050506105e5565b6040518082815260200191505060405180910390f35b34156102d457600080fd5b610300600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061060b565b005b61030b336104a9565b151561031657600080fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b50565b61037c336104a9565b151561038757600080fd5b600060036000836000191660001916815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b50565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690505b919050565b81610421336104a9565b1580156104345750610432336103c0565b155b1561043e57600080fd5b610447336103c0565b8015610478575060036000826000191660001916815260200190815260200160002060009054906101000a900460ff165b1561048257600080fd5b81600260008560001916600019168152602001908152602001600020819055505b5b505050565b60008173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161490505b919050565b61050c336104a9565b151561051757600080fd5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b50565b61057c336104a9565b151561058757600080fd5b600160036000836000191660001916815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006002600083600019166000191681526020019081526020016000205490505b919050565b610614336104a9565b151561061f57600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b505600a165627a7a72305820ece5c7b9f387c0fd04a34960d1802566289b7e20f0876e202f0bbe843ae1ecef00296060604052341561000f57600080fd5b5b6109d18061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063693ec85e1461005457806380599e4b14610191578063da4631c9146101ee575b600080fd5b341561005f57600080fd5b6100af600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506102cc565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156101545780820151818401525b602081019050610138565b50505050905090810190601f1680156101815780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b341561019c57600080fd5b6101ec600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506104c8565b005b34156101f957600080fd5b6102ca600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610636565b005b6000806102d761083c565b6102df610850565b6000856040518082805190602001908083835b60208310151561031857805182525b6020820191506020810190506020830392506102f2565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020606060405190810160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561049c5780601f106104715761010080835404028352916020019161049c565b820191906000526020600020905b81548152906001019060200180831161047f57829003601f168201915b50505050508152505090508060000151816020015182604001518090509350935093505b509193909250565b6000816040518082805190602001908083835b60208310151561050157805182525b6020820191506020810190506020830392506104db565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560028201600061059391906108a4565b50507fc125b068dddf05a3cf7ade11e9afd6dae0de614a5f2b1a856872038716a855ae816040518080602001828103825283818151815260200191508051906020019080838360005b838110156105f85780820151818401525b6020810190506105dc565b50505050905090810190601f1680156106255780820380516001836020036101000a031916815260200191505b509250505060405180910390a15b50565b6060604051908101604052808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001828152506000856040518082805190602001908083835b6020831015156106b757805182525b602082019150602081019050602083039250610691565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020190805190602001906107949291906108ec565b509050507f7e462b77205d9bc889740e6a08a3415c6040322fa001a664ca7838319e80d5f9846040518080602001828103825283818151815260200191508051906020019080838360005b838110156107fb5780820151818401525b6020810190506107df565b50505050905090810190601f1680156108285780820380516001836020036101000a031916815260200191505b509250505060405180910390a15b50505050565b602060405190810160405280600081525090565b606060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200161089e61096c565b81525090565b50805460018160011615610100020316600290046000825580601f106108ca57506108e9565b601f0160209004906000526020600020908101906108e89190610980565b5b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061092d57805160ff191683800117855561095b565b8280016001018555821561095b579182015b8281111561095a57825182559160200191906001019061093f565b5b5090506109689190610980565b5090565b602060405190810160405280600081525090565b6109a291905b8082111561099e576000816000905550600101610986565b5090565b905600a165627a7a72305820a947c548020c773c9d5e5f228f4623b803f5f415ccee2191733b897bfac8c43200296060604052341561000f57600080fd5b604051608080610a5f833981016040528080519060200190919080519060200190919080519060200190919080519060200190919050505b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b83600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060604051908101604052808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815250600160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050505b505050505b610848806102176000396000f30060606040523615610081576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063013cf08b146100865780632f54bf6e146100e95780636c70bee91461013a5780638da5cb5b1461018f578063943e8216146101e4578063d02b897614610213578063f2fde38b14610255575b600080fd5b341561009157600080fd5b6100a7600480803590602001909190505061028e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100f457600080fd5b610120600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506102ce565b604051808215151515815260200191505060405180910390f35b341561014557600080fd5b61014d610328565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561019a57600080fd5b6101a261034e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101ef57600080fd5b610211600480803590602001909190803560ff16906020019091905050610373565b005b341561021e57600080fd5b610253600480803590602001908201803590602001919091929080359060200190820180359060200191909192905050610528565b005b341561026057600080fd5b61028c600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610732565b005b60048181548110151561029d57fe5b906000526020600020900160005b915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008173ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161490505b919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663adfaa72e336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561043a57600080fd5b6102c65a03f1151561044b57600080fd5b50505060405180519050151561046057600080fd5b60048281548110151561046f57fe5b906000526020600020900160005b9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b3f98adc826040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260ff1660ff168152602001915050600060405180830381600087803b151561050f57600080fd5b6102c65a03f1151561052057600080fd5b5050505b5050565b6000806000600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663693ec85e88886000604051606001526040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825284848281815260200192508082843782019150509350505050606060405180830381600087803b15156105e357600080fd5b6102c65a03f115156105f457600080fd5b505050604051805190602001805190602001805190505050925060048054905091506106528386868080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505061078b565b90506004805480600101828161066891906107cb565b916000526020600020900160005b83909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550503373ffffffffffffffffffffffffffffffffffffffff167fc8c078bfee58e5822588f08b4509ed1eb5058e03f666cca84dd2d44bf5c288a883898960405180848152602001806020018281038252848482818152602001925080828437820191505094505050505060405180910390a25b50505050505050565b61073b336102ce565b151561074657600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600080600080845191506000905081600086516020880160008a6127105a03f190506001811415156107bc57600080fd5b60205192505b50505092915050565b8154818355818115116107f2578183600052602060002091820191016107f191906107f7565b5b505050565b61081991905b808211156108155760008160009055506001016107fd565b5090565b905600a165627a7a723058202f3faec2929010186b2d6c9106ffdad8b662a352fa6adc36d1e2bceef5f534ee0029a165627a7a72305820b1ed394a6db0de62d581388d78c628df24f9a236f448e7cc435c4930da329b3e0029',
            abi: [{ "constant": false, "inputs": [{ "name": "votingRights", "type": "address" }, { "name": "votingStrategy", "type": "address" }], "name": "createCongress", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getCongress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "lastId", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "destroyCongress", "outputs": [], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "congress", "type": "address" }], "name": "CongressCreated", "type": "event" }]
        }, {}];
    }

    /**
     * @param {string} name 
     * @param {any} contractDeployArguments 
     * @return {Object}
     */
    getContractDataObjectByName(name, contractDeployArguments = undefined) {
        let contractData = this.dataSource.filter(contract => contract.name = name);
        if (typeof contractDeployArguments != undefined) {
            contractData['arguments'] = contractDeployArguments;
        }
        return contractData;
    }

    /**
     * @param {string} name 
     * @return {Object}
     */
    getContractAbiByName(name) {
        return this.getContractDataObjectByName(name).abi;
    }

    /**
     * @param {string} name 
     * @return {Object}
     */
    getContractByteCodeByName(name) {
        return this.getContractDataObjectByName(name).bytecode;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ContractData;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Deploy {

    /**
     * @param {Object} connectionModel 
     * @param {string} from 
     * @param {number} gas 
     * @param {number} gasPrice 
     */
    constructor(connectionModel, from, gas, gasPrice) {
        if (!(web3Connection instanceof ConnectionModel)) {
            throw new Error('Argument web3Connection should be an instance of ConnectionModel');
        }
        this.web3 = connectionModel.getWeb3();
        this.from = from;
        this.gas = gas;
        this.gasPrice = gasPrice;
    }

    /**
     * @param {array} contractMap 
     * @return {Object}
     */
    deployContracts(contractMap) {
        let self = this;
        let contractAddress = [];
        return new Promise(function (resolve, reject) {
            let contractAddress = [];
            contractMap.forEach(function (contract, key) {
                self.deploy(contract.bytecode, contract.arguments).then(function (result) {
                    contractAddress[contract.name] = result.contractAddress;
                    if (key == contractMap.length - 1) {
                        resolve(contractAddress);
                    }
                }).catch(function (error) {
                    reject(error);
                });
            });
        });
    }

    /**
     * @param {string} bytecode 
     * @param {array} deployArguments
     * @return {Object} 
     */
    deploy(bytecode, deployArguments) {
        return new this.web3.eth.sendTransaction({
            from: this.from,
            data: bytecode,
            gas: this.gas,
            gasPrice: this.gasPrice,
            deployArguments
        });
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Deploy;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Address {

    /**
     * @param {Object} web3 
     */
    constructor(web3) {
        this.web3 = web3;
        this.utils = this.web3.utils;
    }

    /**
     * @param {string} address 
     * @return {bool}
     */
    isAddress(address) {
        return this.utils.isAddress(address);
    }

    /**
     * @param {string} address
     * @return {string} 
     */
    toChecksumAddress(address) {
        return this.utils.toChecksumAddress(address);
    }

    /**
     * @param {bool} addressChecksum 
     * @return {bool}
     */
    checkAddressChecksum(addressChecksum) {
        return this.utils.checkAddressChecksum(addressChecksum);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Address;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Hex {

    /**
     * @param {Object} web3 
     */
    constructor(web3) {
        this.utils = web3.utils;
    }

    /**
     * @param {Object | number | string} value 
     * @return {string}
     */
    toHex(value) {
        return this.utils.toHex(value);
    }

    /**
     * @param {string} hex 
     * @return {string}
     */
    hexToNumberString(hex) {
        return this.utils.hexToNumberString(hex);
    }

    /**
     * @param {string} hex 
     * @return {number}
     */
    hexToNumber(hex) {
        return this.utils.hexToNumber(hex);
    }

    /**
     * @param {Object | number | string} hex 
     * @return {string}
     */
    numberToHex(value) {
        return this.utils.numberToHex(value);
    }

    /**
     * @param {string} hex 
     * @return {string}
     */
    hexToUtf8(hex) {
        return this.utils.hexToUtf8(hex);
    }

    /**
     * @param {string} hex 
     * @return {string}
     */
    hexToAscii(hex) {
        return this.utils.hexToAscii(hex);
    }

    /**
     * @param {string} string 
     * @return {string}
     */
    utf8ToHex(string) {
        return this.utils.utf8ToHex(string);
    }

    /**
     * @param {string} string 
     * @return {string}
     */
    asciiToHex(string) {
        return this.utils.asciiToHex(string);
    }

    /**
     * @param {string} hex 
     * @return {array}
     */
    hexToBytes(hex) {
        return this.utils.hexToBytes(hex);
    }

    /**
     * @param {array} array 
     * @return {string}
     */
    bytesToHex(array) {
        return this.utils.bytesToHex(array);
    }

    /**
     * @param {number} bytes 
     * @return {string}
     */
    randomHex(bytes) {
        return this.utils.randomHex(bytes);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Hex;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Number {

    /**
     * @param {Object} web3 
     */
    constructor(web3) {
        this.web3 = web3;
        this.utils = this.web3.utils;
        this.bigNummber = this.web3.utils.BN;
    }

    /**
     * @param {number} number 
     * @return {string}
     */
    toString(number) {
        return new this.bigNummber(number).toString();
    }

    /**
     * @param {number} number
     * @param {number} numberToAdd
     * @return {string}
     */
    add(number, numberToAdd) {
        return new this.bigNummber(number).add(new BN(numberToAdd)).toString();
    }

    /**
     * @param {Object} number
     * @return {bool}
     */
    isBigNumber(number) {
        return this.utils.isBigNumber(number);
    }

    /**
     * @param {*} number 
     * @param {bool} raw 
     * @return {Object}
     */
    toBigNumber(number, raw = undefined) {
        let bigNummber = this.utils.toBN(number);
        if (raw) {
            return bigNummber;
        }

        let clone = Object.assign({}, this);
        clone.bigNummber = bigNummber;

        return clone;
    }

    /**
     * @param {number} number 
     * @param {string} unit 
     */
    toWei(number, unit) {
        return this.utils.toWei(number, unit);
    }

    /**
     * @param {number} number 
     * @param {string} unit 
     */
    fromWei(number, unit) {
        return this.utils.fromWei(number, unit);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Number;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sha {

    /**
     * @param {Object} web3 
     */
    constructor(web3) {
        this.utils = web3.utils;
    }

    /**
     * @param {string} string 
     */
    sha3(string) {
        return this.utils.sha3(string);
    }

    /**
     * @param {*} any 
     */
    soliditySha3(any) {
        return this.utils.soliditySha3(any);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sha;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web3_Contract__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web3_Deploy__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__web3_models_ConnectionModel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__web3_utils_Address__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__web3_utils_Hex__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__web3_utils_Number__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__web3_utils_Sha__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_Congress__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_Version__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__storage_ContractData__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Address", function() { return __WEBPACK_IMPORTED_MODULE_3__web3_utils_Address__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Contract", function() { return __WEBPACK_IMPORTED_MODULE_0__web3_Contract__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionModel", function() { return __WEBPACK_IMPORTED_MODULE_2__web3_models_ConnectionModel__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ContractData", function() { return __WEBPACK_IMPORTED_MODULE_9__storage_ContractData__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Congress", function() { return __WEBPACK_IMPORTED_MODULE_7__api_Congress__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Deploy", function() { return __WEBPACK_IMPORTED_MODULE_1__web3_Deploy__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Hex", function() { return __WEBPACK_IMPORTED_MODULE_4__web3_utils_Hex__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Number", function() { return __WEBPACK_IMPORTED_MODULE_5__web3_utils_Number__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Sha", function() { return __WEBPACK_IMPORTED_MODULE_6__web3_utils_Sha__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Version", function() { return __WEBPACK_IMPORTED_MODULE_8__api_Version__["a"]; });

// Web3








// Harbour




>>>>>>> parent of 2df86a2... Some refactoring
// Export public modules


/***/ })
/******/ ]);
});