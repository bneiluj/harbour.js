export default class Sha {

    /**
     * @param {Object} web3 
     */
    constructor(web3) {
        this.utils = web3.utils;
    }

    /**
     * @param {string} string 
     */
    sha3(string) {
        return this.utils.sha3(string)
    }

    /**
     * @param {*} any 
     */
    soliditySha3(any) {
        return this.utils.soliditySha3(any)
    }
}