import { ethers, hardhatArguments, run } from "hardhat";

async function main() {
  // Get the ABI json structure and build a factory.
  const CryptoJourneyABI = await ethers.getContractFactory("CryptoJourney");

  // Constructor arguments.
  const name = "CryptoJourney";
  const symbol = "JRNY";
  const initialValue = 1_000_000;
  let randomNumberContractAddress: string;

  if (hardhatArguments.network === "optimism") {
    randomNumberContractAddress = "0x46B477a13526Bf7D95C62a5bf127Bbec07d7857B";
  } else if (hardhatArguments.network === "mumbai") {
    randomNumberContractAddress = "0xca62f04Dd112aCc05305C2352A598d92FD671E66";
  } else {
    randomNumberContractAddress = "0x0000000000000000000000000000000000000000";
  }

  // Deploy the contract
  const CryptoJourneyContract = await CryptoJourneyABI.deploy(
    name,
    symbol,
    initialValue,
    randomNumberContractAddress
  );

  // 🚀
  const result = await CryptoJourneyContract.deployed();
  console.log(`Contract has been deployed successfully`);
  console.log(`Contract Address: ${result.address}`);

  await run("laika-sync", {
    contract: "CryptoJourney",
    address: result.address,
  });

  // Wait 1 minute to verify the contracts.
  console.log("Wait 1 minute to verify the contracts");
  await new Promise((f) => setTimeout(f, 30000));
  console.log("30 Seconds more...");
  await new Promise((f) => setTimeout(f, 30000));
  
  await run("verify:verify", {
    address: result.address,
    constructorArguments: [
      name,
      symbol,
      initialValue,
      randomNumberContractAddress,
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
