const {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require('./products.repository');

const getAllProducts = async () => {
  try {
    const products = await findProducts();
    if (products != null) {
      return products;
    }
    return null;
  } catch (error) {
    throw Error(error.message);
  }
};

const getProductById = async (id) => {
  try {
    const products = await findProductById(id);
    if (products != null) {
      return products;
    }
    throw Error('Waste Bank Id not found');
  } catch (error) {
    throw Error(error.message);
  }
};

const createProduct = async (data) => {
  try {
    const product = await insertProduct(data);
    return product;
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteProductById = async (id) => {
  try {
    const product = await getProductById(id);
    if (product == null) {
      throw Error('Waste Bank Id not found');
    }
    await deleteProduct(id);
  } catch (error) {
    throw Error(error.message);
  }
};

const updateProductById = async (id, data) => {
  try {
    const product = await getProductById(id);
    if (product == null) {
      throw Error('Waste Bank Id not found');
    }
    await updateProduct(id, data);
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
};
