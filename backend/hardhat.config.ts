import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-laika";
import * as dotenv from "dotenv";

// Load ENV variables.
dotenv.config();

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
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY as string,
      ropsten: process.env.ETHERSCAN_API_KEY as string,
      rinkeby: process.env.ETHERSCAN_API_KEY as string,
      goerli: process.env.ETHERSCAN_API_KEY as string,
      kovan: process.env.ETHERSCAN_API_KEY as string,
      polygon: process.env.POLYGONSCAN_API_KEY as string,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY as string,
      optimism: process.env.OPTIMISMSCAN_API_KEY as string,
      optimismGoerli: process.env.OPTIMISMSCAN_API_KEY as string,
    },
    customChains: [
      {
        network: "optimismGoerli",
        chainId: 420,
        urls: {
          apiURL: "https://api-goerli-optimism.etherscan.io/api",
          browserURL: "https://goerli-optimism.etherscan.io",
        },
      },
      // {
      //   network: "skale",
      //   chainId: parseInt("0x785b4b9847b9"),
      //   urls: {
      //     apiURL: process.env.SKALE_API_URL as string,
      //     browserURL: process.env.SKALE_BLOCKEXPLORER_URL as string,
      //   },
      // },
    ],
  },
};

export default config;
