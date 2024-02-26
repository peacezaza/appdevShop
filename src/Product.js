import React, { useState, useEffect } from "react";
import axios from "axios";
import './Product.css';

export default function Product() {
  const [product, setProduct] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    console.log("request to api");
    axios.get("http://127.0.0.1:5000/products")
      .then(response => setProduct(response.data))
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (productId) => {
    // Make API call to delete the product
    axios.delete(`http://127.0.0.1:5000/products/${productId}`)
      .then(response => {
        console.log(`Product with ID ${productId} deleted successfully`);
        // Update state to reflect the deletion
        setProduct(prevProducts => prevProducts.filter(p => p.id !== productId));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    // Reset the newProduct state when the modal is closed
    setNewProduct({
      id: '',
      name: '',
      price: '',
      image: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleAddProduct = () => {
    // Add logic for adding a new product using the newProduct state
    console.log('Adding new product:', newProduct);
    // Close the modal after adding the product
    handleCloseAddModal();
  };

  const productList = product.map(p => (
    <li key={p.id} className="product-box">
      <div className="product-info">
        <span>{p.id}</span>
        <span className="product-name">{p.name}</span>
        <img src={p.img} alt={p.name} />
        <span className="product-price">{p.price}</span>
        <button className="edit-button">Edit</button>
        <button className="delete-button" onClick={() => handleDelete(p.id)}>Delete</button>
      </div>
    </li>
  ));

  return (
    <div className="product-container">
      <ul className="product-list">
        {productList}
      </ul>
      <button className="add-button" onClick={handleAdd}>Add</button>

      {isAddModalOpen && (
        <div className="add-modal">
          <div className="add-form">
            <label>ID:</label>
            <input type="text" name="id" value={newProduct.id} onChange={handleInputChange} />

            <label>Name:</label>
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />

            <label>Price:</label>
            <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} />

            <label>Image:</label>
            <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} />

            <button onClick={handleAddProduct}>Add Product</button>
            <button onClick={handleCloseAddModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}