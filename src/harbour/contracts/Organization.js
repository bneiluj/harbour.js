import {AbstractContract} from '../../lib/web3/Contract/AbstractContract';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/concatMap';

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
     * @returns {ProposalManager}
     */
    async getProposalManager() {
        const proposalManagerAddress = await this.properties.get('proposalManager');
        return this.contractFactory.createProposalManager(proposalManagerAddress)
    }

    /**
     * @returns {Observable}
     */
    getProposals() {
        return Observable.fromPromise(this.getProposalManager()).concatMap(proposalManager => {
           return proposalManager.proposals;
        });
    }

    /**
     * @param proposalAddress
     * @returns {Proposal}
     */
    getProposal(proposalAddress) {
        return this.contractFactory.createProposal(proposalAddress);
    }

    /**
     * @param {number} proposalId
     * @param choice
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
     * @returns {Promise}
     */
    quorumReached(proposalId) {
        return this.methods.executeMethod('quorumReached', [proposalId], from, gas, gasPrice);
    }

    /**
     * @param {number} optionId
     * @returns {Promise}
     */
    winningOption(optionId) {
        return this.methods.executeMethod('winningOption', [optionId]);
    }

    /**
     * @returns {Promise}
     */
    votingRights() {
        return this.methods.executeMethod('votingRights', []);
    }

    /**
     * @returns {Promise}
     */
    votingPower() {
        return this.methods.executeMethod('votingPower', []);
    }
}
