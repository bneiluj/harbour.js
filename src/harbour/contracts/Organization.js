import Contract from '../../lib/web3/Contract';

export default class Organization extends Contract {

	/**
	 * @param {number} proposalId
	 * @param choice
	 * @returns {Promise}
	 */
	vote(proposalId, choice) {
		return this.executeMethod('vote', [proposalId, choice]);
	}

	/**
	 * @param {number} proposalId
	 * @returns {Promise}
	 */
	approve(proposalId) {
		return this.executeMethod('approve', [proposal]);
	}

	/**
	 * @param {string} proposalAddress
	 * @returns {Promise}
	 */
	propose(proposalAddress) {
		return this.executeMethod('propose', [proposalAddress]);
	}

	/**
	 * @param {number} proposalId
	 * @returns {Promise}
	 */
	execute(proposalId) {
		return this.executeMethod('execute', [proposalId]);
	}

	/**
	 * @param {number} proposalId
	 * @returns {Promise}
	 */
	tally(proposalId) {
		return this.executeMethod('tally', [proposalId]);
	}

	/**
	 * @param {number} optionId
	 * @returns {Promise}
	 */
	winningOption(optionId) {
		return this.executeMethod('winningOption', [optionId]);
	}
}