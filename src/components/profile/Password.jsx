import React, { useState } from 'react';
import '../../styles/password.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faFloppyDisk,faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import * as Yup from 'yup';

const Password = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Nouveau mot de passe est requis')
      .min(8, 'Le nouveau mot de passe doit avoir au moins 8 caractères')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/,
        'Le nouveau mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Les mots de passe ne correspondent pas')
      .required('Confirmer le nouveau mot de passe est requis')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Validate only the new password using Yup
      await schema.validate({
        newPassword,
        confirmPassword
      }, { abortEarly: false });
  
      // Make API call to change password
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:8080/api/users/change_password', {
        oldPassword,
        newPassword,
        confirmPassword
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
  
      setSuccessMessage('Mot de passe enregistré');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError('Ancien mot de passe incorrect');
      } else if (error.name === 'ValidationError') {
        const errorMessage = error.errors.join(', ');
        setError(errorMessage);
      } else {
        setError('Une erreur s\'est produite lors de la modification du mot de passe.');
      }
      setSuccessMessage('');
    }
  };
  

  return (
    <div className='passwordContainer'>
      <h2 className='passwordHeader'>Changer le mot de passe</h2>
      <hr className='divider' />
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success"><FontAwesomeIcon icon={faCheck}/> {successMessage}</div>}
      <div className='inputContainer'>
        <form onSubmit={handleSubmit}>
          <div className='inputGroup'>
            <label className='password-label' htmlFor='oldPassword'>
              Ancien mot de passe
            </label>
            <div className='inputWithIcon'>
              <input type='password' name='oldPassword' value={oldPassword} onChange={handleChange} className='password-input' placeholder='Ancien mot de passe' />
              <FontAwesomeIcon icon={faLock} className='inputIcon' />
            </div>
          </div>
          <div className='inputGroup'>
            <label className='password-label' htmlFor='newPassword'>
              Nouveau mot de passe
            </label>
            <div className='inputWithIcon'>
              <input type='password' name='newPassword' value={newPassword} onChange={handleChange} className='password-input' placeholder='Nouveau mot de passe' />
              <FontAwesomeIcon icon={faLock} className='inputIcon' />
            </div>
          </div>
          <div className='inputGroup'>
            <label className='label' htmlFor='confirmPassword'>
              Confirmer le nouveau mot de passe
            </label>
            <div className='inputWithIcon'>
              <input type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange} className='password-input' placeholder='Confirmer le nouveau mot de passe' />
              <FontAwesomeIcon icon={faLock} className='inputIcon' />
            </div>
          </div>
          <button type="submit" className='submitButton'>
            <FontAwesomeIcon icon={faFloppyDisk} className='buttonIcon' /> Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;
