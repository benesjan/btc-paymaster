import { RELAY_HUB } from '../config';
import { depositToRelayTx } from './txs/deposit-to-relay-tx';

const paymasterAddress = require('../lastDeployment.json').paymasterAddress;

async function main() {
    await depositToRelayTx(paymasterAddress, RELAY_HUB, '0.2');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
