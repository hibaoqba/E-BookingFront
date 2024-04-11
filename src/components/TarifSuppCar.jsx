// TarifSuppCar.js
import React, { useState } from 'react';

const TarifSuppCar = ({ onUpdateTotalPrice }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    const price = parseInt(checkbox.dataset.price, 10);
    const isChecked = checkbox.checked;

    if (isChecked) {
      setTotalPrice((prevTotal) => prevTotal + price);
    } else {
      setTotalPrice((prevTotal) => prevTotal - price);
    }

    // Pass the updated total price to the CarComponent
    onUpdateTotalPrice(totalPrice);
  };

  return (
    <div className='tarif-supp'>
      <h2>Tarifs supplémentaires</h2>
      <div className='list-tarifs'>
        <ul>
          <li>
            <input type="checkbox" id="siegeEnfant" data-price="100" onChange={handleCheckboxChange} />
            <label htmlFor="siegeEnfant">Siège enfant - 100 dh</label>
          </li>
          <li>
            <input type="checkbox" id="gpsSatellite" data-price="100" onChange={handleCheckboxChange} />
            <label htmlFor="gpsSatellite">GPS Satellite - 100 dh</label>
          </li>
        </ul>
      </div>
      <div>total: {totalPrice} dh</div>
    </div>
  );
};

export default TarifSuppCar;
