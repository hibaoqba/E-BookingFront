import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './sellerAddCar.css';

const SellerAddCar = () => {
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    description: '',
    year: '',
    availability: true,
    price: '',
    images: [],
    carFeatures: {
      fuelType: '',
      transmissionType: '',
      horsePower: '',
      place: '',
      suitCases: '',
      ac: true,
      gps: true
    },
    seller: {
      id: null
    }
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
    e.preventDefault();
    try {
      // Set seller ID
      formData.seller.id = userInfo.id;

      // Send formData to backend to add the car
      const response = await axios.post('http://localhost:8080/api/cars', formData);
      console.log('Car added successfully:', response.data);

      // Reset form after successful submission
      setFormData({
        brand: '',
        model: '',
        description: '',
        year: '',
        availability: true,
        price: '',
        images: [],
        carFeatures: {
          fuelType: '',
          transmissionType: '',
          horsePower: '',
          place: '',
          suitCases: '',
          ac: true,
          gps: true
        },
        seller: {
          id: null
        }
      });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add a Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="column">
          <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="column">
          <div className="form-group">
            <label htmlFor="fuelType">Fuel Type:</label>
            <select
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
            <label htmlFor="transmissionType">Transmission Type:</label>
            <select
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
            <label htmlFor="horsePower">Horse Power:</label>
            <input
              type="number"
              id="horsePower"
              name="horsePower"
              value={formData.carFeatures.horsePower}
              onChange={handleCarFeaturesChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="place">Place:</label>
            <input
              type="number"
              id="place"
              name="place"
              value={formData.carFeatures.place}
              onChange={handleCarFeaturesChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="suitCases">Suit Cases:</label>
            <input
              type="number"
              id="suitCases"
              name="suitCases"
              value={formData.carFeatures.suitCases}
              onChange={handleCarFeaturesChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ac">AC:</label>
            <input
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
          <div className="form-group">
            <label htmlFor="gps">GPS:</label>
            <input
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
        </div>
      
        <button type="submit">Add Car</button>
     
      </form>
    </div>
  );
};

export default SellerAddCar;
