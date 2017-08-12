export default class Hex {

    /**
     * @param {Object} web3 
     */
    constructor(web3) {
        this.utils = web3.utils;
    }

    /**
     * @param {Object | number | string} value 
     * @return {string}
     */
    toHex(value) {
        return this.utils.toHex(value);
    }
    
    /**
     * @param {string} hex 
     * @return {string}
     */
    hexToNumberString(hex) {
        return this.utils.hexToNumberString(hex);
    }

    /**
     * @param {string} hex 
     * @return {number}
     */
    hexToNumber(hex) {
        return this.utils.hexToNumber(hex);
    }

    /**
     * @param {Object | number | string} hex 
     * @return {string}
     */
    numberToHex(value) {
        return this.utils.numberToHex(value);
    }

    /**
     * @param {string} hex 
     * @return {string}
     */
    hexToUtf8(hex) {
        return this.utils.hexToUtf8(hex);
    }

    /**
     * @param {string} hex 
     * @return {string}
     */
    hexToAscii(hex) {
        return this.utils.hexToAscii(hex);
    }

    /**
     * @param {string} string 
     * @return {string}
     */
    utf8ToHex(string) {
        return this.utils.utf8ToHex(string);
    }

    /**
     * @param {string} string 
     * @return {string}
     */
    asciiToHex(string) {
        return this.utils.asciiToHex(string)
    }

    /**
     * @param {string} hex 
     * @return {array}
     */
    hexToBytes(hex) {
        return this.utils.hexToBytes(hex);
    }

    /**
     * @param {array} array 
     * @return {string}
     */
    bytesToHex(array) {
        return this.utils.bytesToHex(array);
    }

    /**
     * @param {number} bytes 
     * @return {string}
     */
    randomHex(bytes) {
        return this.utils.randomHex(bytes);
    }
}
