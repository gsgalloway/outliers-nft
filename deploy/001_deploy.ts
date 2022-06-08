import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, admin } = await getNamedAccounts();
  const { deploy } = hre.deployments;
  await deploy("OutliersNFT", {
    from: deployer,
    args: [
      admin, // admin
      "Outliers", // name
      "OUTLIER", // symbol
    ],
  });
};
export default func;
