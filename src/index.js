
class Application {
    bootstrap() {
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8546"));
        this.client = new Client(new Harbour(this.web3));
    }
}

var app = new Application();
app.bootstrap();