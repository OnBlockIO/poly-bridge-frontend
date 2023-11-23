<template>
  <ValidationObserver ref="validation" tag="div" class="form">
    <div class="card">
      <div class="fields">
        <div class="fields-row">
          <div class="field">
            <div class="label">
              <div class="label-left">
                <div class="label-name">{{ $t('home.form.from') }}</div>
                <div v-if="fromWallet" class="address">
                  <span class="address-value">
                    {{ $formatLongText(fromWallet.address, { headTailLength: 6 }) }}
                  </span>
                  <CButton @click="copy(fromWallet.address)">
                    <img class="copy-icon" src="@/assets/svg/copy.svg" />
                  </CButton>
                </div>
              </div>
              <div class="label-right"></div>
            </div>
            <div class="field-wrapper">
              <CButton class="select-chain" @click="selectFromChainVisible = true">
                <div class="select-chain-content">
                  <template v-if="fromChain">
                    <img class="select-chain-icon" :src="fromChain.icon" />
                    <span class="select-chain-name">
                      {{
                        $t('home.form.chainName', {
                          chainName: $formatEnum(fromChainId, { type: 'chainName' }),
                        })
                      }}
                    </span>
                  </template>
                  <template v-else>
                    <img class="select-chain-icon" src="@/assets/svg/from.svg" />
                    <span class="select-chain-name">
                      {{ $t('home.form.chainName', { chainName: $t('home.form.from') }) }}
                    </span>
                  </template>
                  <img class="chevron-right" src="@/assets/svg/down2.svg" />
                </div>
              </CButton>
            </div>
          </div>

          <div class="field">
            <div class="label">{{ $t('home.form.collection') }}</div>
            <div class="field-wrapper">
              <CButton
                class="select-token-basic"
                @click="selectAssetVisible = true"
                :disabled="assets.length < 1"
              >
                <template v-if="assets">
                  {{ assetName }}
                </template>
                <CFlexSpan />
                <img src="@/assets/svg/down2.svg" />
              </CButton>
            </div>
          </div>
          <div class="field">
            <div class="label">{{ $t('nft.form.item') }}</div>
            <div class="field-wrapper">
              <CButton
                class="select-token-basic"
                :disabled="items.length < 1"
                @click="selectItemVisible = items.length > 0 ? true : false"
              >
                <template v-if="item">
                  <img class="selected-img" :src="item.Image ? item.Image : unknowNFT" />
                  {{ item.AssetName }}
                  {{ item.TokenId }}
                </template>
                <CFlexSpan />
                <img src="@/assets/svg/down2.svg" />
              </CButton>
            </div>
          </div>

          <CButton class="exchange" :disabled="!toChainId">
            <img class="exchange-icon" src="@/assets/svg/arrow-down.svg" />
          </CButton>

          <div class="field">
            <div class="label">
              <div class="label-left">
                <div class="label-name">{{ $t('home.form.to') }}</div>
                <div v-if="toWallet" class="address">
                  <span class="address-value">
                    {{ $formatLongText(toWallet.address, { headTailLength: 6 }) }}
                  </span>
                  <CButton @click="copy(toWallet.address)">
                    <img src="@/assets/svg/copy.svg" />
                  </CButton>
                </div>
              </div>
            </div>
            <div class="field-wrapper">
              <CButton
                class="select-chain"
                :disabled="!toChains"
                @click="selectToChainVisible = true"
              >
                <div class="select-chain-content">
                  <template v-if="toChain">
                    <img class="select-chain-icon" :src="toChain.icon" />
                    <span class="select-chain-name">
                      {{
                        $t('home.form.chainName', {
                          chainName: $formatEnum(toChainId, { type: 'chainName' }),
                        })
                      }}
                    </span>
                  </template>
                  <template v-else>
                    <img class="select-chain-icon" src="@/assets/svg/to.svg" />
                    <span class="select-chain-name">
                      {{ $t('home.form.chainName', { chainName: $t('home.form.to') }) }}
                    </span>
                  </template>
                  <img class="chevron-right" src="@/assets/svg/down2.svg" />
                </div>
              </CButton>
            </div>
          </div>
        </div>
        <div
          v-if="
            fee &&
            fee.Balance < 500 &&
            fee.SwapTokenHash === 'deaddeaddeaddeaddeaddeaddeaddeaddead0000'
          "
          class="fee"
        >
          <span class="label" style="color: #f56c6c; opacity: 1">{{
            $t('home.form.warningMsg')
          }}</span>
        </div>
        <div
          v-if="
            fee &&
            fee.Balance < 500 &&
            fee.SwapTokenHash === 'e552fb52a4f19e44ef5a967632dbc320b0820639'
          "
          class="fee"
        >
          <span class="label" style="color: #f56c6c; opacity: 1">{{
            $t('home.form.warningMsg')
          }}</span>
        </div>
      </div>
      <div v-if="healthFlag">
        <CSubmitButton
          v-if="fromChain && toChain && !(fromWallet && toWallet)"
          @click="connectWalletVisible = true"
        >
          {{ $t('home.form.connectWallet') }}
        </CSubmitButton>
        <div v-else-if="fromChain && toChain && item && needApproval" class="approve-wrapper">
          <CSubmitButton :loading="approving" @click="approve">
            {{ approving ? $t('buttons.approving') : $t('buttons.approve') }}
          </CSubmitButton>
        </div>
        <CSubmitButton
          v-else
          :disabled="!(item && toChain)"
          @click="openConfirm"
          class="button-submit"
        >
          {{ $t('buttons.next') }}
        </CSubmitButton>
      </div>
      <div v-else>
        <div v-if="invalid || !valid">
          Poly Bridge is suspended now due to network problems. We will resume services once the
          network is stable. Sorry for the inconvenience.
        </div>
      </div>
    </div>

    <div class="history">
      {{ $t('home.form.historyPrefix') }}
      <CLink class="link" :to="{ name: 'nfttransactions' }">{{
        $t('home.form.historyLink')
      }}</CLink>
    </div>

    <SelectChain
      :visible.sync="selectFromChainVisible"
      :chainId="fromChainId"
      @update:chainId="changeFromChainId"
      :chains="nftChains || []"
    />
    <SelectChain
      :visible.sync="selectToChainVisible"
      :chainId="toChainId"
      @update:chainId="changeToChainId"
      :chains="toChains || []"
    />
    <SelectAsset
      :visible.sync="selectAssetVisible"
      :assetHash="assetHash"
      @update:asset="changeAsset"
      :assets="assets || []"
    />
    <SelectItem
      :visible.sync="selectItemVisible"
      :itemId="item ? item.TokenId : null"
      @update:item="changeItem"
      :items="items || []"
    />
    <ConnectWallet
      :visible.sync="connectWalletVisible"
      :fromChainId="fromChainId"
      :toChainId="toChainId"
    />
    <Confirm
      :key="confirmUuid"
      :visible.sync="confirmVisible"
      :confirmingData.sync="confirmingData"
      @closed="handleClosed"
      @packed="handlePacked"
    />
    <Detail
      v-if="detailVisible"
      :visible.sync="detailVisible"
      :nftData.sync="nftData"
      @openSelectToChain="openSelectToChain"
      @openConnectWallet="openConnectWallet"
      @openConfirm="openConfirm"
    />
    <TransactionDetails
      :visible.sync="transactionDetailsVisible"
      :confirmingData="confirmingData"
    />
  </ValidationObserver>
