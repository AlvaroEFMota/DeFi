/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const { alchemyApiKey, mnemonic } = require('./secrets.json');
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "ropsten",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
//      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
};
