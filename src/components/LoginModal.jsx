import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SignUpModal from './SignUpModal';
import axios from 'axios';
import './LoginModal.css';

const LoginModal = ({ show, handleClose, handleLoginSuccess }) => { // Accept handleLoginSuccess as prop
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClose = () => handleClose();
  const handleSignUpShow = () => setShowSignUpModal(true);

  // LoginModal.jsx

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/api/auth/authenticate', { email, password });
    const authToken = response.data.access_token;
    localStorage.setItem('authToken', authToken);
    handleLoginSuccess(); // Call handleLoginSuccess after successful login
    handleClose(); // Close the modal after successful login
  } catch (error) {
    setError('Invalid email or password');
    console.error('Login error:', error);
  }
};


  
  
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered className="login-modal">
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div>
              <input type="checkbox" id="rememberMe" className="check" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <Button variant="primary" type="submit">Login</Button>
            <a href="#" className="pwd">Forgot Password?</a>
            <p className="error">{error}</p> 
            <p>Don't have an account?</p>
            <Button variant="link" onClick={handleSignUpShow}>Sign Up</Button>
          </form>
        </Modal.Body>
      </Modal>
      {showSignUpModal && <SignUpModal show={showSignUpModal} handleClose={() => setShowSignUpModal(false)} />}
    </div>
  );
}

export default LoginModal;
