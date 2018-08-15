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
   * @param {string} organizationFactoryAddress
   * @param {string} votingRightsAddress
   * @param {string} votingPowerAddress
   * @param {string} electoralSystemAddress
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise<Organization>}
   */
  createOrganization(
    organizationFactoryAddress,
    votingRightsAddress,
    votingPowerAddress,
    electoralSystemAddress,
    from,
    gas,
    gasPrice
  ) {
    return this.contractFactory.createOrganizationFactory(organizationFactoryAddress).createOrganization(
      votingRightsAddress,
      votingPowerAddress,
      electoralSystemAddress,
      from,
      gas,
      gasPrice
    );
  }

  /**
   * @param {Object} votingRights
   * @param {Object} votingPower
   * @param {Object} electoralSystem
   * @param {string} from
   * @param {string} gas
   * @param {string} gasPrice
   * @returns {Object}
   */
  async deployModules(votingRights, votingPower, electoralSystem, from, gas, gasPrice) {
    let votingRightsDeployResponse = await this.deploy.deploy(
      votingRights.bytecode,
      votingRights.arguments,
      votingRights.gas,
      votingRights.gasPrice,
      from,
      gas,
      gasPrice
    );

    let votingPowerDeployResponse = await this.deploy.deploy(
      votingPower.bytecode,
      votingPower.arguments,
      votingPower.gas,
      votingPower.gasPrice,
      from,
      gas,
      gasPrice
    );


    let electoralSystemDeployResponse = await this.deploy.deploy(
      electoralSystem.bytecode,
      electoralSystem.arguments,
      electoralSystem.gas,
      electoralSystem.gasPrice,
      from,
      gas,
      gasPrice
    );

    return {
      votingRights: votingRightsDeployResponse.contractAddress,
      votingPower: votingPowerDeployResponse.contractAddress,
      electoralSystem: electoralSystemDeployResponse.contractAddress
    };
  }

  /**
   * @param {Object} deployArguments
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  deployBallot(deployArguments, from, gas, gasPrice) {
    return this.deploy.deploy(
      this.contractFactory.getAbiFromContractData('Ballot').bytecode,
      deployArguments,
      from,
      gas,
      gasPrice
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
      from,
      gas,
      gasPrice
    );
  }

  /**
   * Returns an harbour organization
   *
   * @param {string} address
   * @returns {Organization}
   */
  getOrganization(address) {
    return this.contractFactory.createOrganization(address);
  }

  /**
   * Returns an harbour organization
   *
   * @param {string} address
   * @returns {VotingPower}
   */
  getVotingPower(address) {
    return this.contractFactory.createVotingPower(address);
  }

  /**
   * Returns an harbour organization
   *
   * @param {string} address
   * @returns {VotingRights}
   */
  getVotingRights(address) {
    return this.contractFactory.createVotingRights(address);
  }
}
