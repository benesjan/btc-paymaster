import { ethers } from '@nomiclabs/buidler';
import { TORNADO_PBTC_INSTANCES, TornadoInstance } from '../config';
const deployment = require('../lastDeployment.json');

async function main() {
    const BtcPaymaster = await ethers.getContractFactory('BtcPaymaster');
    const btcPaymaster = BtcPaymaster.attach(deployment.paymasterAddress);

    console.log(`Contract address: ${btcPaymaster.address}`);

    for (let i = 0; i < TORNADO_PBTC_INSTANCES.length; i++) {
        let instance: TornadoInstance = TORNADO_PBTC_INSTANCES[i];
        let tx = await btcPaymaster.addTarget(instance.address, instance.denomination);
        console.log(
            `Adding instance ${instance.address} (denomination: ${instance.denomination}) to the mapping of targets, tx hash: ${tx.hash}.`,
        );
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
