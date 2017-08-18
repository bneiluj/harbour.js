import ConnectionModel from './models/ConnectionModel';

export default class Deploy {

    /**
     * @param {Object} connectionModel 
     * @param {string} from 
     * @param {number} gas 
     * @param {number} gasPrice 
     */
    constructor(connectionModel, from, gas, gasPrice) {
        if (!(connectionModel instanceof ConnectionModel)) {
            throw new Error('Argument web3Connection should be an instance of ConnectionModel');
        }
        this.web3 = connectionModel.getWeb3();
        this.from = from;
        this.gas = gas;
        this.gasPrice = gasPrice;
    }

    /**
     * @param {array} contractMap 
     * @return {Object}
     */
    deployContracts(contractMap) {
        let self = this;
        let contractAddress = [];
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
     * @return {Object} 
     */
    deploy(bytecode, deployArguments) {
        return new this.web3.eth.sendTransaction(
            {
                from: this.from,
                data: bytecode,
                gas: this.gas,
                gasPrice: this.gasPrice,
                deployArguments 
            }
        );
    }

}