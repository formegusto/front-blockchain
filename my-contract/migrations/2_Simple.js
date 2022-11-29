const Simple = artifacts.require("Simple");
const Simple2 = artifacts.require("Simple2");

module.exports = function (deployer) {
  deployer.deploy(Simple);
  deployer.deploy(Simple2);
};
