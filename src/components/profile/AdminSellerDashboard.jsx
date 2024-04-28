import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import SellerDashborad from '../carSellerprofile/SellerDashborad';

const AdminSellerDashboard = () => {
  const [key, setKey] = useState('voitures'); // State to manage active tab

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="voitures" title="Voitures">
          
        <SellerDashborad/>
        </Tab>
        <Tab eventKey="appartements" title="Appartements">
          <h2>Appartements Content</h2>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminSellerDashboard;
