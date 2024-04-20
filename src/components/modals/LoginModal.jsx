// LoginModal.jsx

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SignUpModal from './SignUpModal';
import { Login } from '../auth/Login'; 
import '../../styles/LoginModal.css';

const LoginModal = ({ show, handleClose, handleLoginSuccess }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClose = () => handleClose();
  const handleSignUpShow = () => setShowSignUpModal(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await Login(email, password);
    if (success) {
      handleLoginSuccess();
      handleClose();
    } else {
      setError('Invalid email or password');
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
