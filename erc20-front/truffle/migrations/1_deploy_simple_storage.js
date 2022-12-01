const Erc20Token = artifacts.require("Erc20Token");
const Sale = artifacts.require("Sale");

module.exports = function (deployer) {
  const tokenName = "Done";
  const tokenSymbol = "DO";
  const totalSupply = 10;

  deployer.deploy(Erc20Token, tokenName, tokenSymbol, totalSupply);
};
