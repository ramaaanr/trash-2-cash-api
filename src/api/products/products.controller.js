const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
} = require('./products.service');
const { generateResponse } = require('../../helpers/generateResponse');
const { productValidator, validate } = require('./products.middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res
      .status(200)
      .send(
        generateResponse('success', 'Get All Products Data Success', products),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'error',
          'Get All Products Data Failure',
          error.message,
        ),
      );
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          `Get Product by id=${productId} Success`,
          product,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'error',
          `Get Product by id=${productId} Failure`,
          error.message,
        ),
      );
  }
});

router.post('/', productValidator, validate, async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res
      .status(200)
      .send(generateResponse('success', `Create Product Success`, product));
  } catch (error) {
    res.status(400).send('error', `Create Product Failure`, error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteProductById(productId);
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          `Delete Product by id=${productId} Success`,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'success',
          `Delete Product by id=${productId} Failure`,
          error.message,
        ),
      );
  }
});

router.put('/:id', productValidator, validate, async (req, res) => {
  try {
    const productId = req.params.id;
    await updateProductById(productId, req.body);
    res
      .status(200)
      .send(
        generateResponse(
          'success',
          `Update Product by id=${productId} Success`,
        ),
      );
  } catch (error) {
    res
      .status(400)
      .send(
        generateResponse(
          'success',
          `Update Product by id=${productId} Failure`,
          error.message,
        ),
      );
  }
});

module.exports = router;
