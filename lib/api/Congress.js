import ContractAdapter from '../web3/ContractAdapter';

export default class Congress extends ContractAdapter {

    /**
     * @param {Object} web3Connection 
     */
    constructor(web3Connection) {
        super(
            web3Connection.getWeb3(),
            web3Connection.getAbi(),
            web3Connection.getAddress(),
            web3Connection.getGasPrice(),
            web3Connection.getFrom());
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
     * @param {Object} proposalFactory 
     * @param {*} payload 
     */
    createProposal(proposalFactory, payload) {
        return this.sendTransaction('createProposal', [proposalFactory, payload]);
    }
}