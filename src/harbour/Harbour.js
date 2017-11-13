import Deploy from '../lib/web3/Deploy.js';
import Version from './contracts/Version.js';
import Organization from './contracts/Organization.js';
import VotingPower from './contracts/VotingPower.js';
import VotingRights from '././contracts/VotingRights.js';
import * as contractMetadata from './contract-metadata.js';

export class Harbour {

	/**
	 * @param {Web3} web3
	 * @param {string} versionAddress
	 */
	constructor(web3, versionAddress) {
		this.web3 = web3;
		this.deploy = new Deploy(this.web3);
		this.contractData = contractMetadata.data;
		this.version = new Version(this.web3, this.getAbiFromContractData('Version'), versionAddress);
	}

	/**
	 * Deploy an harbour organization and return the organization address
	 * @param {Object} votingRights
	 * @param {Object} votingPower
	 * @param {string} from
	 * @param {string} gas
	 * @param {string} gasPrice
	 * @returns {Promise}
	 */
	async createOrganization(votingRights, votingPower, from, gas, gasPrice) {
		const deployedModules = await this.deployModules(votingRights, votingPower, from);
		return await this.version.createOrganization(deployedModules['votingRights'], deployedModules['votingPower'], from, gas, gasPrice);
	}

	/**
	 * Destroys an deployed organization
	 * @param {number} id
	 * @param {string} from
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @returns {Promise}
	 */
	async destroyOrganization(id, from, gas, gasPrice) {
		return await this.version.destroyOrganization(id, from, gas, gasPrice);
	}

	/**
	 *
	 * @param {Object} votingRights
	 * @param {Object} votingPower
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

		return {
			votingRights: votingRightsAddress.contractAddress,
			votingPower: votingPowerAddress.contractAddress
		};
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
