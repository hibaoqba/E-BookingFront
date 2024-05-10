import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import AllCarReservations from './AllCarReservations';
import AllApartmentReservations from './AllApartmentReservations';
const AllReservations = () => {
  const [key, setKey] = useState('voitures');
  return (
    <div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="voitures" title="Voitures">
            <AllCarReservations/>
          </Tab>
          <Tab eventKey="appartements" title="Appartements">
          <AllApartmentReservations/>
          </Tab>
        </Tabs>
      </div>
  )
}

export default AllReservations
