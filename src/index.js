const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Trash2Cash API');
});

const wasteBankController = require('./api/waste-banks/waste-banks.controller');

app.use('/waste-banks', wasteBankController);

app.listen(PORT, () => {
  console.log('Express API running in port: ' + PORT);
});
