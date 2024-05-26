import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../styles/People.css'; 

const People = ({ onChange }) => {
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    useEffect(() => {
        onChange({ adults, children });
    }, [adults, children, onChange]);

    const handleIncrement = (type) => {
        if (type === 'adults') {
            setAdults(adults + 1);
        } else if (type === 'children') {
            setChildren(children + 1);
        }
    };

    const handleDecrement = (type) => {
        if (type === 'adults' && adults > 1) {
            setAdults(adults - 1);
        } else if (type === 'children' && children > 0) {
            setChildren(children - 1);
        }
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                {adults} adultes - {children} enfants 
            </Dropdown.Toggle>
            <Dropdown.Menu className="select-guests-dropdown">
                <div className="menu-content">
                    <Dropdown.Item as="div">
                        <div className="label">Adults</div>
                        <div className="val">
                            <span className="btn-minus" onClick={() => handleDecrement('adults')}>
                                <FontAwesomeIcon icon={faMinus} />
                            </span>
                            <span className="count-display">
                                <input type="number" name="adults" value={adults} min="1" readOnly />
                            </span>
                            <span className="btn-add" onClick={() => handleIncrement('adults')}>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item as="div">
                        <div className="label">Children</div>
                        <div className="val">
                            <span className="btn-minus" onClick={() => handleDecrement('children')}>
                                <FontAwesomeIcon icon={faMinus} />
                            </span>
                            <span className="count-display">
                                <input type="number" name="children" value={children} min="0" readOnly />
                            </span>
                            <span className="btn-add" onClick={() => handleIncrement('children')}>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                        </div>
                    </Dropdown.Item>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default People;
