const {
  findTrashPickups,
  findTrashPickupById,
  insertTrashPickup,
  deleteTrashPickup,
  updateTrashPickup,
  insertTrashImage,
} = require('./trash-pickups.repository');

const getAllTrashPickups = async () => {
  try {
    const trashPickups = await findTrashPickups();
    if (trashPickups != null) {
      return trashPickups;
    }
    return null;
  } catch (error) {
    throw Error(error.message);
  }
};

const getTrashPickupById = async (id) => {
  try {
    const trashPickups = await findTrashPickupById(id);
    if (trashPickups != null) {
      return trashPickups;
    }
    throw Error('Trash Pickup Id not found');
  } catch (error) {
    throw Error(error.message);
  }
};

const createTrashPickup = async (data) => {
  try {
    const trashPickup = await insertTrashPickup(data);
    return trashPickup;
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteTrashPickupById = async (id) => {
  try {
    const trashPickup = await getTrashPickupById(id);
    if (trashPickup == null) {
      throw Error('Trash Pickup Id not found');
    }
    await deleteTrashPickup(id);
  } catch (error) {
    throw Error(error.message);
  }
};

const updateTrashPickupById = async (id, data) => {
  try {
    const trashPickup = await getTrashPickupById(id);
    if (trashPickup == null) {
      throw Error('Trash Pickup Id not found');
    }
    await updateTrashPickup(id, data);
  } catch (error) {
    throw Error(error.message);
  }
};

const uploadTrashImage = async (file) => {
  const dateTime = Date.now();
  const fileName = `trashes/${dateTime}`;
  const metadata = {
    contentType: file.type,
  };
  try {
    await insertTrashImage(fileName, file.buffer, metadata);
  } catch (error) {
    throw Error(error.message);
  }
  return fileName;
};

module.exports = {
  uploadTrashImage,
  getAllTrashPickups,
  getTrashPickupById,
  createTrashPickup,
  deleteTrashPickupById,
  updateTrashPickupById,
};
