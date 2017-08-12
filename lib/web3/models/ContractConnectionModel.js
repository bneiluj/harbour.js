
export default class ContractConnectionModel {

    /**
     * @param {Object} web3 
     * @param {array} abi 
     * @param {string} address 
     * @param {number} gasPrice 
     * @param {string} from 
     */
    constructor(web3, abi, address, gasPrice = undefined, from = undefined) {
        this.web3 = web3;
        this.abi = abi;
        this.address = address;
        this.gasPrice = gasPrice;
        this.from = from;
    }

    /**
     * @return {Object}
     */
    getWeb3() {
        return this.web3;
    }

    /**
     * @return {array}
     */
    getAbi() {
        return this.abi;
    }

    /**
     * @return {string}
     */
    getAddress() {
        return this.address;
    }

    /**
     * @return {number}
     */
    getGasPrice() {
        return this.gasPrice;
    }

    /**
     * @return {string}
     */
    getFrom() {
        return this.from;
    }
}