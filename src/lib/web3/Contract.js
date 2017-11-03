export default class Contract {

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
				return method.type === "functions"
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
		return this.contract.methods[methodName].apply(this.contract, methodArguments);
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
		return this.getTransactionReturnValues(this.getMethod(methodName, methodArguments).send({
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
