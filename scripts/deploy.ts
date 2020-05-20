import { ethers } from '@nomiclabs/buidler';
import { FEE, ERC20_TOKEN, RELAY_HUB, TORNADO_PBTC_INSTANCES } from '../config';
import * as fs from 'fs';
import { depositToRelayTx } from './txs/deposit-to-relay-tx';

async function main() {
    const BtcPaymaster = await ethers.getContractFactory('BtcPaymaster');
    const btcPaymaster = await BtcPaymaster.deploy(FEE, ERC20_TOKEN);

    console.log(`Contract address: ${btcPaymaster.address}`);
    console.log(`Tx hash: ${btcPaymaster.deployTransaction.hash}`);

    // The contract is NOT deployed yet; we must wait until it is mined
    await btcPaymaster.deployed();

    // Save the contract address to a file
    fs.writeFile('lastDeployment.json', JSON.stringify({ paymasterAddress: btcPaymaster.address }), 'utf8', () => {
        console.log('Contract address saved to lastDeployment.json');
    });

    let tx = await btcPaymaster.setRelayHub(RELAY_HUB);

    console.log(`Setting RelayHub address to ${RELAY_HUB}, tx hash: ${tx.hash}.`);

    for (let i = 0; i < TORNADO_PBTC_INSTANCES.length; i++) {
        tx = await btcPaymaster.addTarget(TORNADO_PBTC_INSTANCES[i]);
        console.log(`Adding instance ${TORNADO_PBTC_INSTANCES[i]} to the mapping of targets, tx hash: ${tx.hash}.`);
    }

    await depositToRelayTx(btcPaymaster.address, RELAY_HUB, '0.2');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
