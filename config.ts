// pBTC has 18 decimals - 10^15 = 0.001 pBTC
const FEE: number = 1000000000000000;
const ERC20_TOKEN: string = '0xEB770B1883Dcce11781649E8c4F1ac5F4B40C978';
const INFURA_PROJECT_ID: string = 'e1fcdf9db95a4681b681e54551eb8004';
// private key for address 0x63A15fdAD87b93261e79a74C07851F900F781Af3
const PRIVATE_KEY: string = '0xF8D46A5469433C4369BA77749B760F46208066F92EB9D9DCC31F26D4355DE157';
// API key necessary for etherscan verification
const ETHERSCAN_API_KEY: string = 'CVXPRKFAX12TIFMFS4E1DMTYA6JD1J83UN';

const TORNADO_PBTC_INSTANCES_ADDRESSES = [
    '0xb5c512E013c1f17a5ed157c557c6891558f1a719',
    '0x0bD3D556707bEFe41C6215Dc8bf06D81616D6112',
    '0x731a0e7c35dC9b7002be432770F78aF99f2FAf02',
];

export { FEE, ERC20_TOKEN, INFURA_PROJECT_ID, PRIVATE_KEY, ETHERSCAN_API_KEY, TORNADO_PBTC_INSTANCES_ADDRESSES };
