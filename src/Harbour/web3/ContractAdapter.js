export default class ContractAdapter {
    construct(web3, abi, address, gasPrice, from) {
        this.address = address;
        this.from = from;
        this.contract = web3.eth.Contract(
            this.abi,
            this.address,
            {
                gasPrice:gasPrice,
                from: this.from
            }
        );
    }

    getMethod(methodName, ...arguments) {
        return this.contract.methods[name](arguments);
    }

    getOptions() {
        return this.contract.options
    }

    getOption(methodName) {
        return this.contract.options[name]
    }

    estimateGas(methodName, ...arguments) {
        return this.getMethod(name, ...arguments).estimateGas({from: this.from});
    }

    callMethod(methodName, ...arguments) {
        return this.getMethod(name, ...arguments).call({from: this.from});
    }

    sendTransaction(methodName, ...arguments) {
        return this.getMethod(...arguments).send({from: this.from});
    }

    encodeAbi(methodName) {
        return this.getMethod(methodName).encodeAbi();
    }

    clone() {
        return this.contract.clone()
    }

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

    listenForEvent(eventName, options = undefined) {
        return this.contract.events[eventName](options);
    }

    listenOnceForEvent(eventName, options = undefined) {
        return this.contract.once(eventName,options);
    }

    listenForAllEvents(options = undefined) {
        return this.contract.allEvents();
    }

    getPastEvents(eventName, options) {
        return this.contract.getPastEvents(eventName,options);
    }

    getAvaibleEvents() {
        // research
    }
}
