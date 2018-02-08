import {AbstractContract} from '../../../lib/web3/Contract/AbstractContract';

export default class ModuleRegistry extends AbstractContract {

	/**
	 * @param {ContractFactory} contractFactory
	 */
	constructor(contractFactory) {
		super();
		this.contractFactory = contractFactory;
	}

	/**
	 * @returns {Promise}
	 */
	get modules() {
		return this.getPublicProperty('modules').call().map(modules => {
			modules.rights = this.contractFactory.createVotingRights(modules.rights);
			modules.power = this.contractFactory.createVotingPower(modules.power);
			return modules;
		});
	}

	/**
	 * @param {string} name
	 * @param {string} proxy
	 * @param {string} from
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @returns {Promise}
	 */
	addModule(name, proxy, from, gas, gasPrice) {
		return this.executeMethod('addModule', [name, proxy], from, gas, gasPrice)
	}

	/**
	 * @param {string} name
	 * @returns {Promise}
	 */
	getModule(name) {
		return this.executeMethod('getModule', [name]);
	}
}
