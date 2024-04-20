import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SellerReservationList from './SellerReservationList';

const Dashboard = () => {
  return (
    <div>
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="list" title="Liste de réservations">
        <SellerReservationList/>
      </Tab>
      <Tab eventKey="dashboard" title="Tableau de Bord">
       <SellerDashboard/>
      </Tab>
     
    </Tabs>
    </div>
  )
}

export default Dashboard
