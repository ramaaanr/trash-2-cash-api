const express = require('express');
const dotenv = require('dotenv');
const functions = require('firebase-functions');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Trash2Cash API');
});

const wasteBanksController = require('./api/waste-banks/waste-banks.controller');
const productsController = require('./api/products/products.controller');
const trashPickUpsController = require('./api/trash-pickups/trash-pickups.controller');

app.use('/waste-banks', wasteBanksController);
// app.use('/products', productsController);
app.use('/trash-pickups', trashPickUpsController);

app.listen(PORT, () => {
  console.log('Express API running in port: ' + PORT);
});

exports.api = functions.https.onRequest(app);
