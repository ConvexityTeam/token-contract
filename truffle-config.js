require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;
const blockchainurl = process.env.BLOCKCHAINURL

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, blockchainurl);
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.11",    // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       }
      }
    }
  }
};
