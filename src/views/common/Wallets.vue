<template>
  <div class="wallets">
    <CPopover v-if="!connectedWallets.length" v-model="connectWalletVisible">
      <CButton class="connect-wallet-button">{{ $t('common.wallets.connectWallet') }}</CButton>
      <template #content>
        <ConnectWallet :visible.sync="connectWalletVisible" />
      </template>
    </CPopover>

    <template v-else>
      <CPopover v-for="wallet in connectedWallets" :key="wallet.name" trigger="hover">
        <CButton>
          <img class="wallet-icon" :src="wallet.icon" />
        </CButton>
        <template #content>
          <Wallet :wallet="wallet" />
        </template>
      </CPopover>

      <CPopover class="show-all" v-model="connectWalletVisible">
        <CButton>
          <img src="@/assets/svg/chevron-down.svg" />
        </CButton>
        <template #content>
          <ConnectWallet :visible.sync="connectWalletVisible" />
        </template>
      </CPopover>
    </template>
  </div>
</template>

<script>
import Vue from 'vue';
import { getWalletApi } from '@/utils/walletApi';
import Wallet from './Wallet';
import ConnectWallet from './ConnectWallet';

export default {
  name: 'Wallets',
  components: {
    Wallet,
    ConnectWallet,
  },
  data() {
    return {
      connectWalletVisible: false,
    };
  },
  computed: {
    wallets() {
      return this.$store.getters.wallets;
    },
    connectedWallets() {
      return this.wallets.filter((wallet) => wallet.connected);
    },
  },
  created() {
    this.wallets.forEach(async (wallet) => {
      Vue.use(await getWalletApi(wallet.name));
    });
    this.$store.dispatch('loadChainSelectedWallets');
  },
  methods: {
    close2() {
      console.log('hello');
    },
  },
};
</script>

<style lang="scss" scoped>
.wallets {
  @include child-margin-h(4px);
  display: flex;
  align-items: center;
}

.show-all {
  @include last-margin-h(10px);
}
[theme='light'] .show-all {
  filter: invert(1);
}
.wallet-icon {
  width: 24px;
}
.connect-wallet-button {
  padding: 8px 15px;
  // border: 1px solid #ffffff;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    opacity: 0.5;
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .wallets {
    width: 80px;
  }
  .connect-wallet-button {
    border: 0px;
  }
}
</style>
