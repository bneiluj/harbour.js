import ConnectionModel from '../lib/web3/ConnectionModel.js';
import Deploy from '../lib/web3/Deploy.js';
import Version from './contracts/Version.js';
import Organization from './contracts/Organization.js';
import VotingPower from './contracts/VotingPower.js';
import VotingRights from '././contracts/VotingRights.js';


export default class Harbour {

	/**
	 * @param web3
	 * @param from
	 */
	constructor(web3, from) {
		this.connectionModel = new ConnectionModel(web3, from);
		this.deploy = new Deploy(this.connectionModel);
		this.version = new Version();
	}

	/**
	 * Deploy an harbour organization and return the organization address
	 * @param votingRights
	 * @param votingPower
	 * @returns {*}
	 */
	async createOrganization(votingRights, votingPower) {
		let modules = await this.deployModules(votingRights, votingPower);
		return await this.version.createOrganization(...modules);
	}

	/**
	 *
	 * @param votingRights
	 * @param votingPower
	 * @returns {*[]}
	 */
	async deployModules(votingRights, votingPower) {
		let votingRightsAddress = await this.deploy.deploy(
			votingRights.bytecode,
			votingRights.arguments,
			votingRights.gas,
			votingRights.gasPrice
		);

		let votingPowerAddress = await this.deploy.deploy(
			votingPower.bytecode,
			votingPower.arguments,
			votingPower.gas,
			votingPower.gasPrice
		);

		return [
			votingRightsAddress,
			votingPowerAddress
		];
	}

	/**
	 * Returns an harbour organization
	 * @param address
	 * @returns {Organization}
	 */
	getOrganization(address) {
		return new Organization(address, this.connectionModel);
	}

	/**
	 * Returns an harbour organization
	 * @param address
	 * @returns {VotingPower}
	 */
	getVotingPower(address) {
		return new VotingPower(address, this.connectionModel);
	}

	/**
	 * Returns an harbour organization
	 * @param address
	 * @returns {VotingRights}
	 */
	getVotingRights(address) {
		return new VotingRights(address, this.connectionModel);
	}
}