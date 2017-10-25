import * as IPFS from 'ipfs';

export default class IPFSService {


	constructor() {
		this.ipfs = new IPFS()
	}

	/**
	 * @param {Object} jsonObject
	 * @returns {Promise}
	 */
	saveJson(jsonObject) {
		let self = this;
		return new Promise((resolve, reject) => {
			self.ipfs.object.put(jsonObject, (error, node) => {
				if (error) {
					reject(error);
				}
				resolve(node.toJSON().multihash);
			})
		});
	}

	/**
	 * @param {string} multihash
	 * @returns {Promise}
	 */
	getJson(multihash) {
		let self = this;
		return new Promise((resolve, reject) => {
			self.ipfs.object.get(multihash, (error, node) => {
				if (error) {
					reject(error);
				}
				resolve(node.toJSON());
			});
		});
	}
}