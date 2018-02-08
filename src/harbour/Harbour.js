import Organization from "./contracts/Organization.js";
import VotingPower from "./contracts/voting/VotingPower.js";
import VotingRights from "././contracts/voting/VotingRights.js";
import * as contractMetadata from "./ABIS/contract-metadata.js";
import Web3Factory from "./factories/Web3Factory";
import ContractFactory from "./factories/ContractFactory";

export class Harbour {

	/**
	 * @param {Web3} web3
	 * @param {string} versionAddress
	 */
	constructor(web3, versionAddress) {
		this.web3Factory = new Web3Factory(web3);
		this.contractFactory = new ContractFactory(web3, contractMetadata.data, this.web3Factory);
		this.deploy = this.web3Factory.createDeploy();
		this.version = this.contractFactory.createVersion(versionAddress);
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
		return await this.version.createOrganization(
			deployedModules['votingRights'],
			deployedModules['votingPower'],
			from,
			gas,
			gasPrice
		);
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
	 * @returns {Object}
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
	 * @param {Object} deployArguments
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @param {string} from
	 * @returns {Promise}
	 */
	deployBallot(deployArguments, gas, gasPrice, from) {
		return this.deploy.deploy(
			this.contractFactory.getAbiFromContractData('Ballot').bytecode,
			deployArguments,
			gas,
			gasPrice,
			from
		);
	}

	/**
	 * @param {Object} deployArguments
	 * @param {number} gas
	 * @param {number} gasPrice
	 * @param {string} from
	 * @returns {Promise}
	 */
	deployProposal(deployArguments, gas, gasPrice, from) {
		return this.deploy.deploy(
			this.contractFactory.getAbiFromContractData('Proposal').bytecode,
			deployArguments,
			gas,
			gasPrice,
			from
		);
	}

	/**
	 * Returns an harbour organization
	 * @param {string} address
	 * @returns {Organization}
	 */
	getOrganization(address) {
		return this.contractFactory.createOrganization(address);
	}

	/**
	 * Returns an harbour organization
	 * @param {string} address
	 * @returns {VotingPower}
	 */
	getVotingPower(address) {
		return this.contractFactory.createVotingPower(address);
	}

	/**
	 * Returns an harbour organization
	 * @param {string} address
	 * @returns {VotingRights}
	 */
	getVotingRights(address) {
		return this.contractFactory.createVotingPower(address);
	}
}
