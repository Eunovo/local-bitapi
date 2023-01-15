import express, { Request, Response } from 'express';
import BitcoinCore from 'bitcoin-core';
import { getMessageFrom } from './utils';
import { config } from './config';

const router = express.Router();
const client = new BitcoinCore({
  host: config.BITCOIND_HOST,
  port: config.BITCOIND_PORT,
  username: config.BITCOIND_RPC_USERNAME,
  password: config.BITCOIND_RPC_PASSWORD,
  wallet: config.WALLET
});

router.post('/import-address', async (req: Request, res: Response) => {
  try {
    const address = req.body.address;
    const label = req.body.label;
    await client.importAddress(address, label ?? "", true);
    res.json({ message: 'success' });
  } catch (err: unknown) {
    res.status(500).json({ error: getMessageFrom(err) });
  }
});

router.get('/transactions/:address', async (req: Request, res: Response) => {
  try {
    const address = req.params.address;
    const { labels } = await client.getAddressInfo(address);
    const transactions = await client.listTransactions(labels[0], 10, 0, true);
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

router.post('/transaction', async (req: Request, res: Response) => {
  try {
    const rawTransaction = req.body.rawTransaction;
    const txid = await client.sendRawTransaction(rawTransaction);
    res.json({ txid });
  } catch (err: unknown) {
    res.status(500).json({ error: getMessageFrom(err) });
  }
});

export default router;
