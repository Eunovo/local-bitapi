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

router.get('/transactions/by-txid/:txid', async (req: Request, res: Response) => {
  try {
    const txid = req.params.txid;
    const rawTxHex = await client.getRawTransaction(txid);
    const decodedTx = await client.decodeRawTransaction(rawTxHex);

    if (typeof decodedTx !== 'object')
      throw new Error("Unexpected transaction response");
    
      res.json({ ...decodedTx, hex: rawTxHex });
  } catch (err: unknown) {
    res.status(500).json({ error: getMessageFrom(err) });
  }
});

router.get('/transactions/by-address/:address', async (req: Request, res: Response) => {
  try {
    const address = req.params.address;
    const { labels } = await client.getAddressInfo(address);
    const rawTransactions = await client.listTransactions(labels[0], 20, 0, true);

    const decodedTransactions = await Promise.all(rawTransactions.map(async (tx) => {
      const rawTx = await client.getTransaction(tx.txid);
      const decodedTx = await client.decodeRawTransaction(rawTx.hex);

      if (typeof decodedTx !== 'object') return tx;
      return { ...tx, ...decodedTx };
    }));

    res.json(decodedTransactions);
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
