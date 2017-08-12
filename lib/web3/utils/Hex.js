export default class Hex {

    constructor(web3) {
        this.utils = web3.utils;
    }

    /**
     * @param {Object | number | string} value 
     */
    toHex(value) {
        return this.utils.toHex(value);
    }
    
    /**
     * @param {Object | number | string} hex 
     */
    hexToNumberString(hex) {
        return this.utils.hexToNumberString(hex);
    }

    /**
     * @param {Object | number | string} hex 
     */
    hexToNumber(hex) {
        return this.utils.hexToNumber(hex);
    }

    /**
     * @param {Object | number | string} hex 
     */
    numberToHex(hex) {
        return this.utils.numberToHex(hex);
    }

    /**
     * @param {Object | number | string} hex 
     */
    hexToUtf8(hex) {
        return this.utils.hexToUtf8(hex);
    }

    /**
     * 
     * @param {*} hex 
     */
    hexToAscii(hex) {
        return this.utils.hexToAscii(hex);
    }


    utf8ToHex() {

    }

    asciiToHex() {

    }

    hexToBytes() {

    }

    bytesToHex() {

    }


}