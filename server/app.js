// server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { addProduct, addMultipleProducts, getProduct, getAllCollections } = require('./mongoDB'); // Replace with the actual filename

const app = express();
const port = 5000;

// Middleware to parse JSON bodies and handle CORS
app.use(bodyParser.json());
app.use(cors());

// Endpoint to add a single product
app.post('/addProduct', async (req, res) => {
  try {
    const product = req.body;
    await addProduct(product);
    res.status(200).send('Product added successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to add multiple products
app.post('/addMultipleProducts', async (req, res) => {
  try {
    const products = req.body;
    await addMultipleProducts(products);
    res.status(200).send('Products added successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to get a specific product by an attribute
app.get('/getProduct', async (req, res) => {
  try {
    const { attribute, value } = req.query;
    const product = await getProduct(attribute, value);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to get all collections
app.get('/getAllCollections', async (req, res) => {
  try {
    const collections = await getAllCollections();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
