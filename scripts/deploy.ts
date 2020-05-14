import { ethers } from '@nomiclabs/buidler';
import { FEE, ERC20_TOKEN, TORNADO_PBTC_INSTANCES_ADDRESSES } from '../config';

async function main() {
    const BtcPaymaster = await ethers.getContractFactory('BtcPaymaster');
    const btcPaymaster = await BtcPaymaster.deploy(FEE, ERC20_TOKEN);

    console.log(`Contract address: ${btcPaymaster.address}`);
    console.log(`Tx hash: ${btcPaymaster.deployTransaction.hash}`);

    // The contract is NOT deployed yet; we must wait until it is mined
    await btcPaymaster.deployed();

    for (let i = 0; i < TORNADO_PBTC_INSTANCES_ADDRESSES.length; i++) {
        let instanceAddress = TORNADO_PBTC_INSTANCES_ADDRESSES[i];
        let tx = await btcPaymaster.addTarget(instanceAddress);
        console.log(`Adding instance ${instanceAddress} to the mapping of targets, tx hash: ${tx.hash}.`);
        await tx.wait();
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
