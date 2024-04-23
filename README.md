
# Onchain Loteria

Welcome to **Onchain Loteria** - a blockchain-based reinterpretation of the classic Loteria game, integrated with unique Web3 elements. This project leverages Ethereum smart contracts for the game logic and NFT issuance, alongside a Next.js application for a responsive and interactive user interface.

## Overview

Onchain Loteria is a decentralized application (dApp) where users can mint, collect, and trade NFTs representing characters from the Web3 universe, each with their unique traits and stories. This project aims to provide an engaging and educational platform for users to learn about blockchain and NFTs while participating in a culturally rich game.

## Features

- **NFT Minting:** Users can mint NFTs directly from the web interface.
- **Airdrop Functionality:** Admins can distribute NFTs to players via airdrops.
- **Interactive UI:** A dynamic front end built with Next.js to interact with the Ethereum blockchain.
- **Discounts on Bulk Purchases:** Offers discounts for purchasing NFTs in bulk.
- **Royalty Distribution:** Implements EIP-2981 for royalty management on secondary sales.

## Technologies Used

- **Solidity**: Smart contract programming for Ethereum.
- **Next.js**: Server-side rendered React framework for building the user interface.
- **Foundry**: Smart contract compilation, testing, and deployment.
- **Ethers.js**: Ethereum wallet implementation and interaction library.
- **Hardhat**: For local Ethereum network emulation alongside Foundry.
- **Syndicate**: Integration tool for decentralized autonomous organizations (DAOs), enhancing community governance and shared treasury management.
- **Airstack**: Advanced querying tool for blockchain data, facilitating complex queries across multiple blockchains.
- **Frog.fm** (Farcaster Frames Framework): Framework for building applications within the - **Farcaster ecosystem.
- **Pinata**: Service for pinning data to IPFS, ensuring decentralized storage and availability.
- **Farcaster Auth Kit**: Enables user authentication and interaction within the Farcaster social network ecosystem.

## Syndicate

 Leveraging the power of Syndicate’s Transaction Cloud, this platform is designed to handle the complexities of blockchain transactions at scale. Whether you're managing live events with high transaction volumes or everyday operations across multiple EVM chains, Syndicate's infrastructure is built to support anywhere from thousands to millions of transactions seamlessly. It alleviates the burden from developers by managing wallets, private keys, and gas tokens within a secure, enterprise-grade environment. Transactions are processed through simple HTTP REST APIs that offer resilience, fault tolerance, and guaranteed idempotency, allowing developers to focus on creating exceptional user experiences without the overhead of managing complex web3 infrastructure. 
 
 Syndicate provides a robust solution for decentralized autonomous organizations (DAOs), enhancing community governance and efficient treasury management. This service ensures high throughput and reduced operational costs during demanding scenarios, making it ideal for applications requiring robust transaction management in real-time events.

## Airstack

Airstack is utilized within this project to perform advanced queries on blockchain data, specifically for NFT ownership data in relation to Farcaster identities. This allows for a seamless integration where users can verify NFT ownership and link it to their social identities on Farcaster. Below is an example of how you might query NFT balances against a ## Farcaster identity using Airstack:

```javascript
const query = `
  query MyQuery {
    Degen: TokenBalances(
      input: {
        filter: {
          owner: {_eq: "fc_fid:325850"},
          tokenAddress: {_eq: "${process.env.NFT_CONTRACT}"},
          tokenId: {}
        },
        blockchain: degen,
        limit: 50
      }
    ) {
      TokenBalance {
        amount
        tokenAddress
        tokenId
        tokenType
        tokenNfts {
          tokenURI
        }
        owner {
          identity
          addresses
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }
`;
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- pnpm or npm
- Foundry for smart contract testing and deployment
- MetaMask installed and set up in your browser

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-repository/onchain-loteria.git
cd onchain-loteria
```

2. **Install dependencies**

```bash
pnpm install # Install dependencies
```

3. **Setup Foundry**

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

4. **Compile and deploy contracts**

```bash
forge build
forge deploy --rpc-url <your_rpc_url> --private-key <your_private_key>
```

5. **Configure your frontend**

Edit the `.env.local` file in your Next.js project to include the smart contract addresses and any other relevant configurations.

```plaintext
NEXT_PUBLIC_CONTRACT_ADDRESS=<Deployed_Contract_Address>
NEXT_PUBLIC_INFURA_ID=<Your_Infura_Project_ID>
```

6. **.env.sample File**

- Rename the File: When setting up the project locally, copy or rename .env.sample to .env.
- Fill in the Blanks: Replace all placeholders (e.g., <your_key>, <contract_address>, <user>, <password>, etc.) with your actual environment-specific values. These values are essential for connecting to various services like blockchain networks, databases, and third-party APIs.
- Security: Never commit your .env file to version control. Ensure it is listed in your .gitignore file to prevent accidental exposure of sensitive data.
- Consistency: Keep the .env.sample file updated with all the necessary environment variables as your project evolves. This ensures new contributors can set up their development environment smoothly.

```bash
# .env.sample

# RPC URLs
RPC_URL="https://<network>.alchemy.com/v2/<your_key>"
RPC_OPTIMISM="https://opt-mainnet.alchemy.com/v2/<your_key>"

# NFT Contract Address
NFT_CONTRACT="0x<contract_address>"

# Syndicate API
SYNDICATE_PROJECT_ID="<your_project_id>"
SYNDICATE_API_KEY="<your_api_key>"

# Server and Database Configuration
URL='http://localhost:3000'
CONNECTION_STRING="mongodb+srv://<user>:<password>@<cluster-url>/<database>?tls=true&authSource=admin&replicaSet=<replica_set_id>"

# Owner Key
OWNER_KEY="0x<private_key>"

# AWS S3 Credentials
S3_SECRET_KEY="<your_secret_key>"
S3_ACCESS_KEY="<your_access_key>"

# Pinata API Keys
PINATA_SECRET_API_KEY="<your_secret_api_key>"
PINATA_API_KEY="<your_api_key>"

# OpenSea API Key
OPENSEA_API_KEY="<your_opensea_api_key>"

# Cron Job Secret
CRON_SECRET="<your_cron_secret>"

# Chain ID for EVM compatible networks
CHAIN_ID=<chain_id>

# Airstack API Key
AIRSTACK_API_KEY="<your_airstack_api_key>"
```


7. **Run the Next.js application**

```bash
pnpm dev
```

Navigate to `http://localhost:3000` to view the application.

## Smart Contract Functions

- **mintNFT(quantity)**: Mint the specified quantity of NFTs.
- **setMintPrice(newPrice)**: Set a new minting price for the NFTs.
- **airdrop(playerAddress)**: Airdrop an NFT to a specified address.
- **setTokenURI(tokenId, uri)**: Set or update the metadata URI for a specific token.

## Testing

To run tests on the smart contracts, use Foundry:

```bash
forge test
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your features or fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README file is designed to provide a comprehensive guide for developers looking to set up and run the Onchain Loteria project locally. It includes instructions for setup, usage, and contribution guidelines.