import React, { useState } from 'react';
import axios from 'axios';
import ForgotPassword from './Forgot_password';

function Login() {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log('Form data:', formData);
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log(response.data);
      // Store ID in local storage if login is successful
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('user_type', response.data.userType);
      localStorage.setItem('hostel_block', response.data.firstLetter);
      localStorage.setItem('roomNumber', response.data.roomNumber);
      if (response.data.userType === 'student') {
        window.location.href = '/student';
      }
      if (response.data.userType === 'hr') {
        window.location.href = '/hr';
      }
      if (response.data.userType === 'ho') {
        window.location.href = '/ho';
      }
      // You can redirect the user to another page here if needed
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  }

  const handleForgotPasswordClick = () => {
    setShowModal(true); // Show the modal when "Forgot Password?" is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal when Close button is clicked
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
            <div className="card shadow-lg bg-light" style={{ maxWidth: "600px" }}> {/* Added bg-light class */}
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Welcome to HRMS!!</h2>
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">ID</span>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      placeholder="Enter your ID"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}
                  <div className="text-center">
                    <button className="btn btn-primary btn-block mt-4 w-25">Login</button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <button className="btn btn-link" onClick={handleForgotPasswordClick}>Forgot Password?</button>
                </div>
              </div>
            </div>
        </div>
      </div>
      
      <ForgotPassword showModal={showModal} closeModal={closeModal} />
    </div>
  );
}

export default Login;
