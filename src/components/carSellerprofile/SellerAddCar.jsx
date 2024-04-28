import React, { useState } from 'react';
import axios from 'axios';
import UseFetchUserInfo from '../UseFetchUserInfo';
import MapPicker from '../common/MapPicker'
import '../../styles/sellerAddCar.css'
import FormWizard from "react-form-wizard-component";
import 'react-form-wizard-component/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faGear, faImage, faLocation, faMapLocation } from '@fortawesome/free-solid-svg-icons';
const SellerAddCar = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [price, setPrice] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [horsePower, setHorsePower] = useState('');
  const [place, setPlace] = useState('');
  const [suitCases, setSuitCases] = useState('');
  const [gps, setGPS] = useState(true); 
  const [ac, setAC] = useState(true); 
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const userInfo = UseFetchUserInfo();
  

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = await Promise.all(files.map(async (file) => {
      const base64String = await convertToBase64(file);
      return base64String;
    }));
    setImages(imageFiles);
  };
  const handleLocationChange = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; 
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    if(e){
      e.preventDefault();
    }
      try {
      const response = await axios.post('http://localhost:8080/api/cars', {
        brand,
        model,
        description,
        year,
        latitude,
        longitude,
        price,
        carFeatures: {
          fuelType,
          transmissionType,
          horsePower,
          place,
          suitCases,
          gps,
          ac
        },
        images,
        seller: { id: userInfo.id }, 
      });
      setMessage('Car added successfully');
      console.log(response.data);
    } catch (error) {
      setMessage('Error adding car');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
    <FormWizard onComplete={handleSubmit}>
      <FormWizard.TabContent title="informations" icon={<FontAwesomeIcon icon={faCar}/>}>
        <h2>Add Car</h2>
        <div className="form-field">
          <label>Brand:</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Model:</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Year:</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
      </FormWizard.TabContent>
  
      <FormWizard.TabContent title="Caractéristiques" icon={<FontAwesomeIcon icon={faGear}/>}>
        <div className="form-field">
          <label>Fuel Type:</label>
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
            <option value="">Select Fuel Type</option>
            <option value="GASOLINE">Essence</option>
            <option value="DIESEL">Diesel</option>
            <option value="ELECTRIC">Electrique</option>
            <option value="HYBRID">Hybride</option>
          </select>
        </div>
        <div className="form-field">
          <label>Transmission Type:</label>
          <select value={transmissionType} onChange={(e) => setTransmissionType(e.target.value)}>
            <option value="">Select Transmission Type</option>
            <option value="AUTOMATIC">Automatic</option>
            <option value="MANUAL">Manuelle</option>
            <option value="SEMIAUTOMATIC">CVT</option>
          </select>
        </div>
        <div className="form-field">
          <label>Horse Power:</label>
          <input type="number" value={horsePower} onChange={(e) => setHorsePower(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Place:</label>
          <input type="number" value={place} onChange={(e) => setPlace(e.target.value)} />
        </div>
        <div className="form-field">
          <label>Suit Cases:</label>
          <input type="number" value={suitCases} onChange={(e) => setSuitCases(e.target.value)} />
        </div>
        <div className='form-check'>
          <label>GPS:</label>
          <input type="checkbox" checked={gps} onChange={(e) => setGPS(e.target.checked)} />
        </div>
        <div className='form-check'>
          <label>AC:</label>
          <input type="checkbox" checked={ac} onChange={(e) => setAC(e.target.checked)} />
        </div>
      </FormWizard.TabContent>
      <FormWizard.TabContent title="Localisation" icon={<FontAwesomeIcon icon={faLocation}/>}>

        <MapPicker onLocationChange={handleLocationChange} defaultPosition={[0,0]} />
      </FormWizard.TabContent>
  
      <FormWizard.TabContent title="images" icon={<FontAwesomeIcon icon={faImage}/>}>
        <div className="form-field">
          <label>Images:</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        </div>
        {message && <p>{message}</p>}
        <div>
          {images.map((image, index) => (
            <img
              key={index}
              src={`data:image/png;base64,${image}`} // Corrected interpolation
              alt={`Car Image ${index}`}
              style={{ width: '200px', height: 'auto', margin: '5px' }}
            />
          ))}
        </div>
      </FormWizard.TabContent>
    </FormWizard>
  </div>
  
  );
};

export default SellerAddCar;
