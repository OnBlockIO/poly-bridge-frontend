<template>
  <div class="menu">
    <CLink class="item" @click="goGovernance" target="_self"> Governance </CLink>
    <CLink class="item" style="margin-right: 10px" @click="goGM" target="_blank">
      GhostMarket
    </CLink>
    <Wallets />
    <!--<CLink @click="goAudit" class="item" target="_self">
      {{ $t('common.menu.audit') }}
    </CLink>-->
    <!--<CLink
      :to="{ name: 'home' }"
      :class="$route.name == 'home' ? 'active item' : 'item'"
      target="_self"
    >
      {{ $t('common.menu.token') }}
    </CLink>-->
    <!--<CLink
      :to="{ name: 'nft' }"
      :class="$route.name == 'nft' ? 'active item' : 'item'"
      target="_self"
    >
      {{ $t('common.menu.nft') }}
    </CLink>-->
    <!--<Networks />-->
    <ToggleTheme />
  </div>
</template>

<script>
import { TARGET_MAINNET } from '@/utils/env';

import ToggleTheme from '@/components/others/ToggleTheme';

import Wallets from './Wallets';
import Networks from './Networks';

export default {
  name: 'Menu',
  data() {
    return {
      mainnet: TARGET_MAINNET,
    };
  },
  components: {
    Wallets,
    Networks,
    ToggleTheme,
  },
  methods: {
    goAudit() {
      window.open('https://github.com/polynetwork/audit-report');
    },
    goGovernance() {
      window.open('https://governance.ghostmarket.io');
    },
    goVesting() {
      window.open('https://vesting.ghostmarket.io');
    },
    goGM() {
      window.open('https://ghostmarket.io');
    },
  },
};
</script>
<style lang="scss">
.menu {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: end;
  .item {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text-primary);
    line-height: 20px;
    padding: 6px 4px;
    max-width: 110px;
    border-radius: 8px;
    // padding: 0 40px 0 0;
    transition: all ease 0.3s;
  }
  .item:hover {
    color: #fff;
    transition: all ease 0.3s;
    color: var(--color-primary);
  }
  .active {
    color: var(--color-primary);
    &:hover {
      color: #fff;
    }
  }
}
</style>
