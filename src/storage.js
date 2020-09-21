import firebase from './firebase';

const storage = firebase.storage();

async function uploadImage(file, dir, key) {
  const fileName = file.name;
  const ext = fileName.slice(fileName.lastIndexOf('.'));
  const { ref } = await storage.ref(`${dir}/${key}${ext}`).put(file);
  const downloadURL = await ref.getDownloadURL();
  return downloadURL;
}

export default uploadImage;
