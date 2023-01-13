# Local BitAPI

A NodeJS API built with Express and TypeScript, providing a simple and easy to use interface to interact with a local Bitcoind instance.

## Installation
1. Clone this repository
```sh
git clone https://github.com/username/local-bitapi.git
```

2. Install dependencies
```sh
yarn install
```

## Environment Variables
The following environment variables are required to be set:

```
BITCOIND_RPC_USERNAME: The username for connecting to the Bitcoind instance.
BITCOIND_RPC_PASSWORD: The password for connecting to the Bitcoind instance.
```
The following environment variables are optional and have default values:

```
BITCOIND_HOST: The host of the Bitcoind instance. Default: 127.0.0.1
BITCOIND_PORT: The port of the Bitcoind instance. Default: 8332
```

## Available Routes

```
GET /api/transactions/:address  # Retrieve the transactions for a specific address.
GET /api/utxos/:address # Retrieve the unspent transaction outputs (UTXOs) for a specific address.
POST /api/transaction # Broadcast a raw transaction to the Bitcoind instance.
```

## Usage
Start the server by running the following command:

```
yarn start
```

For development, use the following command to automatically recompile and restart the server on file changes:

```
yarn start:dev
```

**Make sure that your Bitcoind instance is running and configured to allow incoming connections.**
