import ContractAdapter from '../web3/ContractAdapter';

export default class Congress extends ContractAdapter {

    /**
     * @param {Object} web3Connection 
     */
    constructor(web3Connection) {
        super(
            web3Connection.web3,
            web3Connection.abi,
            web3Connection.address,
            web3Connection.gasPrice = undefined,
            web3Connection.from = undefined);
    }

    /**
     * @param {number} proposal 
     * @param {number} choice 
     */
    vote(proposal, choice) {
        return this.contract.sendTransaction('vote', [proposal, choice]);
    }

    /**
     * @param {string} name 
     * @param {*} payload 
     */
    propose(name, payload) {
        return this.contract.sendTransaction('propose', [name, payload]);
    }

    /**
     * @param {Object} proposalFactory 
     * @param {*} payload 
     */
    createProposal(proposalFactory, payload) {
        return this.contract.sendTransaction('createProposal', [])
    }
}