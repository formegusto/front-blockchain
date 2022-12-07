const Erc20Token = artifacts.require("Erc20Token");
const Sale = artifacts.require("Sale");

module.exports = async function (deployer, network, accounts) {
  const [deployerAddress, buyer1, buyer2, walletAddress] = accounts;
  /*
  network : 사용하고 있는 네트워크 정보
  accounts : 네트워크의 계정 갯수
  */
  const tokenName = "Done";
  const tokenSymbol = "DO";
  const totalSupply = web3.utils.toWei("100", "ether");

  await deployer.deploy(Erc20Token, tokenName, tokenSymbol, totalSupply);

  const erc20TokenInstance = await Erc20Token.deployed();
  const hardCap = web3.utils.toWei("10", "ether");

  let openingTime = new Date(2022, 11, 7, 14, 00, 00);
  openingTime = Math.floor(openingTime.getTime() / 1000);
  let closingTime = new Date(2022, 11, 7, 17, 00, 00);
  closingTime = Math.floor(closingTime.getTime() / 1000);

  await deployer.deploy(
    Sale,
    1,
    // accounts[0],
    walletAddress,
    erc20TokenInstance.address,
    hardCap,
    openingTime,
    closingTime,
    // accounts[0]
    deployerAddress
  );
  const saleInstance = await Sale.deployed();

  await erc20TokenInstance.approve(
    saleInstance.address,
    web3.utils.toWei("10", "ether"),
    { from: deployerAddress }
  );
  await saleInstance.addMyWhitelist(buyer1, { from: deployerAddress });
  await saleInstance.addMyWhitelist(buyer2, { from: deployerAddress });
};

// truffle migrate --reset
