import { TARGET_MAINNET } from '@/utils/env';

export const WalletName = {
  MetaMask: 'MetaMask',
  CoinBase: 'CoinBase',
  Math: 'Math Wallet',
  NeoLine: 'NeoLine',
  NeoLineN3: 'NeoLineN3',
  O3: 'O3',
  Binance: 'Binance',
  Cyano: 'Cyano',
  WalletConnect: 'WalletConnnect',
  StarMask: 'StarMask',
};

export const ChainId = {
  Poly: 0,
  Eth: 2,
  Ont: 3,
  Neo: TARGET_MAINNET ? 4 : 5,
  N3: TARGET_MAINNET ? 14 : 88,
  xDai: TARGET_MAINNET ? 20 : 206,
  HSC: TARGET_MAINNET ? 28 : 603,
  Harmony: TARGET_MAINNET ? 27 : 800,
  BYTOM: TARGET_MAINNET ? 29 : 701,
  Bsc: TARGET_MAINNET ? 6 : 79,
  Heco: 7,
  Ok: TARGET_MAINNET ? 12 : 200,
  Palette: TARGET_MAINNET ? 8 : 107,
  Polygon: TARGET_MAINNET ? 17 : 202,
  Arbitrum: TARGET_MAINNET ? 19 : 205,
  Optimistic: TARGET_MAINNET ? 23 : 210,
  Boba: TARGET_MAINNET ? 25 : 400,
  Oasis: TARGET_MAINNET ? 26 : 500,
  Fantom: TARGET_MAINNET ? 22 : 208,
  Avalanche: TARGET_MAINNET ? 21 : 209,
  Metis: TARGET_MAINNET ? 24 : 300,
  Pixie: TARGET_MAINNET ? 316 : 316,
  Rinkeby: TARGET_MAINNET ? 402 : 402,
  Oasis1: TARGET_MAINNET ? 501 : 501,
  Stc: TARGET_MAINNET ? 31 : 318,
  Kcc: TARGET_MAINNET ? 30 : 900,
  OntEvm: TARGET_MAINNET ? 333 : 333,
  BcsPalette: TARGET_MAINNET ? 1001 : 1001,
  BcsPalette2: TARGET_MAINNET ? 1002 : 1002,
  Milkomeda: TARGET_MAINNET ? 810 : 810,
  Kava: TARGET_MAINNET ? 32 : 920,
  Cube: TARGET_MAINNET ? 35 : 930,
  Xrp: TARGET_MAINNET ? 27 : 223,
};

export const NetworkChainIdMaps = {
  [TARGET_MAINNET ? 1 : 3]: ChainId.Eth,
  [TARGET_MAINNET ? 56 : 97]: ChainId.Bsc,
  [TARGET_MAINNET ? 128 : 256]: ChainId.Heco,
  [TARGET_MAINNET ? 66 : 65]: ChainId.Ok,
  [TARGET_MAINNET ? 100 : 77]: ChainId.xDai,
  [TARGET_MAINNET ? 70 : 70]: ChainId.HSC,
  [TARGET_MAINNET ? 188 : 189]: ChainId.BYTOM,
  [TARGET_MAINNET ? 1666600000 : 1666700000]: ChainId.Harmony,
  [TARGET_MAINNET ? 137 : 80001]: ChainId.Polygon,
  [TARGET_MAINNET ? 1718 : 101]: ChainId.Palette,
  [TARGET_MAINNET ? 42161 : 421611]: ChainId.Arbitrum,
  [TARGET_MAINNET ? 10 : 69]: ChainId.Optimistic,
  [TARGET_MAINNET ? 250 : 4002]: ChainId.Fantom,
  [TARGET_MAINNET ? 43114 : 43113]: ChainId.Avalanche,
  [TARGET_MAINNET ? 1088 : 588]: ChainId.Metis,
  [TARGET_MAINNET ? 6626 : 666]: ChainId.Pixie,
  [TARGET_MAINNET ? 4 : 4]: ChainId.Rinkeby,
  [TARGET_MAINNET ? 288 : 28]: ChainId.Boba,
  [TARGET_MAINNET ? 42262 : 42261]: ChainId.Oasis,
  [TARGET_MAINNET ? 321 : 322]: ChainId.Kcc,
  [TARGET_MAINNET ? 58 : 5851]: ChainId.OntEvm,
  [TARGET_MAINNET ? 104 : 104]: ChainId.BcsPalette,
  [TARGET_MAINNET ? 200 : 200]: ChainId.BcsPalette2,
  [TARGET_MAINNET ? 2001 : 200101]: ChainId.Milkomeda,
  [TARGET_MAINNET ? 2222 : 2221]: ChainId.Kava,
  [TARGET_MAINNET ? 1818 : 1819]: ChainId.Cube,
};

export const EthNetworkChainIdMaps = {
  [ChainId.Eth]: TARGET_MAINNET ? 1 : 3,
  [ChainId.Bsc]: TARGET_MAINNET ? 56 : 97,
  [ChainId.Heco]: TARGET_MAINNET ? 128 : 256,
  [ChainId.Ok]: TARGET_MAINNET ? 66 : 65,
  [ChainId.xDai]: TARGET_MAINNET ? 100 : 77,
  [ChainId.Harmony]: TARGET_MAINNET ? 1666600000 : 1666700000,
  [ChainId.HSC]: TARGET_MAINNET ? 70 : 70,
  [ChainId.BYTOM]: TARGET_MAINNET ? 188 : 189,
  [ChainId.Polygon]: TARGET_MAINNET ? 137 : 80001,
  [ChainId.Palette]: TARGET_MAINNET ? 1718 : 101,
  [ChainId.Arbitrum]: TARGET_MAINNET ? 42161 : 421611,
  [ChainId.Optimistic]: TARGET_MAINNET ? 10 : 69,
  [ChainId.Fantom]: TARGET_MAINNET ? 250 : 4002,
  [ChainId.Avalanche]: TARGET_MAINNET ? 43114 : 43113,
  [ChainId.Metis]: TARGET_MAINNET ? 1088 : 588,
  [ChainId.Pixie]: TARGET_MAINNET ? 6626 : 666,
  [ChainId.Rinkeby]: TARGET_MAINNET ? 4 : 4,
  [ChainId.Boba]: TARGET_MAINNET ? 288 : 28,
  [ChainId.Oasis]: TARGET_MAINNET ? 42262 : 42261,
  [ChainId.Kcc]: TARGET_MAINNET ? 321 : 322,
  [ChainId.OntEvm]: TARGET_MAINNET ? 58 : 5851,
  [ChainId.BcsPalette]: TARGET_MAINNET ? 104 : 104,
  [ChainId.BcsPalette2]: TARGET_MAINNET ? 200 : 200,
  [ChainId.Milkomeda]: TARGET_MAINNET ? 2001 : 200101,
  [ChainId.Kava]: TARGET_MAINNET ? 2222 : 2221,
  [ChainId.Cube]: TARGET_MAINNET ? 1818 : 1819,
  [ChainId.Stc]: TARGET_MAINNET ? 1 : 251,
};

export const SingleTransactionStatus = {
  Failed: -1,
  Pending: 1,
  Done: 2,
};

export const TransactionStatus = {
  Failed: -1,
  Finished: 0,
  Pending: 1,
  SourceDone: 2,
  SourceConfirmed: 3,
  PolyConfirmed: 4,
};
