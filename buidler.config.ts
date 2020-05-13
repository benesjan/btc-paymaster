import { BuidlerConfig, usePlugin } from "@nomiclabs/buidler/config";
import * as dotenv from "dotenv";

usePlugin("@nomiclabs/buidler-ethers");
usePlugin("@nomiclabs/buidler-etherscan");

dotenv.config();

const NETWORK: string = <string> process.env.NETWORK;
const INFURA_PROJECT_ID: string = <string> process.env.INFURA_PROJECT_ID;
const PRIVATE_KEY: string = <string> process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = <string> process.env.ETHERSCAN_API_KEY;

const config: BuidlerConfig = {
    defaultNetwork: NETWORK,
    solc: {
        version: "0.6.7"
    },
    networks: {
        ropsten: {
            url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [PRIVATE_KEY]
        }
    },
    etherscan: {
        url: "https://api-rinkeby.etherscan.io/api",
        apiKey: ETHERSCAN_API_KEY
    }
};

export default config;