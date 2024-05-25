import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../../styles/profileHeader.css';

const ProfileHeader = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('CARSELLER'); // Default checked option
    const [errorMessage, setErrorMessage] = useState('');
    const isClient = userInfo && userInfo.role === "CLIENT";

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            axios.get('http://localhost:8080/api/users/currentUser', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(response => {
                setUserInfo(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
                setLoading(false);
            });
        }
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage(''); // Clear the error message when the modal is closed
    };
    const handleOptionChange = (event) => setSelectedOption(event.target.value);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/seller/waitrequests', {
               role: selectedOption,
               user: { id: userInfo.id }
            });
            console.log(response.data);
            handleCloseModal();
        } catch (error) {
            setErrorMessage('Vous avez déjà envoyé une demande');
            console.error(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='header-container'>
            <div className='profile-pic'>
                <img src={userInfo.avatar || '/src/assets/avatar.png'} alt="avatar" className='avatar'/>
            </div>
            <div className='role-badge'>
                <Badge bg="warning">{userInfo.role}</Badge>
            </div>
            <div className='profile-name'>{userInfo.firstname} {userInfo.lastname}</div>
            {isClient && (
                <div>
                    <Button className='vendor-button' onClick={handleShowModal}>devenez vendeur</Button>
                </div>
            )}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Devenir Vendeur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Check 
                            type="radio"
                            id="car-seller"
                            label="Vendeur de voiture"
                            value="CARSELLER"
                            checked={selectedOption === 'CARSELLER'}
                            onChange={handleOptionChange}
                        />
                        <Form.Check 
                            type="radio"
                            id="apartment-seller"
                            label="Vendeur d'appartement"
                            value="APARTMENTSELLER"
                            checked={selectedOption === 'APARTMENTSELLER'}
                            onChange={handleOptionChange}
                        />
                        {errorMessage && (
                            <Alert variant="danger" className="mt-3">
                                {errorMessage}
                            </Alert>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Envoyer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProfileHeader;
