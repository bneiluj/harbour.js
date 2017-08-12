import ContractAdapter from '../web3/Contract';

export default class Congress extends Contract {

    /**
     * @param {Object} web3Connection 
     */
    constructor(web3Connection) {
        super(web3Connection);
    }

    /**
     * @param {number} proposal 
     * @param {number} choice 
     */
    vote(proposal, choice) {
        return this.sendTransaction('vote', [proposal, choice]);
    }

    /**
     * @param {string} name 
     * @param {*} payload 
     */
    propose(name, payload) {
        return this.sendTransaction('propose', [name, payload]);
    }

    /**
     * @param {number} proposalFactory 
     * @param {*} payload 
     */
    createProposal(proposalFactory, payload) {
        return this.sendTransaction('createProposal', [proposalFactory, payload]);
    }

    /**
     * @return {string}
     */
    getName() {
        return this.constructor.name;
    }
}