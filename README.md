# Tobi-Solidity

## Getting Started

### Prepare Enviroment

```bash
cp .env.example .env
```

Set `PRIVATE_KEY`, `INFURA_API_KEY`, `ETHERSCAN_API_KEY`

- `PRIVATE_KEY` set as your private key of Ethereum account

- `INFURA_API_KEY` can generate in [https://app.infura.io/](https://app.infura.io/) (optional)

- `ETHERSCAN_API_KEY` can generate in [https://etherscan.io/](https://etherscan.io/) (optional)

### Install Dependencies

```bash
npm i
```

## Execute
 
```bash
# Compile
npm run compile
```

```bash
# Test
npm run test
```

```bash
# Deploy to Public Network
npm run deploy -- --network goerli --contract Kamui

npm run deploy -- --network sepolia --contract Kamui

npm run deploy -- --network polygon-mumbai --contract Kamui
```

```bash
# Clean and Re-compile
npm run clean
npm run compile
```


Now we support these network:

```ts
const chainIds = {
  goerli: 5,
  hardhat: 31337,
  sepolia: 11155111,
  'polygon-mumbai': 80001,
}
```

### Block Explorer Verify

```bash
npm run verify -- --network goerli --contract Kamui --file Kamui

npm run verify -- --network sepolia --contract Kamui --file Kamui

npm run verify -- --network polygon-mumbai --contract Kamui --file Kamui
```

This verify action need to have API key like `ETHERSCAN_API_KEY` in `.env` file
