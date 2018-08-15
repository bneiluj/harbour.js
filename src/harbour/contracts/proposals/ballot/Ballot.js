import {AbstractContract} from '../../../lib/web3/Contract/AbstractContract';

export default class Ballot extends AbstractContract {

  /**
   * @param {Methods} methods
   * @param {Properties} properties
   */
  constructor(methods, properties) {
    super();
    this.methods = methods;
    this.properties = properties;
  }

  /**
   * @returns {Promise}
   */
  optionsLength() {
    return this.method.executeMethod('optionsLength');
  }

  /**
   * @param {number} choiceId
   * @returns {Promise}
   */
  votes(choiceId) {
    return this.method.executeMethod('votes', [choiceId]);
  }

  /**
   * @param {string} address
   * @returns {Promise}
   */
  voted(address) {
    return this.method.executeMethod('voted', [address]);
  }

  /**
   * @returns {Promise}
   */
  quorum() {
    return this.properties.get('quorum');
  }

  /**
   * @returns {Promise}
   */
  votingRound() {
    return this.properties.get('votingRound');
  }

  /**
   * @param {number} id
   * @returns {Promise}
   */
  getRoundById(id) {
    return this.properties.getMapItemByKey('rounds', id);
  }

  /**
   * @returns {Observable}
   */
  getRoundsAsObservable() {
    return this.properties.getMapByCounterAsObservable('votingRound', 'rounds');
  }

  /**
   * @returns {Promise}
   */
  getRounds() {
    return this.properties.getMapByCounter('votingRound', 'rounds');
  }
}
