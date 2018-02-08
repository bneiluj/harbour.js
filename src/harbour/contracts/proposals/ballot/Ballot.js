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
		return this.method.executeMethod('optionsLength', []);
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
}
