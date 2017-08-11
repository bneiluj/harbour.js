
export default class ContractAdapter {

    /**
     * @param {Web3} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    constructor(web3Connection) {
        if (!web3Connection instanceof ContractConnectionModel) {
            throw 'Argument web3Connection should be an instance of ContractConnectionModel';
        }
        this.from = web3Connection.getFrom();
        this.abi = web3Connection.getAbi();
        this.contract = new web3Connection.getWeb3().eth.Contract(
            this.abi,
            web3Connection.getAddress(),
            {
                gasPrice: web3Connection.getGasPrice(),
                from: this.from
            }
        );
        this.address = this.contract._address;
    }

    /**
     * Run function from contract
     * @param {string} methodName 
     * @param {params} methodArguments 
     * @return \Provide
     */
    getMethod(methodName,  methodArguments) {
        return this.contract.methods[methodName].apply(this.contract, methodArguments);
    }

    /**
    * @return \Provide 
    */
    getOptions() {
        return this.contract.options
    }

    /**
     * Get Contract option
     * @param {string} optionName 
     * @return \Provide
     */
    getOption(optionName) {
        return this.contract.options[optionName]
    }

    /**
     * Get estimate gas for method
     * @param {string} methodName 
     * @param {array} methodArguments 
     * @return \Provide
     */
    estimateGas(methodName, methodArguments) {
        return this.getMethod(methodNamename, methodArguments).estimateGas({from: this.from});
    }

    /**
     * Call method on contract
     * @param {string} methodName 
     * @param {array} methodArguments
     * @return \Provide 
     */
    callMethod(methodName, methodArguments) {
        return this.getMethod(methodName, methodArguments).call({from: this.from});
    }

    /**
     * Send transaction to the contract an run an method
     * @param {string} methodName 
     * @param {array} methodArguments 
     * @return \Provide
     */
    sendTransaction(methodName, methodArguments) {
        return this.getMethod(methodName, methodArguments).send({from: this.from});
    }

    /**
     * 
     * @param {string} methodName 
     * @param {array} methodArguments 
     * @return \Provide
     */
    encodeAbi(methodName, methodArguments) {
        return this.getMethod(methodName, methodArguments).encodeAbi();
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
     * @param {array} methodArguments
     * @return \Provide
     */
    deploy(gasPrice, gas, data, methodArguments) {
        return this.contract.deploy({
            data: data,
            arguments: methodArguments
        })
        .send({
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
        return this.contract.once(eventName,options);
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
        return this.contract.getPastEvents(eventName,options);
    }

    
}
