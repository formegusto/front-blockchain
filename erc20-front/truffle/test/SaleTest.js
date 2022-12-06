const chai = require("chai");
const BN = web3.utils.BN;
chai.use(require("chai-bn")(BN));
const { expect } = require("chai");

const Erc20Token = artifacts.require("Erc20Token");
const Sale = artifacts.require("Sale");

contract("Sale Test", async (accounts) => {
  let erc20TokenInstance;
  let saleInstance;

  let [deployer, buyer, wallet] = accounts;
  const tokenName = "DOne";
  const tokenSymbol = "DO";
  const totalSupply = await web3.utils.toWei("10", "ether");
  const hardCap = web3.utils.toWei("1", "ether");

  beforeEach(async () => {
    erc20TokenInstance = await Erc20Token.new(
      tokenName,
      tokenSymbol,
      totalSupply
    );

    let openingTime = new Date(2022, 11, 6, 15, 40, 00);
    openingTime = Math.floor(openingTime.getTime() / 1000);
    let closingTime = new Date(2022, 11, 6, 15, 45, 00);
    closingTime = Math.floor(closingTime.getTime() / 1000);
    saleInstance = await Sale.new(
      1,
      wallet,
      erc20TokenInstance.address,
      hardCap,
      openingTime,
      closingTime
    );
  });

  it("Smart contracts should be deployed", () => {
    expect(erc20TokenInstance.address).to.not.equal(0x00);
    expect(saleInstance.address).to.not.equal(0x00);
  });

  it.only("Buy", async () => {
    /*
    Error: Returned error: VM Exception while processing transaction: revert ERC20: transfer amount exceeds balance
    현재 Sale Smart Contract에 DOne Token이 없기 때문에 나타나는 에러
    */

    await erc20TokenInstance.transfer(
      saleInstance.address,
      web3.utils.toWei("10", "ether"),
      {
        from: deployer,
      }
    );

    await saleInstance.addMyWhitelist(buyer, { from: deployer });
    const isBuyerInMyWhitelist = await saleInstance.myWhitelist(buyer);
    expect(isBuyerInMyWhitelist).to.be.equal(true);
    /*
    out of gas
    */
    await web3.eth.sendTransaction({
      from: buyer,
      to: saleInstance.address,
      value: web3.utils.toWei("1", "ether"),
      gas: 3000000,
    });

    const BuyerBalanceOfDOneToken = await erc20TokenInstance.balanceOf(buyer);
    const WalletBalanceOfDOneToken = await web3.eth.getBalance(wallet);

    expect(BuyerBalanceOfDOneToken).to.be.bignumber.equal(
      web3.utils.toWei("1", "ether")
    );
    expect(WalletBalanceOfDOneToken).to.be.bignumber.equal(
      web3.utils.toWei("106", "ether")
    );
  });
});
