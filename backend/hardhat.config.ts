import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

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
    //   url: "https://staging-v2.skalenodes.com/v1/whispering-turais",
    //   accounts: [process.env.SKALE_PRIVATE_KEY as string],
    // },
    // optimism: {
    //   chainId: 10,
    //   url: "https://goerli.optimism.io/",
    //   accounts: [process.env.OPTIMISM_PRIVATE_KEY as string],
    // },
    // matic: {
    //   chainId: 80001,
    //   url: "https://rpc-mumbai.maticvigil.com",
    //   accounts: [process.env.POLYGON_PRIVATE_KEY as string],
    // },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "skale",
        chainId: parseInt("0x785b4b9847b9"),
        urls: {
          apiURL: process.env.SKALE_CHAIN_API_URL as string,
          browserURL: process.env.SKALE_BLOCKEXPLORER_URL as string,
        },
      },
    ],
  },
};

export default config;
