import Contract from '../web3/Contract';

export default class Congress extends Contract {

    /**
     * @param {number} proposal 
     * @param {number} choice 
     * @return {Promise}
     */
    vote(proposal, choice) {
        return this.sendTransaction('vote', [proposal, choice]);
    }

    /**
     * @param {string} name 
     * @param {*} payload 
     * @return {Promise}
     */
    propose(name, payload) {
        return this.sendTransaction('propose', [name, payload]);
    }

    /**
     * @param {number} proposalFactory 
     * @param {*} payload 
     * @return {Promise}
     */
    createProposal(proposalFactory, payload) {
        return this.sendTransaction('createProposal', [proposalFactory, payload]);
    }

}