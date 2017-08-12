export default class Address {

    /**
     * @param {Object} web3 
     */
    constructor(web3) {
        this.web3 = web3;
        this.utils = this.web3.utils;
    }

    /**
     * @param {string} address 
     * @return {bool}
     */
    isAddress(address) {
        return this.utils.isAddress(address);
    }

    /**
     * @param {string} address
     * @return {string} 
     */
    toChecksumAddress(address) {
        return this.utils.toChecksumAddress(address);
    }

    /**
     * @param {bool} addressChecksum 
     * @return {bool}
     */
    checkAddressChecksum(addressChecksum) {
        return this.utils.checkAddressChecksum(addressChecksum);
    }
}
