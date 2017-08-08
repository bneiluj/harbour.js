
export default class ContractAdapter {

    /**
     * @param {Web3} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    constructor(web3, abi, address, gasPrice = undefined, from = undefined) {
        this.from = from;
        this.abi = abi;
        this.contract = new web3.eth.Contract(
            this.abi,
            address,
            {
                gasPrice:gasPrice,
                from: this.from
            }
        );
        this.address = this.contract._address;
    }

    /**
     * Run function from contract
     * @param {string} methodName 
     * @param {params} contractArguments 
     * @return \Provide
     */
    getMethod(methodName, contractArguments) {
        this.contract.methods[methodName].apply(this.contract, contractArguments);
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
     * @param {array} contractArguments 
     * @return \Provide
     */
    estimateGas(methodName, contractArguments) {
        return this.getMethod(methodNamename, contractArguments).estimateGas({from: this.from});
    }

    /**
     * Call method on contract
     * @param {string} methodName 
     * @param {array} contractArguments
     * @return \Provide 
     */
    callMethod(methodName, contractArguments) {
        return this.getMethod(methodNamename, contractArguments).call({from: this.from});
    }

    /**
     * Send transaction to the contract an run an method
     * @param {string} methodName 
     * @param {array} contractArguments 
     * @return \Provide
     */
    sendTransaction(methodName, contractArguments) {
        return this.getMethod(methodName, contractArguments).send({from: this.from});
    }

    /**
     * 
     * @param {string} methodName 
     * @param {array} contractArguments 
     * @return \Provide
     */
    encodeAbi(methodName, contractArguments) {
        return this.getMethod(methodName, contractArguments).encodeAbi();
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
     * @param {array} contractArguments
     * @return \Provide
     */
    deploy(gasPrice, gas, data, contractArguments) {
        return this.contract.deploy({
            data: data,
            arguments: contractArguments
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

    getAvaibleEvents() {
        // research
    }
}
