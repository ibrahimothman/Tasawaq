/* eslint-disable no-shadow */
import firebase from '../firebase';

const state = {
  user: null,
  error: null,
  loading: false,
};

const actions = {
  async signUp({ commit }, { email, password }) {
    try {
      commit('clearError');
      commit('setLoading', true);
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      commit('setUser', { id: user.uid });
      commit('setLoading', false);
    } catch (error) {
      console.error(error);
      commit('setLoading', false);
      commit('setError', error);
    }
  },

  async signIn({ commit }, { email, password }) {
    try {
      commit('clearError');
      commit('setLoading', true);
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      commit('setUser', { id: user.uid });
      commit('setLoading', false);
    } catch (error) {
      console.error(error);
      commit('setLoading', false);
      commit('setError', error);
    }
  },

  async signOut({ commit }) {
    try {
      commit('clearError');
      commit('setLoading', true);
      await firebase.auth().signOut();
      commit('setUser', null);
      commit('setLoading', false);
    } catch (error) {
      console.error(error);
      commit('setLoading', false);
      commit('setError', error);
    }
  },
};

const mutations = {
  setUser: (state, user) => { state.user = user; },
  setError: (state, error) => { state.error = error; },
  clearError: (state) => { state.error = null; },
  setLoading: (state, loading) => { state.loading = loading; },
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
};
