const PraticaAssicurativa = artifacts.require("PraticaAssicurativa");

module.exports = function (deployer) {
  deployer.deploy(PraticaAssicurativa);
};
