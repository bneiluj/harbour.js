import {AbstractContract} from '../../../lib/web3/Contract/AbstractContract';
import 'rxjs/add/operator/map';

export default class ProposalManager extends AbstractContract {

	/**
	 * @param {Methods} methods
	 * @param {Properties} properties
	 * @param {ContractFactory} contractFactory
	 */
	constructor(methods, properties, contractFactory) {
		super();
		this.methods = methods;
		this.properties = properties;
		this.contractFactory = contractFactory;
	}

	/**
	 * @returns {Observable}
	 */
	get proposals () {
		return this.properties.getMapAsObservable('nextId', 'proposals').map(proposal => {
			return this.contractFactory.createProposal(proposal);
		});
	}

	/**
	 * @param {string} creator
	 * @param {string} proposal
	 * @param {string} from
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @returns {Promise}
	 */
	add(creator, proposal, from, gas, gasPrice) {
		return this.methods.executeMethod('add', [creator, proposal], from, gas, gasPrice);
	}

	/**
	 * @param {number} id
	 * @param {string} from
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @returns {Promise}
	 */
	approve(id, from, gas, gasPrice) {
		return this.methods.executeMethod('approve' [id], from, gas, gasPrice);
	}

	/**
	 * @param {number} id
	 * @returns {Promise}
	 */
	isApproved(id) {
		return this.methods.executeMethod('isApproved' [id]);
	}

	/**
	 * @param {number} id
	 * @returns {Promise}
	 */
	async getProposal(id) {
		return await this.proposals[id];
	}
}
