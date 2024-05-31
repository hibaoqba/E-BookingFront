import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../../styles/resetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/auth/reset-password', null, {
        params: { token, password }
      });
      setMessage('Réinitialisation du mot de passe réussie');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Jeton invalide ou expiré.');
      } else {
        setMessage('Erreur lors de la réinitialisation du mot de passe.');
      }
    }
  };

  return (
    <Container className="mt-5 reset-container">
      <Row className="justify-content-md-center">
        <Col md="6">
         
          <Form onSubmit={handleSubmit}>
          <h1>Réinitialiser le mot de passe</h1>
            <Form.Group controlId="formPassword">
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez le nouveau mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirmez le nouveau mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ressaisissez le nouveau mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Réinitialiser le mot de passe
            </Button>
          </Form>
          {message && <p className="mt-3">{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
