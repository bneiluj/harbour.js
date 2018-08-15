export class TransactionResponse {

  /**
   * @param {Promise} transactionPromise
   */
  constructor(transactionPromise) {
    this.transactionPromise = transactionPromise;
  }

  /**
   * @returns {Promise}
   */
  getEmittedEvents() {
    return this.transactionPromise.then(transactionResponse => {
      const returnValues = [];
      Object.keys(transactionResponse.events).forEach(key => {
        if (isNaN(key)) {
          returnValues[key] = transactionResponse.events[key].returnValues;
        }
      });

      return returnValues;
    });
  }

  /**
   * @returns {Promise}
   */
  getTransactionMetadata() {
    return this.transactionPromise.then(transactionResponse => {
      delete transactionResponse.events;
      return transactionResponse;
    });
  }
}
