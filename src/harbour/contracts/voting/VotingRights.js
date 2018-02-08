import {AbstractContract} from "../../../lib/web3/Contract/AbstractContract";

export default class VotingRights extends AbstractContract {

    /**
     * @param {Methods} methods
     */
    constructor(methods) {
        super();
        this.methods = methods;
    }

    /**
     * @param {string} voter
     * @returns {Promise}
     */
    canVote(voter) {
        return this.methods.executeMethod('canVote', [voter]);
    }

    /**
     * @param {string} proposer
     * @returns {Promise}
     */
    canPropose(proposer) {
        return this.methods.executeMethod('canPropose', [proposer]);
    }

    /**
     * @param {string} approver
     * @returns {Promise}
     */
    canApprove(approver) {
        return this.methods.executeMethod('canApprove', [approver]);
    }

    /**
     * @param {number} proposal
     * @returns {Promise}
     */
    requiresApproval(proposal) {
        return this.methods.executeMethod('requiresApproval', [proposal]);
    }
}
