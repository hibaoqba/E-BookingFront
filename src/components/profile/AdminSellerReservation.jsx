import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import SellerDashborad from '../carSellerprofile/SellerDashborad';
import SellerReservationList from '../carSellerprofile/SellerReservationList';
import ApartmentReservationList from '../apartmentSellerProfile/ApartmentReservations';
const AdminSellerReservation = () => {
    const [key, setKey] = useState('voitures'); // State to manage active tab

    return (
      <div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="voitures" title="Voitures">
            <SellerReservationList/>
          </Tab>
          <Tab eventKey="appartements" title="Appartements">
        <ApartmentReservationList/>
          </Tab>
        </Tabs>
      </div>
    );
  };

export default AdminSellerReservation
