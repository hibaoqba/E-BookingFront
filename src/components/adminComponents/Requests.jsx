import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/history.css';
import '../../styles/sellerReservationList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck, faTimes, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../common/SearchBar';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  
  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/seller/waitrequests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const confirmerRequest = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/seller/waitrequests/treat/${id}`);
      fetchRequests(); // Refresh the list after confirmation
    } catch (error) {
      console.error('Error confirming request:', error);
    }
  };

  const supprimerRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/seller/waitrequests/${id}`);
      fetchRequests(); 
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const pendingRequests = requests.filter(request => request.status === 'pending');

  return (
    <div>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>id</th>
            <th>utilisateur</th>
            <th>date</th>
            <th>type</th>
            <th>status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>
                <div className='name-info'>
                  <div>{request.user.firstname} {request.user.lastname}</div>
                  <div>
                    <button className='info-button'>
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                  </div>
                </div>
              </td>
              <td>{request.requestDate}</td>
              <td>{request.role}</td>
              <td>{request.status}</td>
              <td>
                <div className='action-div'>
                  <div>
                    <button 
                      className='confirmer-button' 
                      onClick={() => confirmerRequest(request.id)}
                    >
                      confirmer
                    </button>
                  </div>
                  <div>
                    <button 
                      className='supprimer-button' 
                      onClick={() => supprimerRequest(request.id)}
                    >
                      supprimer
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
