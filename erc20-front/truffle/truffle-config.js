const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");
require("dotenv").config();
const mnemonic = process.env.MNEMONIC;

console.log(mnemonic);

module.exports = {
  contracts_build_directory: path.join(__dirname, "../client/src/contracts"),
  networks: {
    // truffle migrate --reset --network development
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    main: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://mainnet.infura.io/v3/34d116200be643378fd00a1f46bdaf78`
        ),
      network_id: 0x1,
      confirmations: 1,
      timeoutBlocks: 100000,
      skipDryRun: true,
    },
    // truffle migrate --reset --network goerli
    // https://rpc.info/
    goerli: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/34d116200be643378fd00a1f46bdaf78`
        ),
      network_id: 0x5,
      confirmations: 1,
      timeoutBlocks: 100000,
      skipDryRun: true,
    },
    bsct: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-1-s1.binance.org:8545`
        ),
      network_id: 97,
      confirmations: 1,
      timeoutBlocks: 100000,
      skipDryRun: true,
    },
    bsc: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 1,
      timeoutBlocks: 100000,
      skipDryRun: true,
    },
  },
  mocha: {
    timeout: 100000,
  },
  compilers: {
    solc: {
      version: "0.8.14",
    },
  },
};
