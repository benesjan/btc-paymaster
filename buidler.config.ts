// eslint-disable-next-line no-unused-vars
import { BuidlerConfig, usePlugin } from '@nomiclabs/buidler/config';
import { NETWORK, INFURA_PROJECT_ID, PRIVATE_KEY, ETHERSCAN_API_KEY } from './config';

usePlugin('@nomiclabs/buidler-ethers');
usePlugin('@nomiclabs/buidler-etherscan');

const ETHERSCAN_API_PREFIX: string = NETWORK === 'mainnet' ? 'api' : `api-${NETWORK}`;

const config: BuidlerConfig = {
    defaultNetwork: NETWORK,
    solc: {
        version: '0.6.7',
    },
    networks: {
        ropsten: {
            url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        url: `https://${ETHERSCAN_API_PREFIX}.etherscan.io/api`,
        apiKey: ETHERSCAN_API_KEY,
    },
};

export default config;
