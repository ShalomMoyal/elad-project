import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [product, setProduct] = useState(null); // State to hold the fetched product
  const [collections, setCollections] = useState([]); // State to hold the list of collections
  const [productName, setProductName] = useState(''); // State to hold the entered product name

  // Function to handle the input change
  const handleInputChange = (event) => {
    setProductName(event.target.value);
  };

  // Function to fetch a specific product
  const fetchProduct = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      const response = await axios.get('http://localhost:5000/getProduct', {
        params: { attribute: 'name', value: productName } // Use the entered product name
      });
      setProduct(response.data); // Update state with the fetched product
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Function to fetch all collections
  const fetchCollections = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllCollections');
      setCollections(response.data); // Update state with the list of collections
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  return (
    <div className="App">
      <h1>Product Info</h1>
      <form onSubmit={fetchProduct}>
        <input
          type='text'
          value={productName}
          onChange={handleInputChange}
          placeholder='Enter product name'
        />
        <button type='submit'>Get Product</button>
      </form>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      )}
      <h1>Collections</h1>
      <button onClick={fetchCollections}>Get All Collections</button>
      <ul>
        {collections.map((collection) => (
          <li key={collection}>{collection}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
