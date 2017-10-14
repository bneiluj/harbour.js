import ConnectionModel from './ConnectionModel';

export default class Contract {

    /**
     * @param web3Connection
     * @param contractABI
     * @param versionAddress
     */
    constructor(web3Connection, contractABI, versionAddress) {
        if (!(web3Connection instanceof ConnectionModel)) {
            throw new Error('Argument web3Connection should be an instance of ConnectionModel');
        }
            
        this.from = web3Connection.getFrom();
        this.abi = contractABI;
        this.web3 = web3Connection.getWeb3();
        this.contract = new this.web3.eth.Contract(
            this.abi,
            versionAddress
        );
        this.address = this.contract._address;
    }

    /**
     * Execute method and decide if it is to vall or send as transaction
     * @param methodName
     * @param methodArguments
     * @returns {Object}
     */
    executeMethod(methodName, methodArguments) {
        let methods = this.abi.filter(function(method) { return method.type === "functions" });
        let method = methods.filter(function(method) { return method.name === methodName })[0];
        if (method.constant) {
            return this.callMethod(methodName, methodArguments);
        }

        return this.sendTransaction(methodName, methodArguments);
    }

    /**
     * @param methodName
     * @returns {Object}
     */
    getMethod(methodName) {
        return this.contract.methods[methodName];
    }

    /**
     * Run function from contract
     * @param {string} methodName 
     * @param {params} methodArguments 
     * @return {Object}
     */
    getMethodWithArguments(methodName,  methodArguments) {
        return this.contract.methods[methodName].apply(this.contract, methodArguments);
    }

    /**
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
        return this.getMethodWithArguments(methodNamename, methodArguments).estimateGas();
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
     * Send transaction to the contract an run an method
     * @param {string} methodName 
     * @param {array} methodArguments 
     * @return {Object}
     */
    sendTransaction(methodName, methodArguments) {
        return this.getTransactionReturnValues(this.getMethod(methodName, methodArguments).send({
            from: this.from,
            gas: 4700000,
            gasPrice: 1000000
        }));
    }

    /**
     * 
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
     * Deploy new contract on the blockchain
     * @param {number} gasPrice 
     * @param {number} gas 
     * @param {string} bytecode 
     * @param {array} deployArguments
     * @return {Object} 
     */
    deploy(bytecode, deployArguments) {
        return this.contract.deploy({data: bytecode, arguments: deployArguments}).send({
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
        return this.contract.once(eventName,options);
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
        return this.contract.getPastEvents(eventName,options);
    }

    /**
     * Returns the events returnValues as promise from the transaction
     * @param {Object} transactionPromise 
     * @return {Object}
     */
    getTransactionReturnValues(transactionPromise) {
        return new Promise(function(resolve, reject) {
            transactionPromise.then(function(transaction) {
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
