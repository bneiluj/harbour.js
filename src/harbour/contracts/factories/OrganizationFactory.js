import {AbstractContract} from '../../../lib/web3/Contract/AbstractContract';

export default class OrganizationFactory extends AbstractContract {

  /**
   * @param {Methods} methods
   * @param {ContractFactory} contractFactory
   */
  constructor(methods, contractFactory) {
    super();
    this.methods = methods;
    this.contractFactory = contractFactory;
  }

  /**
   * @param {string} votingRightsAddress
   * @param {string} votingPowerAddress
   * @param {string} electoralSystemAddress
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise<Organization>}
   */
  createOrganization(votingRightsAddress, votingPowerAddress, electoralSystemAddress, from, gas, gasPrice) {
    return this.methods.executeMethod(
      'createOrganization',
      [
        votingRightsAddress,
        votingPowerAddress,
        electoralSystemAddress
      ],
      from,
      gas,
      gasPrice
    ).then(organizationAddress => {
      return this.contractFactory.createOrganization(organizationAddress);
    });
  }

}
