import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SignUpModal from './SignUpModal';
import PasswordRecoveryModal from './PasswordRecoveryModal'; // Import the PasswordRecoveryModal
import { Login } from '../auth/Login'; 
import '../../styles/LoginModal.css';

const LoginModal = ({ show, handleClose, handleLoginSuccess }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false); // State for PasswordRecoveryModal
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClose = () => handleClose();
  const handleSignUpShow = () => setShowSignUpModal(true);
  const handleRecoveryShow = () => setShowRecoveryModal(true); // Handler to show PasswordRecoveryModal

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await Login(email, password);
    if (success) {
      handleLoginSuccess();
      handleClose();
    } else {
      setError('email ou mot de passe invalide');
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered className="login-modal">
        <Modal.Header closeButton>
          <Modal.Title>connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <Button variant="primary" type="submit">connexion</Button>
            <a  className="pwd" onClick={handleRecoveryShow}>mot de passe oublié</a> {/* Link to show recovery modal */}
            <p className="error">{error}</p>
            <p>vous n'avez pas de compte?</p>
            <Button variant="link" onClick={handleSignUpShow}>Créez un!</Button>
          </form>
        </Modal.Body>
      </Modal>
      {showSignUpModal && <SignUpModal show={showSignUpModal} handleClose={() => setShowSignUpModal(false)} />}
      <PasswordRecoveryModal className='recovery-modal' show={showRecoveryModal} handleClose={() => setShowRecoveryModal(false)} /> {/* PasswordRecoveryModal */}
    </div>
  );
}

export default LoginModal;
