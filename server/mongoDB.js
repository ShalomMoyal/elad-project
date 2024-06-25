// server/yourModuleFileName.js

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const databaseName = "store";

async function connectToDatabase() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(databaseName);
  return { client, db };
}

async function createCollections(db) {
  const collections = ["Product", "Customer", "Order", "Supplier"];
  const existingCollections = await db.listCollections().toArray();

  collections.forEach(async (collection) => {
    if (!existingCollections.some((col) => col.name === collection)) {
      await db.createCollection(collection);
    }
  });
}

async function addProduct(product) {
  const { client, db } = await connectToDatabase();
  try {
    await createCollections(db);
    const collection = db.collection("Product");
    const result = await collection.insertOne(product);
    console.log(`Product inserted with id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

async function addMultipleProducts(products) {
  const { client, db } = await connectToDatabase();
  try {
    await createCollections(db);
    const collection = db.collection("Product");
    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products inserted`);
  } finally {
    await client.close();
  }
}

async function getProduct(attribute, value) {
  const { client, db } = await connectToDatabase();
  try {
    const collection = db.collection("Product");
    const product = await collection.findOne({ [attribute]: value });
    if (product) {
      console.log(`Product found: ${JSON.stringify(product)}`);
      return product;
    } else {
      console.log("Product not found");
      return null;
    }
  } finally {
    await client.close();
  }
}

async function getAllCollections() {
  const { client, db } = await connectToDatabase();
  try {
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    console.log(`Collections: ${collectionNames.join(", ")}`);
    return collectionNames;
  } finally {
    await client.close();
  }
}

module.exports = { addProduct, addMultipleProducts, getProduct, getAllCollections };
