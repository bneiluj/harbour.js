export default class ContractAdapter {
    construct(web3, abi, address) {
        this.contract = new web3.eth.Contract(this.abi);
        this.contract._address = this.address;
    }

    getMethod() {
        return his.contract.methods
    }

    getOptions() {

    }

    clone() {

    }

    deploy() {

    }

    listenForEvents() {

    }

    getAvaibleEvents() {
        
    }
}