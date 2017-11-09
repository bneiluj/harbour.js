import {Contract} from '../../lib/web3/Contract';

export default class VotingRights extends Contract {

	/**
	 * @param {string} voter
	 * @returns {Promise}
	 */
	canVote(voter) {
		return this.executeMethod('canVote', [voter]);
	}

	/**
	 * @param {string} proposer
	 * @returns {Promise}
	 */
	canPropose(proposer) {
		return this.executeMethod('canPropose', [proposer]);
	}

	/**
	 * @param {string} approver
	 * @returns {Promise}
	 */
	canApprove(approver) {
		return this.executeMethod('canApprove', [approver]);
	}

	/**
	 * @param {number} proposal
	 * @returns {Object}
	 */
	requiresApproval(proposal) {
		return this.executeMethod('requiresApproval', [proposal]);
	}
}