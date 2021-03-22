require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;
const blockchainurl = process.env.BLOCKCHAINURL


module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
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

  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
