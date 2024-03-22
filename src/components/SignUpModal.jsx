import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./signupmodal.css"

const SignUpModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered className="signup-modal">
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input type="text" placeholder='nom'/>
          <input type="text" placeholder='prenom'/>
          <input type="text" placeholder='téléphone'/>
          <input type="email" placeholder='Adress Email' />
          <input type="password" placeholder='Mot de Passe' />
          <div className="checkbox-container">
            <input type='checkbox' id="termsCheckbox" />
            <label htmlFor="termsCheckbox">J'ai Lu Et J'ai Accepté Les </label>
            <a href="#">Conditions et Politique de confidentialité</a>
          </div>
          <div className="login-link-container">
            <p>Already Have an Account? <a href="#">Login</a></p>
          </div>
          <Button variant="primary" type="submit">Sign Up</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
