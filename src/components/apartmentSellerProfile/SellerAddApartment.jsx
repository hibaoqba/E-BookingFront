import React, { useState } from 'react';
import axios from 'axios';
import UseFetchUserInfo from '../UseFetchUserInfo';
import MapPicker from '../common/MapPicker';
import FormWizard from 'react-form-wizard-component';
import 'react-form-wizard-component/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faImage, faMapMarkerAlt, faBed } from '@fortawesome/free-solid-svg-icons';
import '../../styles/sellerAddApartment.css';

const SellerAddApartment = () => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('');
    const [square, setSquare] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [noBed, setNoBed] = useState('');
    const [airConditioning, setAirConditioning] = useState('');
    const [images, setImages] = useState([]);
    const [noBathroom, setNoBathroom] = useState('');
    const [parking, setParking] = useState(false);
    const [pool, setPool] = useState(false);
    const [wifiInternet, setWifiInternet] = useState(false);
    const [kitchen, setKitchen] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage1, setErrorMessage1] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [errorMessage3, setErrorMessage3] = useState('');
    const [errorMessage4, setErrorMessage4] = useState('');

    const userInfo = UseFetchUserInfo();

    const handleLocationChange = (lat, lng) => {
        setLatitude(lat);
        setLongitude(lng);
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = await Promise.all(files.map(async (file) => {
            const base64String = await convertToBase64(file);
            return base64String;
        }));
        setImages(imageFiles);
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
        if (e) { e.preventDefault(); }
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
            const response = await axios.post('http://localhost:8080/api/apartments', {
                titre,
                description,
                city,
                price,
                latitude,
                longitude,
                images,
                apartmentFeatures: {
                    noBed,
                    noBathroom,
                    parking,
                    pool,
                    wifiInternet,
                    kitchen,
                    square,
                    breakfast,
                    airConditioning
                },
                seller: { id: userInfo.id }
            });
            console.log(response.data);
            setMessage('apartement ajouté');
        } catch (error) {
            setErrorMessage(`une erreur s'est produite`);
            console.error(error);
        }
    };

    const validateTab1 = () => {
        return titre !== '' && description !== '' && city !== '' && price !== '' && square !== '';
    };

    const validateTab2 = () => {
        return noBed !== '' && noBathroom !== '';
    };

    const validateTab3 = () => {
        return latitude !=='' && longitude !=='';
    };
    const validateTab4 = () => {
        return images.length > 0;
    };

    return (
        <div className="form-container">
            <FormWizard onComplete={handleSubmit} >
                <FormWizard.TabContent title="Informations" icon={<FontAwesomeIcon icon={faHome} />}>
                    <h2>Add Apartment</h2>
                    <div className="form-field">
                        <label>Titre:</label>
                        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label>Ville:</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label>Prix:</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label>Surface (m²):</label>
                        <input type="number" value={square} onChange={(e) => setSquare(e.target.value)} />
                    </div>
                    {errorMessage1 && <p className='error-message'>{errorMessage1}</p>}

                </FormWizard.TabContent>

                <FormWizard.TabContent title="Features" icon={<FontAwesomeIcon icon={faBed} />} isValid={validateTab1()} validationError={() => setErrorMessage1('Veuillez remplir tous les champs')}>
                <div className="form-field">
                        <label>Lits:</label>
                        <input type="number" value={noBed} onChange={(e) => setNoBed(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label>Salles de bain:</label>
                        <input type="number" value={noBathroom} onChange={(e) => setNoBathroom(e.target.value)} />
                    </div>
                    <div className="form-check">
                        <label>Parking:</label>
                        <input type="checkbox" checked={parking} onChange={(e) => setParking(e.target.checked)} />
                    </div>
                    <div className="form-check">
                        <label>Piscine:</label>
                        <input type="checkbox" checked={pool} onChange={(e) => setPool(e.target.checked)} />
                    </div>
                    <div className="form-check">
                        <label>Petit déjeuner:</label>
                        <input type="checkbox" checked={breakfast} onChange={(e) => setBreakfast(e.target.checked)} />
                    </div>
                    <div className="form-check">
                        <label>WiFi:</label>
                        <input type="checkbox" checked={wifiInternet} onChange={(e) => setWifiInternet(e.target.checked)} />
                    </div>
                    <div className="form-check">
                        <label>Cuisine:</label>
                        <input type="checkbox" checked={kitchen} onChange={(e) => setKitchen(e.target.checked)} />
                    </div>
                    <div className="form-check">
                        <label>AC:</label>
                        <input type="checkbox" checked={airConditioning} onChange={(e) => setAirConditioning(e.target.checked)} />
                    </div>
                    {errorMessage2 && <p className='error-message'>{errorMessage2}</p>}

                </FormWizard.TabContent>

                <FormWizard.TabContent title="Location" icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} isValid={validateTab2()} validationError={() => setErrorMessage2('Veuillez remplir tous les champs')}>
                <MapPicker 
                    defaultPosition={[0,0]}
                    onLocationChange={handleLocationChange} 
                />
                    {errorMessage3 && <p className='error-message'>{errorMessage3}</p>}

                </FormWizard.TabContent>

                <FormWizard.TabContent title="Images" icon={<FontAwesomeIcon icon={faImage} />} isValid={validateTab3()} validationError={() => setErrorMessage3('Veuillez choisir un emplacement')}>
                    <div className="form-field">
                        <label>Images:</label>
                        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                    </div>
                    {message && <p className='message'>{message}</p>}
                    {errorMessage4 && <p className='error-message'>{errorMessage4}</p>}
                </FormWizard.TabContent>
            </FormWizard>
        </div>
    );
};

export default SellerAddApartment;
