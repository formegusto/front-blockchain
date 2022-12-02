const Erc20Token = artifacts.require("Erc20Token");
const Sale = artifacts.require("Sale");

module.exports = async function (deployer, network, accounts) {
  /*
  network : 사용하고 있는 네트워크 정보
  accounts : 네트워크의 계정 갯수
  */
  const tokenName = "Done";
  const tokenSymbol = "DO";
  const totalSupply = web3.utils.toWei("100", "ether");

  deployer.deploy(Erc20Token, tokenName, tokenSymbol, totalSupply);

  const DOToken = await Erc20Token.deployed();
  deployer.deploy(Sale, 1, accounts[0], DOToken.address);
};
