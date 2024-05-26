import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ReverseGeocoding from '../location/ReverseGeocoding';
import MapPicker from '../common/MapPicker';
import '../../styles/sellerAddCar.css';
import FormWizard from 'react-form-wizard-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faGear, faImage, faLocation } from '@fortawesome/free-solid-svg-icons';

const CarUpdateModal = ({ car, onClose }) => {
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [description, setDescription] = useState(car.description);
  const [year, setYear] = useState(car.year);
  const [latitude, setLatitude] = useState(car.latitude);
  const [longitude, setLongitude] = useState(car.longitude);
  const [price, setPrice] = useState(car.price);
  const [fuelType, setFuelType] = useState(car.carFeatures.fuelType);
  const [transmissionType, setTransmissionType] = useState(car.carFeatures.transmissionType);
  const [address, setAddress] = useState(''); // New state for address
  const [horsePower, setHorsePower] = useState(car.carFeatures.horsePower);
  const [place, setPlace] = useState(car.carFeatures.place);
  const [suitCases, setSuitCases] = useState(car.carFeatures.suitCases);
  const [gps, setGPS] = useState(car.carFeatures.gps);
  const [ac, setAC] = useState(car.carFeatures.ac);
  const [userId,setUserId]=useState(car.seller.id)
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = await Promise.all(files.map(async (file) => {
      const base64String = await convertToBase64(file);
      return base64String;
    }));
    setImages([...images, ...newImages]); 
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
    if(e)
   { e.preventDefault();
   }
    try {
      const response = await axios.put(`http://localhost:8080/api/cars/${car.id}`, {
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
        seller: { id: userId},
      });
      
      setMessage('Car updated successfully');
      console.log(response.data);
      onClose(); // Close the modal after successful update
    } catch (error) {
      setMessage('Error updating car');
      console.error(error);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier la voiture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-container">
          <FormWizard onComplete={handleSubmit}>
            <FormWizard.TabContent title="informations" icon={<FontAwesomeIcon icon={faCar} />}>
              <h2>Modifier les informations de la voiture</h2>
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

            <FormWizard.TabContent title="Caractéristiques" icon={<FontAwesomeIcon icon={faGear} />}>
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
              <div className="form-check">
                <label>GPS:</label>
                <input type="checkbox" checked={gps} onChange={(e) => setGPS(e.target.checked)} />
              </div>
              <div className="form-check">
                <label>AC:</label>
                <input type="checkbox" checked={ac} onChange={(e) => setAC(e.target.checked)} />
              </div>
            </FormWizard.TabContent>

           

            <FormWizard.TabContent title="Localisation" icon={<FontAwesomeIcon icon={faLocation} />}>
              <MapPicker onLocationChange={handleLocationChange} defaultPosition={[latitude,longitude]} onAddressFetched={setAddress} />
              <ReverseGeocoding latitude={latitude} longitude={longitude} onAddressFetched={setAddress} />

              <div className="form-field">
            <label>Adresse:</label>
            <input type="text" value={address} readOnly /> 
          </div>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="images" icon={<FontAwesomeIcon icon={faImage} />}>
              <div className="form-field">
                
              <label>Images:</label>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} />
              </div>
              <div>
                {/* Render existing images from car object */}
                {car.images.map((image, index) => (
                  <img
                    key={index}
                    src={`data:image/png;base64,${image}`}
                    alt={`Car Image ${index}`}
                    style={{ width: '200px', height: 'auto', margin: '5px' }}
                  />
                ))}
                {/* Render newly uploaded images from images state */}
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
      </Modal.Body>
    </Modal>
  );
};

export default CarUpdateModal;
