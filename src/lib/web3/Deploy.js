export default class Deploy {

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