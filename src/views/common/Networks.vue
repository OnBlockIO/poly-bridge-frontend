<template>
  <CLink
    class="item"
    :href="mainnet ? 'https://bridge.ghostmarket.io' : 'https://bridge-testnet.ghostmarket.io'"
    target="_self"
  >
    {{ mainnet ? $t('common.networks.mainnet') : $t('common.networks.testnet') }}
  </CLink>
</template>

<script>
import { TARGET_MAINNET } from '@/utils/env';

export default {
  name: 'Networks',
  data() {
    return {
      mainnet: TARGET_MAINNET,
    };
  },
};
</script>
