export class Methods {

  /**
   * @param {Web3.eth.Contract} contract
   * @param {Array} abi
   * @param {Web3Factory} web3Factory
   */
  constructor(contract, abi, web3Factory) {
    this.contract = contract;
    this.abi = abi;
    this.web3Factory = web3Factory;
  }

  /**
   * Execute method and decide if it is to call or send as transaction
   *
   * @param {string} methodName
   * @param {array} methodArguments
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  executeMethod(methodName, methodArguments = [], from = null, gas = null, gasPrice = null) {
    if (this.getMethodMetaData(methodName).constant) {
      return this.callMethod(methodName, methodArguments);
    }

    return this.sendTransaction(methodName, methodArguments, from, gas, gasPrice);
  }

  /**
   * Get method form contract
   *
   * @param {string} methodName
   * @returns {Object}
   */
  getMethod(methodName) {
    return this.contract.methods[methodName];
  }

  /**
   * Get method metadata from abi
   *
   * @param {string} methodName
   * @returns {Object}
   */
  getMethodMetaData(methodName) {
    let methods = this.abi.filter((method) => {
        return method.type === "function"
      }
    );

    return methods.filter((method) => {
        return method.name === methodName
      }
    )[0];
  }

  /**
   * Apply arguments to contract method
   *
   * @param {string} methodName
   * @param {params} methodArguments
   * @return {Object}
   */
  getMethodWithArguments(methodName, methodArguments) {
    return this.contract.methods[methodName](...methodArguments);
  }

  /**
   * Get estimate gas for method
   *
   * @param {string} methodName
   * @param {array} methodArguments
   * @return {Object}
   */
  estimateGas(methodName, methodArguments) {
    return this.getMethodWithArguments(methodName, methodArguments).estimateGas();
  }

  /**
   * Call method on contract
   *
   * @param {string} methodName
   * @param {array} methodArguments
   * @return {Object}
   */
  callMethod(methodName, methodArguments) {
    return this.getMethodWithArguments(methodName, methodArguments).call();
  }

  /**
   * Send transaction to call an method
   *
   * @param {string} methodName
   * @param {array} methodArguments
   * @param {string} from
   * @param {string} gas
   * @param {string} gasPrice
   * @return {TransactionResponse}
   */
  sendTransaction(methodName, methodArguments, from, gas, gasPrice) {
    return this.web3Factory.createTransactionResponse(this.getMethodWithArguments(methodName, methodArguments).send({
      from: from,
      gas: gas,
      gasPrice: gasPrice
    }));
  }

  /**
   * @param {string} methodName
   * @param {array} methodArguments
   * @return {Object}
   */
  encodeAbi(methodName, methodArguments) {
    return this.getMethodWithArguments(methodName, methodArguments).encodeAbi();
  }
}
