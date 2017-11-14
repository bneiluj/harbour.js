import {Contract} from '../../lib/web3/Contract';

export default class Organization extends Contract {

    /**
     * @param {number} proposalId
     * @param choice
     * @param {string} from
     * @returns {Promise}
     */
    vote(proposalId, choice, from) {
        return this.executeMethod('vote', [proposalId, choice], from);
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @returns {Promise}
     */
    approve(proposalId, from) {
        return this.executeMethod('approve', [proposalId], from);
    }

    /**
     * @param {string} proposalAddress
     * @param {string} from
     * @returns {Promise}
     */
    propose(proposalAddress, from) {
        return this.executeMethod('propose', [proposalAddress], from);
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @returns {Promise}
     */
    execute(proposalId, from) {
        return this.executeMethod('execute', [proposalId], from);
    }

    /**
     * @param {number} proposalId
     * @param {string} from
     * @returns {Promise}
     */
    tally(proposalId, from) {
        return this.executeMethod('tally', [proposalId], from);
    }

    /**
     * @param {number} optionId
     * @param {string} from
     * @returns {Promise}
     */
    winningOption(optionId, from) {
        return this.executeMethod('winningOption', [optionId], from);
    }
}
