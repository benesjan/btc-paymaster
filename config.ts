const ERC20_TOKEN_DECIMALS: number = 18;
// pBTC has 18 decimals - 10^15 = 'denomination':0.0001 pBTC ~1USD
const FEE: number = 0.0001 * 10 ** ERC20_TOKEN_DECIMALS;
const ERC20_TOKEN: string = '0xEB770B1883Dcce11781649E8c4F1ac5F4B40C978';
const INFURA_PROJECT_ID: string = 'e1fcdf9db95a4681b681e54551eb8004';
// private key for address 0x63A15fdAD87b93261e79a74C07851F900F781Af3
const PRIVATE_KEY: string = '0xF8D46A5469433C4369BA77749B760F46208066F92EB9D9DCC31F26D4355DE157';
// API key necessary for etherscan verification
const ETHERSCAN_API_KEY: string = 'CVXPRKFAX12TIFMFS4E1DMTYA6JD1J83UN';
const RELAY_HUB: string = '0xef46dd512bcd36619a6531ca84b188b47d85124b';

interface TornadoInstance {
    address: string;
    denomination: string;
}

const TORNADO_PBTC_INSTANCES: TornadoInstance[] = [
    { address: '0x8425EBC05AC74338838A0D99Db495906dF2eAe22', denomination: `${0.001 * 10 ** ERC20_TOKEN_DECIMALS}` },
    { address: '0x2f2d3E612F3341eCDA859f2eB51b3a51b8eB62BB', denomination: `${0.01 * 10 ** ERC20_TOKEN_DECIMALS}` },
    { address: '0xE9CaA191fc0D5E0C7fEE83b39F008Ba89b75df13', denomination: `${0.1 * 10 ** ERC20_TOKEN_DECIMALS}` },
];

export {
    FEE,
    ERC20_TOKEN,
    INFURA_PROJECT_ID,
    PRIVATE_KEY,
    ETHERSCAN_API_KEY,
    RELAY_HUB,
    TornadoInstance,
    TORNADO_PBTC_INSTANCES,
};
