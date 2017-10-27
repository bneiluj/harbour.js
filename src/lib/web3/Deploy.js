import ConnectionModel from './ConnectionModel';

export default class Deploy {

    /**
     * @param {Object} connectionModel
     */
    constructor(connectionModel) {
        if (!(connectionModel instanceof ConnectionModel)) {
            throw new Error('Argument web3Connection should be an instance of ConnectionModel');
        }
        this.connectionModel = connectionModel;
        this.web3 = this.connectionModel.getWeb3();
    }

    /**
     * @param {array} contractMap 
     * @return {Object}
     */
    deployContracts(contractMap) {
        let self = this;
        return new Promise((resolve, reject) => {
            let contractAddress = [];
            contractMap.forEach((contract, key) => {
                self.deploy(contract.bytecode, contract.arguments).then((result) => {
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
     * @return {Promise}
     */
    deploy(bytecode, deployArguments, gas, gasPrice) {
        return new this.web3.eth.sendTransaction(
            {
                from: this.connectionModel.getFrom(),
                data: bytecode,
                gas: gas,
                gasPrice: gasPrice,
                deployArguments 
            }
        );
    }

}