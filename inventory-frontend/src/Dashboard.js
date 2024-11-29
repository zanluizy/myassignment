import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);

      // Extract unique categories
      const uniqueCategories = [...new Set(res.data.map((prod) => prod.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Product Dashboard</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Key Metrics</h2>
        <p><strong>Total Products:</strong> {products.length}</p>
        <p><strong>Total Categories:</strong> {categories.length}</p>
      </div>

      <div style={{ width: '100%', height: 400 }}>
        <h2 id='pq'>Product Quantities</h2>
        <ResponsiveContainer>
          <BarChart data={products}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
