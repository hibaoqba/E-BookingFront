import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import LoginModal from './LoginModal'; // Import LoginModal component
import './signupmodal.css';

const SignUpModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    password: ''
  });
  const [isChecked, setIsChecked] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to manage the visibility of LoginModal

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert('Please accept the terms and conditions.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      console.log('Sign-up successful:', response.data);
      setSignUpSuccess(true);
      setShowLoginModal(true); // Show the login modal after successful sign-up
      handleClose(); // Close the sign-up modal
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="signup-modal">
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nom" placeholder='Nom' value={formData.nom} onChange={handleInputChange} />
            <input type="text" name="prenom" placeholder='Prenom' value={formData.prenom} onChange={handleInputChange} />
            <input type="text" name="telephone" placeholder='Téléphone' value={formData.telephone} onChange={handleInputChange} />
            <input type="email" name="email" placeholder='Adresse Email' value={formData.email} onChange={handleInputChange} />
            <input type="password" name="password" placeholder='Mot de Passe' value={formData.password} onChange={handleInputChange} />
            <div className="checkbox-container">
              <input type='checkbox' id="termsCheckbox" checked={isChecked} onChange={handleCheckboxChange} required />
              <label htmlFor="termsCheckbox">J'ai lu et j'accepte les </label>
              <a href="#">conditions et la politique de confidentialité</a>
            </div>
            <Button variant="primary" type="submit">Sign Up</Button>
            <label htmlFor="termsCheckbox">vous avez deja un compte? </label>
            <a onClick={handleClose}> log in</a>

          </form>
        </Modal.Body>
      </Modal>
      
      {/* Conditionally render LoginModal */}
      {showLoginModal && <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />}
    </>
  );
}

export default SignUpModal;
