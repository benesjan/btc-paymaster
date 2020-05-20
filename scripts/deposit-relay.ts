import { ethers } from '@nomiclabs/buidler';
import { RELAY_HUB, PRIVATE_KEY } from '../config';
import { keccak256, toUtf8Bytes } from 'ethers/utils';
const paymasterAddress = require('../lastDeployment.json').paymasterAddress;

async function main() {
    const provider = ethers.getDefaultProvider('ropsten');
    const walletWithProvider = new ethers.Wallet(PRIVATE_KEY, provider);

    // function selector is the first 4 bytes of keccak256 hash of hex encoded string
    // in a hex string 1 byte "takes" 2 characters
    // slicing from index 2 to get rid of 0x
    const functionSelector = keccak256(toUtf8Bytes('depositFor(address)')).slice(2, 10);
    // Remove '0x' from the beginning and pad to 32 bytes
    const methodArgument = '000000000000000000000000' + paymasterAddress.substr(2);

    let tx = {
        to: RELAY_HUB,
        value: ethers.utils.parseEther('0.1'),
        data: '0x' + functionSelector + methodArgument,
    };

    await walletWithProvider
        .sendTransaction(tx)
        .then((signedTx) => {
            console.log(signedTx);
        })
        .catch((e) => {
            console.log(e);
        });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
