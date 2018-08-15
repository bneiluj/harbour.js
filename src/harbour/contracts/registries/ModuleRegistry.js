import {AbstractContract} from '../../../lib/web3/Contract/AbstractContract';

export default class ModuleRegistry extends AbstractContract {

  /**
   * @param {ContractFactory} contractFactory
   * @param {Properties} properties
   */
  constructor(contractFactory, properties) {
    super();
    this.contractFactory = contractFactory;
    this.properties = properties;
  }

  /**
   * @returns {Promise}
   */
  get modules() {
    return Promise.all([
      this.properties.getMapItemByKey('rights'),
      this.properties.getMapItemByKey('power'),
      this.properties.getMapItemByKey('electoralSystem')
    ]).then(modules => {
      return {
        rights: this.contractFactory.createVotingRights(modules[0]),
        strategy: this.contractFactory.createVotingPower(modules[1]),
        electoralSystem: this.contractFactory.createElectoralSystem(modules[2]);
    }
    });
  }

  /**
   * @param {string} name
   * @param {string} proxy
   * @param {string} from
   * @param {number} gas
   * @param {number} gasPrice
   * @returns {Promise}
   */
  addModule(name, proxy, from, gas, gasPrice) {
    return this.executeMethod('addModule', [name, proxy], from, gas, gasPrice)
  }

  /**
   * @param {string} name
   * @returns {Promise}
   */
  getModule(name) {
    return this.executeMethod('getModule', [name]);
  }
}
