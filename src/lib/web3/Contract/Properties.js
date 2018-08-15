import {Observable} from 'rxjs/Observable';

// TODO: Test properties handling better
export class Properties {

  /**
   * @param {Web3.eth.Contract} contract
   */
  constructor(contract) {
    this.contract = contract;
  }

  /**
   * @param {string} propertyName
   * @returns {Promise}
   */
  get(propertyName) {
    return this.contract.methods[propertyName]().call();
  }

  /**
   * @param propertyName
   * @param key
   * @returns {Promise}
   */
  getMapItemByKey(propertyName, key) {
    return this.contract.methods[propertyName](key).call();
  }

  /**
   * Return all entry from contract map based on public counter property
   *
   * @param {string} counter
   * @param {string} propertyName
   * @returns {Promise}
   */
  getMapByCounter(counter, propertyName) {
    return this.contract.methods[counter]().call().then(counter => {
      const map = [];
      for (let i = counter; i > 0; i--) {
        map.push(this.contract.methods[propertyName](i).call())
      }

      return Promise.all(map);
    });
  }

  /**
   * Get map as observable for better UX
   *
   * @param {string} counter
   * @param {string} propertyName
   * @returns {Observable}
   */
  getMapByCounterAsObservable(counter, propertyName) {
    return Observable.create(observer => {
      this.contract.methods[counter]().call().then(async counter => {
        for (let i = counter; i > 0; i--) {
          observer.next(await this.contract.methods[propertyName](i).call())
        }
        observer.complete();
      })
    });
  }
}
