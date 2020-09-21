import { firestoreAction } from 'vuexfire';
import firebase from '../firebase';
import db from '../db';
// import uploadImage from '../storage';

const state = {
  profiles: [],
};

const actions = {
  initProfile: firestoreAction(async ({ rootState, bindFirestoreRef }) => {
    // return the promise returned by `bindFirestoreRef`
    const { user } = rootState.auth;
    console.log(user);
    await bindFirestoreRef(
      'profiles',
      db
        .collection('profiles')
        .where('id', '==', user.id).limit(1),
    );
  }),

  async updateProfile({ rootState }, payload) {
    try {
      const { user } = rootState.auth;
      const profile = {
        ...payload,
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const res = await db.collection('profiles').doc(user.id).update(profile);
      console.log(res);
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
