import {AbstractContract} from '../../../lib/web3/Contract/AbstractContract';

export default class VotingPower extends AbstractContract {

    /**
     * @param {Methods} methods
     */
    constructor(methods) {
        super();
        this.methods = methods;
    }

    /**
     * @param {number} quorum
     * @returns {Promise}
     */
    quorumReached(quorum) {
        return this.methods.executeMethod('quorumReached', [quorum]);
    }

    /**
     * @param {string} voter
     * @returns {Promise}
     */
    votingWeightOf(voter) {
        return this.methods.executeMethod('votingWeightOf', [voter]);
    }
}
