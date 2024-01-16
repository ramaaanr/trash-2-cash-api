const dotenv = require('dotenv');
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'trash2cash-ebb4a.firebaseapp.com',
  projectId: 'trash2cash-ebb4a',
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: '463559729756',
  appId: '1:463559729756:web:4e2aeb8d3acbfbc390fc99',
  measurementId: 'G-0STXZ0V0ZB',
};

module.exports = { firebaseConfig };
