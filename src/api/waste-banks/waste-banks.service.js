const {
  findWasteBanks,
  findWasteBankById,
  insertWasteBank,
  deleteWasteBank,
  updateWasteBank,
} = require('./waste-banks.repository');

const getAllWasteBanks = async () => {
  try {
    const wasteBanks = await findWasteBanks();
    if (wasteBanks != null) {
      return wasteBanks;
    }
    return null;
  } catch (error) {
    throw Error(error.message);
  }
};

const getWasteBankById = async (id) => {
  try {
    const wasteBanks = await findWasteBankById(id);
    if (wasteBanks != null) {
      return wasteBanks;
    }
    throw Error('Waste Bank Id not found');
  } catch (error) {
    throw Error(error.message);
  }
};

const createWasteBank = async (data) => {
  try {
    const wasteBank = await insertWasteBank(data);
    return wasteBank;
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteWasteBankById = async (id) => {
  try {
    const wasteBank = await getWasteBankById(id);
    if (wasteBank == null) {
      throw Error('Waste Bank Id not found');
    }
    await deleteWasteBank(id);
  } catch (error) {
    throw Error(error.message);
  }
};

const updateWasteBankById = async (id, data) => {
  try {
    const wasteBank = await getWasteBankById(id);
    if (wasteBank == null) {
      throw Error('Waste Bank Id not found');
    }
    await updateWasteBank(id, data);
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getAllWasteBanks,
  getWasteBankById,
  createWasteBank,
  deleteWasteBankById,
  updateWasteBankById,
};
