<template>
  <div class="supplyComponent">
    <!-- supply heading wrapper -->
    <div class="supplyHeadingWrapper">
      <!-- supply heading -->
      <div class="supplyHeading">
        <div class="supplyHeading__title">Token Distribution</div>
        <div class="supplyHeading__description">
          Live statistics on GM supply on each blockchain
        </div>
        <div class="supplyHeading__total">
          <img
            :src="require(`@/assets/png/gm.png`)"
            class="supplyItem__token__image"
            style="height: 30px; width: 30px; margin-right: 0.5rem"
          />
          GM Total Supply: {{ totalSupplyCount }}
        </div>
        <div class="supplyHeading__total">
          <img
            :src="require(`@/assets/png/gm.png`)"
            class="supplyItem__token__image"
            style="height: 30px; width: 30px; margin-right: 0.5rem"
          />
          GM Circulating Supply: {{ availableSupplyCount }}
        </div>
      </div>
      <!-- eof supply heading -->
    </div>
    <!-- eof supply heading wrapper -->
    <!-- supply list wrapper -->
    <div class="supplyListWrapper">
      <!-- supply list -->
      <div class="supplyList">
        <div class="supplyList__header">
          <div class="supplyList__header__item supplyList__header__item__first">Blockchain</div>
          <div class="supplyList__header__item supplyList__header__item__second">Supply</div>
          <div class="supplyList__header__item supplyList__header__item__third">Percentage</div>
        </div>
        <!-- supply item -->
        <div v-for="token in supplyTokens" :key="token.id" class="supplyItem">
          <div class="supplyItem__token">
            <img :src="require(`@/assets/svg/${token.imgsrc}`)" class="supplyItem__token__image" />
            <div class="supplyItem__token__title">
              {{ token.title }}
            </div>
          </div>
          <div class="supplyItem__amount">
            {{ token.availableAmount }}
          </div>
          <div class="supplyItem__percentage">
            {{ token.percentage }}
          </div>
        </div>
        <!-- eof supply item -->
      </div>
      <!-- eof supply list -->
    </div>
    <!-- eof supply list wrapper -->
  </div>
</template>

<script>
// :src="getImageSrc(token.imgsrc)"
import { GMSupplyApi } from '@/utils/gmsupplyApi';

