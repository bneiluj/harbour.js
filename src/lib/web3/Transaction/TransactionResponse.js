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
	getReturnValues() {
		return new Promise((resolve, reject) => {
			this.transactionPromise.then(transactionResponse => {
				const returnValues = [];
				Object.keys(transactionResponse.events).forEach(key => {
					if (isNaN(key)) {
						returnValues[key] = transactionResponse.events[key].returnValues;
					}
				});

				resolve(returnValues);
			}).catch(error => reject(error));
		});
	}

	/**
	 * @returns {Promise}
	 */
	getTransactionHeader() {
		return new Promise((resolve, reject) => {
			this.transactionPromise.then(transactionResponse => {
				delete transactionResponse.events;
				resolve(transactionResponse);
			}).catch(error => reject(error));
		});
	}
}
