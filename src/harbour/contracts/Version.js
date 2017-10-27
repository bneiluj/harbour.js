import Contract from '../../lib/web3/Contract';

export default class Version extends Contract {

	/**
	 * @param {string} votingRightsAddress
	 * @param {string} votingStrategyAddress
	 * @return {Promise}
	 */
	createOrganisation(votingRightsAddress, votingStrategyAddress) {
		return this.executeMethod('createOrganisation', [votingRightsAddress, votingStrategyAddress]);
	}

	/**
	 * @param {number} contractId
	 * @return {Promise}
	 */
	destroyOrganization(contractId) {
		return this.executeMethod('destroyOrganization', [contractId]);
	}

	/**
	 * @param {number} congressId
	 * @return {Promise}
	 */
	getOrganization(congressId) {
		return this.executeMethod('getOrganization', [congressId])
	}
}