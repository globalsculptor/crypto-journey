import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

// Load ENV variables.
dotenv.config();

console.log(process.env)

const config: HardhatUserConfig = {
  solidity: "0.8.17",

  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      // See its defaults
    },
    // skale: {
    //   url: process.env.SKALE_API_URL,
    //   accounts: [`0x${process.env.SKALE_PRIVATE_KEY}`],
    // },
    optimism: {
      url: process.env.OPTIMISM_API_URL as string,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
    },
    mumbai: {
      url: process.env.POLYGON_API_URL,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    // customChains: [
    //   {
    //     network: "skale",
    //     chainId: parseInt("0x785b4b9847b9"),
    //     urls: {
    //       apiURL: process.env.SKALE_API_URL as string,
    //       browserURL: process.env.SKALE_BLOCKEXPLORER_URL as string,
    //     },
    //   },
    // ],
  },
};

export default config;
