const express = require('express');
const {
  getAllTrashPickups,
  getTrashPickupById,
  createTrashPickup,
  deleteTrashPickupById,
  updateTrashPickupById,
  uploadTrashImage,
} = require('./trash-pickups.service');
const { generateResponse } = require('../../helpers/generateResponse');
const {
  trashPickupValidator,
  validate,
  uploadFile,
} = require('./trash-pickups.middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const trashPickups = await getAllTrashPickups();
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          'Get All Trash Pickups Data Success',
          trashPickups,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'error',
          'Get All Trash Pickups Data Failure',
          error.message,
        ),
      );
  }
});

router.get('/:id', async (req, res) => {
  const trashPickupId = req.params.id;
  try {
    const trashPickup = await getTrashPickupById(trashPickupId);
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          `Get Trash Pickup by id=${trashPickupId} Success`,
          trashPickup,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'error',
          `Get Trash Pickup by id=${trashPickupId} Failure`,
          error.message,
        ),
      );
  }
});

router.post(
  '/',
  uploadFile,
  trashPickupValidator,
  validate,
  async (req, res) => {
    const file = {
      type: req.file.mimetype,
      buffer: req.file.buffer,
    };
    try {
      const buildImage = await uploadTrashImage(file);
      const trashPickup = await createTrashPickup({
        ...req.body,
        image_url: buildImage,
      });
      res
        .status(200)
        .send(
          generateResponse(
            'success',
            `Create Trash Pickup Success`,
            trashPickup,
          ),
        );
    } catch (error) {
      res
        .status(400)
        .send(
          generateResponse(
            'error',
            `Create Trash Pickup Failure`,
            error.message,
          ),
        );
    }
  },
);

router.delete('/:id', async (req, res) => {
  const trashPickupId = req.params.id;
  try {
    await deleteTrashPickupById(trashPickupId);
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          `Delete Trash Pickup by id=${trashPickupId} Success`,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'success',
          `Delete Trash Pickup by id=${trashPickupId} Failure`,
          error.message,
        ),
      );
  }
});

router.put('/:id', trashPickupValidator, validate, async (req, res) => {
  const trashPickupId = req.params.id;
  try {
    await updateTrashPickupById(trashPickupId, req.body);
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          `Update Trash Pickup by id=${trashPickupId} Success`,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'success',
          `Update Trash Pickup by id=${trashPickupId} Failure`,
          error.message,
        ),
      );
  }
});

module.exports = router;
