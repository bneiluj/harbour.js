// TODO: Testing event listeners and create some wrapper methods for default filters
export class Events {

  /**
   * @param {Web3.eth.Contract} contract
   */
  constructor(contract) {
    this.contract = contract;
  }

  /**
   * Listen for event on contract
   *
   * @param {string} eventName
   * @param {Object} options
   * @return {Object}
   */
  listenForEvent(eventName, options = undefined) {
    return this.contract.events[eventName](options);
  }

  /**
   * Listen only once if an event is fired
   *
   * @param {string} eventName
   * @param {Object} options
   * @return {Object}
   */
  listenOnceForEvent(eventName, options = undefined) {
    return this.contract.once(eventName, options);
  }

  /**
   * Listen for all events
   *
   * @param {Object} options
   * @return {Object}
   */
  listenForAllEvents(options = undefined) {
    return this.contract.allEvents(options);
  }

  /**
   * Get history of an event
   *
   * @param {string} eventName
   * @param {Object} options
   * @return {Object}
   */
  getPastEvents(eventName, options) {
    return this.contract.getPastEvents(eventName, options);
  }
}

