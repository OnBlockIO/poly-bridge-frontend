<template>
  <CDialog v-bind="$attrs" v-on="$listeners">
    <div class="content">
      <div
        class="title"
        style="vertical-align: middle; justify-content: space-between; display: flex"
      >
        {{ $t('home.selectChain.title') }}
        <img
          class="close-btn"
          src="@/assets/svg/close.svg"
          @click="$emit('update:visible', false)"
        />
      </div>
      <CDivider />
      <div class="scroll">
        <div v-for="chain in chains" :key="chain.id" class="chain" @click="select(chain)">
          <span class="chain-left">
            <img class="chain-icon" :src="chain.icon" />
            <span>{{ $formatEnum(chain.id, { type: 'chainName' }) }}</span>
          </span>
          <img v-if="chainId === chain.id" src="@/assets/svg/check.svg" />
        </div>
      </div>
    </div>
  </CDialog>
</template>

<script>
export default {
  name: 'SelectChain',
  inheritAttrs: false,
  props: {
    chainId: Number,
    chains: Array,
  },
  methods: {
    select(chain) {
      this.$emit('update:visible', false);
      this.$emit('update:chainId', chain.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100vh;
  background: white;
  background: var(--background-color-base);

  box-shadow: 0px 2px 18px 7px rgba(#000000, 0.1);
}

.title {
  padding: 80px 50px 20px;
  font-weight: 500;
}

.scroll {
  flex: 1;
  padding: 16px 10px;
  overflow-y: auto;
  @include scroll-bar(rgba(#fff, 0.2), transparent);
}

.chain {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 40px;
  transition: all 0.3s;
  @include child-margin-h(16px);

  &:hover {
    opacity: 0.8;
    background: var(--background-color-base-hover);
  }
}

.chain-left {
  display: flex;
  align-items: center;
  @include child-margin-h(8px);
}

.chain-icon {
  width: 24px;
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .content {
    width: 100vw;
  }
}
</style>
