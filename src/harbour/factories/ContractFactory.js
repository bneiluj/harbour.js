import ProposalManager from '../contracts/managers/ProposalManager';
import Proposal from '../contracts/proposals/Proposal';
import Version from '../contracts/version/Version';
import VotingRights from '../contracts/voting/VotingRights';
import VotingPower from  '../contracts/voting/VotingPower';
import Organization from '../contracts/Organization';

export default class ContractFactory {

	/**
	 * @param {Web3} web3
	 * @param {Array} contractData
	 * @param {Web3Factory} web3Factory
	 */
	constructor(web3, contractData, web3Factory) {
		this.web3 = web3;
		this.web3Factory = web3Factory;
		this.contractData = contractData;
	}

	/**
	 * @param {string} address
	 * @returns {Organization}
	 */
	createOrganization(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('Organization'),
			address
		);

		return new Organization(
			this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi),
			this.web3Factory.createContractProperties(contractModel.contract),
			this
		);
	}

	/**
	 * @param {string} address
	 * @returns {ProposalManager}
	 */
	createProposalManager(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('ProposalManager'),
			address
		);

		return new ProposalManager(
			this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi),
			this.web3Factory.createContractProperties(contractModel.contract),
			this
		);
	}

	/**
	 * @param {string} address
	 * @returns {Proposal}
	 */
	createProposal(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('Proposal'),
			address
		);

		return new Proposal(this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
	}

	/**
	 * @param {string} address
	 * @returns {Version}
	 */
	createVersion(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('Version'),
			address
		);

		return new Version(this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
	}

	/**
	 * @param {string} address
	 * @returns {VotingRights}
	 */
	createVotingRights(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('VotingRights'),
			address
		);

		return new VotingRights(this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
	}

	/**
	 * @param {string} address
	 * @returns {VotingPower}
	 */
	createVotingPower(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('VotingPower'),
			address
		);

		return new VotingPower(this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
	}

	/**
	 * @param {string} address
	 * @returns {Ballot}
	 */
	createBallot(address) {
		const contractModel = this.web3Factory.createContractModel(
			this.getAbiFromContractData('Ballot'),
			address
		);

		return new Ballot(
			this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi),
			this.web3Factory.createContractProperties(contractModel.contract)
		);
	}

	/**
	 * @param {string} contractName
	 * @returns {Array|*}
	 */
	getAbiFromContractData(contractName) {
		return this.contractData.filter((contract) => contract.contractName == contractName)[0].abi;
	}
}
