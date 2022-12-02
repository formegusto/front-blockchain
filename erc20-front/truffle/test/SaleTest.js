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

  beforeEach(async () => {
    erc20TokenInstance = await Erc20Token.new(
      tokenName,
      tokenSymbol,
      totalSupply
    );
    saleInstance = await Sale.new(1, wallet, erc20TokenInstance.address);
  });

  it("Smart contracts should be deployed", () => {
    expect(erc20TokenInstance.address).to.not.equal(0x00);
    expect(saleInstance.address).to.not.equal(0x00);
  });

  it("Buy", async () => {
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
      web3.utils.toWei("10", "ether")
    );
    expect(WalletBalanceOfDOneToken).to.be.bignumber.equal(
      web3.utils.toWei("103", "ether")
    );
  });
});
