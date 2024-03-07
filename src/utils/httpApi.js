import axios from 'axios';
import _ from 'lodash';
import { GMSupplyApi } from '@/utils/gmsupplyApi';
import { TARGET_MAINNET } from './env';
import { HttpError } from './errors';
import { mapTransactionToDo } from './mappers';
import {
  HTTP_BASE_URL,
  HTTP_NFT_BASE_URL,
  GM_TOKENS,
  GM_TOKEN_BASICS,
  gmGetTokenMaps,
} from './values';
import * as schemas from './schemas';
import { deserialize, list } from './serializr';

const request = axios.create({
  baseURL: HTTP_BASE_URL,
  headers: { 'content-type': 'application/json' },
});

const nftRequest = axios.create({
  baseURL: HTTP_NFT_BASE_URL,
  headers: { 'content-type': 'application/json' },
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const { response } = error;
    let newError = error;
    if (response) {
      let code = HttpError.CODES.UNKNOWN_ERROR;
      if (response.status === 400) {
        code = HttpError.CODES.BAD_REQUEST;
      } else if (response.status === 500) {
        code = HttpError.CODES.INTERNAL_SERVICE_ERROR;
      }
      newError = new HttpError(response.data.message, { cause: error, code });
    } else {
      newError = new HttpError(error.message || 'Network Error', {
        cause: error,
        code: HttpError.CODES.NETWORK_ERROR,
      });
    }
    throw newError;
  },
);

export default {
  async getTokenBasics() {
    return { tokenBasics: GM_TOKEN_BASICS, tokens: GM_TOKENS };
  },
  async getTokenMaps({ fromChainId, fromTokenHash }) {
    return gmGetTokenMaps(fromChainId, fromTokenHash);
  },
  async getFee({ fromChainId, fromTokenHash, toTokenHash, toChainId }) {
    const baseUrl = TARGET_MAINNET
      ? 'https://api.ghostmarket.io/api/v2'
      : 'https://api-testnet.ghostmarket.io/api/v2';
    const supplies = await new GMSupplyApi({ baseUrl }).getGMSupply();

    const result = await request({
      method: 'post',
      url: '/getfee',
      data: {
        SrcChainId: fromChainId,
        SwapTokenHash: toTokenHash,
        Hash: fromTokenHash,
        DstChainId: toChainId,
      },
    });
    let balance = result.Balance;
    if (fromChainId === 2) balance = supplies.ethereumCirculatingSupply;
    if (fromChainId === 6) balance = supplies.bscCirculatingSupply;
    if (fromChainId === 17) balance = supplies.polygonCirculatingSupply;
    if (fromChainId === 21) balance = supplies.avalancheCirculatingSupply;
    if (fromChainId === 14) balance = supplies.n3CirculatingSupply;
    result.Balance = `${balance}`;
    result.BalanceWithPrecision = (balance * 10 ** 8).toFixed(0);
    return result;
  },
  async getManualTxData({ polyHash }) {
    const result = await request({
      method: 'post',
      url: '/getmanualtxdata',
      data: {
        polyhash: polyHash,
      },
    });
    return result;
  },
  async getHealthData({ chindIds }) {
    const result = await request({
      method: 'post',
      url: '/chainhealth',
      data: {
        ChainIds: chindIds,
      },
    });
    return result;
  },
  async getWrapperCheck({ chindId }) {
    const result = await request({
      method: 'post',
      url: '/wrappercheck',
      data: {
        ChainId: chindId,
      },
    });
    return result;
  },
  async getExpectTime({ fromChainId, toChainId }) {
    const result = await request({
      method: 'post',
      url: '/expecttime',
      data: {
        SrcChainId: fromChainId,
        DstChainId: toChainId,
      },
    });
    return result;
  },
  async getTransactions({ addressHexs, page, pageSize }) {
    const result = await request({
      method: 'post',
      url: 'transactionsofaddress',
      data: {
        Addresses: addressHexs,
        PageNo: page - 1,
        PageSize: pageSize,
      },
    });
    const transactions = deserialize(list(schemas.transaction), result.Transactions || []);
    return {
      items: transactions.map(mapTransactionToDo),
      pageCount: result.TotalPage,
      total: result.TotalCount,
    };
  },
  async getTransaction({ hash }) {
    const result = await request({
      method: 'post',
      url: 'transactionofhash',
      data: {
        Hash: hash,
      },
    });
    const transaction = deserialize(schemas.transaction, result);
    return mapTransactionToDo(transaction);
  },
  async getAssets(id) {
    const result = await nftRequest({
      method: 'post',
      url: '/assets',
      data: {
        ChainId: id,
      },
    });
    return result;
  },
  async getAssetMap(params) {
    const result = await nftRequest({
      method: 'post',
      url: '/asset',
      data: {
        ChainId: params.ChainId,
        Hash: params.Hash,
      },
    });
    return result;
  },
  async getitems(params) {
    try {
      const result = await nftRequest({
        method: 'post',
        url: '/items',
        data: {
          ChainId: params.ChainId,
          Asset: params.Asset,
          Address: params.Address,
          TokenId: params.TokenId,
          PageNo: params.PageNo,
          PageSize: params.PageSize,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      const res = {
        data: {
          Items: [],
          PageNo: 0,
          PageSize: 6,
          TotalCount: 0,
          TotalPage: 0,
        },
      };
      return res;
    }
  },
  async getItemsShow(params) {
    const result = await nftRequest({
      method: 'post',
      url: '/assetshow',
      data: {
        ChainId: params.ChainId,
        PageSize: params.PageSize,
        PageNo: params.PageNo,
      },
    });
    return result;
  },
  async getNftFee(params) {
    const result = await nftRequest({
      method: 'post',
      url: '/getfee',
      data: {
        SrcChainId: params.SrcChainId,
        Hash: params.Hash,
        DstChainId: params.DstChainId,
      },
    });
    return result;
  },
  async getNftTransactions({ addressHexs, page, pageSize }) {
    const result = await nftRequest({
      method: 'post',
      url: 'transactionsofaddress',
      data: {
        Addresses: addressHexs,
        PageNo: page - 1,
        PageSize: pageSize,
        State: -1,
      },
    });
    const transactions = deserialize(list(schemas.transaction), result.data.Transactions || []);
    return {
      items: transactions.map(mapTransactionToDo),
      pageCount: result.data.TotalPage,
      total: result.data.TotalCount,
    };
  },
  async getNftTransaction({ hash }) {
    const result = await nftRequest({
      method: 'post',
      url: 'transactionofhash',
      data: {
        Hash: hash,
      },
    });
    const transaction = deserialize(schemas.transaction, result.data);
    return mapTransactionToDo(transaction);
  },
};
