# Crypto Journey ERC-20 Token smart contract

This Contract will have basic function of an ERC-20 Token.

WIll use have extra endpoints to place bets and to get a
random output from a bet.


# Run Locally
```sh
npx hardhat compile

npx hardhat node


npx hardhat run scripts/deploy.ts --network localhost
```

# Deploy to Testnet
```sh
npx hardhat run scripts/deploy.ts --network testnet
```

# Deploy to PROD
```sh
npx hardhat run scripts/deploy.ts --network prod
```