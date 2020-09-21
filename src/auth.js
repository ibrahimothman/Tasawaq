import firebase from './firebase';
import router from './router';
import store from './store';
import db from './db';

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    const userData = {
      id: user.uid,
    };

    // update usee in store
    store.commit('auth/setUser', userData);

    // look for user's profile
    await store.dispatch('profile/initProfile');
    const [profile] = store.state.profile.profiles;

    // create a default profile for the first time
    if (!profile) {
      const profileData = {
        id: user.uid,
        email: user.email,
        name: '',
        photoURL: '',
        phoneNumber: '',
        address: '',
        postCode: '',
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
      };
      db.collection('profiles').doc(profileData.id).set(profileData);
    }
  } else {
    store.commit('auth/setUser', null);
    router.push('/');
  }
});
