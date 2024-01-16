const {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  GeoPoint,
} = require('firebase/firestore');
const { initializeApp } = require('firebase/app');

const { db } = require('../../db/firestore');
const { getWasteBankById } = require('../waste-banks/waste-banks.service');
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require('firebase/storage');
const { firebaseConfig } = require('../../config/firebase');
const collectionName = 'trash-pickups';

const processData = async (data) => {
  // filter unimportant data
  const {
    waste_bank_id: wasteBankRef,
    customer_id: customerRef,
    image_url,
  } = data;
  data.image_url = await getUrlTrashImage(image_url);
  delete data.waste_bank_id;
  delete data.customer_id;
  const wasteBankId = wasteBankRef._key.path.segments[6];
  const customerId = customerRef._key.path.segments[6];
  const wasteBankData = await getWasteBankById(wasteBankId);
  return {
    ...data,
    waste_bank_data: {
      id: wasteBankId,
      ...wasteBankData,
    },
    customer_id: customerId,
  };
};

const findTrashPickups = async () => {
  try {
    const trashPickups = [];
    const querySnapshot = await getDocs(collection(db, collectionName));

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const processedData = await processData(doc.data());
        trashPickups.push({
          id: doc.id,
          ...processedData,
        });
      }),
    );

    return trashPickups;
  } catch (error) {
    throw Error(error.message);
  }
};

const findTrashPickupById = async (id) => {
  const docRef = doc(db, collectionName, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const processedData = await processData(docSnap.data());
      return {
        id: id,
        ...processedData,
      };
    }
    return null;
  } catch (error) {
    throw Error(error.message);
  }
};

const insertTrashPickup = async (data) => {
  // const hash = ;
  try {
    const trashPickupData = {
      status: data.status,
      image_url: data.image_url,
      notes: data.notes,
      type: data.type,
      datetime: data.datetime,
      geohash: new GeoPoint(data.latitude, data.longitude),
      waste_bank_id: doc(db, `waste-banks/${data.waste_bank_id}`),
      customer_id: doc(db, `customers/${data.customer_id}`),
    };
    const docRef = await addDoc(
      collection(db, collectionName),
      trashPickupData,
    );
    return {
      id: docRef.id,
      ...trashPickupData,
    };
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteTrashPickup = async (id) => {
  const docRef = doc(db, collectionName, id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    throw Error(error.message);
  }
};
const updateTrashPickup = async (id, data) => {
  const docRef = doc(db, collectionName, id);
  try {
    await setDoc(docRef, data);
  } catch (error) {
    throw Error(error.message);
  }
};

const getUrlTrashImage = async (fileName) => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  try {
    const url = await getDownloadURL(ref(storage, `trashes/${fileName}`));
    return url;
  } catch (error) {
    throw Error(error.message);
  }
};

const insertTrashImage = async (fileName, file, metadata) => {
  try {
    const app = initializeApp(firebaseConfig);
    const storageFB = getStorage(app);
    const storageRef = ref(storageFB, fileName);
    await uploadBytesResumable(storageRef, file.buffer, metadata);
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  insertTrashImage,
  findTrashPickups,
  findTrashPickupById,
  insertTrashPickup,
  deleteTrashPickup,
  updateTrashPickup,
};
