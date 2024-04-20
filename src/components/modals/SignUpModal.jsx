import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { signUp } from '../auth/signUp'; 
import LoginModal from './LoginModal';
import '../../styles/signupmodal.css';

const SignUpModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: 'CLIENT',
    avatar: '/src/assets/avatar.png'
  });
  const [isChecked, setIsChecked] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
    const success = await signUp(formData);
    if (success) {
      setSignUpSuccess(true);
      setShowLoginModal(true);
      handleClose();
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
            <input type="text" name="firstname" placeholder='Nom' value={formData.firstname} onChange={handleInputChange} />
            <input type="text" name="lastname" placeholder='Prenom' value={formData.lastname} onChange={handleInputChange} />
            <input type="text" name="phoneNumber" placeholder='Téléphone' value={formData.phoneNumber} onChange={handleInputChange} />
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
      
      {showLoginModal && <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />}
    </>
  );
}

export default SignUpModal;
