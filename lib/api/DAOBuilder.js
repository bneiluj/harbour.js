export default class DAOBuilder {

    /**
     * @param {Obj} contracAdaptertMap 
     * @param {number} gasPrice 
     * @param {number} gas 
     */
    constructor(contracAdaptertMap, gasPrice, gas) {
        this.contracAdaptertMap = contractMap;
    }

    /**
     * @returns {Object} ContractAdapterMap
     */
    create() {
        var newContractAdapterMap = new Map();
        this.contracAdaptertMap.forEach(function(contractAdapter){
            newContractAdapterMap.set(contractAdapter.getName(), contractAdapter.deploy(
                gasPrice,
                gas,
                contract.data,
                deployArguments
            ));
        });
        return newContractAdapterMap;
    }
}