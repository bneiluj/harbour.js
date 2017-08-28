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
        return new Promise(function(resolve, reject) {
            let contractAddress = [];
            contractMap.forEach(function(contract, key){
                self.deploy(contract.bytecode, contract.arguments);
            });
        });
    }

    /**
     * @param {string} bytecode 
     * @param {array} deployArguments
     * @return {Promise} 
     */
    deploy(bytecode, deployArguments) {
        web3.eth.sendTransaction(
            {
                from: this.from,
                data: bytecode,
                gas: this.gas,
                gasPrice: this.gasPrice,
                deployArguments 
            },
            function(error, hash) {
                console.log(error);
                console.log(hash);
            }
        );
    }

}