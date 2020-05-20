import { ethers } from '@nomiclabs/buidler';
import { keccak256, toUtf8Bytes } from 'ethers/utils';

async function depositToRelayTx(paymasterAddress: string, relayHubAddress: string, etherAmount: string) {
    // const provider = ethers.getDefaultProvider('ropsten');
    // const walletWithProvider = new ethers.Wallet(PRIVATE_KEY, provider);

    // When using Buidler:
    const signer = (await ethers.getSigners())[0];

    // Function selector is the first 4 bytes of keccak256 hash of hex encoded string
    // 1 byte "takes" 2 characters in a hex string
    // Slicing from index 2 to get rid of 0x
    const functionSelector = keccak256(toUtf8Bytes('depositFor(address)')).slice(2, 10);
    // Remove '0x' from the beginning and pad to 32 bytes
    const methodArgument = '000000000000000000000000' + paymasterAddress.substr(2);

    let tx = {
        to: relayHubAddress,
        value: ethers.utils.parseEther(etherAmount),
        data: '0x' + functionSelector + methodArgument,
    };

    // The following process can be split to signing and sending if necessary
    await signer
        .sendTransaction(tx)
        .then((signedTx) => {
            console.log(`Depositing ether to the RelayHub, tx hash: ${signedTx.hash}, from: ${signedTx.from}`);
        })
        .catch((e) => {
            console.log(e);
        });
}

export { depositToRelayTx };
