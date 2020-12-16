const HDWalletProvider = require("@truffle/hdwallet-provider");  
const mnemonic = "net album planet version original salmon maple hidden hard raven actress plate";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/8876629da95840f8bd54ae4ddf54258c")
      },
      network_id: 3
    }
  }
};
