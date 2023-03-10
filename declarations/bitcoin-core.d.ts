declare module 'bitcoin-core' {
    export interface BitcoinCoreOptions {
        host: string;
        port: number;
        username: string;
        password: string;
        timeout?: number;
        ssl?: boolean;
        sslStrict?: boolean;
        sslOptions?: any;
        maxRetries?: number;
        wallet?: string;
    }

    export interface Transaction {
        amount: number;
        confirmations: number;
        blockhash: string;
        blockindex: number;
        blocktime: number;
        txid: string;
        walletconflicts: any[];
        time: number;
        timereceived: number;
        "bip125-replaceable": string;
        details: {
            address: string;
            category: string;
            amount: number;
            label?: string;
            vout: number;
        }[];
        hex: string;
    }

    export interface UTXO {
        txid: string;
        vout: number;
        address: string;
        scriptPubKey: string;
        amount: number;
        confirmations: number;
        spendable: boolean;
    }

    export default class BitcoinCore {
        constructor(options: BitcoinCoreOptions);
        getAddressInfo(address: string): Promise<{ labels: string[] }>;
        getRawTransaction(txid: string): Promise<string>;
        getTransaction(txid: string): Promise<{ txid: string, hex: string }>;
        decodeRawTransaction(hex: string): Promise<unknown>;
        importAddress(address: string, label: string, rescan: boolean): Promise<unknown>;
        listTransactions(label: string, count: number, skip: number, includeWatchOnly: boolean, options?: any): Promise<Transaction[]>;
        listUnspent(minConfirmations: number, maxConfirmations: number, addresses: string[], options?: any): Promise<UTXO[]>;
        sendRawTransaction(transaction: string, options?: any): Promise<string>;
    }
}
