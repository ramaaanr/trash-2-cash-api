const express = require('express');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Trash2Cash API');
});

// const productController = require("./product/product.controller");

// app.use('/products', productController);

app.listen(PORT, () => {
  console.log('Express API running in port: ' + PORT);
});
