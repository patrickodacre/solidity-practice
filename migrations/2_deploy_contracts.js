const ContractA = artifacts.require("./ContractA.sol");
const ContractB = artifacts.require("./ContractB.sol");

module.exports = async function (deployer) {
    await deployer.deploy(ContractA);
    await deployer.deploy(ContractB, ContractA.address)
};
