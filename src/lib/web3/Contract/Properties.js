import {Observable} from 'rxjs/Observable';

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
	 * Return all entry from contract map based on public counter property
	 * @param {string} counter
	 * @param {string} propertyName
	 * @returns {Promise}
	 */
	getMap(counter, propertyName) {
		return new Promise((resolve, reject) => {
			this.contract.methods[counter]().call().then(async counter => {
				const map = [];
				for (let i = counter; i > 0; i--) {
					map.push(await this.contract.methods[propertyName]().call())
				}
				resolve(map);
			}).catch(reject);
		});
	}

	/**
	 * Get map as observable for better UX
	 * @param {string} counter
	 * @param {string} propertyName
	 */
	getMapAsObservable(counter, propertyName) {
		return Observable.create(observer => {
			this.contract.methods[counter]().call().then(async counter => {
				for (let i = counter; i > 0; i--) {
					observer.next(await this.contract.methods[propertyName]().call())
				}
				observer.complete();
			})
		});
	}
}
