import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCypTsdg4-mt-xU5MH1ICfvSZbVgEo4z_U',
  authDomain: 'tasawaq-a225f.firebaseapp.com',
  databaseURL: 'https://tasawaq-a225f.firebaseio.com',
  projectId: 'tasawaq-a225f',
  storageBucket: 'tasawaq-a225f.appspot.com',
  messagingSenderId: '945072771910',
  appId: '1:945072771910:web:2dd8687b05e01adf7e0b47',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
