import Vue from 'vue';
import getStoreKey from '@/utils/getStoreKey';
import httpApi from '@/utils/httpApi';

export default {
  state: {
    healthDataMap: {},
  },
  getters: {
    getHealthData:
      (state) =>
      ({ chindIds }) =>
        state.healthDataMap[getStoreKey({ chindIds })],
  },
  mutations: {
    setHealthData(state, { params, value }) {
      Vue.set(state.healthDataMap, getStoreKey(params), value);
    },
  },
  actions: {
    async getHealthData({ commit }, chindIds) {
      const healthData = await httpApi.getHealthData({ chindIds });
      const data = healthData.Result;
      commit('setHealthData', { params: { chindIds }, value: data });
    },
  },
};
