import Contract from '../web3/Contract';

export default class Version extends Contract {

    /**
     * @param {string} votingRightsAddress 
     * @param {string} votingStrategyAddress 
     * @return {Promise}
     */
   createCongress(votingRightsAddress, votingStrategyAddress) {
      return this.sendTransaction(
        'createCongress',
        [
          votingRightsAddress,
          votingStrategyAddress
        ]
      );
   }

   /**
    * @param {number} contractId 
    * @return {Promise}
    */
   destroyCongress(contractId) {
      return this.sendTransaction('destroyContract', [contractId]);
   }

   /**
    * @param {number} congressId 
    * @return {Promise}
    */
   getCongress(congressId) {
      return this.callMethod('getCongress', [congressId])
   }
}
  