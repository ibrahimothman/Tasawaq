import { firestoreAction } from 'vuexfire';
import firebase from '../firebase';
import db from '../db';
import uploadImage from '../storage';

const state = {
  products: [],
};

const actions = {
  initProducts: firestoreAction(async ({ rootState, bindFirestoreRef }) => {
    // return the promise returned by `bindFirestoreRef`
    const { user } = rootState.auth;
    await bindFirestoreRef(
      'products',
      db
        .collection('products')
        .where('user_id', '==', user.id),
    );
  }),

  async addProduct({ rootState }, payload) {
    const { id } = db.collection('products').doc();
    const product = {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      quantity: payload.quantity,
      tags: payload.tags,
      id,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
      user_id: rootState.auth.user.id,
    };
    try {
      // create a product
      await db.collection('products').doc(product.id).set(product);
      // upload the image
      const downloadURL = await uploadImage(payload.image, 'products', product.id);
      // update product's image
      await db.collection('products').doc(product.id).update({
        imageURL: downloadURL,
      });
    } catch (err) {
      console.error(err);
    }
  },

  async deleteProduct(_, productId) {
    try {
      await db.collection('products').doc(productId).delete();
    } catch (error) {
      console.error(error);
    }
  },

  async updateProduct(_, product) {
    try {
      await db.collection('products').doc(product.id).set({
        ...product,
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
};
