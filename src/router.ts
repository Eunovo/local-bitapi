import express, { Request, Response } from 'express';
import BitcoinCore from 'bitcoin-core';
import { getMessageFrom } from './utils';
import { config } from './config';

const router = express.Router();
const client = new BitcoinCore({
  host: config.BITCOIND_HOST,
  port: config.BITCOIND_PORT,
  username: config.BITCOIND_RPC_USERNAME,
  password: config.BITCOIND_RPC_PASSWORD
});

router.get('/transactions/:address', async (req: Request, res: Response) => {
  try {
    const address = req.params.address;
    const transactions = await client.getAddressTransactions(address);
    res.json(transactions);
  } catch (err: unknown) {
    res.status(500).json({ error: getMessageFrom(err) });
  }
});

router.get('/utxos/:address', async (req: Request, res: Response) => {
  try {
    const address = req.params.address;
    const utxos = await client.listUnspent(6, 99999999, [address]);
    res.json(utxos);
  } catch (err: unknown) {
    res.status(500).json({ error: getMessageFrom(err) });
  }
});

router.post('/broadcast', async (req: Request, res: Response) => {
  try {
    const rawTransaction = req.body.rawTransaction;
    const txid = await client.sendRawTransaction(rawTransaction);
    res.json({ txid });
  } catch (err: unknown) {
    res.status(500).json({ error: getMessageFrom(err) });
  }
});

export default router;
