import XummPkce from 'xumm-oauth2-pkce/dist/browser';
import store from '@/store';
import { WalletError } from '@/utils/errors';
import { TARGET_MAINNET } from '@/utils/env';
import { RippleAPI } from 'ripple-lib';
import BigNumber from 'bignumber.js';
import { getChainApi } from '@/utils/chainApi';
import { Message } from 'element-ui';
import { decimalToInteger } from '@/utils/convertors';
import { WalletName, SingleTransactionStatus } from '@/utils/enums';
import Base58 from 'base58-js';

console.log(XummPkce);
const auth = new XummPkce('9b461506-fd63-45f7-9e18-6329adf7807b');
let sdk = null;
const XUMM_CONNECTED_KEY = 'XUMM_CONNECTED';
const api = new RippleAPI({
  server: TARGET_MAINNET ? 'wss://s1.ripple.com' : 'wss://s.altnet.rippletest.net/', // Public rippled server hosted by Ripple, Inc.
});

async function queryState($payload) {
  const addressHex = $payload.account;
  store.dispatch('updateWallet', {
    name: WalletName.XUMM,
    address: $payload.account,
    addressHex,
    connected: true,
    chainId: 0,
  });
}

function convertWalletError(error) {
  if (error instanceof WalletError) {
    return error;
  }
  let code = WalletError.CODES.UNKNOWN_ERROR;
  if (error.code === 4001) {
    code = WalletError.CODES.USER_REJECTED;
  }
  if (error.toString().indexOf('32005') > -1) {
    return null;
  }
  if (error.toString().indexOf('32000') > -1) {
    return null;
  }
  return new WalletError(error.message, { code, cause: error });
}

async function init() {
  try {
    store.dispatch('updateWallet', { name: WalletName.XUMM, installed: true });
    if (sessionStorage.getItem(XUMM_CONNECTED_KEY) === 'true') {
      await queryState();
    }
  } finally {
    store.getters.getWallet(WalletName.XUMM).deferred.resolve();
  }
}

async function getBalance({ chainId, address, tokenHash }) {
  debugger;
  await api.connect();
  console.log(await api.getAccountInfo(address));
  console.log(await api.getAccountObjects(address, 'ledgerHash'));
  const { xrpBalance } = await api.getAccountInfo(address);
  await api.disconnect();
  const balance =
    new BigNumber(xrpBalance).minus(10).toNumber() > 0
      ? new BigNumber(xrpBalance).minus(10).toNumber()
      : 0;
  return balance;
}

function connect() {
  return auth
    .authorize()
    .then(authorized => {
      console.log('Authorized', /* authorized.jwt, */ authorized.me);
      console.log('Authorized', /* authorized.jwt, */ authorized);
      authorized.sdk.ping().then(pong => console.log({ pong }));
      sdk = authorized.sdk;
      console.log(authorized);
      queryState(authorized.me);
    })
    .catch(e => {
      console.log('Auth error', e);
    });
}

async function getAllowance({ chainId, address, tokenHash, spender }) {
  return null;
}

async function goPayload({ amount, txPayload, destination }) {
  // const hex = Buffer.from('{"DstChain":79,"DstAddress":"62ed88471Dcd621a6f84D3C3dA1b75f657f78d6C"}').toString('hex').toUpperCase()
  const hex = Buffer.from(txPayload)
    .toString('hex')
    .toUpperCase();
  const payload = {
    txjson: {
      TransactionType: 'Payment',
      Destination: destination,
      Amount: amount,
      Memos: [
        {
          Memo: {
            MemoData: hex,
          },
        },
      ],
    },
  };
  try {
    const { created, resolved } = sdk.payload.createAndSubscribe(payload, function(payloadEvent) {
      let data;
      if (typeof payloadEvent.data.signed !== 'undefined') {
        // What we return here will be the resolved value of the `resolved` property
        data = payloadEvent.data;
      }
      return data;
    });
    if (created.pushed) {
      alert(
        'Now check Xumm, there should be a push notification + sign request in your event list waiting for you ;)',
      );
    } else {
      alert(
        'Now check Xumm, there should be a sign request in your event list waiting for you ;) (This would have been pushed, but it seems you did not grant Xumm the push permission)',
      );
    }
    console.log(await resolved);
    return await resolved;
  } catch (payloadError) {
    throw convertWalletError(payloadError);
  }
}

async function getTransactionStatus({ transactionHash }) {
  return SingleTransactionStatus.Done;
}