</template>

<script>
import httpApi from '@/utils/httpApi';
import BigNumber from 'bignumber.js';
import copy from 'clipboard-copy';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_CHAIN_NAME, UNKNOWN_NFT } from '@/utils/values';
import { ChainId } from '@/utils/enums';
import TransactionDetails from '@/views/nfttransactions/Details';
import { getWalletApi } from '@/utils/walletApi';
import { toStandardHex } from '@/utils/convertors';
import SelectTokenBasic from './SelectTokenBasic';
import SelectChain from './SelectChain';
import SelectAsset from './SelectAsset';
import SelectItem from './SelectItem';
import ConnectWallet from './ConnectWallet';
import Confirm from './Confirm';
import Detail from './Detail';

export default {
  name: 'Form',
  components: {
    SelectTokenBasic,
    SelectAsset,
    SelectItem,
    SelectChain,
    ConnectWallet,
    Confirm,
    Detail,
    TransactionDetails,
  },
  data() {
    return {
      selectTokenBasicVisible: false,
      selectFromChainVisible: false,
      selectToChainVisible: false,
      connectWalletVisible: false,
      confirmVisible: false,
      transactionDetailsVisible: false,
      selectAssetVisible: false,
      selectItemVisible: false,
      detailVisible: false,
      tokenBasicName: DEFAULT_CHAIN_NAME,
      chainBasicName: DEFAULT_CHAIN_NAME,
      fromChainId: null,
      toChainId: null,
      assetName: '',
      amount: '',
      approving: false,
      confirmingData: null,
      nftData: null,
      confirmUuid: uuidv4(),
      assetHash: null,
      item: null,
      unknowNFT: require('../../assets/svg/unknown.svg'),
      currentPage: 1,
      currentShowPage: 1,
      itemsShowTotal: 20,
      assetsName: '',
      searchTokenID: '',
      itemLoading: false,
      needApproval: true,
      defaultImg: 'this.src="'.concat(require('../../assets/svg/back.svg'), '"'),
      healthFlag: true,
    };
  },
  computed: {
    tokenBasic() {
      return this.$store.getters.getTokenBasic(this.tokenBasicName);
    },
    assets() {
      const assetsList = this.$store.getters.getAssetsBasics.Assets;
      let list = [];
      if (this.assetsName !== '') {
        for (let i = 0; i < assetsList.length; i += 1) {
          if (assetsList[i].Name.toUpperCase().indexOf(this.assetsName.toUpperCase()) > -1) {
            list.push(assetsList[i]);
          }
        }
      } else {
        list = assetsList;
      }
      return this.fromWallet ? list : [];
    },
    chainBasic() {
      return this.fromChainId ? this.nftChains[0] : null;
    },
    itemsTotal() {
      const itemsTotal = this.$store.getters.getItems.TotalCount
        ? this.$store.getters.getItems.TotalCount
        : 0;
      return itemsTotal;
    },
    items() {
      // const AssetsShow = this.$store.getters.getItemsShow.Assets
      //   ? this.$store.getters.getItemsShow.Assets
      //   : [];
      // const itemsShow = AssetsShow[0] ? AssetsShow[0].Items : [];
      const items = this.assetHash ? this.$store.getters.getItems.Items : [];
      return this.fromWallet ? items : [];
    },
    itemsShow() {
      return this.$store.getters.getItemsShow.Assets;
    },
    itemsTrue() {
      return this.$store.getters.getItems;
    },
    chains() {
      return this.$store.getters.chains.filter((chain) => chain.id !== ChainId.Poly);
    },
    nftChains() {
      return this.$store.getters.chains.filter(
        (chain) =>
          chain.id !== ChainId.Poly && chain.id !== ChainId.Ont && chain.id !== ChainId.Neo,
      );
    },
    fromChains() {
      return (
        this.tokenBasic &&
        this.$store.getters
          .getTokensByTokenBasicName(this.tokenBasic.name)
          .map((token) => this.$store.getters.getChain(token.chainId))
          .filter((chain) => chain)
      );
    },
    fromChain() {
      return this.$store.getters.getChain(this.fromChainId);
    },
    fromToken() {
      return (
        this.tokenBasic &&
        this.$store.getters.getTokenByTokenBasicNameAndChainId({
          tokenBasicName: this.tokenBasicName,
          chainId: this.fromChainId,
        })
      );
    },
    fromWallet() {
      return this.$store.getters.getChainConnectedWallet(this.fromChainId);
    },
    getTokenMapsParams() {
      if (this.fromToken) {
        return {
          fromChainId: this.fromChainId,
          fromTokenHash: this.fromToken.hash,
        };
      }
      return null;
    },
    tokenMaps() {
      return this.getTokenMapsParams && this.$store.getters.getTokenMaps(this.getTokenMapsParams);
    },
    assetMap() {
      return this.$store.getters.getAssetMap.DstAssets;
    },
    toChains() {
      return (
        this.assetMap &&
        this.assetMap
          .map((asset) => this.$store.getters.getChain(asset.ChainId))
          .filter((chain) => chain)
      );
    },
    toChain() {
      return this.$store.getters.getChain(this.toChainId);
    },
    toToken() {
      return (
        this.tokenBasic &&
        this.$store.getters.getTokenByTokenBasicNameAndChainId({
          tokenBasicName: this.tokenBasicName,
          chainId: this.toChainId,
        })
      );
    },
    toWallet() {
      return this.$store.getters.getChainConnectedWallet(this.toChainId);
    },
    getBalanceParams() {
      if (this.fromWallet && this.fromToken) {
        return {
          chainId: this.fromChainId,
          address: this.fromWallet.address,
          tokenHash: this.fromToken.hash,
        };
      }
      return null;
    },
    balance() {
      return this.getBalanceParams && this.$store.getters.getBalance(this.getBalanceParams);
    },
    getAllowanceParams() {
      if (this.fromWallet && this.fromChain && this.fromToken) {
        return {
          chainId: this.fromChainId,
          address: this.fromWallet.address,
          tokenHash: this.fromToken.hash,
          spender: this.fromChain.lockContractHash,
        };
      }
      return null;
    },
    allowance() {
      return this.getAllowanceParams && this.$store.getters.getAllowance(this.getAllowanceParams);
    },
    fee() {
      return this.$store.getters.getNftFee;
    },
    getChainsHealthParams() {
      const arr = [];
      arr.push(0);
      if (this.fromChain) {
        arr.push(this.fromChainId);
      }
      return arr;
    },
  },
  watch: {
    async getBalanceParams(value) {
      if (value) {
        await this.$store.dispatch('ensureChainWalletReady', value.chainId);
        this.$store.dispatch('getBalance', value);
      }
    },
    getFeeParams(value) {
      if (value) {
        this.$store.dispatch('getFee', value);
      }
    },
    getTokenMapsParams(value) {
      if (value) {
        this.$store.dispatch('getTokenMaps', value);
      }
    },
    async getAllowanceParams(value) {
      if (value) {
        await this.$store.dispatch('ensureChainWalletReady', value.chainId);
        this.$store.dispatch('getAllowance', value);
      }
    },
    /* assets() {
      if (this.assets[0]) {
        this.assetHash = this.assetHash ? this.assetHash : this.assets[0].Hash;
        this.assetName = this.assetName ? this.assetName : this.assets[0].Name;
        if (this.fromWallet) {
          this.getItems(this.assetHash, '', this.currentPage);
          this.getAssetMap();
        }
      }
    }, */
    async fromChain(value) {
      await this.$store.dispatch('ensureChainWalletReady', value.id);
    },
    fromWallet() {
      this.connectInit();
    },
    items() {
      console.log(this.items);
    },
    itemsTrue() {
      this.itemLoading = false;
    },
    toWallet() {
      this.nftData.toWallet = this.toWallet;
    },
  },
  created() {
    this.init();
    this.getChainHealth();
    this.interval = setInterval(() => {
      this.getChainHealth();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    showVideo($id) {
      console.log($id.concat('error'));
      let id1 = 'img';
      id1 = id1.concat($id);
      let id2 = 'video';
      id2 = id2.concat($id);
      if (document.getElementById(id1)) {
        document.getElementById(id1).style.display = 'none';
      }
      if (document.getElementById(id2)) {
        document.getElementById(id2).style.display = 'block';
      }
    },
    async getChainHealth() {
      const chindIds = this.getChainsHealthParams;
      const res = await httpApi.getHealthData({ chindIds });
      const polyHealth = res.Result[0];
      let tempFlag = polyHealth;
      if (this.fromChainId) {
        tempFlag = tempFlag && res.Result[this.fromChainId];
      }
      this.healthFlag = tempFlag;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getItems(this.assetHash, '', this.currentPage);
    },
    handleCurrentShowChange(val) {
      this.currentShowPage = val;
      this.getItemsShow();
    },
    async getWrapperCheck($nftspender) {
      let flag = false;
      const chindId = this.fromChainId;
      const res = await httpApi.getWrapperCheck({ chindId });
      const arr = [];
      for (let i = 0; i < res.Wrapper.length; i += 1) {
        arr.push(toStandardHex(res.Wrapper[i]));
      }
      const standardSpender = toStandardHex($nftspender);
      const index = arr.indexOf(standardSpender);
      if (index > -1) {
        flag = true;
      }
      return flag;
    },
    async changeItem(item) {
      this.item = item;
      const walletApi = await getWalletApi(this.fromWallet.name);
      this.needApproval = await walletApi.getNFTApproved({
        fromChainId: this.fromChainId,
        tokenHash: this.assetHash,
        id: item.TokenId,
      });
    },
    async approve() {
      this.approving = true;
      let nftspender = this.fromChain.nftLockContractHash;
      if (this.fromChain.id === 2 && this.toChain.id === 8) {
        nftspender = this.fromChain.pltNftLockContractHash;
      }
      const walletApi = await getWalletApi(this.fromWallet.name);
      const flag = await this.getWrapperCheck(nftspender);
      if (!flag) {
        this.$message.error('wrapper contract error');
        this.approving = false;
        return;
      }
      try {
        await walletApi.nftApprove({
          address: this.fromWallet.address,
          tokenHash: this.assetHash,
          spender: nftspender,
          id: this.item.TokenId,
        });
        this.needApproval = await walletApi.getNFTApproved({
          fromChainId: this.fromChainId,
          toChainId: this.toChainId,
          tokenHash: this.assetHash,
          id: this.item.TokenId,
        });
      } finally {
        this.approving = false;
      }
    },
    async tokenSelect(item) {
      if (!this.fromWallet) {
        this.connectWalletVisible = true;
      }
      const a = await this.$store.dispatch('ensureChainWalletReady', this.fromChainId);
      this.getAssetMap();
      const walletApi = await getWalletApi(this.fromWallet.name);
      const Approval = await walletApi.getNFTApproved({
        fromChainId: this.fromChainId,
        tokenHash: this.assetHash,
        id: item.TokenId,
      });
      this.toChainId = null;
      this.nftData = {
        fromChainId: this.fromChainId,
        toChains: this.toChains,
        toChainId: this.toChainId,
        nft: item,
        assetHash: this.assetHash,
        fromWallet: this.fromWallet,
        toWallet: null,
        needApproval: Approval,
      };
      this.detailVisible = true;
    },
    async connectInit() {
      this.currentPage = 1;
      this.getAssets();
    },
    async init() {
      this.currentPage = 1;
      // this.getItemsShow();
      this.assetHash = null;
      this.assetName = '';
      this.item = null;
      this.getAssets();
    },
    getItemsShow() {
      this.itemLoading = true;
      const params = {
        ChainId: this.fromChain.id,
        PageSize: 12,
        PageNo: this.currentShowPage - 1,
      };
      this.$store.dispatch('getItemsShow', params);
    },
    getAssets() {
      this.$store.dispatch('getAssetsBasics', this.fromChain);
    },
    getAssetMap() {
      const params = {
        ChainId: this.fromChain.id,
        Hash: this.assetHash,
      };
      this.$store.dispatch('getAssetMap', params);
    },
    getItems($Asset, $TokenId, page) {
      if (this.fromWallet) {
        this.itemLoading = true;
      } else {
        return;
      }
      const params = {
        ChainId: this.fromChain.id,
        Asset: $Asset,
        Address: this.fromWallet ? this.fromWallet.addressHex : '',
        TokenId: $TokenId,
        PageNo: page - 1,
        PageSize: 12,
      };
      this.$store.dispatch('getItems', params);
    },
    openSelectToChain() {
      this.selectToChainVisible = true;
    },
    openConnectWallet() {
      this.connectWalletVisible = true;
    },
    openConfirm() {
      this.confirmingData = {
        fromAddress: this.fromWallet.address,
        toAddress: this.toWallet.address,
        fromChainId: this.fromChainId,
        toChainId: this.toChainId,
        fromTokenHash: this.assetHash,
        nft: this.item,
        amount: 0,
        fee: this.fee,
      };
      this.confirmVisible = true;
    },
    changeFromChainId(chainId) {
      this.fromChainId = chainId;
      this.toChainId = null;
      this.init();
      if (!this.fromWallet) {
        this.openConnectWallet();
      }
      this.getChainHealth();
      // const a = await this.$store.dispatch('ensureChainWalletReady', this.fromChainId);
    },
    changeToChainId(chainId) {
      this.toChainId = chainId;
      const params = {
        SrcChainId: this.fromChainId,
        Hash: this.fromChain.nftFeeContractHash,
        DstChainId: this.toChainId,
      };
      this.$store.dispatch('getNftFee', params);
      this.getChainHealth();
    },
    changeAsset(asset) {
      this.item = null;
      this.assetHash = asset.Hash;
      this.assetName = asset.Name;
      this.getItems(this.assetHash, '', this.currentPage);
      this.getAssetMap();
    },
    copy(text) {
      copy(text);
      this.$message.success(this.$t('messages.copied', { text }));
    },
    async getApproved() {
      const walletApi = await getWalletApi(this.nftData.fromWallet.name);
      this.nftData.needApproval = await walletApi.getNFTApproved({
        fromChainId: this.nftData.fromChainId,
        tokenHash: this.nftData.assetHash,
        id: this.nftData.nft.TokenId,
      });
      console.log(this.needApproval);
    },
    next() {
      this.confirmingData = {
        fromAddress: this.fromWallet.address,
        toAddress: this.toWallet.address,
        fromChainId: this.fromChainId,
        toChainId: this.toChainId,
        fromTokenHash: this.fromToken.hash,
        toTokenHash: this.toToken.hash,
        amount: this.amount,
        fee: this.fee,
      };
      this.confirmVisible = true;
    },
    handleClosed() {
      this.$nextTick(() => {
        this.confirmUuid = uuidv4();
      });
    },
    handlePacked() {
      this.transactionDetailsVisible = true;
      this.clearAmount();
    },
    clearAmount() {
      this.amount = '';
      this.$nextTick(() => this.$refs.amountValidation.reset());
    },
  },
};
</script>
<style>
.el-pagination button:disabled {
  background-color: rgba(255, 255, 255, 0);
}
.el-pagination .btn-prev,
.el-pagination .btn-next {
  background-color: rgba(255, 255, 255, 0);
}
.el-pagination .btn-prev:hover,
.el-pagination .btn-next:hover {
  background-color: rgba(255, 255, 255, 0);
  color: rgba(255, 255, 255, 1);
}
.el-pagination button {
  background-color: rgba(255, 255, 255, 0);
}
.el-pager li {
  background-color: rgba(255, 255, 255, 0);
  color: rgba(255, 255, 255, 0.3);
}
.el-pager li:hover {
  background-color: rgba(255, 255, 255, 0);
  color: rgba(255, 255, 255, 1);
}

.el-pager li.active {
  color: #fff;
}
.el-loading-mask {
  background-color: rgba(255, 255, 255, 0);
}
.el-loading-spinner .path {
  stroke: #3ec7eb;
}
</style>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include child-margin-v(30px);
}

.card {
  box-sizing: border-box;
  width: 640px;
  //padding: 40px 50px 54px;
  //background: #171f31;
  //box-shadow: 0px 2px 18px 7px rgba(#000000, 0.1);
  border-radius: 10px;
  position: relative;
}
.card-hidden {
  box-sizing: border-box;
  width: 452px;
  height: 100%;
  padding: 40px 50px 54px;
  background: rgba(23, 31, 49, 0.9);
  box-shadow: 0px 2px 18px 7px rgba(#000000, 0.1);
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-weight: 500px;
  font-size: 20px;
  text-align: center;
  @include next-margin-v(30px);
}

.fields {
  @include child-margin-v(20px);
  @include next-margin-v(40px);
}
.field-wrapper {
  display: flex;
  background: rgba(19, 27, 46, 1);
  border-radius: 24px;
  margin-top: 15px;
  height: 100px;
}

.fields-row {
  display: flex;
  flex-direction: column;
  @include child-margin-v(20px);
}

.field {
  flex: 1;
  @include child-margin-v(15px);
}

.label {
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  display: flex;
}
.label-left {
  display: flex;
  width: 33%;
}
.label-left {
  flex: 1;
  display: flex;
}
.label-name {
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
}
.copy-icon {
}
.value {
  font-size: 10px;
}

.select-token-basic {
  display: flex;
  align-items: center;
  width: stretch;
  height: 100px;
  padding: 30px;
  border-radius: 24px;
  @include child-margin-h(8px);
}
.selected-img {
  margin-right: 10px;
  max-width: 24px;
  max-height: 24px;
}
.select-token-basic-icon {
  width: 30px;
  border-radius: 15px;
}

.select-token-basic-name {
  font-size: 20px;
}

.select-chain {
  width: 100%;
  padding: 35px 0 35px 30px;
}

.select-chain-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: stretch;
  // padding: 15px;
  // border: 1px solid rgba(#ffffff, 0.1);
  // border-radius: 4px;
  // background: rgba(#ffffff, 0.04);
}

.select-chain-icon {
  width: 30px;
  @include next-margin-v(0px);
}

.select-chain-name {
  font-size: 18px;
  line-height: 27px;
  text-align: left;
  margin-left: 10px;
}

.address {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
}
.address > .c-button {
  display: flex;
}
.address-value {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-right: 10px;
}

.chevron-down {
  align-self: flex-end;
}
.chevron-right {
  margin-left: 10px;
}

.use-max {
  margin-left: 10px;
  padding: 5px;
  border-radius: 4px;
  color: rgba(#ffffff, 0.6);
  background: rgba(#ffffff, 0.05);
  font-weight: 600;
  font-size: 12px;
  height: 20px;
}

.exchange {
  margin-top: 15px;
}
.exchange-icon {
  height: 15px;
}

.balance > .label,
.balance > .value {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}
.fee > .label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.3);
}
.fee > .value {
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
}
.balance,
.fee {
  display: flex;
  align-items: center;
  @include child-margin-h(4px);
}

.tooltip-icon {
  vertical-align: middle;
}

.fee-value {
  font-size: 12px;
}

.fee-icon {
  width: 14px;
  border-radius: 7px;
}

.fee-token {
  font-size: 10px;
}

.link {
  color: #2fd8ca;
  text-decoration: underline;
}
.approve-wrapper {
  label {
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .card {
    max-width: 90vw;
    padding: 20px 10px;
  }
  .button-submit {
    margin: 20px 0 30px 0 !important;
  }
  .chevron-down {
    margin-top: -12px;
  }
  .form > .card {
    padding: 20px 10px;
  }
}
</style>
