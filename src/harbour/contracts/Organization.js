import {AbstractContract} from '../../lib/web3/Contract/AbstractContract';
import {Observable} from 'rxjs/Observable';

export default class Organization extends AbstractContract {

  /**
   * @param {Methods} methods
   * @param {Properties} properties
   * @param {ContractFactory} contractFactory
   */
  constructor(methods, properties, contractFactory) {
    super();
    this.contractFactory = contractFactory;
    this.properties = properties;
    this.methods = methods;
  }

  /**
   * @returns {Promise<ProposalManager>}
   */
  async getProposalManager() {
    return this.properties.get('proposalManager').then(proposalManagerAddress => {
      return this.contractFactory.createProposalManager(proposalManagerAddress);
    });
  }

  /**
   * @returns {Promise<Observable>}
   */
  getProposals() {
    return this.getProposalManager().then(proposalManager => {
      return proposalManager.proposals;
    });
  }

  /**
   * @param {string} proposalAddress
   * @returns {Proposal}
   */
  getProposalByAddress(proposalAddress) {
    return this.contractFactory.createProposal(proposalAddress);
  }

  /**
   * @param {number} proposalId
   * @param {number} choice
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  vote(proposalId, choice, from, gas, gasPrice) {
    return this.methods.executeMethod('vote', [proposalId, choice], from, gas, gasPrice);
  }

  /**
   * @param {number} proposalId
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  unvote(proposalId, from, gas, gasPrice) {
    return this.methods.executeMethod('unvote', [proposalId], from, gas, gasPrice);
  }

  /**
   * @param {number} proposalId
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  approve(proposalId, from, gas, gasPrice) {
    return this.methods.executeMethod('approve', [proposalId], from, gas, gasPrice);
  }

  /**
   * @param {string} proposalAddress
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  propose(proposalAddress, from, gas, gasPrice) {
    return this.methods.executeMethod('propose', [proposalAddress], from, gas, gasPrice);
  }

  /**
   * @param {number} proposalId
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  execute(proposalId, from, gas, gasPrice) {
    return this.methods.executeMethod('execute', [proposalId], from, gas, gasPrice);
  }

  /**
   * @param {number} proposalId
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  newVotingRound(proposalId, from, gas, gasPrice) {
    return this.methods.executeMethod('newVotingRound', [proposalId], from, gas, gasPrice)
  }

  /**
   * @param {number} proposalId
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  tally(proposalId, from, gas, gasPrice) {
    return this.methods.executeMethod('tally', [proposalId], from, gas, gasPrice);
  }

  /**
   * @param {number} proposalId
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  quorumReached(proposalId, from, gas, gasPrice) {
    return this.methods.executeMethod('quorumReached', [proposalId], from, gas, gasPrice);
  }

  /**
   * @param {number} proposalId
   * @returns {Promise}
   */
  winningOption(proposalId) {
    return this.methods.executeMethod('winningOption', [proposalId]);
  }

  /**
   * @returns {Promise<VotingRights>}
   */
  votingRights() {
    return this.methods.executeMethod('votingRights').then(votingRightsAddress => {
      return this.contractFactory.createVotingRights(votingRightsAddress);
    });
  }

  /**
   * @returns {Promise<VotingPower>}
   */
  votingPower() {
    return this.methods.executeMethod('votingPower').then(votingPowerAddress => {
      return this.contractFactory.createVotingPower(votingPowerAddress);
    });
  }

  /**
   * @returns {Promise<ElectoralSystem>}
   */
  electoralSystem() {
    return this.methods.executeMethod('electoralSystem').then(electoralSystemAddress => {
      return this.contractFactory.createElectoralSystem(electoralSystemAddress);
    });
  }
}
