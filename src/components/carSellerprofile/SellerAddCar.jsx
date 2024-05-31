import React, { useState } from 'react';
import axios from 'axios';
import UseFetchUserInfo from '../UseFetchUserInfo';
import MapPicker from '../common/MapPicker';
import ReverseGeocoding from '../location/ReverseGeocoding';
import '../../styles/sellerAddCar.css';
import FormWizard from 'react-form-wizard-component';
import 'react-form-wizard-component/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faGear, faImage, faLocation } from '@fortawesome/free-solid-svg-icons';

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
  const [errorMessage, setErrorMessage] = useState('');

  const [message, setMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [errorMessage4, setErrorMessage4] = useState('');
  const [address, setAddress] = useState(''); // New state for address
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
    if (e) {
      e.preventDefault();
    }
    setMessage('');
        setErrorMessage('');
        setErrorMessage1('');
        setErrorMessage2('');
        setErrorMessage3('');
        setErrorMessage4('');
        if(!validateTab4())
        {
            setErrorMessage4('veuillez choisir au moins une image')
             return;
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
        address, 
        carFeatures: {
          fuelType,
          transmissionType,
          horsePower,
          place,
          suitCases,
          gps,
          ac,
        },
        images,
        seller: { id: userInfo.id },
      });
      setMessage('Voiture ajoutée');
      console.log(response.data);
    } catch (error) {
      setMessage('Error adding car');
      console.error(error);
    }
  };
  const validateTab1 = () => {
    return brand !== '' && model !== '' && description !== '' && year !== ''
    && price !== ''

    ;
};

const validateTab2 = () => {
    return fuelType !== '' && transmissionType !== ''
    && horsePower !== ''
    && place !== ''
    && suitCases !== ''
    ;
};

const validateTab3 = () => {
    return latitude !=='' && longitude !=='';
};
const validateTab4 = () => {
    return images.length > 0;
};
  return (
    <div className="form-container">
      <FormWizard onComplete={handleSubmit}>
        <FormWizard.TabContent title="Informations" icon={<FontAwesomeIcon icon={faCar} />}>
          <h2>Ajouter une voiture</h2>
          <div className="form-field">
            <label>Marque:</label>
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
            <label>Année:</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Prix:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          {errorMessage1 && <p className='error-message'>{errorMessage1}</p>}

        </FormWizard.TabContent>

        <FormWizard.TabContent title="Caractéristiques" icon={<FontAwesomeIcon icon={faGear}  />} isValid={validateTab1()} validationError={() => setErrorMessage1('Veuillez remplir tous les champs')}>
          <div className="form-field">
            <label>Carburant:</label>
            <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
              <option value="">Select Fuel Type</option>
              <option value="GASOLINE">Essence</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Electrique</option>
              <option value="HYBRID">Hybride</option>
            </select>
          </div>
          <div className="form-field">
            <label>Transmission:</label>
            <select value={transmissionType} onChange={(e) => setTransmissionType(e.target.value)}>
              <option value="">Select Transmission Type</option>
              <option value="AUTOMATIC">Automatique</option>
              <option value="MANUAL">Manuelle</option>
              <option value="SEMIAUTOMATIC">CVT</option>
            </select>
          </div>
          <div className="form-field">
            <label>Puissance:</label>
            <input type="number" value={horsePower} onChange={(e) => setHorsePower(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Places:</label>
            <input type="number" value={place} onChange={(e) => setPlace(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Bagages:</label>
            <input type="number" value={suitCases} onChange={(e) => setSuitCases(e.target.value)} />
          </div>
          <div className="form-check">
            <label>GPS:</label>
            <input type="checkbox" checked={gps} onChange={(e) => setGPS(e.target.checked)} />
          </div>
          <div className="form-check">
            <label>Clim:</label>
            <input type="checkbox" checked={ac} onChange={(e) => setAC(e.target.checked)} />
          </div>
          {errorMessage2 && <p className='error-message'>{errorMessage2}</p>}

        </FormWizard.TabContent>

        <FormWizard.TabContent title="Localisation" icon={<FontAwesomeIcon icon={faLocation} />} isValid={validateTab2()} validationError={() => setErrorMessage2('Veuillez remplir tous les champs')}>
          <MapPicker onLocationChange={handleLocationChange} defaultPosition={[0, 0]} />
          <ReverseGeocoding latitude={latitude} longitude={longitude} onAddressFetched={setAddress} />
          <div className="form-field">
            <label>Adresse:</label>
            <input type="text" value={address} readOnly /> {/* Display the fetched address */}
          </div>
          {errorMessage3 && <p className='error-message'>{errorMessage3}</p>}

        </FormWizard.TabContent>

        <FormWizard.TabContent title="Images" icon={<FontAwesomeIcon icon={faImage} />} isValid={validateTab3()} validationError={() => setErrorMessage3('Veuillez choisir un emplacement')}>
          <div className="form-field">
            <label>Images:</label>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          </div>
          {message && <p>{message}</p>}
          {errorMessage4 && <p className='error-message'>{errorMessage4}</p>}

          <div>
            {images.map((image, index) => (
              <img
                key={index}
                src={`data:image/png;base64,${image}`}
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
