import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './sellerAddCar.css';
import { MapContainer, TileLayer, Marker, Popup,useMapEvents} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";

const SellerAddCar = () => {
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    description: '',
    year: new Date(), // Set initial year as today
    availability: true,
    price: '',
    images: [],
    carFeatures: {
      fuelType: '',
      transmissionType: '',
      horsePower: '',
      suitCases: '',
      ac: true,
      gps: true
    },
    seller: {
      id: null
    },
  
    latitude:   34.0084, // Latitude
    longitude: -6.8539, // Longitude
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
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCarFeaturesChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      carFeatures: {
        ...formData.carFeatures,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
   if(e){ e.preventDefault();
   }
    try {
      // Set seller ID
      formData.seller.id = userInfo.id;

      // Extract year from the selected date and convert it to an integer
      const year = formData.year.getFullYear();

      // Send formData to backend to add the car with the integer year
      const response = await axios.post('http://localhost:8080/api/cars', { ...formData, year });
      console.log('Car added successfully:', response.data);

      // Reset form after successful submission
      setFormData({
        brand: '',
        model: '',
        description: '',
        year: new Date(),
        availability: true,
        price: '',
        images: [],
        carFeatures: {
          fuelType: '',
          transmissionType: '',
          horsePower: '',
          suitCases: '',
          ac: true,
          gps: true
        },
        seller: {
          id: null
        },
        latitude: 0, // Reset latitude
        longitude: 0, // Reset longitude
      });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  // Map component to allow the seller to select a location
  function LocationPicker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormData({
          ...formData,
          latitude: lat, // Update latitude
          longitude: lng, // Update longitude
        });
      },
    });

    return null;
  }
  const handleComplete = () => {
    console.log("Form completed!");
    // Handle form completion logic here
  };

  const tabChanged = ({
    prevIndex,
    nextIndex,
  }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
  };
  
  return (
    <>
      <FormWizard
        shape="circle"
        color="#626fe6"
        onComplete={handleSubmit}
        onTabChange={tabChanged}
      >
        
        <FormWizard.TabContent title="Car Information" icon="ti-car">
          <div className="container">
            <h2>Add a Car - Step 1</h2>
            <form className='form-display'>
            <div className="form-group">
            <label htmlFor="brand" className='add-car-label'>Brand:</label>
            <input  className='add-car-input'
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='add-car-label' htmlFor="model">Model:</label>
            <input  className='add-car-input'
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='add-car-label' htmlFor="description">Description:</label>
            <textarea  className='add-car-input'
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label  className='add-car-label' htmlFor="year">Year:</label>
            <DatePicker className='add-car-input'
              selected={formData.year}
              onChange={(date) => setFormData({ ...formData, year: date })}
              showYearPicker
              dateFormat="yyyy"
              required
            />
      
          </div>
          <div className="form-group">
            <label  className='add-car-label' htmlFor="price">Price:</label>
            <input  className='add-car-input'
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
            </form>
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Car Features" icon="ti-settings">
          <div className="container">
            <h2>Add a Car - Step 2</h2>
            <form className='form-display'>
            <div className="form-group">
            <label  className='add-car-label' htmlFor="fuelType">Fuel Type:</label>
            <select  className='add-car-input'
              id="fuelType"
              name="fuelType"
              value={formData.carFeatures.fuelType}
              onChange={handleCarFeaturesChange}
            >
              <option value="">Select Fuel Type</option>
              <option value="GASOLINE">Essence</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Electrique</option>
              <option value="HYBRID">Hybride</option>
            </select>
          </div>
          <div className="form-group">
            <label className='add-car-label' htmlFor="transmissionType">Transmission Type:</label>
            <select  className='add-car-input'
              id="transmissionType"
              name="transmissionType"
              value={formData.carFeatures.transmissionType}
              onChange={handleCarFeaturesChange}
            >
              <option value="">Select Transmission Type</option>
              <option value="AUTOMATIC">Automatic</option>
              <option value="MANUAL">Manuelle</option>
              <option value="SEMIAUTOMATIC">CVT</option>
            </select>
          </div>
          <div className="form-group">
            <label className='add-car-label' htmlFor="horsePower">Horse Power:</label>
            <input  className='add-car-input'
              type="number"
              id="horsePower"
              name="horsePower"
              value={formData.carFeatures.horsePower}
              onChange={handleCarFeaturesChange}
            />
          </div>
          <div className="form-group">
            <label className='add-car-label' htmlFor="place">Place:</label>
            <input  className='add-car-input'
              type="number"
              id="place"
              name="place"
              value={formData.carFeatures.place}
              onChange={handleCarFeaturesChange}
            />
          </div>
          <div className="form-group">
            <label className='add-car-label' htmlFor="suitCases">Suit Cases:</label>
            <input  className='add-car-input'
              type="number"
              id="suitCases"
              name="suitCases"
              value={formData.carFeatures.suitCases}
              onChange={handleCarFeaturesChange}
            />
          </div>
          <div className="form-group feature-group">
            <label  className='add-car-label' htmlFor="ac">AC:</label>
            <input  className='add-car-check'
              type="checkbox"
              id="ac"
              name="ac"
              checked={formData.carFeatures.ac}
              onChange={() =>
                setFormData({
                  ...formData,
                  carFeatures: {
                    ...formData.carFeatures,
                    ac: !formData.carFeatures.ac
                  }
                })
              }
            />
          </div>
          <div className="form-group feature-group" >
            <label className='add-car-label' htmlFor="gps">GPS:</label>
            <input className='add-car-check'
              type="checkbox"
              id="gps"
              name="gps"
              checked={formData.carFeatures.gps}
              onChange={() =>
                setFormData({
                  ...formData,
                  carFeatures: {
                    ...formData.carFeatures,
                    gps: !formData.carFeatures.gps
                  }
                })
              }
            />
          </div>
            </form>
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="images" icon="ti-location-pin">
  <div className="form-group">
    <label className='add-car-label'>images:</label>
    
  </div>

</FormWizard.TabContent>
        <FormWizard.TabContent title="Location" icon="ti-location-pin">
  <div className="form-group">
    <label className='add-car-label'>Location:</label>
    <MapContainer center={[formData.latitude, formData.longitude]} zoom={5} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationPicker />
      <Marker position={[formData.latitude, formData.longitude]}>
        <Popup>You have selected this location</Popup>
      </Marker>
    </MapContainer>
  </div>

</FormWizard.TabContent>

      </FormWizard>
     
      <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
    </>
  );
};

export default SellerAddCar;