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
   * @param {number} gas
   * @param {number} gasPrice
   * @return {Object}
   */
  deployContracts(contractMap, from, gas, gasPrice) {
    let self = this;

    return new Promise((resolve, reject) => {
      let contractAddress = [];
      for (let index = 0; index < contractMap.length; index++) {
        const contract = contractMap[index];
        self.deploy(contract.bytecode, contract.arguments, from, gas, gasPrice).then(result => {
          contractAddress[contract.name] = result.contractAddress;
          if (key === (contractMap.length - 1)) {
            resolve(contractAddress);
          }
        }).catch(reject);
      }
    });
  }

  /**
   * @param {string} bytecode
   * @param {Object} deployArguments
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @return {Promise}
   */
  deploy(bytecode, deployArguments, from, gas, gasPrice) {
    return this.web3.eth.sendTransaction(
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
