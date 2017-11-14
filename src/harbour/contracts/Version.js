import {Contract} from '../../lib/web3/Contract';

export default class Version extends Contract {

	/**
	 * @param {Web3} web3
	 * @param contractABI
	 * @param address
	 */
	constructor(web3, contractABI, address) {
		super(web3, contractABI, address);
	}
	/**
	 * @param {string} votingRightsAddress
	 * @param {string} votingStrategyAddress
	 * @param {string} from
	 * @param {string} gas
	 * @param {string} gasPrice
	 * @return {Promise}
	 */
	createOrganization(votingRightsAddress, votingStrategyAddress, from, gas, gasPrice) {
		return this.executeMethod(
			'createOrganization',
			[
				votingRightsAddress,
				votingStrategyAddress
			],
			from,
			gas,
			gasPrice
		);
	}

	/**
	 * @param {number} contractId
	 * @param {string} from
	 * @param {string} gas
	 * @param {string} gasPrice
	 * @return {Promise}
	 */
	destroyOrganization(contractId, from, gas, gasPrice) {
		return this.executeMethod(
			'destroyOrganization',
			[contractId],
			from,
			gas,
			gasPrice);
	}
}