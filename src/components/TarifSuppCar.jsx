import React, { useState } from 'react';

const TarifSuppCar = ({ onUpdateStates }) => {
  const [siegeEnfantChecked, setSiegeEnfantChecked] = useState(false);
  const [gpsSatelliteChecked, setGpsSatelliteChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    const isChecked = checkbox.checked;

    if (checkbox.id === 'siegeEnfant') {
      setSiegeEnfantChecked(isChecked);
    } else if (checkbox.id === 'gpsSatellite') {
      setGpsSatelliteChecked(isChecked);
    }

    // Notify the parent component about the checkbox changes
    onUpdateStates({
      siegeEnfantChecked: checkbox.id === 'siegeEnfant' ? isChecked : siegeEnfantChecked,
      gpsSatelliteChecked: checkbox.id === 'gpsSatellite' ? isChecked : gpsSatelliteChecked
    });
  };

  return (
    <div className='tarif-supp'>
      <h2>Tarifs supplémentaires</h2>
      <div className='list-tarifs'>
        <ul>
          <li>
            <input
              type="checkbox"
              id="siegeEnfant"
              onChange={handleCheckboxChange}
              checked={siegeEnfantChecked}
            />
            <label htmlFor="siegeEnfant">Siège enfant</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="gpsSatellite"
              onChange={handleCheckboxChange}
              checked={gpsSatelliteChecked}
            />
            <label htmlFor="gpsSatellite">GPS Satellite</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TarifSuppCar;
