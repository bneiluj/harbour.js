import {AbstractContract} from '../../../lib/web3/Contract/AbstractContract';

export default class Version extends AbstractContract {

    /**
     * @param {Methods} methods
     */
    constructor(methods) {
        super();
        this.methods = methods;
    }

    /**
     * @param {string} votingRightsAddress
     * @param {string} votingStrategyAddress
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @return {Promise}
     */
    createOrganization(votingRightsAddress, votingStrategyAddress, from, gas, gasPrice) {
        return this.methods.executeMethod(
            'createOrganization',
            [
                votingRightsAddress,
                votingStrategyAddress
            ],
            from,
            gas,
            gasPrice
        );
    }

    /**
     * @param {number} contractId
     * @param {string} from
     * @param {number} gas
     * @param {number} gasPrice
     * @return {Promise}
     */
    destroyOrganization(contractId, from, gas, gasPrice) {
        return this.methods.executeMethod('destroyOrganization', [contractId], from, gas, gasPrice);
    }
}
