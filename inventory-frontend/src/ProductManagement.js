import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductManagement = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: '', description: '', category: '', price: 0, quantity: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:5000/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  const addProduct = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/products', product)
      .then((res) => {
        setProducts([...products, res.data]);
        setProduct({ name: '', description: '', category: '', price: 0, quantity: 0 });
      })
      .catch((err) => console.error(err));
  };

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then(() => setProducts(products.filter((p) => p.id !== id)))
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      <nav>
        <ul id='sidebar'> 
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/Login">Login</Link></li>
          <li><Link to="/Dashboard">Dashboard</Link></li>
        </ul>
      </nav>
      <h1>Product Management</h1>
      <button onClick={handleLogout} style={{ marginBottom: '20px', padding: '10px 20px' }}>
        Logout
      </button>
      <form onSubmit={addProduct}>
        <input
          placeholder="Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <br />
        <br />
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <br />
        <br />
        <input
          placeholder="Category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Quantity"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value) })}
        />
        <br />
        <br />
        <button type="submit">Add Product</button>
      </form>
      <ul>
        {products.map((prod) => (
          <li key={prod.id}>
            {prod.name} - {prod.quantity}
            <button onClick={() => deleteProduct(prod.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
