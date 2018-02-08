import Deploy from '../../lib/web3/Deploy';
import {Methods} from '../../lib/web3/Contract/Methods';
import {Events} from '../../lib/web3/Contract/Events';
import {Properties} from '../../lib/web3/Contract/Properties';
import {Options} from '../../lib/web3/Contract/Options';
import {ContractModel} from '../../lib/web3/Contract/ContractModel';
import {TransactionResponse} from '../../lib/web3/Transaction/TransactionResponse';

export default class Web3Factory {

	/**
	 * @param {Web3} web3
	 */
	constructor(web3) {
		this.web3 = web3;
	}

	/**
	 * @returns {Deploy}
	 */
	createDeploy() {
		return new Deploy(this.web3);
	}

	/**
	 * @param {Array} abi
	 * @param {string} address
	 * @returns {ContractModel}
	 */
	createContractModel(abi, address) {
		const contract = new this.web3.eth.Contract(
			abi,
			address
		);

		return new ContractModel(contract, abi);
	}

	/**
	 * @param {Web3.eth.Contract} contract
	 * @param {Array} abi
	 * @returns {Methods}
	 */
	createContractMethods(contract, abi) {
		return new Methods(contract, abi, this);
	}

	/**
	 * @param {Web3.eth.Contract} contract
	 * @returns {Events}
	 */
	createContractEvents(contract) {
		return new Events(contract);
	}

	/**
	 * @param {Web3.eth.Contract} contract
	 * @returns {Options}
	 */
	createContractOptions(contract) {
		return new Options(contract)
	}

	/**
	 * @param {Web3.eth.Contract} contract
	 * @returns {Properties}
	 */
	createContractProperties(contract) {
		return new Properties(contract);
	}

	/**
	 * @param {Promise} transactionResponse
	 * @returns {TransactionResponse}
	 */
	createTransactionResponse(transactionResponse) {
		return new TransactionResponse(transactionResponse);
	}
}
