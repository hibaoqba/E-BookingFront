import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import './profileRightSection.css';
import { countries } from 'countries-list';
import Select from 'react-select';
const ProfileRightSection = () => {
  const [userData, setUserData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null); // State for selected country
  const countryOptions = Object.keys(countries).map(countryCode => ({
    value: countryCode,
    label: countries[countryCode].name
  }));
  
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.get('http://localhost:8080/api/users/info', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(response => {
        setUserData(response.data);
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

  const handleUpload = () => {
    // Handle file upload logic here
    console.log('Selected file:', selectedFile);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <>
             <h2 className='header2'>Personal Information</h2>

      <div className="profile-right-section">
        <div className="column">
          <div className="profile-field">
            <label>E-mail *</label>
            <input type="email" name="email" defaultValue={userData.email} />
          </div>
          <div className="profile-field">
            <label>Prénom</label>
            <input type="text" name="firstName" defaultValue={userData.firstname} />
          </div>
          <div className="profile-field">
            <label>Nom</label>
            <input type="text" name="lastName" defaultValue={userData.lastname} />
          </div>
          <div className="profile-field">
            <label>Numéro de téléphone</label>
            <input type="tel" name="phone" defaultValue={userData.phoneNumber} />
          </div>
          <div className="profile-field">
            <label>Anniversaire</label>
            <input type="date" name="birthday" defaultValue={userData.birthDate} />
          </div>
          <div className="profile-field">
            <div>
            <img
              src={avatarUrl || (userData && userData.avatar) || "/src/assets/avatar.png"}
                alt="Avatar"
                      style={{ width: '100px', height: '100px' }}
                        />

              <input type="file" onChange={handleFileChange} />
    
            </div>
          </div>
          <div> <button className='save-button'><FontAwesomeIcon className='save-icon' icon={faFloppyDisk} />Enregistrer vos modifications</button></div>
        </div>
        <div className="column">
        <div className="profile-field">
          <label>pays:</label>
          <Select
          className='select-country'
              options={countryOptions}
              value={selectedCountry}
              onChange={(option) => setSelectedCountry(option)}
              placeholder="Select a country"
            />   </div> 

<div className="profile-field">
  <label>Adresse ligne 1:</label>
  <input type="text" name="addressLine1" placeholder='line1' defaultValue={userData.address ? userData.address.addressLine1 || '' : ''} />
</div>
<div className="profile-field">
  <label>ligne 2:</label>
  <input type="text" name="addressLine2" placeholder='line2' defaultValue={userData.address ? userData.address.addressLine2 || '' : ''} />
</div>
<div className="profile-field">
  <label>zip code:</label>
  <input type="text" name="zipCode" defaultValue={userData.address ? userData.address.zipCode || '' : ''} />
</div>
<div className="profile-field">
  <label>city:</label>
  <input type="text" name="city" defaultValue={userData.address ? userData.address.city || '' : ''} />
</div>

        </div>
      </div>
    </>
  );
};

export default ProfileRightSection;
