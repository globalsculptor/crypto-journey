import { ethers } from "hardhat";

async function main() {
  const initial_amount = 1_000_000;

  const ERC20 = await ethers.getContractFactory("ERC20");
  const TokenContract = await ERC20.deploy("CryptoJourney", "JRNY");

  await TokenContract.deployed();
  console.log(
    `Contract has been deployed successfully with ${initial_amount} initial tokens`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
