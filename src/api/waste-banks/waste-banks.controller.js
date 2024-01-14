const express = require('express');
const {
  getAllWasteBanks,
  getWasteBankById,
  createWasteBank,
  deleteWasteBankById,
  updateWasteBankById,
} = require('./waste-banks.service');
const { generateResponse } = require('../../helpers/generateResponse');
const { wasteBankValidator, validate } = require('./waste-banks.middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const wasteBanks = await getAllWasteBanks();
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          'Get All Waste Banks Data Success',
          wasteBanks,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'error',
          'Get All Waste Banks Data Failure',
          error.message,
        ),
      );
  }
});

router.get('/:id', async (req, res) => {
  try {
    const wasteBankId = req.params.id;
    const wasteBank = await getWasteBankById(wasteBankId);
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          `Get Waste Bank by id=${wasteBankId} Success`,
          wasteBank,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'error',
          `Get Waste Bank by id=${wasteBankId} Failure`,
          error.message,
        ),
      );
  }
});

router.post('/', wasteBankValidator, validate, async (req, res) => {
  try {
    const wasteBank = await createWasteBank(req.body);
    res
      .status(200)
      .send(
        generateResponse('success', `Create Waste Bank Success`, wasteBank),
      );
  } catch (error) {
    res.status(400).send('error', `Create Waste Bank Failure`, error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const wasteBankId = req.params.id;
    await deleteWasteBankById(wasteBankId);
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          `Delete Waste Bank by id=${wasteBankId} Success`,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'success',
          `Delete Waste Bank by id=${wasteBankId} Failure`,
          error.message,
        ),
      );
  }
});

router.put('/:id', wasteBankValidator, validate, async (req, res) => {
  try {
    const wasteBankId = req.params.id;
    await updateWasteBankById(wasteBankId, req.body);
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          `Update Waste Bank by id=${wasteBankId} Success`,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'success',
          `Update Waste Bank by id=${wasteBankId} Failure`,
          error.message,
        ),
      );
  }
});

module.exports = router;
