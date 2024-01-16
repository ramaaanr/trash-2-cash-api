const {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
} = require('firebase/firestore');
const { db } = require('../../db/firestore');
const collectionName = 'products';

const findProducts = async () => {
  try {
    const products = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return products;
  } catch (error) {
    throw Error(error.message);
  }
};

const findProductById = async (id) => {
  const docRef = doc(db, collectionName, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: id,
        ...docSnap.data(),
      };
    }
    return null;
  } catch (error) {
    throw Error(error.message);
  }
};

const insertProduct = async (data) => {
  const productData = {
    location: { latitude: data.latitude, longitude: data.longitude },
    address: data.address,
    active: data.active,
    close_hour: data.close_hour,
    open_hour: data.open_hour,
    title: data.title,
    time_zone: data.time_zone,
  };
  try {
    const docRef = await addDoc(collection(db, collectionName), productData);
    return {
      id: docRef.id,
      ...productData,
    };
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteProduct = async (id) => {
  const docRef = doc(db, collectionName, id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    throw Error(error.message);
  }
};
const updateProduct = async (id, data) => {
  const docRef = doc(db, collectionName, id);
  try {
    await setDoc(docRef, data);
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
};