function number(value, decimals) {
  if (value === 0 || !value) {
    return '0';
  }
  const parts = (decimals === undefined ? value.toString() : value.toFixed(decimals)).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export default {
  name: 'SupplySection',
  data() {
    return {
      totalSupplyCount: '',
      availableSupplyCount: '',
      supplyTokens: [
        {
          id: 1,
          slug: 'bsc',
          imgsrc: 'bsc.svg',
          title: 'BNB Chain ERC20',
          availableAmount: '',
          availableNumber: 0,
          percentage: '',
        },
        {
          id: 2,
          slug: 'ethereum',
          imgsrc: 'eth.svg',
          title: 'Ethereum ERC20',
          availableAmount: '',
          availableNumber: 0,
          percentage: '',
        },
        {
          id: 3,
          slug: 'avalanche',
          imgsrc: 'avalanche.svg',
          title: 'Avalanche ERC20',
          availableAmount: '',
          availableNumber: 0,
          percentage: '',
        },
        {
          id: 4,
          slug: 'polygon',
          imgsrc: 'polygon.svg',
          title: 'Polygon ERC20',
          availableAmount: '',
          availableNumber: 0,
          percentage: '',
        },
        {
          id: 5,
          slug: 'n3',
          imgsrc: 'neo.svg',
          title: 'Neo N3 NEP17',
          availableAmount: '',
          availableNumber: 0,
          percentage: '',
        },
        {
          id: 6,
          slug: 'base',
          imgsrc: 'base.svg',
          title: 'Base ERC20',
          availableAmount: '',
          availableNumber: 0,
          percentage: '',
        },
        {
          id: 7,
          slug: 'phantasma',
          imgsrc: 'phantasma.svg',
          title: 'Phantasma PEPE11',
          availableAmount: '',
          availableNumber: 0,
          percentage: '',
        },
      ],
    };
  },
  methods: {
    getImageSrc(imgName) {
      return `${process.env.BASE_URL}assets/svg/${imgName}`;
    },
  },
  created() {
    const isMainnet = true;
    const baseUrl = isMainnet
      ? 'https://api.ghostmarket.io/api/v2'
      : 'https://api-testnet.ghostmarket.io/api/v2';
    new GMSupplyApi({ baseUrl }).getGMSupply().then((res) => {
      const circulating = res.allCirculatingSupply === 0 ? 1 : res.allCirculatingSupply;
      this.totalSupplyCount = number(res.allTotalSupply, 0);
      this.availableSupplyCount =
        res.allCirculatingSupply > 100000000
          ? number(100000000, 0)
          : number(res.allCirculatingSupply, 0);
      this.supplyTokens.forEach((token) => {
        try {
          const tc = res[`${token.slug}CirculatingSupply`];
          // temp hardcode ethereum values - to remove
          if (token.slug === 'ethereum') {
            token.availableAmount = number(226086.72552652657, 0);
            token.availableNumber = 226086.72552652657;
            token.percentage = 226086.72552652657
              ? `${((100 * 226086.72552652657) / circulating).toFixed(2)}%`
              : `0%`;
          } else {
            token.availableAmount = number(tc, 0);
            token.availableNumber = tc;
            token.percentage = tc ? `${((100 * tc) / circulating).toFixed(2)}%` : `0%`;
          }
        } catch (err) {
          console.error(err);
        }
      });
      this.supplyTokens.sort((a, b) => b.availableNumber - a.availableNumber);
    });
  },
};
</script>

<style lang="scss" scoped>
.supplyComponent {
  padding: 4rem 0;
  background-color: #f8f8fa;
}
.supplyHeadingWrapper {
  margin: 0px 10px;
}
.supplyHeading {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  &__title {
    letter-spacing: 1.2px;
    font-size: 30px;
    text-align: center;
    font-weight: 700;
  }
  &__description {
    filter: invert(0.3);
    line-height: 28px;
    margin-top: 15px;
    text-align: center;
  }
  &__total {
    margin-top: 20px;
    text-align: center;
    display: flex;
    align-items: center;
  }
}

[theme='dark'] .supplyComponent {
  background-color: #1a1a1a;
}
.supplyListWrapper {
  margin: 30px 10px 0px 10px;
}
.supplyList {
  background-color: white;
  display: block;
  max-width: 900px;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0px 0px 17px -7px rgba(34, 60, 80, 0.2);
  overflow: hidden;
  &__header {
    background: var(--color-primary);
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    &__item {
      color: white;
      font-size: 16px;
      display: flex;
      justify-content: center;
      &__first {
        justify-content: start;
        width: 30%;
      }
      &__second {
        width: 25%;
      }
      &__third {
        width: 25%;
      }
    }
  }
}
[theme='dark'] .supplyList {
  background-color: #242323;
}
.supplyItem {
  height: 55px;
  border-bottom: 2px solid #f8f8f8;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &__token {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 30%;
    &__image {
      width: 20px;
      height: 20px;
    }
    &__title {
      font-size: 16px;
      margin-left: 7px;
    }
  }
  &__amount {
    width: 25%;
    font-size: 16px;
    display: flex;
    justify-content: center;
  }
  &__percentage {
    width: 25%;
    font-size: 16px;
    display: flex;
    justify-content: center;
  }
}
[theme='dark'] .supplyItem {
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 640px) {
  .supplyList {
    &__header {
      &__item {
        font-size: 10px;
      }
    }
  }
  .supplyItem {
    &__token {
      &__title {
        font-size: 10px;
      }
    }
    &__amount {
      font-size: 12px;
    }
    &__percentage {
      font-size: 11px;
    }
  }
}
</style>
