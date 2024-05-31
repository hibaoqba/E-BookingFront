import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button
import axios from 'axios';
import '../../styles/passwordRecoveryModal.css';

const PasswordRecoveryModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      setMessage("Email envoyé, Vérifiez votre boite de messagerie");
    } catch (error) {
      setMessage('Erreur lors de l\'envoi');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="password-recovery-modal">
    <Modal.Header closeButton>
      <Modal.Title>Mot de passe oublié</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSendResetLink} className="password-recovery-form">
      <div className='recovery-form'> <Form.Group controlId="formBasicEmail">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        </div> 
        <Modal.Footer>
        <div className="buttons-div">
          <Button variant="primary" type="submit">
            Envoyer un email
          </Button>
          <Button variant="secondary" style={{marginLeft:'10px'}} onClick={handleClose}>
            Fermer
          </Button>
          
        </div>
        </Modal.Footer>
      </Form>
      {message && <p className="message">{message}</p>}
    </Modal.Body>
  </Modal>
  
  );
};

export default PasswordRecoveryModal;
