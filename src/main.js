/* eslint-disable no-unused-vars */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import 'jquery';
import 'popper.js';
import './assets/app.scss';
import firebase from './firebase';
import auth from './auth';

Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged((user) => {
 if (!app) {
  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
  }
});
