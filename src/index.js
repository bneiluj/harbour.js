
class Application {
    bootstrap() {
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8546"));
        this.client = new Client(new Harbour(this.web3));
    }

    connectConfigurationContract() {
        var configurationContract = new this.web3.eth.Contract([{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"removeAdmin","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"}],"name":"unprotect","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"isAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"},{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"addAdmin","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"}],"name":"protect","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"}],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"}]);
        configurationContract._address = '0xb25170c12010c80a8f242debc219d3c88fb1caee';
        configurationContract.methods.isAdmin('0x28181a0143fEe43565861b0FCfeC6040E3c44258').call({from: '0x28181a0143fee43565861b0fcfec6040e3c44258'}, function(error, result) {
            console.log(error);
            console.log(result);
        });
    }
}

var app = new Application();
app.bootstrap();