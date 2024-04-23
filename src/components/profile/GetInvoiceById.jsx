import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/getInvoiceById.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
const GetInvoiceById = ({ reservationId }) => {
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/invoice/${reservationId}`, {
          responseType: 'arraybuffer',
        });
        setPdfData(response.data);
      } catch (error) {
        setError('Error fetching PDF data');
      } finally {
        setLoading(false);
      }
    };

    fetchPdfData();
  }, [reservationId]);

  const handleCloseModal = () => setShowModal(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pdfData) {
    return <div>No PDF data available</div>;
  }

  const base64Pdf = btoa(new Uint8Array(pdfData).reduce((data, byte) => data + String.fromCharCode(byte), ''));

  return (
    <div>
      <Button variant="primary" className='invoice-show' onClick={() => setShowModal(true)}>
      <FontAwesomeIcon icon={faFileInvoiceDollar}/>facture 
      </Button>

      <Modal className='invoice-modal' show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body className='invoice-modal-body' >
          <embed src={`data:application/pdf;base64,${base64Pdf}`} type="application/pdf" width="100%" height="600px" style={{ transform: 'scale(1)' }}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GetInvoiceById;
