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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Contract {

    /**
     * @param web3
     * @param contractABI
     * @param address
     * @param from
     */
    constructor(web3, contractABI, address, from) {
        this.from = from;
        this.abi = contractABI;
        this.web3 = web3;
        this.contract = new this.web3.eth.Contract(
            this.abi,
            address
        );
    }

    /**
     * Execute method and decide if it is to call or send as transaction
     * @param {string} methodName
     * @param {array} methodArguments
     * @param {string} from
     * @param {string} gas
     * @param {string} gasPrice
     * @returns {Object}
     */
    executeMethod(methodName, methodArguments, from, gas, gasPrice) {
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
     * @return {Object}
     */
    sendTransaction(methodName, methodArguments, from, gas, gasPrice) {
        return this.getTransactionReturnValues(this.getMethodWithArguments(methodName, methodArguments).send({
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

    /**
     * Returns the events returnValues as promise from the transaction
     * @param {Object} transactionPromise
     * @return {Object}
     */
    getTransactionReturnValues(transactionPromise) {
        return new Promise(function (resolve, reject) {
            transactionPromise.then(function (transaction) {
                let returnValues = [];
                Object.keys(transaction.events).forEach(key => {
                    returnValues[key] = transaction.events[key].returnValues;
                });
                resolve(returnValues);
            }).catch(error => {
                reject(error);
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Contract;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Deploy_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contracts_Version_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contracts_Organization_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contracts_VotingPower_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contracts_VotingRights_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contract_metadata_js__ = __webpack_require__(7);







class Harbour {

    /**
     * @param {Web3} web3
     * @param {string} versionAddress
     */
    constructor(web3, versionAddress) {
        this.web3 = web3;
        this.deploy = new __WEBPACK_IMPORTED_MODULE_0__lib_web3_Deploy_js__["a" /* default */](this.web3);
        this.contractData = __WEBPACK_IMPORTED_MODULE_5__contract_metadata_js__["a" /* data */];
        this.version = new __WEBPACK_IMPORTED_MODULE_1__contracts_Version_js__["a" /* default */](this.web3, this.getAbiFromContractData('Version'), versionAddress);
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
     * @returns {array}
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
     * Returns an harbour organization
     * @param {string} address
     * @returns {Organization}
     */
    getOrganization(address) {
        return new __WEBPACK_IMPORTED_MODULE_2__contracts_Organization_js__["a" /* default */](
            this.web3,
            this.getAbiFromContractData('Organization'),
            address,
        );
    }

    /**
     * Returns an harbour organization
     * @param {string} address
     * @returns {VotingPower}
     */
    getVotingPower(address) {
        return new __WEBPACK_IMPORTED_MODULE_3__contracts_VotingPower_js__["a" /* default */](
            this.web3,
            this.getAbiFromContractData('VotingPower'),
            address
        );
    }

    /**
     * Returns an harbour organization
     * @param {string} address
     * @returns {VotingRights}
     */
    getVotingRights(address) {
        return new __WEBPACK_IMPORTED_MODULE_4__contracts_VotingRights_js__["a" /* default */](
            this.web3,
            this.getAbiFromContractData('VotingRights'),
            address
        );
    }

    /**
     * @param contractName
     * @returns {Object}
     */
    getAbiFromContractData(contractName) {
        return this.contractData.filter((contract) => contract.contract_name == contractName)[0].abi;
    }
}
/* harmony export (immutable) */ __webpack_exports__["Harbour"] = Harbour;



/***/ }),
/* 2 */
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
     * @param {array} deployArguments
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract__ = __webpack_require__(0);


class Version extends __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract__["a" /* Contract */] {

    /**
     * @param {Web3} web3
     * @param contractABI
     * @param address
     */
    constructor(web3, contractABI, address) {
        super(web3, contractABI, address);
    }
    /**
     * @param {string} votingRightsAddress
     * @param {string} votingStrategyAddress
     * @param {string} from
     * @param {string} gas
     * @param {string} gasPrice
     * @return {Promise}
     */
    createOrganization(votingRightsAddress, votingStrategyAddress, from, gas, gasPrice) {
        return this.executeMethod(
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
     * @param {string} gas
     * @param {string} gasPrice
     * @return {Promise}
     */
    destroyOrganization(contractId, from, gas, gasPrice) {
        return this.executeMethod(
            'destroyOrganization',
            [contractId],
            from,
            gas,
            gasPrice);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Version;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract__ = __webpack_require__(0);


class Organization extends __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract__["a" /* Contract */] {

    /**
     * @param {number} proposalId
     * @param choice
     * @param {string} from
     * @returns {Promise}
     */
    vote(proposalId, choice, from) {
        return this.executeMethod('vote', [proposalId, choice], from);
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @returns {Promise}
     */
    approve(proposalId, from) {
        return this.executeMethod('approve', [proposalId], from);
    }

    /**
     * @param {string} proposalAddress
     * @param {string} from
     * @returns {Promise}
     */
    propose(proposalAddress, from) {
        return this.executeMethod('propose', [proposalAddress], from);
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @returns {Promise}
     */
    execute(proposalId, from) {
        return this.executeMethod('execute', [proposalId], from);
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @returns {Promise}
     */
    tally(proposalId, from) {
        return this.executeMethod('tally', [proposalId], from);
    }

    /**
     * @param {number} optionId
     * @param {string} from
     * @returns {Promise}
     */
    winningOption(optionId, from) {
        return this.executeMethod('winningOption', [optionId], from);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Organization;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract__ = __webpack_require__(0);


class VotingPower extends __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract__["a" /* Contract */] {

    /**
     * @param {number} quorum
     * @returns {Promise}
     */
    quorumReached(quorum) {
        return this.executeMethod('quorumReached', [quorum]);
    }

    /**
     * @param {string} voter
     * @returns {Promise}
     */
    votingWeightOf(voter) {
        return this.executeMethod('votingWeightOf', [voter]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VotingPower;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract__ = __webpack_require__(0);


class VotingRights extends __WEBPACK_IMPORTED_MODULE_0__lib_web3_Contract__["a" /* Contract */] {

    /**
     * @param {string} voter
     * @returns {Promise}
     */
    canVote(voter) {
        return this.executeMethod('canVote', [voter]);
    }

    /**
     * @param {string} proposer
     * @returns {Promise}
     */
    canPropose(proposer) {
        return this.executeMethod('canPropose', [proposer]);
    }

    /**
     * @param {string} approver
     * @returns {Promise}
     */
    canApprove(approver) {
        return this.executeMethod('canApprove', [approver]);
    }

    /**
     * @param {number} proposal
     * @returns {Object}
     */
    requiresApproval(proposal) {
        return this.executeMethod('requiresApproval', [proposal]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VotingRights;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const data = [
	{
		"contract_name": "VotingStrategy",
		"abi": [
			{
				"constant": true,
				"inputs": [
					{
						"name": "proposal",
						"type": "uint256"
					}
				],
				"name": "proposalPassed",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "proposal",
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
				"name": "votingWeightOf",
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"type": "function"
			}
		],
		"unlinked_binary": "0x",
		"networks": {},
		"schema_version": "0.0.5",
		"updated_at": 1503751982761
	},
	{
		"contract_name": "VotingRights",
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
				"name": "canVote",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"type": "function"
			}
		],
		"unlinked_binary": "0x",
		"networks": {},
		"schema_version": "0.0.5",
		"updated_at": 1503751982761
	},
	{
		"contract_name": "Organization",
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
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "_address",
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
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "proposal",
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
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "votingManager",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
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
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "_newOwner",
						"type": "address"
					}
				],
				"name": "transferOwnership",
				"outputs": [],
				"payable": false,
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
						"name": "_votingManager",
						"type": "address"
					},
					{
						"name": "_rights",
						"type": "address"
					},
					{
						"name": "_power",
						"type": "address"
					}
				],
				"payable": false,
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
		"unlinked_binary": "0x6060604052341561000f57600080fd5b60405160a08061101d83398101604052808051919060200180519190602001805191906020018051919060200180519150505b5b60008054600160a060020a03191633600160a060020a03161790555b60038054600160a060020a031916600160a060020a03871617905560408051908101604052600160a060020a03808416825282166020820152600181518154600160a060020a031916600160a060020a039190911617815560208201516001919091018054600160a060020a0319908116600160a060020a039384161790915560048054821688841617905560058054909116918616919091179055505b50505050505b610f0b806101126000396000f3006060604052361561009e5763ffffffff60e060020a6000350416630126795181146100a357806302f89be2146100c45780630dca7ed8146100f35780632f54bf6e1461011b5780636c70bee91461014e5780638da5cb5b1461017d578063b384abef146101ac578063b759f954146101c7578063da1bcdf0146101df578063ed8b6b311461020e578063f2fde38b14610226578063fe0d94c114610247575b600080fd5b34156100ae57600080fd5b6100c2600160a060020a036004351661025f565b005b34156100cf57600080fd5b6100d7610483565b604051600160a060020a03909116815260200160405180910390f35b34156100fe57600080fd5b610109600435610492565b60405190815260200160405180910390f35b341561012657600080fd5b61013a600160a060020a03600435166106dc565b604051901515815260200160405180910390f35b341561015957600080fd5b6100d76106f3565b604051600160a060020a03909116815260200160405180910390f35b341561018857600080fd5b6100d7610702565b604051600160a060020a03909116815260200160405180910390f35b34156101b757600080fd5b6100c2600435602435610711565b005b34156101d257600080fd5b6100c2600435610a31565b005b34156101ea57600080fd5b6100d7610b10565b604051600160a060020a03909116815260200160405180910390f35b341561021957600080fd5b6100c2600435610b1f565b005b341561023157600080fd5b6100c2600160a060020a0360043516610cce565b005b341561025257600080fd5b6100c2600435610d0f565b005b6001546000908190600160a060020a03166342b4632e33836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156102bc57600080fd5b6102c65a03f115156102cd57600080fd5b5050506040518051905015156102e257600080fd5b600454600160a060020a03166352c28fab338560006040516020015260405160e060020a63ffffffff8516028152600160a060020a03928316600482015291166024820152604401602060405180830381600087803b151561034357600080fd5b6102c65a03f1151561035457600080fd5b5050506040518051600154909250600160a060020a0316905063286399058260006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b15156103b257600080fd5b6102c65a03f115156103c357600080fd5b50505060405180519050151561043057600454600160a060020a031663b759f9548260405160e060020a63ffffffff84160281526004810191909152602401600060405180830381600087803b151561041b57600080fd5b6102c65a03f1151561042c57600080fd5b5050505b33600160a060020a03167f7e5361edd70248cf0a9e88723fe06b63fa8cad3a111b246c13fe2be1c5318f458285604051918252600160a060020a031660208201526040908101905180910390a25b505050565b600454600160a060020a031681565b600454600090819081908190600160a060020a031663c7f758a886836040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b15156104eb57600080fd5b6102c65a03f115156104fc57600080fd5b50505060405180519050600160a060020a031663ac3910a26000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b151561054b57600080fd5b6102c65a03f1151561055c57600080fd5b505050604051805193506000925060019150505b82600160a060020a0316635eb57b486000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b15156105b657600080fd5b6102c65a03f115156105c757600080fd5b505050604051805190508110156106d057600554600160a060020a031663c6e36a32868460006040516020015260405160e060020a63ffffffff851602815260048101929092526024820152604401602060405180830381600087803b151561062f57600080fd5b6102c65a03f1151561064057600080fd5b5050506040518051600554909150600160a060020a031663c6e36a32878460006040516020015260405160e060020a63ffffffff851602815260048101929092526024820152604401602060405180830381600087803b15156106a257600080fd5b6102c65a03f115156106b357600080fd5b5050506040518051905011156106c7578091505b5b600101610570565b8093505b505050919050565b600054600160a060020a038281169116145b919050565b600354600160a060020a031681565b600054600160a060020a031681565b600454600160a060020a0316637910867b8360006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b151561076257600080fd5b6102c65a03f1151561077357600080fd5b50505060405180519050151561078857600080fd5b600154600160a060020a031663adfaa72e3360006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156107e157600080fd5b6102c65a03f115156107f257600080fd5b50505060405180519050151561080757600080fd5b6004548190600160a060020a031663c7f758a88460006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b151561085a57600080fd5b6102c65a03f1151561086b57600080fd5b50505060405180519050600160a060020a031663ac3910a26000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b15156108ba57600080fd5b6102c65a03f115156108cb57600080fd5b50505060405180519050600160a060020a0316635eb57b486000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b151561091a57600080fd5b6102c65a03f1151561092b57600080fd5b5050506040518051905011151561094157600080fd5b600554600254600160a060020a03918216916398e434dd918591339186911663faeae2f18360006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156109ad57600080fd5b6102c65a03f115156109be57600080fd5b5050506040518051905060405160e060020a63ffffffff87160281526004810194909452600160a060020a03909216602484015260448301526064820152608401600060405180830381600087803b1515610a1857600080fd5b6102c65a03f11515610a2957600080fd5b5050505b5050565b600154600160a060020a031663747434443360006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610a8a57600080fd5b6102c65a03f11515610a9b57600080fd5b505050604051805190501515610ab057600080fd5b600454600160a060020a031663b759f9548260405160e060020a63ffffffff84160281526004810191909152602401600060405180830381600087803b1515610af857600080fd5b6102c65a03f11515610b0957600080fd5b5050505b50565b600554600160a060020a031681565b600254600554600160a060020a039182169163d4a8dd98911663f8ce560a8460006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b1515610b7d57600080fd5b6102c65a03f11515610b8e57600080fd5b5050506040518051905060006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b1515610bd757600080fd5b6102c65a03f11515610be857600080fd5b505050604051805190501515610bfd57600080fd5b600454600160a060020a031663c7f758a88260006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b1515610c4e57600080fd5b6102c65a03f11515610c5f57600080fd5b50505060405180519050600160a060020a031663902cfb88610c8083610492565b60405160e060020a63ffffffff84160281526004810191909152602401600060405180830381600087803b1515610af857600080fd5b6102c65a03f11515610b0957600080fd5b5050505b50565b610cd7336106dc565b1515610ce257600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b600454600090600160a060020a031663c7f758a883836040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b1515610d6257600080fd5b6102c65a03f11515610d7357600080fd5b5050506040518051915050600160a060020a038116635051a5ec6000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b1515610dc457600080fd5b6102c65a03f11515610dd557600080fd5b505050604051805190501515610dea57600080fd5b80600160a060020a03166378b903376000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b1515610e3057600080fd5b6102c65a03f11515610e4157600080fd5b505050604051805190501515610e5657600080fd5b80600160a060020a031663614619546040518163ffffffff1660e060020a028152600401600060405180830381600087803b1515610e9357600080fd5b6102c65a03f11515610ea457600080fd5b5050507f712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f8260405190815260200160405180910390a15b50505600a165627a7a72305820e2f3cdeb00a4e59f503e7b15388020e7772f88993a65fcf55b0042cb166733a40029",
		"networks": {},
		"schema_version": "0.0.5",
		"updated_at": 1507660313054
	},
	{
		"contract_name": "Version",
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
				"name": "getOrganization",
				"outputs": [
					{
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
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
				"outputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
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
				"name": "upgradeOrganization",
				"outputs": [],
				"payable": false,
				"type": "function"
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
		"unlinked_binary": "0x6060604052341561000f57600080fd5b5b61216d8061001f6000396000f300606060405263ffffffff60e060020a6000350416633c5b82ff81146100505780634526f69014610068578063b224ea231461009a578063c1292cc3146100d1578063dfe5b68c146100f6575b600080fd5b341561005b57600080fd5b61006660043561010e565b005b341561007357600080fd5b61007e60043561013b565b604051600160a060020a03909116815260200160405180910390f35b34156100a557600080fd5b6100bf600160a060020a0360043581169060243516610159565b60405190815260200160405180910390f35b34156100dc57600080fd5b6100bf61036a565b60405190815260200160405180910390f35b341561010157600080fd5b610066600435610370565b005b6000818152600160205260409020805473ffffffffffffffffffffffffffffffffffffffff191690555b50565b600081815260016020526040902054600160a060020a03165b919050565b60008060008060006101696104b4565b93506101736104c3565b604051809103906000f080151561018957600080fd5b92506101936104d3565b604051809103906000f08015156101a957600080fd5b91506101b36104e3565b604051809103906000f08015156101c957600080fd5b838389896101d56104f3565b600160a060020a039586168152938516602085015291841660408085019190915290841660608401529216608082015260a0019051809103906000f080151561021d57600080fd5b905082600160a060020a031663f2fde38b8260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401600060405180830381600087803b151561026d57600080fd5b6102c65a03f1151561027e57600080fd5b50505081600160a060020a031663f2fde38b8260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401600060405180830381600087803b15156102cf57600080fd5b6102c65a03f115156102e057600080fd5b5050507f0ce81df677347dd4476e2f5358d95e39aa67d12bfbb33cb7eb78e5b3140abb3a8482604051918252600160a060020a031660208201526040908101905180910390a16000848152600160205260409020805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03831617905592935083925b5050505092915050565b60005481565b60008181526001602052604080822054600160a060020a03169190819081908490636c70bee990839051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b15156103cc57600080fd5b6102c65a03f115156103dd57600080fd5b5050506040518051935050600160a060020a0384166302f89be26000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b151561042e57600080fd5b6102c65a03f1151561043f57600080fd5b5050506040518051925050600160a060020a03841663da1bcdf06000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b151561049057600080fd5b6102c65a03f115156104a157600080fd5b50505060405180519150505b5050505050565b60008054600101908190555b90565b60405161046d8061050483390190565b6040516103648061097183390190565b60405161045080610cd583390190565b60405161101d8061112583390190560060606040525b60008054600160a060020a03191633600160a060020a03161790555b5b61043c806100316000396000f300606060405236156100805763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632f54bf6e811461008557806352c28fab146100b85780637910867b146100ef5780638da5cb5b14610119578063b759f95414610148578063c7f758a814610160578063f2fde38b14610192575b600080fd5b341561009057600080fd5b6100a4600160a060020a03600435166101b3565b604051901515815260200160405180910390f35b34156100c357600080fd5b6100dd600160a060020a03600435811690602435166101ca565b60405190815260200160405180910390f35b34156100fa57600080fd5b6100a4600435610285565b604051901515815260200160405180910390f35b341561012457600080fd5b61012c6102b4565b604051600160a060020a03909116815260200160405180910390f35b341561015357600080fd5b61015e6004356102c3565b005b341561016b57600080fd5b61012c60043561030d565b604051600160a060020a03909116815260200160405180910390f35b341561019d57600080fd5b61015e600160a060020a0360043516610345565b005b600054600160a060020a038281169116145b919050565b60008060006101d8336101b3565b15156101e357600080fd5b60018054925082906101f790828101610386565b50600180548390811061020657fe5b906000526020600020906002020160005b50805460018201805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038881169190911790915574ffffffffffffffffffffffffffffffffffffffff0019909116610100918816919091021760ff19168155919250829190505b5b505092915050565b600060018281548110151561029657fe5b906000526020600020906002020160005b505460ff1690505b919050565b600054600160a060020a031681565b6102cc336101b3565b15156102d757600080fd5b600180828154811015156102e757fe5b906000526020600020906002020160005b50805460ff19169115159190911790555b5b50565b600060018281548110151561031e57fe5b906000526020600020906002020160005b5060010154600160a060020a031690505b919050565b61034e336101b3565b151561035957600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b8154818355818115116103b2576002028160020283600052602060002091820191016103b291906103b8565b5b505050565b61040d91905b8082111561040957805474ffffffffffffffffffffffffffffffffffffffffff1916815560018101805473ffffffffffffffffffffffffffffffffffffffff191690556002016103be565b5090565b905600a165627a7a72305820959d96e5ee9633abe4b851c1c68f36481aeb0d3e3ba361d9f339abcc76569132002960606040525b60008054600160a060020a03191633600160a060020a03161790555b5b610333806100316000396000f300606060405236156100805763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632f54bf6e81146100855780635277b4ae146100b85780638da5cb5b146100ee57806398e434dd1461011d578063c6e36a3214610147578063f2fde38b14610172578063f8ce560a14610193575b600080fd5b341561009057600080fd5b6100a4600160a060020a03600435166101bb565b604051901515815260200160405180910390f35b34156100c357600080fd5b6100a4600435600160a060020a03602435166101d2565b604051901515815260200160405180910390f35b34156100f957600080fd5b610101610202565b604051600160a060020a03909116815260200160405180910390f35b341561012857600080fd5b610145600435600160a060020a0360243516604435606435610211565b005b341561015257600080fd5b61016060043560243561028e565b60405190815260200160405180910390f35b341561017d57600080fd5b610145600160a060020a03600435166102b1565b005b341561019e57600080fd5b6101606004356102f2565b60405190815260200160405180910390f35b600054600160a060020a038281169116145b919050565b6000828152600160209081526040808320600160a060020a038516845260020190915290205460ff165b92915050565b600054600160a060020a031681565b600061021c336101bb565b151561022757600080fd5b61023185856101d2565b1561023b57600080fd5b5060008481526001602081815260408084208054860181558685528084018352818520805487019055600160a060020a038816855260028101909252909220805460ff191690911790555b5b5050505050565b600082815260016020818152604080842085855290920190529020545b92915050565b6102ba336101bb565b15156102c557600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b6000818152600160205260409020545b9190505600a165627a7a7230582033e90f22bc41ccf32eba4d90b84501d424ac60bfeb675d84cddf78a2371bf2cb002960606040525b60008054600160a060020a03191633600160a060020a03161790555b5b61041f806100316000396000f300606060405236156100a15763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631785f53c81146100a65780631e5e23d9146100c757806324d7806c146100df578063273f4940146101125780632f54bf6e1461012d578063704802751461016057806381fa7382146101815780638da5cb5b146101995780638eaa6ac0146101c8578063f2fde38b146101f0575b600080fd5b34156100b157600080fd5b6100c5600160a060020a0360043516610211565b005b34156100d257600080fd5b6100c560043561024a565b005b34156100ea57600080fd5b6100fe600160a060020a0360043516610279565b604051901515815260200160405180910390f35b341561011d57600080fd5b6100c560043560243561029b565b005b341561013857600080fd5b6100fe600160a060020a0360043516610306565b604051901515815260200160405180910390f35b341561016b57600080fd5b6100c5600160a060020a036004351661031d565b005b341561018c57600080fd5b6100c560043561035c565b005b34156101a457600080fd5b6101ac61038e565b604051600160a060020a03909116815260200160405180910390f35b34156101d357600080fd5b6101de60043561039d565b60405190815260200160405180910390f35b34156101fb57600080fd5b6100c5600160a060020a03600435166103b2565b005b61021a33610306565b151561022557600080fd5b600160a060020a0381166000908152600160205260409020805460ff191690555b5b50565b61025333610306565b151561025e57600080fd5b6000818152600360205260409020805460ff191690555b5b50565b600160a060020a03811660009081526001602052604090205460ff165b919050565b816102a533610306565b806102b457506102b433610279565b5b15156102c057600080fd5b6102c933610306565b806102e3575060008181526003602052604090205460ff16155b15156102ee57600080fd5b60008381526002602052604090208290555b5b505050565b600054600160a060020a038281169116145b919050565b61032633610306565b151561033157600080fd5b600160a060020a0381166000908152600160208190526040909120805460ff191690911790555b5b50565b61036533610306565b151561037057600080fd5b6000818152600360205260409020805460ff191660011790555b5b50565b600054600160a060020a031681565b6000818152600260205260409020545b919050565b6103bb33610306565b15156103c657600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b505600a165627a7a723058209c82e9344c7223275ed2d0412b0ade2bd5426f77a6f4122488bd97c5e1bf7a7a00296060604052341561000f57600080fd5b60405160a08061101d83398101604052808051919060200180519190602001805191906020018051919060200180519150505b5b60008054600160a060020a03191633600160a060020a03161790555b60038054600160a060020a031916600160a060020a03871617905560408051908101604052600160a060020a03808416825282166020820152600181518154600160a060020a031916600160a060020a039190911617815560208201516001919091018054600160a060020a0319908116600160a060020a039384161790915560048054821688841617905560058054909116918616919091179055505b50505050505b610f0b806101126000396000f3006060604052361561009e5763ffffffff60e060020a6000350416630126795181146100a357806302f89be2146100c45780630dca7ed8146100f35780632f54bf6e1461011b5780636c70bee91461014e5780638da5cb5b1461017d578063b384abef146101ac578063b759f954146101c7578063da1bcdf0146101df578063ed8b6b311461020e578063f2fde38b14610226578063fe0d94c114610247575b600080fd5b34156100ae57600080fd5b6100c2600160a060020a036004351661025f565b005b34156100cf57600080fd5b6100d7610483565b604051600160a060020a03909116815260200160405180910390f35b34156100fe57600080fd5b610109600435610492565b60405190815260200160405180910390f35b341561012657600080fd5b61013a600160a060020a03600435166106dc565b604051901515815260200160405180910390f35b341561015957600080fd5b6100d76106f3565b604051600160a060020a03909116815260200160405180910390f35b341561018857600080fd5b6100d7610702565b604051600160a060020a03909116815260200160405180910390f35b34156101b757600080fd5b6100c2600435602435610711565b005b34156101d257600080fd5b6100c2600435610a31565b005b34156101ea57600080fd5b6100d7610b10565b604051600160a060020a03909116815260200160405180910390f35b341561021957600080fd5b6100c2600435610b1f565b005b341561023157600080fd5b6100c2600160a060020a0360043516610cce565b005b341561025257600080fd5b6100c2600435610d0f565b005b6001546000908190600160a060020a03166342b4632e33836040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156102bc57600080fd5b6102c65a03f115156102cd57600080fd5b5050506040518051905015156102e257600080fd5b600454600160a060020a03166352c28fab338560006040516020015260405160e060020a63ffffffff8516028152600160a060020a03928316600482015291166024820152604401602060405180830381600087803b151561034357600080fd5b6102c65a03f1151561035457600080fd5b5050506040518051600154909250600160a060020a0316905063286399058260006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b15156103b257600080fd5b6102c65a03f115156103c357600080fd5b50505060405180519050151561043057600454600160a060020a031663b759f9548260405160e060020a63ffffffff84160281526004810191909152602401600060405180830381600087803b151561041b57600080fd5b6102c65a03f1151561042c57600080fd5b5050505b33600160a060020a03167f7e5361edd70248cf0a9e88723fe06b63fa8cad3a111b246c13fe2be1c5318f458285604051918252600160a060020a031660208201526040908101905180910390a25b505050565b600454600160a060020a031681565b600454600090819081908190600160a060020a031663c7f758a886836040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b15156104eb57600080fd5b6102c65a03f115156104fc57600080fd5b50505060405180519050600160a060020a031663ac3910a26000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b151561054b57600080fd5b6102c65a03f1151561055c57600080fd5b505050604051805193506000925060019150505b82600160a060020a0316635eb57b486000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b15156105b657600080fd5b6102c65a03f115156105c757600080fd5b505050604051805190508110156106d057600554600160a060020a031663c6e36a32868460006040516020015260405160e060020a63ffffffff851602815260048101929092526024820152604401602060405180830381600087803b151561062f57600080fd5b6102c65a03f1151561064057600080fd5b5050506040518051600554909150600160a060020a031663c6e36a32878460006040516020015260405160e060020a63ffffffff851602815260048101929092526024820152604401602060405180830381600087803b15156106a257600080fd5b6102c65a03f115156106b357600080fd5b5050506040518051905011156106c7578091505b5b600101610570565b8093505b505050919050565b600054600160a060020a038281169116145b919050565b600354600160a060020a031681565b600054600160a060020a031681565b600454600160a060020a0316637910867b8360006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b151561076257600080fd5b6102c65a03f1151561077357600080fd5b50505060405180519050151561078857600080fd5b600154600160a060020a031663adfaa72e3360006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156107e157600080fd5b6102c65a03f115156107f257600080fd5b50505060405180519050151561080757600080fd5b6004548190600160a060020a031663c7f758a88460006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b151561085a57600080fd5b6102c65a03f1151561086b57600080fd5b50505060405180519050600160a060020a031663ac3910a26000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b15156108ba57600080fd5b6102c65a03f115156108cb57600080fd5b50505060405180519050600160a060020a0316635eb57b486000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b151561091a57600080fd5b6102c65a03f1151561092b57600080fd5b5050506040518051905011151561094157600080fd5b600554600254600160a060020a03918216916398e434dd918591339186911663faeae2f18360006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156109ad57600080fd5b6102c65a03f115156109be57600080fd5b5050506040518051905060405160e060020a63ffffffff87160281526004810194909452600160a060020a03909216602484015260448301526064820152608401600060405180830381600087803b1515610a1857600080fd5b6102c65a03f11515610a2957600080fd5b5050505b5050565b600154600160a060020a031663747434443360006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b1515610a8a57600080fd5b6102c65a03f11515610a9b57600080fd5b505050604051805190501515610ab057600080fd5b600454600160a060020a031663b759f9548260405160e060020a63ffffffff84160281526004810191909152602401600060405180830381600087803b1515610af857600080fd5b6102c65a03f11515610b0957600080fd5b5050505b50565b600554600160a060020a031681565b600254600554600160a060020a039182169163d4a8dd98911663f8ce560a8460006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b1515610b7d57600080fd5b6102c65a03f11515610b8e57600080fd5b5050506040518051905060006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b1515610bd757600080fd5b6102c65a03f11515610be857600080fd5b505050604051805190501515610bfd57600080fd5b600454600160a060020a031663c7f758a88260006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b1515610c4e57600080fd5b6102c65a03f11515610c5f57600080fd5b50505060405180519050600160a060020a031663902cfb88610c8083610492565b60405160e060020a63ffffffff84160281526004810191909152602401600060405180830381600087803b1515610af857600080fd5b6102c65a03f11515610b0957600080fd5b5050505b50565b610cd7336106dc565b1515610ce257600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b600454600090600160a060020a031663c7f758a883836040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b1515610d6257600080fd5b6102c65a03f11515610d7357600080fd5b5050506040518051915050600160a060020a038116635051a5ec6000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b1515610dc457600080fd5b6102c65a03f11515610dd557600080fd5b505050604051805190501515610dea57600080fd5b80600160a060020a03166378b903376000604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b1515610e3057600080fd5b6102c65a03f11515610e4157600080fd5b505050604051805190501515610e5657600080fd5b80600160a060020a031663614619546040518163ffffffff1660e060020a028152600401600060405180830381600087803b1515610e9357600080fd5b6102c65a03f11515610ea457600080fd5b5050507f712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f8260405190815260200160405180910390a15b50505600a165627a7a72305820e2f3cdeb00a4e59f503e7b15388020e7772f88993a65fcf55b0042cb166733a40029a165627a7a72305820f6bcd40b7e47d1214258b98c35210ef9e7e730f659fa18827199854662fcbb7d0029",
		"networks": {
			"1502545170897": {
				"events": {
					"0x744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce4638": {
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "id",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "congress",
								"type": "address"
							}
						],
						"name": "CongressCreated",
						"type": "event"
					}
				},
				"links": {},
				"address": "0x0027e796c509f272ffa24f2cbbdacf23a8a75282",
				"updated_at": 1502576750702
			},
			"1502578633232": {
				"events": {
					"0x744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce4638": {
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "id",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "congress",
								"type": "address"
							}
						],
						"name": "CongressCreated",
						"type": "event"
					}
				},
				"links": {},
				"address": "0x9afa76d41f74a2aed372ea1b7875c4a274181ad3",
				"updated_at": 1502578797559
			},
			"1502624886463": {
				"events": {
					"0x744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce4638": {
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "id",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "congress",
								"type": "address"
							}
						],
						"name": "CongressCreated",
						"type": "event"
					}
				},
				"links": {},
				"address": "0x7c8b66bcc9e2654d9c5bf7c0eda1c6c10a9d4335",
				"updated_at": 1502626766382
			},
			"1502627131773": {
				"events": {
					"0x744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce4638": {
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "id",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "congress",
								"type": "address"
							}
						],
						"name": "CongressCreated",
						"type": "event"
					}
				},
				"links": {},
				"address": "0xa312d5a2cb26dd2da28ee34c6e6793949201868b",
				"updated_at": 1502627215792
			},
			"1503074695140": {
				"events": {
					"0x744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce4638": {
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "id",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "congress",
								"type": "address"
							}
						],
						"name": "CongressCreated",
						"type": "event"
					}
				},
				"links": {},
				"address": "0x3a3631fc15d14847f43467992af0d92d1bd95a0e",
				"updated_at": 1503074785504
			},
			"1503078631802": {
				"events": {
					"0x744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce4638": {
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "id",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "congress",
								"type": "address"
							}
						],
						"name": "CongressCreated",
						"type": "event"
					}
				},
				"links": {},
				"address": "0x2188000c0b1c21e138796358dacc434cae4363ba",
				"updated_at": 1503078787430
			},
			"1503702344005": {
				"events": {
					"0x744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce4638": {
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "id",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "congress",
								"type": "address"
							}
						],
						"name": "CongressCreated",
						"type": "event"
					}
				},
				"links": {},
				"address": "0xb34f753d98f0fd2a66035540b206a00fac4a59af",
				"updated_at": 1503751267511
			},
			"1503751947916": {
				"events": {
					"0x744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce4638": {
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "id",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "congress",
								"type": "address"
							}
						],
						"name": "CongressCreated",
						"type": "event"
					}
				},
				"links": {},
				"address": "0x6c3387b096f54d3bc58c8e9edc0b2d0d9730fbb1",
				"updated_at": 1503751983222
			},
			"1503754088727": {
				"events": {
					"0x744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce4638": {
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "id",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "congress",
								"type": "address"
							}
						],
						"name": "CongressCreated",
						"type": "event"
					}
				},
				"links": {},
				"address": "0xeb64cb1e2488fe06eb5c7051389d3eebe71ce396",
				"updated_at": 1503754123783
			},
			"1503851789336": {
				"events": {
					"0x744f5e1b676d0f74c51bf621362afd8565040a8f817c91733284d72c44ce4638": {
						"anonymous": false,
						"inputs": [
							{
								"indexed": false,
								"name": "id",
								"type": "uint256"
							},
							{
								"indexed": false,
								"name": "congress",
								"type": "address"
							}
						],
						"name": "CongressCreated",
						"type": "event"
					}
				},
				"links": {},
				"address": "0x69672df497da12ac42a0c5a59f83f58d571b8202",
				"updated_at": 1503852061433
			}
		},
		"schema_version": "0.0.5",
		"updated_at": 1507660313055
	}
];
/* harmony export (immutable) */ __webpack_exports__["a"] = data;


/***/ })
/******/ ]);
});