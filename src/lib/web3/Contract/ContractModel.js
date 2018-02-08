export class ContractModel {

	/**
	 * @param {Web3.eth.Contract} contract
	 * @param {Array} abi
	 */
	constructor(contract, abi) {
		this.contract = contract;
		this.abi = abi;
	}
}
