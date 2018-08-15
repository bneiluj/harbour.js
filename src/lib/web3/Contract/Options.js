export class Options {

  /**
   * @param {Web3.Contract} contract
   */
  constructor(contract) {
    this.contract = contract;
  }

  /**
   * Get contract options
   *
   * @return {Object}
   */
  getOptions() {
    return this.contract.options
  }

  /**
   * Get Contract option
   *
   * @param {string} optionName
   * @return {Object}
   */
  getOption(optionName) {
    return this.contract.options[optionName]
  }
}
