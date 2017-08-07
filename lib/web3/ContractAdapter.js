
export default class ContractAdapter {

    /**
     * @param {Web3} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    construct(web3, abi, address, gasPrice, from) {
        this.address = address;
        this.from = from;
        this.contract = new web3.eth.Contract(
            this.abi,
            this.address,
            {
                gasPrice:gasPrice,
                from: this.from
            }
        );
    }

    /**
     * Run function from contract
     * @param {string} methodName 
     * @param {params} arguments 
     * @return \Provide
     */
    getMethod(methodName, ...arguments) {
        return this.contract.methods[methodName](arguments);
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
     * @param {params} arguments 
     * @return \Provide
     */
    estimateGas(methodName, ...arguments) {
        return this.getMethod(methodNamename, ...arguments).estimateGas({from: this.from});
    }

    /**
     * Call method on contract
     * @param {string} methodName 
     * @param {params} arguments
     * @return \Provide 
     */
    callMethod(methodName, ...arguments) {
        return this.getMethod(methodNamename, ...arguments).call({from: this.from});
    }

    /**
     * Send transaction to the contract an run an method
     * @param {string} methodName 
     * @param {params} arguments 
     * @return \Provide
     */
    sendTransaction(methodName, ...arguments) {
        return this.getMethod(methodName, ...arguments).send({from: this.from});
    }

    /**
     * 
     * @param {string} methodName 
     * @param {params} arguments 
     * @return \Provide
     */
    encodeAbi(methodName, ...arguments) {
        return this.getMethod(methodName, ...arguments).encodeAbi();
    }

    /**
     * Clone contract and return new contractAdapter instance
     * @return ContractAdapter
     */
    clone() {
        let clonedContract = this.contract.clone();
        let contractAdapterClone = Object.assign({}, this);
        contractAdapterClone.contract = clonedContract;
        return contractAdapterClone;
    }

    /**
     * Deploy new contract on the blockchain
     * @param {number} gasPrice 
     * @param {number} gas 
     * @param {string} data 
     * @param {params} arguments
     * @return \Provide
     */
    deploy(gasPrice, gas, data, arguments) {
        return this.contract.deploy({
            data: data,
            arguments: arguments
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
