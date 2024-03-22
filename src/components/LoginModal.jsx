import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SignUpModal from './SignUpModal';
import './LoginModal.css';

const LoginModal = ({ show, handleClose }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSignUpClose = () => setShowSignUpModal(false);
  const handleSignUpShow = () => {
    setShowSignUpModal(true);
    handleClose(); 
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered className="login-modal">
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input type="email" placeholder='Email Address' />
            <input type="password" placeholder='Password' />
            <div>
              <input type="checkbox" id="rememberMe" className="check" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <Button variant="primary" type="submit">Login</Button>
            <a href="#" className="pwd">Forgot Password?</a>
            <p>Don't have an account?</p>
            <Button variant="link" onClick={handleSignUpShow}>Sign Up</Button>
          </form>
        </Modal.Body>
      </Modal>
      <SignUpModal show={showSignUpModal} handleClose={handleSignUpClose} />
    </div>
  );
}

export default LoginModal;
