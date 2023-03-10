import dotenv from "dotenv";
import { EnvValue } from "./utils";

dotenv.config();

class Config {

    @EnvValue({
        name: 'BITCOIND_RPC_USERNAME',
        isRequired: true
    })
    BITCOIND_RPC_USERNAME!: string;
    
    @EnvValue({
        name: 'BITCOIND_RPC_PASSWORD',
        isRequired: true
    })
    BITCOIND_RPC_PASSWORD!: string;
    
    @EnvValue({
        name: 'BITCOIND_HOST',
        default: '127.0.0.1'
    })
    BITCOIND_HOST!: string;

    @EnvValue({
        name: 'BITCOIND_PORT',
        type: 'number',
        default: 8332
    })
    BITCOIND_PORT!: number;

    @EnvValue({
        name: 'WALLET',
        isRequired: true
    })
    WALLET!: string;

    @EnvValue({
        name: 'DEBUG',
        default: 'bitcoin-core'
    })
    DEBUG!: string

    @EnvValue({
        name: 'APP_PORT',
        default: 3000
    })
    APP_PORT!: number;

}

export const config = new Config();
