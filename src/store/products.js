import { firestoreAction } from 'vuexfire';
import firebase from '../firebase';
import db from '../db';

const state = {
  products: [],
};

const actions = {
  initProducts: firestoreAction(async ({ bindFirestoreRef }) => {
    // return the promise returned by `bindFirestoreRef`
    await bindFirestoreRef('products', db.collection('products'));
  }),

  async addProduct({ rootState }, payload) {
    const { id } = db.collection('products').doc();
    const product = {
      ...payload,
      id,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      user_id: rootState.auth.user.id,
    };
    try {
      const res = await db.collection('products').doc(product.id).set(product);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
};
