export default class Deploy {

    constructor(from, gas, gasPrice) {
        this.from = from;
        this.gas = gas;
        this.gasPrice = gasPrice;
    }

    /**
     * 
     * @param {*} gas 
     * @param {*} gasPrice 
     * @param {*} contractsMap 
     */
    deployContracts(contractMap) {
        new Promise(function(resolce, reject){    
            let contractAddress = [];
            contractsMap.forEach((contract, key) => {
                contractObject.deploy(contract.bytecode, contract.arguments).on('receipt', function(receipt){
                    contractAddress.push(receipt.contractAddress);
                    if(key == contractMap.length) {
                        resolve(contractAddress);
                    }
                }).on('error', function(error) {
                    reject(error);
                });
            });
        });
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
        return this.web3.eth.sendTransaction({
            from: this.from,
            data: bytecode,
            gas: this.gas,
            gasPrice: this.gasPrice,
            deployArguments
        });
    }

}