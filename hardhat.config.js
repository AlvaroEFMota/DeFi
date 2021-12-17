/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const { alchemyApiKey, mnemonic } = require('./secrets.json');
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

require("@nomiclabs/hardhat-web3");
task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  //solidity: "0.8.0",
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.5.16",
        settings: {},
      },
    ],
  },

  defaultNetwork: "ropsten",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
//      accounts: [`0x${PRIVATE_KEY}`]
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    }
  },

  settings: {
    optimizer: {
      enabled: true
    }
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },

  mocha: {
    timeout: 20000
  }
};
