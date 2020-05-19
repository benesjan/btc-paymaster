import { ethers } from '@nomiclabs/buidler';
import { FEE, ERC20_TOKEN, TORNADO_PBTC_INSTANCES, RELAY_HUB } from '../config';
import * as fs from 'fs';

async function main() {
    const BtcPaymaster = await ethers.getContractFactory('BtcPaymaster');
    const btcPaymaster = await BtcPaymaster.deploy(FEE, ERC20_TOKEN);

    console.log(`Contract address: ${btcPaymaster.address}`);
    console.log(`Tx hash: ${btcPaymaster.deployTransaction.hash}`);

    // The contract is NOT deployed yet; we must wait until it is mined
    await btcPaymaster.deployed();

    fs.writeFile('lastDeployment.json', JSON.stringify({ paymasterAddress: btcPaymaster.address }), 'utf8', () => {
        console.log('Contract address saved to lastDeployment.json');
    });

    let tx = await btcPaymaster.setRelayHub(RELAY_HUB);

    console.log(`Setting RelayHub address to ${RELAY_HUB}, tx hash: ${tx.hash}.`);

    for (let i = 0; i < TORNADO_PBTC_INSTANCES.length; i++) {
        let instance = TORNADO_PBTC_INSTANCES[i];
        tx = await btcPaymaster.addTarget(instance.address, instance.denomination);
        console.log(`Adding instance ${instance.address} to the mapping of targets, tx hash: ${tx.hash}.`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
