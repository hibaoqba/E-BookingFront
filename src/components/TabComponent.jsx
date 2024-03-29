import React,{useState} from 'react'
import { Card} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faLocationDot, faCalendarDays, faMagnifyingGlass,faCar, faBuilding} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './tabComponent.css';
import People from './People';

const TabComponent = () => {
    const [key, setKey] = useState('voiture');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  return (
    <div>
      <Tabs
                    id="reservation-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className='hero-buttons hero-tabs'
                >
                    <Tab eventKey="voiture" title={<span className='tabText'><FontAwesomeIcon icon={faCar} className='tabIcon'/> Voiture</span>}>
                    
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
                                        <button><FontAwesomeIcon icon={faMagnifyingGlass} /> Rechercher</button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}
                    </Tab>
                    <Tab eventKey="appartement" title={<span className="tabText"><FontAwesomeIcon icon={faBuilding} className='tabIcon'/> Appartement</span>}>
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
                                        <People/>
                                       </div>
                                        <button><FontAwesomeIcon icon={faMagnifyingGlass} /> Rechercher</button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}
                    </Tab>
                </Tabs>
    </div>
  )
}

export default TabComponent
