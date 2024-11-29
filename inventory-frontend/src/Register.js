import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    role: '',
  });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users', user)
      .then((res) => {
        alert(res.data.message); // Show success message
        setUser({ username: '', password: '', role: '' });
        navigate('/login'); // Redirect to login page after success
      })
      .catch((err) => {
        console.error(err);
        alert('Error registering user.');
      });
  };

  return (
    <div>
      <h1 id='reg'>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={user.role}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
