<template>
  <CDialog v-bind="$attrs" v-on="$listeners">
    <div class="content">
      <div class="title">
        {{ $t('home.selectItem.title') }}
        <img
          class="close-btn"
          src="@/assets/svg/close.svg"
          @click="$emit('update:visible', false)"
        />
      </div>
      <CDivider />
      <div class="scroll">
        <div v-for="item in items" :key="item.TokenId" class="chain" @click="select(item)">
          <span class="chain-left">
            <img class="item-img" :src="item.Image ? item.Image : unknown" />
            <span>{{ item.AssetName }} {{ item.TokenId }}</span>
          </span>
          <img v-if="itemId === item.TokenId" src="@/assets/svg/check.svg" />
        </div>
      </div>
    </div>
  </CDialog>
</template>

<script>
export default {
  name: 'SelectAsset',
  inheritAttrs: false,
  props: {
    itemId: String,
    items: Array,
  },
  data() {
    return {
      unknown: require('@/assets/svg/unknown.svg'),
    };
  },
  methods: {
    select(item) {
      this.$emit('update:visible', false);
      this.$emit('update:item', item);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 500px;
  height: 100vh;
  background: #171f31;
  box-shadow: 0px 2px 18px 7px rgba(#000000, 0.1);
}

.title {
  font-size: 24px;
  line-height: 36px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .close-btn {
    width: 30px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }
}

.scroll {
  flex: 1;
  padding: 16px 0px;
  overflow-y: auto;
  @include scroll-bar(rgba(#fff, 0.2), transparent);
}

.chain {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 160px;
  min-height: 56px;
  box-sizing: border-box;
  padding: 0 20px;
  transition: all 0.3s;
  @include child-margin-h(16px);

  &:hover {
    opacity: 0.8;
    background: rgba(#000000, 0.3);
  }
}

.chain-left {
  display: flex;
  align-items: center;
  padding: 16px 0px;
  @include child-margin-h(8px);
}

.chain-icon {
  width: 24px;
}
.item-img {
  max-height: 120px;
  max-width: 120px;
}

@media screen and (max-width: 900px) {
  .content {
    width: 100vw;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
