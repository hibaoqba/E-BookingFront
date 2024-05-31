import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { signUp } from '../auth/signUp'; 
import LoginModal from './LoginModal';
import '../../styles/signupmodal.css';
import * as Yup from 'yup';

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
  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    firstname: Yup.string().required('Nom est requis'),
    lastname: Yup.string().required('Prenom est requis'),
    phoneNumber: Yup.string().required('Téléphone est requis'),
    email: Yup.string().email('Email invalide').required('Adresse Email est requis'),
    password: Yup.string()
      .required('Mot de Passe est requis')
      .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/,
        'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'
      )
  });

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
    try {
      await schema.validate(formData, { abortEarly: false });
      if (!isChecked) {
        setErrors({ terms: 'Accepter les termes et conditions' });
        return;
      }
      const success = await signUp(formData);
      if (success) {
        setSignUpSuccess(true);
        setShowLoginModal(true);
        handleClose();
      }
    } catch (validationError) {
      if (validationError.name === 'ValidationError') {
        const formErrors = validationError.inner.reduce((acc, error) => {
          return { ...acc, [error.path]: error.message };
        }, {});
        setErrors(formErrors);
      } else {
        setErrors({ general: 'Une erreur s\'est produite lors de l\'inscription.' });
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="signup-modal">
        <Modal.Header closeButton>
          <Modal.Title>Créer un compte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <input
                type="text"
                name="firstname"
                placeholder='Nom'
                value={formData.firstname}
                onChange={handleInputChange}
                className={errors.firstname ? 'input-error' : ''}
              />
              {errors.firstname && <div className='error'>{errors.firstname}</div>}
            </div>
            <div className='input-group'>
              <input
                type="text"
                name="lastname"
                placeholder='Prenom'
                value={formData.lastname}
                onChange={handleInputChange}
                className={errors.lastname ? 'input-error' : ''}
              />
              {errors.lastname && <div className='error'>{errors.lastname}</div>}
            </div>
            <div className='input-group'>
              <input
                type="text"
                name="phoneNumber"
                placeholder='Téléphone'
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={errors.phoneNumber ? 'input-error' : ''}
              />
              {errors.phoneNumber && <div className='error'>{errors.phoneNumber}</div>}
            </div>
            <div className='input-group'>
              <input
                type="email"
                name="email"
                placeholder='Adresse Email'
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <div className='error'>{errors.email}</div>}
            </div>
            <div className='input-group'>
              <input
                type="password"
                name="password"
                placeholder='Mot de Passe'
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <div className='error'>{errors.password}</div>}
            </div>
            <div className="checkbox-container">
              <input
                type='checkbox'
                id="termsCheckbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                required
              />
              <label htmlFor="termsCheckbox">J'ai lu et j'accepte les </label>
              <a href="#">conditions et la politique de confidentialité</a>
              {errors.terms && <div className='error'>{errors.terms}</div>}
            </div>
            {errors.general && <div className='error'>{errors.general}</div>}
            <Button variant="primary" type="submit">Créer un compte</Button>
            <div className="login-link">
              <label>Vous avez déjà un compte? </label>
              <a onClick={handleClose} style={{color: "blue", cursor: "pointer"}}>Connectez-vous</a>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      
      {showLoginModal && <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />}
    </>
  );
}

export default SignUpModal;
