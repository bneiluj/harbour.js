export class AbstractContract {

  /**
   * Clone contract and return new contract instance
   *
   * @return {Object}
   */
  clone() {
    let clonedContract = this.contract.clone();
    let contractAdapterClone = Object.assign({}, this);
    contractAdapterClone.contract = clonedContract;
    contractAdapterClone.address = clonedContract._address;

    return contractAdapterClone;
  }
}
