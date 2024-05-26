import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faLocationDot, faCalendarDays, faMagnifyingGlass, faCar, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/tabComponent.css';
import People from './People';

const TabComponent = () => {
    const [key, setKey] = useState('voiture');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [noAdults, setNoAdults] = useState(1);
    const [noChildren, setNoChildren] = useState(0);

    const navigate = useNavigate();
    const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
    const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

    const handlePeopleChange = ({ adults, children }) => {
        setNoAdults(adults);
        setNoChildren(children);
    };

    const handleSearchCar = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/cars/availableCars', {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    keyword: destination
                }
            });
            navigate('/car', { state: { availableCars: response.data } });
        } catch (error) {
            console.error('Error fetching available cars:', error);
        }
    };

    const handleSearchApartment = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/apartments/availableApartments', {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    keyword: destination
                }
            });
            navigate('/apartment', { state: { availableApartments: response.data } });
        } catch (error) {
            console.error('Error fetching available apartments:', error);
        }
    };
    
    return (
        <div>
            <Tabs
                id="reservation-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className='hero-buttons hero-tabs'
            >
                <Tab eventKey="voiture" title={<span className='tabText'><FontAwesomeIcon icon={faCar} className='tabIcon' /> Voiture</span>}>
                    {key === 'voiture' && (
                        <div className="research-card">
                            <Card className="r-card">
                                <Card.Body className="card-body">
                                    <div className="input-with-icon">
                                        <FontAwesomeIcon icon={faLocationDot} className='icon' />
                                        <input
                                            type="text"
                                            placeholder="Où vas-tu?"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-with-icon">
                                        <FontAwesomeIcon icon={faCalendarDays} className='icon' />
                                        <DatePicker
                                            placeholderText='Date Arrivée'
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            startDate={startDate}
                                            endDate={endDate}
                                        />
                                    </div>
                                    <div className="input-with-icon">
                                        <FontAwesomeIcon icon={faCalendarDays} className='icon' />
                                        <DatePicker
                                            placeholderText='Date Départ'
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                        />
                                    </div>
                                    <button className="tab-button" onClick={handleSearchCar}><FontAwesomeIcon icon={faMagnifyingGlass} /> Rechercher</button>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </Tab>
                <Tab eventKey="appartement" title={<span className="tabText"><FontAwesomeIcon icon={faBuilding} className='tabIcon' /> Appartement</span>}>
                    {key === 'appartement' && (
                        <div className="research-card">
                            <Card>
                                <Card.Body>
                                    <div className="input-with-icon">
                                        <FontAwesomeIcon icon={faLocationDot} className='icon' />
                                        <input
                                            type="text"
                                            placeholder="Où vas-tu?"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-with-icon">
                                        <FontAwesomeIcon icon={faCalendarDays} className='icon' />
                                        <DatePicker
                                            placeholderText='Date Arrivée'
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            startDate={startDate}
                                            endDate={endDate}
                                        />
                                    </div>
                                    <div className="input-with-icon">
                                        <FontAwesomeIcon icon={faCalendarDays} className='icon' />
                                        <DatePicker
                                            placeholderText='Date Départ'
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                        />
                                    </div>
                                    <div className="guests">
                                        <People onChange={handlePeopleChange} />
                                    </div>
                                    <button className="tab-button" onClick={handleSearchApartment}><FontAwesomeIcon icon={faMagnifyingGlass} /> Rechercher</button>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </Tab>
            </Tabs>
        </div>
    );
};

export default TabComponent;
