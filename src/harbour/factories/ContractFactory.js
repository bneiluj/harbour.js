import ProposalManager from '../contracts/managers/ProposalManager';
import Proposal from '../contracts/proposals/Proposal';
import VotingRights from '../contracts/voting/VotingRights';
import VotingPower from '../contracts/voting/VotingPower';
import ElectoralSystem from '../contracts/electoralSystems/ElectoralSystem';
import Organization from '../contracts/Organization';
import OrganizationFactory from '../contracts/factories/OrganizationFactory';

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
   * @returns {OrganizationFactory}
   */
  createOrganizationFactory(address) {
    const contractModel = this.getContractModel(address, 'OrganizationFactory');

    return new OrganizationFactory(
      this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi),
      this
    );
  }

  /**
   * @param {string} address
   * @returns {Organization}
   */
  createOrganization(address) {
    const contractModel = this.getContractModel(address, 'Organization');

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
    const contractModel = this.getContractModel(address, 'ProposalManager');

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
    const contractModel = this.getContractModel(address, 'Proposal');

    return new Proposal(this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi), this);
  }

  /**
   * @param {string} address
   * @returns {Version}
   */
  createVersion(address) {
    const contractModel = this.getContractModel(address, 'Version');

    return new Version(this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
  }

  /**
   * @param {string} address
   * @returns {VotingRights}
   */
  createVotingRights(address) {
    const contractModel = this.getContractModel(address, 'VotingRights');

    return new VotingRights(this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
  }

  /**
   * @param {string} address
   * @returns {VotingPower}
   */
  createVotingPower(address) {
    const contractModel = this.getContractModel(address, 'VotingPower');

    return new VotingPower(this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
  }

  /**
   * @param {string} address
   * @returns {ElectoralSystem}
   */
  createElectoralSystem(address) {
    const contractModel = this.getContractModel(address, 'ElectoralSystem');

    return new ElectoralSystem(this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi));
  }

  /**
   * @param {string} address
   * @returns {Ballot}
   */
  createBallot(address) {
    const contractModel = this.getContractModel(address, 'Ballot');

    return new Ballot(
      this.web3Factory.createContractMethods(contractModel.contract, contractModel.abi),
      this.web3Factory.createContractProperties(contractModel.contract)
    );
  }

  /**
   * @param {string} contractName
   * @returns {Array | undefined}
   */
  getAbiFromContractData(contractName) {
    return this.contractData.find((contract) => contract.contractName === contractName).abi;
  }

  /**
   * @param {string} address
   * @param {string} contractName
   * @returns {ContractModel}
   */
  getContractModel(address, contractName) {
    return this.web3Factory.createContractModel(this.getAbiFromContractData(name), address);
  }
}
