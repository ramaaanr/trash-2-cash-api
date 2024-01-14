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
const collectionName = 'waste-banks';

const findWasteBanks = async () => {
  try {
    const wasteBanks = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      wasteBanks.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return wasteBanks;
  } catch (error) {
    throw Error(error.message);
  }
};

const findWasteBankById = async (id) => {
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

const insertWasteBank = async (data) => {
  const wasteBankData = {
    location: { latitude: data.latitude, longitude: data.longitude },
    address: data.address,
    active: data.active,
    close_hour: data.close_hour,
    open_hour: data.open_hour,
    title: data.title,
    time_zone: data.time_zone,
  };
  try {
    const docRef = await addDoc(collection(db, collectionName), wasteBankData);
    return {
      id: docRef.id,
      ...wasteBankData,
    };
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteWasteBank = async (id) => {
  const docRef = doc(db, collectionName, id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    throw Error(error.message);
  }
};
const updateWasteBank = async (id, data) => {
  const docRef = doc(db, collectionName, id);
  try {
    await setDoc(docRef, data);
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  findWasteBanks,
  findWasteBankById,
  insertWasteBank,
  deleteWasteBank,
  updateWasteBank,
};
