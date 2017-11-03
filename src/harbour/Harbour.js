import Deploy from '../lib/web3/Deploy.js';
import Version from './contracts/Version.js';
import Organization from './contracts/Organization.js';
import VotingPower from './contracts/VotingPower.js';
import VotingRights from '././contracts/VotingRights.js';
import * as contractMetadata from './contract-metadata.js';

export default class Harbour {

	/**
	 * @param {Web3} web3
	 * @param {string} versionAddress
	 */
	constructor(web3, versionAddress) {
		this.web3 = web3;
		this.deploy = new Deploy(this.web3);
		this.contractData = contractMetadata;
		this.version = new Version(versionAddress, this.getAbiFromContractData('Version'));
	}

	/**
	 * Deploy an harbour organization and return the organization address
	 * @param {Obejct} votingRights
	 * @param {Obejct} votingPower
	 * @param {string} from
	 * @returns {Promise}
	 */
	async createOrganization(votingRights, votingPower, from) {
		let modules = await this.deployModules(votingRights, votingPower, from);
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
	 * @param {string} from
	 * @returns {array}
	 */
	async deployModules(votingRights, votingPower, from) {
		let votingRightsAddress = await this.deploy.deploy(
			votingRights.bytecode,
			votingRights.arguments,
			votingRights.gas,
			votingRights.gasPrice,
			from
		);

		let votingPowerAddress = await this.deploy.deploy(
			votingPower.bytecode,
			votingPower.arguments,
			votingPower.gas,
			votingPower.gasPrice,
			from
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
			this.web3,
			this.getAbiFromContractData('Organization'),
			address,
		);
	}

	/**
	 * Returns an harbour organization
	 * @param {string} address
	 * @returns {VotingPower}
	 */
	getVotingPower(address) {
		return new VotingPower(
			this.web3,
			this.getAbiFromContractData('VotingPower'),
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
			this.web3,
			this.getAbiFromContractData('VotingRights'),
			address
		);
	}

	/**
	 * @param contractName
	 * @returns {Object}
	 */
	getAbiFromContractData(contractName) {
		return this.contractData.filter((contract) => contract.contract_name == contractName)[0].abi;
	}
}