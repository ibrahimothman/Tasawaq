import { firestoreAction } from 'vuexfire';
import db from '../db';

const state = {
  products: [],
};

const actions = {
  initProducts: firestoreAction(({ bindFirestoreRef }) => {
    // return the promise returned by `bindFirestoreRef`
    bindFirestoreRef('products', db.collection('products'));
  }),

  async addProduct({ rootState }, product) {
    const { id } = db.collection('products').doc();
    product.id = id;
    product.created_at = firebase.firestore.FieldValue.serverTimestamp();
    product.user_id = rootState.auth.user.id;
    try {
      await db.collection('products').doc(product.id).set(product);
    } catch (err) {
      console.error(err);
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
};
