const ENAToken = artifacts.require("ENAToken");

module.exports = function(deployer) {
  deployer.deploy(ENAToken);
  console.log("ENA Token Contract has been deployed...")
};
