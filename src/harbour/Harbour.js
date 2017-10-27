import ConnectionModel from '../lib/web3/ConnectionModel.js';
import Deploy from '../lib/web3/Deploy.js';
import Version from './contracts/Version.js';
import Organization from './contracts/Organization.js';
import VotingPower from './contracts/VotingPower.js';
import VotingRights from '././contracts/VotingRights.js';
import * as config from './config.js';
import * as contractMetadata from './contract-metadata.js';

export default class Harbour {

	/**
	 * @param {Web3} web3
	 * @param {string} from
	 */
	constructor(web3, from) {
		this.connectionModel = new ConnectionModel(web3, from);
		this.deploy = new Deploy(this.connectionModel);
		this.version = new Version(config.versionAddress, contractMetadata.version.abi);

	}

	/**
	 * Deploy an harbour organization and return the organization address
	 * @param {Obejct} votingRights
	 * @param {Obejct} votingPower
	 * @returns {Promise}
	 */
	async createOrganization(votingRights, votingPower) {
		let modules = await this.deployModules(votingRights, votingPower);
		return await this.version.createOrganization(...modules);
	}

	/**
	 * Destroys an deployed organization
	 * @param {number} id
	 * @returns {Promise}
	 */
	async destroyOrganization(id) {
		return await this.version.destroyOrganization(id);
	}

	/**
	 *
	 * @param {Obejct} votingRights
	 * @param {Obejct} votingPower
	 * @returns {array}
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
	 * @param {string} address
	 * @returns {Organization}
	 */
	getOrganization(address) {
		return new Organization(
			this.connectionModel,
			contractMetadata.organization.abi,
			address
		);
	}

	/**
	 * Returns an harbour organization
	 * @param {string} address
	 * @returns {VotingPower}
	 */
	getVotingPower(address) {
		return new VotingPower(
			this.connectionModel,
			contractMetadata.organization.abi,
			address
		);
	}

	/**
	 * Returns an harbour organization
	 * @param {string} address
	 * @returns {VotingRights}
	 */
	getVotingRights(address) {
		return new VotingRights(
			this.connectionModel,
			contractMetadata.organization.abi,
			address
		);
	}
}