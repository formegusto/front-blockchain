const Simple3 = artifacts.require("Simple3");
const Simple4 = artifacts.require("Simple4");

module.exports = async (deployer) => {
  await deployer.deploy(Simple3, 55);
  await deployer.deploy(Simple4);
};