async function lock({
  fromChainId,
  fromAddress,
  fromTokenHash,
  toChainId,
  toAddress,
  amount,
  fee,
}) {
  try {
    debugger;
    const chain = store.getters.getChain(fromChainId);
    const tokenBasic = store.getters.getTokenBasicByChainIdAndTokenHash({
      chainId: fromChainId,
      tokenHash: fromTokenHash,
    });
    let toTokenHash = '';
    const tokenlist = tokenBasic.tokens;
    for (let i = 0; i < tokenlist.length; i += 1) {
      if (tokenlist[i].chainId === toChainId) {
        toTokenHash = tokenlist[i].hash;
      }
    }
    const lockContract = chain.lockProxyContractHash;
    const toChainApi = await getChainApi(toChainId);
    const toAddressHex = await toChainApi.addressToHex(toAddress);
    const amountInt = decimalToInteger(amount, tokenBasic.decimals);
    const feeInt = decimalToInteger(fee, chain.nftFeeName ? 18 : tokenBasic.decimals);
    const prepayload = {
      DstChain: toChainId,
      DstAddress: toAddress.substr(2, 100),
      DstAsset: toTokenHash,
    };
    debugger;
    const payloadString = JSON.stringify(prepayload);
    const txData = {
      amount: amountInt,
      txPayload: payloadString,
      destination: lockContract,
    };
    const hex = Buffer.from(txData.txPayload)
      .toString('hex')
      .toUpperCase();
    const payload = {
      txjson: {
        TransactionType: 'Payment',
        Destination: txData.destination,
        Amount: txData.amount,
        Memos: [
          {
            Memo: {
              MemoData: hex,
            },
          },
        ],
      },
    };
    const { created, resolved } = await sdk.payload.createAndSubscribe(payload, function(
      payloadEvent,
    ) {
      let data;
      if (typeof payloadEvent.data.signed !== 'undefined') {
        // What we return here will be the resolved value of the `resolved` property
        data = payloadEvent.data;
      }
      return data.txid;
    });
    if (created.pushed) {
      Message({
        message:
          'Now check Xumm, there should be a push notification + sign request in your event list waiting for you ;)',
        type: 'info',
        duration: 5000,
      });
    } else {
      Message({
        message:
          'Now check Xumm, there should be a sign request in your event list waiting for you ;) (This would have been pushed, but it seems you did not grant Xumm the push permission)',
        type: 'info',
        duration: 5000,
      });
    }
    console.log(await resolved);
    return await resolved;
  } catch (error) {
    throw convertWalletError(error);
  }
}
async function payFee({
  fromAddress,
  fromChainId,
  fromTokenHash,
  toChainId,
  toAddress,
  amount,
  lockTxHash,
}) {
  try {
    debugger;
    const chain = store.getters.getChain(fromChainId);
    const tokenBasic = store.getters.getTokenBasicByChainIdAndTokenHash({
      chainId: fromChainId,
      tokenHash: fromTokenHash,
    });
    const wrapperContract = chain.WrapperContract;
    const toChainApi = await getChainApi(toChainId);
    const toAddressHex = await toChainApi.addressToHex(toAddress);
    const amountInt = decimalToInteger(amount, tokenBasic.decimals);
    const prepayload = {
      SrcAddress: fromAddress,
      DstChain: toChainId,
      DstAddress: toAddress.substr(2, 100),
      Amount: amount,
      LockTxHash: lockTxHash,
    };
    debugger;
    const payloadString = JSON.stringify(prepayload);
    const txData = {
      amount: amountInt,
      txPayload: payloadString,
      destination: wrapperContract,
    };
    const hex = Buffer.from(txData.txPayload)
      .toString('hex')
      .toUpperCase();
    const payload = {
      txjson: {
        TransactionType: 'Payment',
        Destination: txData.destination,
        Amount: txData.amount,
        Memos: [
          {
            Memo: {
              MemoData: hex,
            },
          },
        ],
      },
    };
    const { created, resolved } = await sdk.payload.createAndSubscribe(payload, function(
      payloadEvent,
    ) {
      let data;
      if (typeof payloadEvent.data.signed !== 'undefined') {
        // What we return here will be the resolved value of the `resolved` property
        data = payloadEvent.data;
      }
      return data.txid;
    });
    if (created.pushed) {
      Message({
        message:
          'Now check Xumm, there should be a push notification + sign request in your event list waiting for you ;)',
        type: 'info',
        duration: 5000,
      });
    } else {
      Message({
        message:
          'Now check Xumm, there should be a sign request in your event list waiting for you ;) (This would have been pushed, but it seems you did not grant Xumm the push permission)',
        type: 'info',
        duration: 5000,
      });
    }
    console.log(await resolved);
    return await resolved;
  } catch (error) {
    throw convertWalletError(error);
  }
}

export default {
  install: init,
  connect,
  getBalance,
  goPayload,
  getAllowance,
  lock,
  getTransactionStatus,
  payFee,
};
