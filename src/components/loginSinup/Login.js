import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = () => {
    try {
      axios.post('http://localhost:9002/login', user).then((res) => {
        alert(res.data.message);
        if (res.data.message === 'Login Successful') {
          navigate('/feed');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(); // Call the login function when Enter key is pressed
    }
  };

  return (
    <div id="login">
      <div id="login-page">
        <div className="login-left">
          <div className="head">Login Page</div>
          <div className="user-input">
            <i className="fa-regular fa-circle-user"></i>
            <input
              type="email"
              placeholder="Username"
              name="email"
              value={user.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // Trigger login on Enter key press
            />
          </div>
          <div className="user-input">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // Trigger login on Enter key press
            />
          </div>
          <div className="login-btn">
            <button className='but' onClick={handleLogin}>Login</button>
          </div>
          <div className="dont">
            <p className="sin" style={{ cursor: 'pointer' }}>
              <Link to="/signup" className="sin">
                Don't Have an Account? Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
