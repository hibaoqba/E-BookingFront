import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

import {faCheck  } from '@fortawesome/free-solid-svg-icons';

import '../../styles/profileRightSection.css';
import { countries } from 'countries-list';
import Select from 'react-select';
import * as Yup from 'yup';
const ProfileRightSection = () => {
  const [userData, setUserData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const countryOptions = Object.keys(countries).map(countryCode => ({
    value: countryCode,
    label: countries[countryCode].name
  }));

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Phone number is not valid'),
    birthDate: Yup.date()
      .test('is-over-18', 'Birthday must be at least 18 years ago', function (value) {
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        return value <= eighteenYearsAgo;
      })
  });

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.get('http://localhost:8080/api/users/currentUser', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          setUserData(response.data);
          if (response.data.address && response.data.address.country) {
            setSelectedCountry({ value: response.data.address.country, label: countries[response.data.address.country].name });
          }
          if (response.data.avatar) {
            setAvatarUrl(response.data.avatar);
          }
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
  };

  const updateUser = () => {
    setErrorMessages([]);
    validationSchema.validate(userData, { abortEarly: false })
      .then(validData => {
        const updatedUserData = {
          firstname: validData.firstname,
          lastname: validData.lastname,
          phoneNumber: validData.phoneNumber,
          birthDate: validData.birthDate,
          address: {
            ...validData.address,
            country: selectedCountry.value
          },
          avatar: avatarUrl
        };

        axios.put(`http://localhost:8080/api/users/${validData.email}`, updatedUserData)
          .then(response => {
            setSuccessMessage('Modifications enregistrées');
            // Optionally, you can update the local state with the updated user data
          })
          .catch(error => {
            setErrorMessages(['Error updating user: ' + error.message]);
          });
      })
      .catch(errors => {
        setErrorMessages(errors.inner.map(error => error.message));
      });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='parametres'>
        <p>Paramètres</p>
      </div>
      <hr className='profile-divider1' />
      <h2 className='header2'>Informations personnelles </h2>

     

     

      <div className="profile-right-section">
        <div className="column">
          <div className="profile-field">
            <label>E-mail *</label>
            <input type="email" name="email" value={userData.email} disabled/>
          </div>
          <div className="profile-field">
            <label>Prénom</label>
            <input type="text" name="firstName" defaultValue={userData.firstname} onChange={(e) => setUserData({ ...userData, firstname: e.target.value })} />
          </div>
          <div className="profile-field">
            <label>Nom</label>
            <input type="text" name="lastName" defaultValue={userData.lastname} onChange={(e) => setUserData({ ...userData, lastname: e.target.value })} />
          </div>
          <div className="profile-field">
  <label>Numéro de téléphone</label>
  <input
    type="tel"
    name="phone"
    defaultValue={userData.phoneNumber}
    onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
  />

  {errorMessages.includes('Phone number is not valid') && (
    <span className="error-message">Numéro de téléphone n'est pas valide</span>
  )}
</div>
<div className="profile-field">
  <label>Anniversaire</label>
  <input
    type="date"
    name="birthday"
    defaultValue={userData.birthDate}
    onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
  />
 
  {errorMessages.includes('Birthday must be at least 18 years ago') && (
    <span className="error-message">Vous devez avoir au moins 18ans</span>
  )}
</div>

          <div className="profile-field">
            <div>
              <img
                src={avatarUrl || "/src/assets/avatar.png"}
                alt="Avatar"
                style={{ width: '100px', height: '100px' }}
              />
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
    {successMessage && <div className="success-message"> <FontAwesomeIcon icon={faCheck}/> {successMessage}</div>}

          <div>

            <button className='save-button' onClick={updateUser}>
              <FontAwesomeIcon className='save-icon' icon={faFloppyDisk} />
              Enregistrer vos modifications
            </button>
          </div>
        </div>
        <div className="column">
          <div className="profile-field">
            <label>Pays:</label>
            <Select
              className='select-country'
              options={countryOptions}
              value={selectedCountry}
              onChange={(option) => setSelectedCountry(option)}
              placeholder="Sélectionner un pays"
            />
          </div> 

          <div className="profile-field">
            <label>Adresse ligne 1:</label>
            <input type="text" name="addressLine1" placeholder='Ligne 1' defaultValue={userData.address ? userData.address.addressLine1 || '' : ''} onChange={(e) => setUserData({ ...userData, address: { ...userData.address, addressLine1: e.target.value } })} />
          </div>
          <div className="profile-field">
            <label>Ligne 2:</label>
            <input type="text" name="addressLine2" placeholder='Ligne 2' defaultValue={userData.address ? userData.address.addressLine2 || '' : ''} onChange={(e) => setUserData({ ...userData, address: { ...userData.address, addressLine2: e.target.value } })} />
          </div>
          <div className="profile-field">
            <label>Code postal:</label>
            <input type="text" name="zipCode" defaultValue={userData.address ? userData.address.zipCode || '' : ''} onChange={(e) => setUserData({ ...userData, address: { ...userData.address, zipCode: e.target.value } })} />
          </div>
          <div className="profile-field">
            <label>Ville:</label>
            <input type="text" name="city" defaultValue={userData.address ? userData.address.city || '' : ''} onChange={(e) => setUserData({ ...userData, address: { ...userData.address, city: e.target.value } })} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileRightSection;
