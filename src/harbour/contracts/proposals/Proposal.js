import {AbstractContract} from '../../../lib/web3/Contract/AbstractContract';

export default class Proposal extends AbstractContract {

	/**
	 * @param {Methods} methods
	 */
	constructor(methods) {
		super();
		this.methods = methods;
	}

	/**
	 * @returns {Promise}
	 */
	isEnded() {
		return this.methods.executeMethod('isEnded', []);
	}

	/**
	 * @returns {Promise}
	 */
	isVoting() {
		return this.methods.executeMethod('isVoting', []);
	}

	/**
	 * @returns {Promise}
	 */
	isExecuted() {
		return this.methods.executeMethod('isExecuted', []);
	}

	/**
	 * @returns {Promise}
	 */
	canExecute() {
		return this.methods.executeMethod('canExecute', []);
	}

	/**
	 * @returns {Promise}
	 */
	createdAt() {
		return this.methods.executeMethod('createdAt', []);
	}

	/**
	 * @returns {Promise}
	 */
	isAccepted() {
		return this.methods.executeMethod('isAccepted', []);
	}

	/**
	 * @returns {Promise}
	 */
	executor() {
		return this.methods.executeMethod('executor', []);
	}

	/**
	 * @returns {Promise}
	 */
	ballot() {
		return this.methods.executeMethod('ballot', []);
	}
}
