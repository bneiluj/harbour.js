export default class Number {

    /**
     * @param {Object} web3 
     */
    constructor(web3) {
        this.web3 = web3;
        this.utils = this.web3.utils;
        this.bigNummber = this.web3.utils.BN;
    }

    /**
     * @param {number} number 
     * @return {string}
     */
    toString(number) {
        return new this.bigNummber(number).toString();
    }

    /**
     * @param {number} number
     * @param {number} numberToAdd
     * @return {string}
     */
    add(number, numberToAdd) {
        return new this.bigNummber(number).add(new BN(numberToAdd)).toString();
    }

    /**
     * @param {Object} number
     * @return {bool}
     */
    isBigNumber(number) {
        return this.utils.isBigNumber(number);
    }

    /**
     * @param {*} number 
     * @param {bool} raw 
     * @return {Object}
     */
    toBigNumber(number, raw = undefined) {
        let bigNummber = this.utils.toBN(number);
        if(raw) {
            return bigNummber;
        }

        let clone = Object.assign({}, this);
        clone.bigNummber = bigNummber;

        return clone;
    }

    /**
     * @param {number} number 
     * @param {string} unit 
     */
    toWei(number, unit) {
        return this.utils.toWei(number, unit);
    }

    /**
     * @param {number} number 
     * @param {string} unit 
     */
    fromWei(number, unit) {
        return this.utils.fromWei(number, unit);
    }
}