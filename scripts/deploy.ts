import { ethers } from '@nomiclabs/buidler';
import { FEE, ERC20_TOKEN, TORNADO_PBTC_INSTANCES_ADDRESSES, RELAY_HUB } from '../config';

async function main() {
    const BtcPaymaster = await ethers.getContractFactory('BtcPaymaster');
    const btcPaymaster = await BtcPaymaster.deploy(FEE, ERC20_TOKEN);

    console.log(`Contract address: ${btcPaymaster.address}`);
    console.log(`Tx hash: ${btcPaymaster.deployTransaction.hash}`);

    // The contract is NOT deployed yet; we must wait until it is mined
    await btcPaymaster.deployed();

    let tx = await btcPaymaster.setRelayHub(RELAY_HUB);
    console.log(`Setting RelayHub address to ${RELAY_HUB}, tx hash: ${tx.hash}.`);

    for (let i = 0; i < TORNADO_PBTC_INSTANCES_ADDRESSES.length; i++) {
        let instanceAddress = TORNADO_PBTC_INSTANCES_ADDRESSES[i];
        tx = await btcPaymaster.addTarget(instanceAddress);
        console.log(`Adding instance ${instanceAddress} to the mapping of targets, tx hash: ${tx.hash}.`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
