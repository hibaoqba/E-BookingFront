import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserModal = ({ item, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Vendeur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p><strong>id:</strong> {item.seller.id}</p>

        <p><strong>Nom:</strong> {item.seller.firstname} {item.seller.lastname} </p>
        <p><strong>Email:</strong> {item.seller.email}</p>
        <p><strong>Téléphone:</strong> {item.seller.phoneNumber}</p>

      
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
