import {Contract} from '../../lib/web3/Contract';

export default class VotingPower extends Contract {

    /**
     * @param {number} quorum
     * @returns {Promise}
     */
    quorumReached(quorum) {
        return this.executeMethod('quorumReached', [quorum]);
    }

    /**
     * @param {string} voter
     * @returns {Promise}
     */
    votingWeightOf(voter) {
        return this.executeMethod('votingWeightOf', [voter]);
    }
}
