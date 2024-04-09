import { WalletName, ChainId } from './enums';
import { TARGET_MAINNET } from './env';

export const HTTP_BASE_URL = TARGET_MAINNET
  ? 'https://bridge.poly.network/v1'
  : 'https://bridge.poly.network/testnet/v1';
//    'https://bridge.poly.network/merge/v1/bridge'
//  : 'https://bridge.poly.network/testnet/merge/v1/bridge';

export const HTTP_NFT_BASE_URL = TARGET_MAINNET
  ? 'https://bridge.poly.network/nft/v1'
  : 'https://bridge.poly.network/testnet/nft/v1';
//    'https://bridge.poly.network/merge/v1/nft'
//  : 'https://bridge.poly.network/testnet/merge/v1/nft';

export const WALLETS = [
  {
    name: WalletName.MetaMask,
    supportedChainIds: [
      ChainId.Eth,
      ChainId.Bsc,
      // ChainId.Heco,
      // ChainId.Ok,
      ChainId.Polygon,
      ChainId.Base,
      // ChainId.Palette,
      // ChainId.BcsPalette,
      // ChainId.BcsPalette2,
      // ChainId.Milkomeda,
      // ChainId.Arbitrum,
      // ChainId.xDai,
      // ChainId.HSC,
      // ChainId.Harmony,
      // ChainId.BYTOM,
      // ChainId.Optimistic,
      // ChainId.Boba,
      // ChainId.Fantom,
      ChainId.Avalanche,
      // ChainId.Metis,
      // ChainId.Pixie,
      // ChainId.Rinkeby,
      // ChainId.Oasis,
      // ChainId.Oasis1,
      // ChainId.Boba,
      // ChainId.Kcc,
      // ChainId.OntEvm,
      // ChainId.Cube,
      // ChainId.Kava,
    ],
    icon: require('@/assets/svg/meta-mask.svg'),
    downloadUrl:
      'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
  },
  {
    name: WalletName.CoinBase,
    supportedChainIds: [
      ChainId.Eth,
      ChainId.Bsc,
      ChainId.Heco,
      ChainId.Ok,
      ChainId.Polygon,
      ChainId.Base,
      ChainId.Palette,
      ChainId.BcsPalette,
      ChainId.Arbitrum,
      ChainId.xDai,
      ChainId.HSC,
      ChainId.Harmony,
      ChainId.BYTOM,
      ChainId.Optimistic,
      ChainId.Fantom,
      ChainId.Avalanche,
      ChainId.Metis,
      ChainId.Pixie,
      ChainId.Rinkeby,
      ChainId.Boba,
      ChainId.Oasis,
      ChainId.Kcc,
    ],
    icon: require('@/assets/png/coinbase.png'),
    downloadUrl:
      'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
  },
  {
    name: WalletName.Math,
    supportedChainIds: [ChainId.Eth, ChainId.Bsc, ChainId.Heco, ChainId.Ok],
    icon: require('@/assets/png/math.png'),
    downloadUrl:
      'https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc',
  },
  {
    name: WalletName.NeoLine,
    supportedChainIds: [ChainId.Neo],
    icon: require('@/assets/svg/neoline.svg'),
    downloadUrl:
      'https://chrome.google.com/webstore/detail/neoline/cphhlgmgameodnhkjdmkpanlelnlohao',
  },
  {
    name: WalletName.NeoLineN3,
    supportedChainIds: [ChainId.N3],
    icon: require('@/assets/svg/neoline.svg'),
    downloadUrl:
      'https://chrome.google.com/webstore/detail/neoline/cphhlgmgameodnhkjdmkpanlelnlohao',
  },
  {
    name: WalletName.O3,
    supportedChainIds: [ChainId.Neo],
    icon: require('@/assets/svg/o3.svg'),
    downloadUrl: 'https://o3.network/#download',
  },
  /* {
    name: WalletName.Binance,
    supportedChainIds: [ChainId.Bsc],
    icon: require('@/assets/svg/binance.svg'),
    downloadUrl:
      'https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp',
  }, */
  {
    name: WalletName.Cyano,
    supportedChainIds: [ChainId.Ont],
    icon: require('@/assets/svg/ONT.svg'),
    downloadUrl:
      'https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm',
  },
  {
    name: WalletName.StarMask,
    supportedChainIds: [ChainId.Stc],
    icon: require('@/assets/svg/stc.svg'),
    downloadUrl:
      'https://chrome.google.com/webstore/detail/starmask/mfhbebgoclkghebffdldpobeajmbecfk',
  },
  // ...(TARGET_MAINNET
  //   ? [
  {
    name: WalletName.WalletConnect,
    supportedChainIds: [ChainId.Eth],
    icon: require('@/assets/svg/wallet-connect.svg'),
    downloadUrl: 'https://walletconnect.org/wallets',
  },
  //   ]
  // : []),
];

