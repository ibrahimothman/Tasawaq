import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import auth from './auth';
import products from './products';
import profile from './profile';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: vuexfireMutations,
  modules: {
    auth,
    products,
    profile,
  },
});
