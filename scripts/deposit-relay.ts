import { RELAY_HUB } from '../config';
import { depositToRelay } from './txs/deposit-to-relay';

const paymasterAddress = require('../lastDeployment.json').paymasterAddress;

async function main() {
    await depositToRelay(paymasterAddress, RELAY_HUB);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