export const CHAINS = [
  {
    id: ChainId.Poly,
    explorerUrl: TARGET_MAINNET
      ? 'http://explorer.poly.network/tx/{txHash}'
      : 'http://explorer.poly.network/testnet/tx/{txHash}',
    nftexplorerUrl: TARGET_MAINNET
      ? 'http://explorer.poly.network/nfttx/{txHash}'
      : 'http://explorer.poly.network/testnet/nfttx/{txHash}',
  },
  {
    id: ChainId.Eth,
    nativeFee: true,
    icon: require('@/assets/svg/eth.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://etherscan.io/tx/0x{txHash}'
      : 'https://ropsten.etherscan.io/tx/0x{txHash}',
    nftexplorerUrl: TARGET_MAINNET
      ? 'https://etherscan.io/tx/0x{txHash}'
      : 'https://ropsten.etherscan.io/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0x81910675DbaF69deE0fD77570BFD07f8E436386A'
      : //   : '0xe498fb7D00468a67A79dE5D4Ca264d3350165280',
        '0xc58eF4F49BBbd6bdfFeEA8159481C1AFAfBCFD0e',
    nftLockContractHash: TARGET_MAINNET
      ? '0x81910675DbaF69deE0fD77570BFD07f8E436386A'
      : '0x940300dc3Fc26e3A330a300be766184C0b5Fe019',
    pltNftLockContractHash: TARGET_MAINNET
      ? '0xD728e9844af285fA116806c273aa413686aE65e8'
      : '0xbaBaAF5CF7f63437755aAAFE7a4106463c5cD540',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    dst_ccm: TARGET_MAINNET
      ? '0x5a51e2ebf8d136926b9ca7b59b60464e7c44d2eb'
      : '0xf989E80AAd477cB6059f366C0170a498909C4a55',
    nftFeeName: 'ETH',
    symbol: 'ETH',
    name: TARGET_MAINNET ? 'Ethereum Mainnet' : 'Ropsten TestNet',
    rpcUrl: TARGET_MAINNET ? 'https://mainnet.infura.io/v3/' : 'https://ropsten.infura.io/v3/',
    chainExplorerUrl: TARGET_MAINNET ? 'https://etherscan.io/' : 'https://ropsten.etherscan.io/',
    selfPay: true,
  },
  {
    id: ChainId.N3,
    nativeFee: false,
    icon: require('@/assets/svg/neo.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://neo3.neotube.io/transaction/{txHash}'
      : 'https://neo3.testnet.neotube.io/transaction/{txHash}',
    lockContractHash: TARGET_MAINNET
      ? 'e83beaed1c6f7f56e03c97d96401c3125214c6f8'
      : 'c3ac0347e9c4f65b7fff383201a1551da4301e09',
    nftFeeContractHash: 'd2a4cff31913016155e38e474a2c06d08be276cf',
    nftFeeName: 'GAS',
    selfPay: false,
  },
  {
    id: ChainId.Neo,
    nativeFee: false,
    icon: require('@/assets/svg/neo.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://neotube.io/transaction/0x{txHash}'
      : 'https://testnet.neotube.io/transaction/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '125c83403763670c215f9c7c815ef759b258a41b'
      : 'cd074cd290acc3d73c030784101afbcf40fd86a1',
  },
  {
    id: ChainId.xDai,
    nativeFee: false,
    icon: require('@/assets/png/xdai.png'),
    explorerUrl: TARGET_MAINNET
      ? 'https://blockscout.com/xdai/mainnet/tx/0x{txHash}'
      : 'https://blockscout.com/poa/sokol/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0x74A7f2A3aFa8B0CB577985663B5811901A860619'
      : '0xa7eDA65F94A2a334a0de42d479585b65D27b2249',
    dst_ccm: TARGET_MAINNET
      ? '0x2f7ac9436ba4B548f9582af91CA1Ef02cd2F1f03'
      : '0xF87527a74215777391fE4AfD082FeeED3E5A0ca5',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'xDai',
    symbol: 'xDai',
    name: TARGET_MAINNET ? 'xDai Mainnet' : 'xDai Testnet',
    rpcUrl: TARGET_MAINNET ? 'https://rpc.xdaichain.com' : 'https://sokol.poa.network',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://blockscout.com/xdai/mainnet'
      : 'https://blockscout.com/poa/sokol/',
    selfPay: true,
  },
  {
    id: ChainId.Metis,
    nativeFee: false,
    icon: require('@/assets/png/metis.png'),
    explorerUrl: TARGET_MAINNET
      ? 'https://andromeda-explorer.metis.io/tx/0x{txHash}'
      : 'http://stardust-explorer.metis.io/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0xFbFDfc95B8EAe4719Ae7D7b94e6F7aCC2DC2e0D7'
      : '0xA09E4d0406123d14CFB1d60D78C6Dc386b7de7F9',
    dst_ccm: TARGET_MAINNET
      ? '0x2aA63cd0b28FB4C31fA8e4E95Ec11815Be07b9Ac'
      : '0xd6fc5374649cea121395a4860FdB33F21783c4Af',
    nftFeeContractHash: 'deaddeaddeaddeaddeaddeaddeaddeaddead0000',
    nftFeeName: 'Metis',
    symbol: TARGET_MAINNET ? 'METIS' : 'testMETIS',
    name: TARGET_MAINNET ? 'Metis Andromeda Mainnet' : 'Metis TESTNET Stardust',
    rpcUrl: TARGET_MAINNET
      ? 'https://andromeda.metis.io/?owner=1088'
      : 'https://stardust.metis.io/?owner=588',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://blockscout.com/xdai/mainnet'
      : 'https://stardust-explorer.metis.io',
    selfPay: true,
  },
  {
    id: ChainId.Boba,
    nativeFee: false,
    icon: require('@/assets/png/boba.png'),
    explorerUrl: TARGET_MAINNET
      ? 'https://blockexplorer.boba.network/tx/0x{txHash}'
      : 'https://blockexplorer.rinkeby.boba.network/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0x33d9bF459b39a888422580916f01C4c44a68a615'
      : '0xF87527a74215777391fE4AfD082FeeED3E5A0ca5',
    dst_ccm: TARGET_MAINNET
      ? '0xab7a3CA9bDcE476F0ECC04c127CFEe0F3D212BC5'
      : '0xa65bD4431C38A4dD9c92ebE60dE3cb8C252c04E5',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'ETH',
    symbol: TARGET_MAINNET ? 'ETH' : 'ETH',
    name: TARGET_MAINNET ? 'Boba Mainnet' : 'Boba Testnet',
    rpcUrl: TARGET_MAINNET ? 'https://mainnet.bota.network' : 'https://rinkeby.boba.network/',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://blockexplorer.boba.network'
      : 'https://blockexplorer.rinkeby.boba.network/',
    selfPay: true,
  },
  {
    id: ChainId.Bsc,
    nativeFee: true,
    icon: require('@/assets/svg/bsc.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://bscscan.com/tx/0x{txHash}'
      : 'https://testnet.bscscan.com/tx/0x{txHash}',
    nftexplorerUrl: TARGET_MAINNET
      ? 'https://bscscan.com/tx/0x{txHash}'
      : 'https://testnet.bscscan.com/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0xbc3B4E7517c06019F30Bf2f707eD2770b85f9928'
      : //  : '0xCed7997C3e807Fcdc5ac18fFC0B8af93a15a9eE5',
        '0xfb717F8d478156fE7428369075bB2FaB4Ea659B5',
    nftLockContractHash: TARGET_MAINNET
      ? '0xe2bD9dD8FAF5C4C2087Ab82eC7E63F619CcAa152'
      : '0x61E289D43C1FEA7598786557A2F309979ad144D3',
    dst_ccm: TARGET_MAINNET
      ? '0xABD7f7B89c5fD5D0AEf06165f8173b1b83d7D5c9'
      : '0x906bC93FF690d6D3D2C4E7A7dfA4dEbdEF2cD7CA',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'BNB',
    symbol: TARGET_MAINNET ? 'BNB' : 'BNB',
    name: TARGET_MAINNET ? 'BNB Chain Mainnet' : 'BNB Chain Testnet',
    rpcUrl: TARGET_MAINNET
      ? 'https://bsc-dataseed1.ninicoin.io/'
      : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    chainExplorerUrl: TARGET_MAINNET ? 'https://bscscan.com' : 'https://testnet.bscscan.com',
    selfPay: true,
  },
  {
    id: ChainId.Heco,
    nativeFee: true,
    icon: require('@/assets/svg/heco.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://hecoinfo.com/tx/0x{txHash}'
      : 'https://testnet.hecoinfo.com/tx/0x{txHash}',
    nftexplorerUrl: TARGET_MAINNET
      ? 'https://hecoinfo.com/tx/0x{txHash}'
      : 'https://testnet.hecoinfo.com/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0x1B0C55be400e2a7D924032B257Fbc75Bbfd256E7'
      : //  : '0x3c92F1E31aACA43Eb4fF8aE498C7E85618680F45',
        '0xCC8407Ee04AaC2AdC0E6A55E7E97176C701146cd',
    nftLockContractHash: TARGET_MAINNET
      ? '0xe2bD9dD8FAF5C4C2087Ab82eC7E63F619CcAa152'
      : '0xbaBaAF5CF7f63437755aAAFE7a4106463c5cD540',
    dst_ccm: TARGET_MAINNET
      ? '0x7109c5F898C5667941B3D2A6451b4bFBeD2bdBbF'
      : '0x4772274FE26130339563974F0229e71017230288',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'HT',
    symbol: TARGET_MAINNET ? 'HT' : 'HT',
    name: TARGET_MAINNET ? 'HECO Mainnet' : 'HECO Testnet',
    rpcUrl: TARGET_MAINNET
      ? 'https://http-mainnet-node.huobichain.com'
      : 'https://http-testnet.hecochain.com',
    chainExplorerUrl: TARGET_MAINNET ? 'https://hecoinfo.com' : 'https://testnet.hecoinfo.com',
    selfPay: true,
  },
  {
    id: ChainId.Oasis,
    nativeFee: false,
    icon: require('@/assets/png/oasis.png'),
    explorerUrl: TARGET_MAINNET
      ? 'https://explorer.emerald.oasis.dev/tx/0x{txHash}'
      : 'https://testnet.explorer.emerald.oasis.dev/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0xbaf396bD590D23D4F4dF5f21b09bA9F869C4B7A6'
      : '0xc2d365475EEf3ec83e59D1BcDF3A291D7B23Ba99',
    dst_ccm: TARGET_MAINNET
      ? '0x0C611b42B78e7b5760B8EB9DA9fA1fb34Db86C2c'
      : '0xd6fc5374649cea121395a4860FdB33F21783c4Af',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'ROSE',
    symbol: TARGET_MAINNET ? 'ROSE' : 'ROSE',
    name: TARGET_MAINNET ? 'Oasis Mainnet' : 'Oasis Testnet',
    rpcUrl: TARGET_MAINNET ? 'https://emerald.oasis.dev' : 'https://testnet.emerald.oasis.dev',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://explorer.emerald.oasis.dev/'
      : 'https://testnet.explorer.emerald.oasis.dev/',
    selfPay: true,
  },
  {
    id: ChainId.Polygon,
    nativeFee: true,
    icon: require('@/assets/svg/polygon.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://polygonscan.com/tx/0x{txHash}'
      : 'https://mumbai.polygonscan.com/tx/0x{txHash}',
    nftexplorerUrl: TARGET_MAINNET
      ? 'https://polygonscan.com/tx/0x{txHash}'
      : 'https://mumbai.polygonscan.com/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0x57b3F21f6aE54FCEEE652b4876a38DB414520b5b'
      : '0xD5d63Dce45E0275Ca76a8b2e9BD8C11679A57D0D',
    nftLockContractHash: TARGET_MAINNET
      ? '0x6cEB2EC1E82880812F6aA60DfA260679D6C8323d'
      : '0xeA5B2a0cF4cA9bd5c72Ea1fbEE1FFe420e57f692',
    dst_ccm: TARGET_MAINNET
      ? '0x5366ea2b5b729ff3cef404c2408c8c60cc061b71'
      : '0xDC1045aD8956e14eC51B7824AB26b1360567ab51',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'MATIC',
    symbol: TARGET_MAINNET ? 'MATIC' : 'MATIC',
    name: TARGET_MAINNET ? 'Polygon Mainnet' : 'Polygon Testnet',
    rpcUrl: TARGET_MAINNET ? 'https://polygon-rpc.com' : 'https://rpc-mumbai.maticvigil.com/',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://polygonscan.com/'
      : 'https://mumbai.polygonscan.com',
    selfPay: true,
  },
  {
    id: ChainId.Base,
    nativeFee: true,
    icon: require('@/assets/svg/base.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://basescan.org/tx/0x{txHash}'
      : 'https://sepolia.basescan.org/tx/0x{txHash}',
    nftexplorerUrl: TARGET_MAINNET
      ? 'https://basescan.com/tx/0x{txHash}'
      : 'https://sepolia.basescan.org/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET ? '' : '',
    nftLockContractHash: TARGET_MAINNET ? '' : '',
    dst_ccm: TARGET_MAINNET ? '' : '',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'ETH',
    symbol: TARGET_MAINNET ? 'ETH' : 'ETH',
    name: TARGET_MAINNET ? 'Base Mainnet' : 'Base Testnet',
    rpcUrl: TARGET_MAINNET ? 'https://mainnet.base.org' : 'https://sepolia.base.org',
    chainExplorerUrl: TARGET_MAINNET ? 'https://basescan.org/' : 'https://sepolia.basescan.org',
    selfPay: true,
  },
  {
    id: ChainId.Optimistic,
    nativeFee: true,
    icon: require('@/assets/svg/op.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://optimistic.etherscan.io/tx/0x{txHash}'
      : 'https://kovan-optimistic.etherscan.io/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? 'f06587dE89e289Ce480CDf21109A14547eb33A0d'
      : 'E324EF8cd52833DD117e8ca87b483E78b30C3696',
    dst_ccm: TARGET_MAINNET
      ? '0x2aA63cd0b28FB4C31fA8e4E95Ec11815Be07b9Ac'
      : '0xC8042579D6b60E0e35161F228827E3Fa0F51d5B6',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'ETH',
    symbol: TARGET_MAINNET ? 'ETH' : 'ETH',
    name: TARGET_MAINNET ? 'Optimistic Ethereum' : 'Optimistic Ethereum (Kovan)',
    rpcUrl: TARGET_MAINNET ? 'https://mainnet.optimism.io' : 'https://kovan.optimism.io',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://optimistic.etherscan.io'
      : 'https://kovan-optimistic.etherscan.io',
    selfPay: true,
  },
  {
    id: ChainId.Fantom,
    nativeFee: true,
    icon: require('@/assets/png/ftm.png'),
    explorerUrl: TARGET_MAINNET
      ? 'https://ftmscan.com/tx/0x{txHash}'
      : 'https://testnet.ftmscan.com/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? 'f06587dE89e289Ce480CDf21109A14547eb33A0d'
      : 'FAddf0cfb08F92779560db57BE6b2C7303aaD266',
    dst_ccm: TARGET_MAINNET
      ? '0x2aA63cd0b28FB4C31fA8e4E95Ec11815Be07b9Ac'
      : '0x1C84D74084c3C3301BE4777A568D78211189c871',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'FTM',
    symbol: TARGET_MAINNET ? 'FTM' : 'FTM',
    name: TARGET_MAINNET ? 'FTM Mainnet' : 'FTM Testnet',
    rpcUrl: TARGET_MAINNET
      ? 'https://ftmnode1.anyswap.exchange'
      : 'https://rpc.testnet.fantom.network/',
    chainExplorerUrl: TARGET_MAINNET ? 'https://ftmscan.com/' : 'https://testnet.ftmscan.com/',
    selfPay: true,
  },
  {
    id: ChainId.Avalanche,
    nativeFee: true,
    icon: require('@/assets/png/avax.png'),
    explorerUrl: TARGET_MAINNET
      ? 'https://avascan.info/blockchain/c/tx/0x{txHash}'
      : 'https://testnet.avascan.info/blockchain/c/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0xC9ea7913E978b178E4a9Bb9Aa38eef522b61803c'
      : 'ac0a6759696569B3729177ba6844D41FF6D57844',
    dst_ccm: TARGET_MAINNET
      ? '0xE3D0FB6E3cB5DA61EB18b06D035052441009d1E6'
      : '0xf37D8C2d072b74d6532541B70319ef08f9F6a4a8',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'AVAX',
    symbol: TARGET_MAINNET ? 'AVAX' : 'AVAX',
    name: TARGET_MAINNET ? 'Avalanch Mainnet' : 'Avalanch Testnet',
    rpcUrl: TARGET_MAINNET
      ? 'https://api.avax.network/ext/bc/C/rpc'
      : 'https://api.avax-test.network/ext/bc/C/rpc',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://avascan.info/blockchain/c/'
      : 'https://testnet.avascan.info/blockchain/c/',
    selfPay: true,
  },
  {
    id: ChainId.Arbitrum,
    nativeFee: true,
    icon: require('@/assets/svg/Arbitrum.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://arbiscan.io/tx/0x{txHash}'
      : 'https://testnet.arbiscan.io/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0x0f8C16BA16E58525Eb2aDc231ff360cfa00bB527'
      : '0x27eb74B4Db37517F1dC6dE67364e19782624402F',
    dst_ccm: TARGET_MAINNET
      ? '0x7ceA671DABFBa880aF6723bDdd6B9f4caA15C87B'
      : '0x3A77dB10eAa7436e608a99643Ab2bEB2E901C72C',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'ETH',
    symbol: TARGET_MAINNET ? 'ETH' : 'ETH',
    name: TARGET_MAINNET ? 'Arbitrum Mainnet' : 'Arbitrum Testnet',
    rpcUrl: TARGET_MAINNET ? 'https://arb1.arbitrum.io/rpc' : 'https://rinkeby.arbitrum.io/rpc',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://arbiscan.io/'
      : 'https://rinkeby-explorer.arbitrum.io/#/',
    selfPay: true,
  },
  {
    id: ChainId.Palette,
    nativeFee: false,
    icon: require('@/assets/svg/plt.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://palettescan.com/#/chain/tx/0x{txHash}'
      : 'http://106.75.251.68/#/chain/tx/0x{txHash}',
    nftexplorerUrl: TARGET_MAINNET
      ? 'https://palettescan.com/#/chain/tx/0x{txHash}'
      : 'http://106.75.251.68/#/chain/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0x0A9C412633465fdeE4861CeE02987386100bEAe6'
      : '0x3b855e095b32fcd2811663cba56bbfa6b1781821',
    nftLockContractHash: TARGET_MAINNET
      ? '0x41985E2A8826233618392e38d46d2060fbCC3F2A'
      : '0x0806e6925e6960E06cD4781e22A636bA233B53De',
    dst_ccm: TARGET_MAINNET
      ? '0x1b02EEE12A7bF02922113a70d3D343De4b43f776'
      : '0xB64EE4b7cf935C51233b6ED9b0732D3Bd26E3442',
    nftFeeContractHash: '0000000000000000000000000000000000000103',
    nftFeeName: 'PLT',
    symbol: TARGET_MAINNET ? 'PLT' : 'PLT',
    name: TARGET_MAINNET ? 'PLT Mainnet' : 'PLT Testnet',
    rpcUrl: TARGET_MAINNET ? 'http://13.231.222.1:22000' : 'http://106.75.246.130:22000',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://palettescan.com/#/chain/'
      : 'http://106.75.251.68/#/chain/',
    selfPay: true,
  },
  {
    id: ChainId.Ok,
    nativeFee: true,
    icon: require('@/assets/jpg/oecd.jpg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://www.oklink.com/okexchain/tx/0x{txHash}'
      : 'https://www.oklink.com/okexchain-test/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0xbd4a08577476A521C41a21EF3f00b045b74175d5'
      : //  : '0x5598226aD2E8991deEFD03203739C87BdF6e6D03',
        '0xbAa40bBd7888f79614057d82bdcE88dF2D23bf55',
    dst_ccm: TARGET_MAINNET
      ? '0x6CE66Cf89A17B5C22e757cca01beAD901fC8C7f2'
      : '0x60Ab3e4a841c8a2E4148aAfc74C0E63c4B54d109',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'OKT',
    symbol: TARGET_MAINNET ? 'OKT' : 'OKT',
    name: TARGET_MAINNET ? 'OKEX Mainnet' : 'OKEX Testnet',
    rpcUrl: TARGET_MAINNET ? 'https://exchainrpc.okex.org' : 'https://exchaintestrpc.okex.org',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://www.oklink.com/okexchain/'
      : 'https://www.oklink.com/okexchain-test/',
    selfPay: true,
  },
  // {
  //   id: ChainId.Milkomeda,
  //   nativeFee: true,
  //   icon: require('@/assets/png/milkomeda.png'),
  //   explorerUrl: TARGET_MAINNET
  //     ? 'https://explorer-devnet-cardano-evm.c1.milkomeda.com/tx/0x{txHash}'
  //     : 'https://explorer-devnet-cardano-evm.c1.milkomeda.com/tx/0x{txHash}',
  //   lockContractHash: TARGET_MAINNET
  //     ? '0xf4B609a3ca7353a8f379069f939964Db351B39c1'
  //     : '0xf4B609a3ca7353a8f379069f939964Db351B39c1',
  //   dst_ccm: TARGET_MAINNET
  //     ? '0xFcf7A3207b7442F29a9f88e2d7638633B494843f'
  //     : '0xFcf7A3207b7442F29a9f88e2d7638633B494843f',
  //   nftFeeContractHash: '0000000000000000000000000000000000000000',
  //   nftFeeName: 'MilkADA',
  //   symbol: TARGET_MAINNET ? 'MilkADA' : 'MilkADA',
  //   name: TARGET_MAINNET ? 'Milkomeda Cardano (C1)' : 'Milkomeda Testnet',
  //   rpcUrl: TARGET_MAINNET
  //     ? 'https://rpc-mainnet-cardano-evm.c1.milkomeda.com'
  //     : 'https://rpc-devnet-cardano-evm.c1.milkomeda.com',
  //   chainExplorerUrl: TARGET_MAINNET
  //     ? 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com'
  //     : 'https://explorer-devnet-cardano-evm.c1.milkomeda.com',
  //   selfPay: true,
  // },
  // {
  //   id: ChainId.Cube,
  //   nativeFee: true,
  //   icon: require('@/assets/png/cube1.png'),
  //   explorerUrl: TARGET_MAINNET
  //     ? 'https://testnet.cubescan.network/en-us/tx/0x{txHash}'
  //     : 'https://testnet.cubescan.network/en-us/tx/0x{txHash}',
  //   lockContractHash: TARGET_MAINNET
  //     ? '0x30e6ec356ceF1cfe3c7e14392EA08448382327bD'
  //     : '0x30e6ec356ceF1cfe3c7e14392EA08448382327bD',
  //   dst_ccm: TARGET_MAINNET
  //     ? '0xD5a240f7F755bCa2aE992E807b06d24eB6DF7C12'
  //     : '0xD5a240f7F755bCa2aE992E807b06d24eB6DF7C12',
  //   nftFeeContractHash: '0000000000000000000000000000000000000000',
  //   nftFeeName: 'CUBE',
  //   symbol: TARGET_MAINNET ? 'CUBE' : 'CUBE',
  //   name: TARGET_MAINNET ? 'Cube Mainnet' : 'Cube Testnet',
  //   rpcUrl: TARGET_MAINNET
  //     ? 'https://http-testnet.cube.network'
  //     : 'https://http-testnet.cube.network',
  //   chainExplorerUrl: TARGET_MAINNET
  //     ? 'https://testnet.cubescan.network'
  //     : 'https://testnet.cubescan.network',
  //   selfPay: true,
  // },
  {
    id: ChainId.Kava,
    nativeFee: true,
    icon: require('@/assets/svg/kava.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://explorer.kava.io/tx/0x{txHash}'
      : 'https://explorer.evm-alpha.kava.io/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0x6cEB2EC1E82880812F6aA60DfA260679D6C8323d'
      : '0xc2d365475EEf3ec83e59D1BcDF3A291D7B23Ba99',
    dst_ccm: TARGET_MAINNET
      ? '0xab7a3CA9bDcE476F0ECC04c127CFEe0F3D212BC5'
      : '0xd6fc5374649cea121395a4860FdB33F21783c4Af',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'KAVA',
    symbol: TARGET_MAINNET ? 'KAVA' : 'KAVA',
    name: TARGET_MAINNET ? 'KAVA Mainnet' : 'KAVA Testnet',
    rpcUrl: TARGET_MAINNET ? 'https://evm.kava.io' : 'https://evm.evm-alpha.kava.io',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://explorer.kava.io'
      : 'https://explorer.evm-alpha.kava.io',
    selfPay: true,
  },
  {
    id: ChainId.Ont,
    nativeFee: false,
    icon: require('@/assets/svg/ONT.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://explorer.ont.io/transaction/{txHash}'
      : 'https://explorer.ont.io/transaction/{txHash}/testnet',
    lockContractHash: TARGET_MAINNET
      ? 'c93837e82178d406af8c84e1841c6960af251cb5'
      : 'a5c101afa9e04e9dd2c912983795005a49e02efa',
    selfPay: false,
  },
  // {
  //   id: ChainId.Stc,
  //   nativeFee: false,
  //   icon: require('@/assets/svg/stc.svg'),
  //   explorerUrl: TARGET_MAINNET
  //     ? 'https://stcscan.io/main/transactions/detail/0x{txHash}'
  //     : 'https://stcscan.io/barnard/transactions/detail/0x{txHash}',
  //   lockContractHash: TARGET_MAINNET
  //     ? 'f8328398c4c8e77b6c5843f5e404be0170d5012e'
  //     : 'd63810ca692b43e0ed35bfa40e653d05b2cb3585',
  //   nftFeeContractHash: '0x00000000000000000000000000000001::STC::STC',
  //   nftFeeName: 'STC',
  // },
  // {
  //   id: ChainId.Pixie,
  //   nativeFee: true,
  //   icon: require('@/assets/svg/pixie.svg'),
  //   explorerUrl: TARGET_MAINNET
  //     ? 'https://scan-testnet.chain.pixie.xyz/tx/0x{txHash}'
  //     : 'https://scan-testnet.chain.pixie.xyz/tx/0x{txHash}',
  //   nftexplorerUrl: TARGET_MAINNET
  //     ? 'https://scan-testnet.chain.pixie.xyz/tx/0x{txHash}'
  //     : 'https://scan-testnet.chain.pixie.xyz/tx/0x{txHash}',
  //   lockContractHash: TARGET_MAINNET
  //     ? '0xE7Db150e4095Cbb35914b5dC980906C77B5990d2'
  //     : '0xE7Db150e4095Cbb35914b5dC980906C77B5990d2',
  //   nftLockContractHash: TARGET_MAINNET
  //     ? '0x06e3d8Eeb9DC4732e474c26674e08213c6e11921'
  //     : '0x06e3d8Eeb9DC4732e474c26674e08213c6e11921',
  //   nftFeeContractHash: '0000000000000000000000000000000000000000',
  //   nftFeeName: 'PIX',
  //   selfPay: true,
  // },
  // {
  //   id: ChainId.Rinkeby,
  //   nativeFee: false,
  //   icon: require('@/assets/svg/eth.svg'),
  //   explorerUrl: TARGET_MAINNET
  //     ? 'https://rinkeby.etherscan.io/tx/0x{txHash}'
  //     : 'https://rinkeby.etherscan.io/tx/0x{txHash}',
  //   nftexplorerUrl: TARGET_MAINNET
  //     ? 'https://rinkeby.etherscan.io/tx/0x{txHash}'
  //     : 'https://rinkeby.etherscan.io/tx/0x{txHash}',
  //   lockContractHash: TARGET_MAINNET
  //     ? '0xD5a240f7F755bCa2aE992E807b06d24eB6DF7C12'
  //     : '0xD5a240f7F755bCa2aE992E807b06d24eB6DF7C12',
  //   nftLockContractHash: TARGET_MAINNET
  //     ? '0x25BB8E9C0Cc03B30d09769735208a47d389Ff36c'
  //     : '0x25BB8E9C0Cc03B30d09769735208a47d389Ff36c',
  //   nftFeeContractHash: '0000000000000000000000000000000000000000',
  //   nftFeeName: 'ETH',
  //   selfPay: true,
  // },
  // {
  //   id: ChainId.Oasis1,
  //   nativeFee: false,
  //   icon: require('@/assets/png/oasis.png'),
  //   explorerUrl: TARGET_MAINNET
  //     ? 'https://explorer.emerald.oasis.dev/tx/0x{txHash}'
  //     : 'https://explorer.emerald.oasis.dev/tx/0x{txHash}',
  //   lockContractHash: TARGET_MAINNET
  //     ? '0x87bF79eF2Dd87535f762e47028345dF7527c3206'
  //     : '0x87bF79eF2Dd87535f762e47028345dF7527c3206',
  //   nftFeeContractHash: '0000000000000000000000000000000000000000',
  //   nftFeeName: 'ROSE',
  //   selfPay: true,
  // },
  // {
  //   id: ChainId.BscPalette,
  //   nativeFee: false,
  //   icon: require('@/assets/svg/plt.svg'),
  //   explorerUrl: TARGET_MAINNET
  //     ? 'https://palettescan.com/#/chain/tx/0x{txHash}'
  //     : 'http://106.75.251.68/#/chain/tx/0x{txHash}',
  //   nftexplorerUrl: TARGET_MAINNET
  //     ? 'https://palettescan.com/#/chain/tx/0x{txHash}'
  //     : 'http://106.75.251.68/#/chain/tx/0x{txHash}',
  //   lockContractHash: TARGET_MAINNET
  //     ? '0x0c5c0b03e897e7b1828f2bc923ea4498ec891060'
  //     : '0x0c5c0b03e897e7b1828f2bc923ea4498ec891060',
  //   nftLockContractHash: TARGET_MAINNET
  //     ? '0x41985E2A8826233618392e38d46d2060fbCC3F2A'
  //     : '0x0806e6925e6960E06cD4781e22A636bA233B53De',
  //   nftFeeContractHash: '0000000000000000000000000000000000000103',
  //   nftFeeName: 'wePLT',
  //   selfPay: true,
  // },
  {
    id: ChainId.HSC,
    nativeFee: false,
    icon: require('@/assets/png/hoo.png'),
    explorerUrl: TARGET_MAINNET
      ? 'https://hooscan.com/tx/0x{txHash}'
      : 'https://hooscan.com/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0xC0F6d0443bAB01F4E1B843b96452a6DbA530d878'
      : '0x5906777d34257a2b479c291871C9BFdFB922D67D',
    dst_ccm: TARGET_MAINNET
      ? '0x18C0628876EFD2A235F81318e5Ba211189A1ddDF'
      : '0x0744b1802B9D879AdB2C4ea3b7A9bE38073f3a43',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'HSC',
    symbol: TARGET_MAINNET ? 'HSC' : 'HSC',
    name: TARGET_MAINNET ? 'Hoo Smart Chain Mainnet' : 'Hoo Smart Chain Testnet',
    rpcUrl: TARGET_MAINNET
      ? 'https://http-mainnet.hoosmartchain.com'
      : 'https://http-mainnet.hoosmartchain.com',
    chainExplorerUrl: TARGET_MAINNET ? 'https://hooscan.com/' : 'https://hooscan.com/',
    selfPay: true,
  } /* waiting info */,
  {
    id: ChainId.Kcc,
    nativeFee: false,
    icon: require('@/assets/png/kcc.png'),
    explorerUrl: TARGET_MAINNET
      ? 'https://explorer.kcc.io/tx/0x{txHash}'
      : 'https://scan-testnet.kcc.network/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0x5906777d34257a2b479c291871C9BFdFB922D67D'
      : '0xc2d365475EEf3ec83e59D1BcDF3A291D7B23Ba99',
    dst_ccm: TARGET_MAINNET
      ? '0xab7a3CA9bDcE476F0ECC04c127CFEe0F3D212BC5'
      : '0xd6fc5374649cea121395a4860FdB33F21783c4Af',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'KCS',
    symbol: TARGET_MAINNET ? 'KCS' : 'KCS',
    name: TARGET_MAINNET ? 'KCC-MAINNET' : 'KCC-TESTNET',
    rpcUrl: TARGET_MAINNET ? 'https://rpc-mainnet.kcc.network' : 'https://rpc-testnet.kcc.network',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://explorer.kcc.io/en'
      : 'https://scan-testnet.kcc.network',
    selfPay: true,
  },
  {
    id: ChainId.Harmony,
    nativeFee: false,
    icon: require('@/assets/svg/Harmony.svg'),
    explorerUrl: TARGET_MAINNET
      ? 'https://explorer.harmony.one/tx/0x{txHash}'
      : 'https://explorer.pops.one/tx/0x{txHash}',
    lockContractHash: TARGET_MAINNET
      ? '0x5906777d34257a2b479c291871C9BFdFB922D67D'
      : '0xc927f0EF4f25E19a40F0Cb34da841B45c13649fd',
    dst_ccm: TARGET_MAINNET
      ? '0xab7a3CA9bDcE476F0ECC04c127CFEe0F3D212BC5'
      : '0x55a59c57a133d1c999b3Eaf5B16ad5c1F2e365c8',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'ONE',
    symbol: 'ONE',
    name: TARGET_MAINNET ? 'Harmony Mainnet' : 'Harmony Testnet',
    rpcUrl: TARGET_MAINNET ? 'https://api.harmony.one' : 'https://api.s0.b.hmny.io',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://explorer.harmony.one/'
      : 'https://explorer.pops.one/',
    selfPay: true,
  },
  {
    id: ChainId.BYTOM,
    nativeFee: false,
    icon: require('@/assets/png/bytom.png'),
    explorerUrl: TARGET_MAINNET
      ? 'https://bmc.blockmeta.com/tx/0x{txHash}'
      : 'https://bmctestnet.blockmeta.com/tx/0x{txHash}',
    nftexplorerUrl: TARGET_MAINNET
      ? 'https://bmc.blockmeta.com/tx/0x{txHash}'
      : 'https://bmctestnet.blockmeta.com/tx/0x{txHash}',
    nftLockContractHash: TARGET_MAINNET
      ? '0x33d9bF459b39a888422580916f01C4c44a68a615'
      : '0x6fd13dd4181dDb0f7463e19caC659FD3e9FB8a82',
    dst_ccm: TARGET_MAINNET
      ? '0xab7a3CA9bDcE476F0ECC04c127CFEe0F3D212BC5'
      : '0x7877Ad76Dd6069035B56137707368C945D2aD452',
    nftFeeContractHash: '0000000000000000000000000000000000000000',
    nftFeeName: 'BTM',
    symbol: TARGET_MAINNET ? 'BTM' : 'BTM',
    name: TARGET_MAINNET ? 'BMC Mainnet' : 'BMC Testnet',
    rpcUrl: TARGET_MAINNET ? 'https://bmc.bytom.io/' : 'https://testnet.bmcchain.com',
    chainExplorerUrl: TARGET_MAINNET
      ? 'https://bmc.blockmeta.com'
      : 'https://bmctestnet.blockmeta.com',
    selfPay: true,
  },
  // {
  //   id: ChainId.OntEvm,
  //   nativeFee: true,
  //   icon: require('@/assets/svg/ONT.svg'),
  //   explorerUrl: TARGET_MAINNET
  //     ? 'https://explorer.ont.io/tx/0x{txHash}'
  //     : 'https://explorer.ont.io/testnet/tx/0x{txHash}',
  //   lockContractHash: TARGET_MAINNET
  //     ? '0x66f1Ad12a2C7A6370CbD20ECD79D17a405061Efe'
  //     : '0x66f1Ad12a2C7A6370CbD20ECD79D17a405061Efe',
  //   dst_ccm: TARGET_MAINNET
  //     ? '0x74b77cbF04442BBf194380a7e4d99c923e0e56cc'
  //     : '0x74b77cbF04442BBf194380a7e4d99c923e0e56cc',
  //   nftFeeContractHash: '0000000000000000000000000000000000000000',
  //   nftFeeName: 'ONG',
  //   symbol: TARGET_MAINNET ? 'ONG' : 'ONG',
  //   name: TARGET_MAINNET ? 'Ontology Mainnet' : 'Ontology Testnet',
  //   rpcUrl: TARGET_MAINNET ? 'https://dappnode2.ont.io:10339' : 'https://polaris1.ont.io:10334',
  //   chainExplorerUrl: TARGET_MAINNET
  //     ? 'https://explorer.ont.io/'
  //     : 'https://explorer.ont.io/testnet/',
  //   selfPay: true,
  // },
];

export const UNKNOWN_ICON = require('@/assets/svg/unknown.svg');
export const UNKNOWN_NFT = require('@/assets/png/nft.png');

export const TOKEN_BASIC_ICONS = {
  NEO: require('@/assets/svg/neo-token.svg'),
  nNEO: require('@/assets/svg/neo-token.svg'),
  ETH: require('@/assets/svg/eth-token.svg'),
  USDT: require('@/assets/svg/usdt.svg'),
  USDC: require('@/assets/svg/usdc.svg'),
  DAI: require('@/assets/svg/dai.svg'),
  sUSD: require('@/assets/svg/susd.svg'),
  BAC: require('@/assets/svg/bac.svg'),
  BASv2: require('@/assets/svg/basv2.svg'),
  CWS: require('@/assets/png/cws.png'),
  SHARE: require('@/assets/svg/share.svg'),
  FLM: require('@/assets/svg/flm.svg'),
  SWTH: require('@/assets/svg/swth.svg'),
  ONTd: require('@/assets/svg/ONT.svg'),
  WING: require('@/assets/svg/wing.svg'),
  YFI: require('@/assets/svg/YFI.svg'),
  UNI: require('@/assets/svg/UNI.svg'),
  UNFI: require('@/assets/svg/UNFI.svg'),
  MDX: require('@/assets/svg/mdx.svg'),
  WBTC: require('@/assets/svg/WBTC.svg'),
  renBTC: require('@/assets/svg/renBTC.svg'),
  COOK: require('@/assets/svg/cook.svg'),
  FEI: require('@/assets/png/fei.png'),
  Tribe: require('@/assets/png/tribe.png'),
  YNI: require('@/assets/png/yni.png'),
  REVO: require('@/assets/svg/revo.svg'),
  revo: require('@/assets/svg/revo.svg'),
  Revo: require('@/assets/svg/revo.svg'),
  ESS: require('@/assets/svg/ESS.svg'),
  Bles: require('@/assets/svg/bles.svg'),
  BLES: require('@/assets/svg/bles.svg'),
  aDAI: require('@/assets/svg/adai.svg'),
  aETH: require('@/assets/svg/aeth.svg'),
  cDAI: require('@/assets/svg/cdai.svg'),
  cETH: require('@/assets/svg/ceth.svg'),
  FLUX: require('@/assets/svg/flux.svg'),
  CVT: require('@/assets/svg/cvt.svg'),
  KEL: require('@/assets/png/kel.png'),
  SHIB: require('@/assets/png/shib.png'),
  Shib: require('@/assets/png/shib.png'),
  STACK: require('@/assets/png/stack.png'),
  CC: require('@/assets/png/ccswap.png'),
  PLF: require('@/assets/png/plf.png'),
  TSX: require('@/assets/png/tsx.png'),
  O3: require('@/assets/png/o3.png'),
  KISHU: require('@/assets/png/kishu.png'),
  CELL: require('@/assets/png/cell.png'),
  ECELL: require('@/assets/svg/ecell.svg'),
  ISM: require('@/assets/jpg/ism.jpg'),
  BBANK: require('@/assets/jpg/bbank.jpg'),
  DOWS: require('@/assets/svg/shadows.svg'),
  PLUT: require('@/assets/svg/plut.svg'),
  mBTM: require('@/assets/svg/mbtm.svg'),
  LEV: require('@/assets/svg/lev.svg'),
  XTM: require('@/assets/svg/xtm.svg'),
  XTF: require('@/assets/svg/xtf.svg'),
  TAP: require('@/assets/svg/tap.svg'),
  // STC: require('@/assets/svg/stc.svg'),
  '8PAY': require('@/assets/jpg/8pay.jpg'),
  GM: require('@/assets/png/gm.png'),
};

export const DEFAULT_TOKEN_BASIC_NAME = 'GM';
export const DEFAULT_CHAIN_NAME = 'BSC';

export const TOP_TOKEN_BASIC_NAMES = ['NEO', 'BNEO', 'ETH', 'USDT', 'USDC', 'DAI'];

export const GM_TOKENS = (
  TARGET_MAINNET
    ? [
        {
          hash: '0xbba0f2f541809a85c18dd0106080076a0ba21b2b',
          chainId: 6, // BSC
        },
        /* {
      hash: '0x203aad20f51bbe43e650d3ceea88d43dd6c817c1',
      chainId: 2, // ETH
    }, */
        {
          hash: '0xffcd553464a00d7b30a48960611e5032f544700a',
          chainId: 17, // Polygon
        },
        {
          hash: '0x99aeecf3717ec6b369d847e3d62d14e14251e4d4',
          chainId: 21, // Avalanche
        },
        {
          hash: '0x9b049f1283515eef1d3f6ac610e1595ed25ca3e9',
          chainId: 14, // N3
        },
      ]
    : [
        {
          hash: 'f3fd0f360ace3b0e83843221a763fec857291060',
          chainId: 79,
        },
        {
          hash: '957404188ea8804eff6dc052e6b35c58ae351357',
          chainId: 202,
        },
        {
          hash: '7d35e9d90bd91ba82dae43d7e03cf1e04c14aea8',
          chainId: 209,
        },
        {
          hash: 'c13b05fc0e6fe3cc681e29a574557784b4f79aff',
          chainId: 888,
        },
      ]
).map((item) => {
  return { ...item, name: 'GM', tokenBasicName: 'GM', decimals: 8 };
});

export const GM_TOKEN_BASICS = [
  {
    name: 'GM',
    decimals: 8,
    meta: 'https://governance.ghostmarket.io/images/gm.png',
    tokens: GM_TOKENS,
  },
];

export const gmGetTokenMaps = (chainId) => {
  const res = [];
  const fromToken = {
    hash: GM_TOKENS.find((item) => item.chainId === chainId).hash,
    chainId,
    name: 'GM',
    tokenBasicName: 'GM',
    tokenBasic: null,
  };
  for (let i = 0; i < GM_TOKENS.length; i += 1) {
    const token = GM_TOKENS[i];
    if (token.chainId !== chainId) {
      res.push({
        fromToken,
        toToken: {
          hash: token.hash,
          chainId: token.chainId,
          name: 'GM',
          tokenBasicName: 'GM',
          tokenBasic: null,
        },
      });
    }
  }
  return res;
};
