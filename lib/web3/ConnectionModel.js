
export default class ConnectionModel {

    /**
     * @param {Object} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    constructor(web3, from) {
        this.web3 = web3;
        this.from = from;
    }

    /**
     * @return {Object}
     */
    getWeb3() {
        return this.web3;
    }
    
    /**
     * @return {string}
     */
    getFrom() {
        return this.from;
    }
}