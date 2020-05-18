import { ethers } from '@nomiclabs/buidler';
import { TORNADO_PBTC_INSTANCES_ADDRESSES, LATEST_DEPLOYED_PAYMASTER } from '../config';

async function main() {
    const BtcPaymaster = await ethers.getContractFactory('BtcPaymaster');
    const btcPaymaster = BtcPaymaster.attach(LATEST_DEPLOYED_PAYMASTER);

    console.log(`Contract address: ${btcPaymaster.address}`);

    for (let i = 0; i < TORNADO_PBTC_INSTANCES_ADDRESSES.length; i++) {
        let instanceAddress = TORNADO_PBTC_INSTANCES_ADDRESSES[i];
        let tx = await btcPaymaster.addTarget(instanceAddress);
        console.log(`Adding instance ${instanceAddress} to the mapping of targets, tx hash: ${tx.hash}.`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
