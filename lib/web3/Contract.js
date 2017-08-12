import ConnectionModel from './models/ConnectionModel';

export default class Contract {

    /**
     * @param {Web3} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    constructor(web3Connection) {
        if (!(web3Connection instanceof ConnectionModel)) {
            throw new Error('Argument web3Connection should be an instance of ConnectionModel');
        }
            
        this.from = web3Connection.getFrom();
        this.abi = web3Connection.getAbi();
        this.web3 = web3Connection.getWeb3();
        this.contract = new web3.eth.Contract(
            this.abi,
            web3Connection.getAddress()
        );
        this.address = this.contract._address;
    }

    /**
     * Run function from contract
     * @param {string} methodName 
     * @param {params} methodArguments 
     * @return {Object}
     */
    getMethod(methodName,  methodArguments) {
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
        return this.getMethod(methodName, methodArguments).send({from: this.from});
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
        })
        .send({
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
}
