import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/allUsers.css';
import { faPencil, faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button } from 'react-bootstrap';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateRole = async () => {
    try {
      await axios.put(`http://localhost:8080/api/users/role/${selectedUser.id}`, { role: newRole });
      // Fetch users again after role update
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
      setSelectedUser(null);
      setNewRole('');
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleshowDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${selectedUserId}`);
      // Fetch users again after deletion
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Prenom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                {selectedUser === user.email ? (
                  <div className="status-select-container">
                    <select
                      className="role-select"
                      value={newRole || user.role}
                      onChange={e => setNewRole(e.target.value)}
                    >
                      <option value="ADMIN">admin</option>
                      <option value="CLIENT">client</option>
                      <option value="APARTMENTSELLER">vendeur appartement</option>
                      <option value="CARSELLER">vendeur voiture</option>
                    </select>
                    <button className="status-save-button" onClick={handleUpdateRole}><FontAwesomeIcon icon={faCheck}/></button>
                    <button className="status-cancel-button" onClick={() => setSelectedUser(null)}><FontAwesomeIcon icon={faTimes}/></button>
                  </div>
                ) : (
                  <div className='status-cell'>
                    <div className='status-text'>{user.role}</div>
                    <button className='update-status-button' onClick={() => setSelectedUser(user)}>
                      <FontAwesomeIcon icon={faPencil}/>
                    </button>
                  </div>
                )}
              </td>
              <td>
                <button className="btn btn-danger car-delete-button" onClick={() => handleshowDeleteModal(user.id)}>
                  <FontAwesomeIcon icon={faTrash}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal className='confirmation-modal' show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Etes vous sur de vouloir supprimer cet utilisateur?</Modal.Body>
        <Modal.Footer>
          <div className='delete-buttons'>
            <Button className="confirm-delete" onClick={handleDeleteUser}>
              Supprimer
            </Button>
            <Button className='cancel-delete' onClick={handleCloseModal}>
              Fermer
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AllUsers;
