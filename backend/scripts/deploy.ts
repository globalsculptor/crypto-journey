import { ethers } from "hardhat";

async function main() {
  // Get the ABI json structure and build a factory.
  const CryptoJourneyABI = await ethers.getContractFactory("CryptoJourney");

  // Deploy the contract
  const CryptoJourneyContract = await CryptoJourneyABI.deploy(
    "CryptoJourney",
    "JRNY",
    1_000_000
  );

  // 🚀
  await CryptoJourneyContract.deployed();
  console.log(`Contract has been deployed successfully`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
