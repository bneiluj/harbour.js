import {AbstractContract} from '../../../lib/web3/Contract/AbstractContract';

export default class VotingPower extends AbstractContract {

  /**
   * @param {Methods} methods
   */
  constructor(methods) {
    super();
    this.methods = methods;
  }

  /**
   * @param {number} proposal
   * @returns {Promise}
   */
  maximumQuorum(proposal) {
    return this.methods.executeMethod('maximumQuorum', [proposal]);
  }

  /**
   * @param {string} voter
   * @param {string} proposal
   * @returns {Promise}
   */
  votingWeightOf(voter, proposal) {
    return this.methods.executeMethod('votingWeightOf', [voter, proposal]);
  }
}
