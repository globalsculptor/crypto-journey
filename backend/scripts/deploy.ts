import { ethers, hardhatArguments } from "hardhat";

async function main() {
  // Get the ABI json structure and build a factory.
  const CryptoJourneyABI = await ethers.getContractFactory("CryptoJourney");

  let randomNumberContractAddress;
  if (hardhatArguments.network === "optimism") {
    randomNumberContractAddress = "0x46B477a13526Bf7D95C62a5bf127Bbec07d7857B";
  } else if (hardhatArguments.network === "mumbai") {
    randomNumberContractAddress = "0xca62f04Dd112aCc05305C2352A598d92FD671E66";
  } else {
    randomNumberContractAddress = "0x0000000000000000000000000000000000000000"
  }

  // Deploy the contract
  const CryptoJourneyContract = await CryptoJourneyABI.deploy(
    "CryptoJourney",
    "JRNY",
    1_000_000,
    randomNumberContractAddress
  );

  // 🚀
  const result = await CryptoJourneyContract.deployed();
  console.log(`Contract has been deployed successfully`);
  console.log(`Contract Address: ${result.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
