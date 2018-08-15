import {AbstractContract} from '../../../lib/web3/Contract/AbstractContract';

export default class ElectoralSystem extends AbstractContract {

  /**
   * @param {Methods} methods
   */
  constructor(methods) {
    super();
    this.methods = methods;
  }

  /**
   * @param {string} ballot
   * @returns {Promise}
   */
  winner(ballot) {
    return this.methods.executeMethod('winner', [ballot]);
  }

  /**
   * @param {string} ballot
   * @returns {Promise}
   */
  topCandidates(ballot) {
    return this.methods.executeMethod('topCandidates', [ballot]);
  }

  /**
   * @param {string} ballot
   * @returns {Promise}
   */
  hasWinner(ballot) {
    return this.methods.executeMethod('hasWinner', [ballot]);
  }
}
