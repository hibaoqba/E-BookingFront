import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/invoice.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
const Invoice = () => {
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { reservationId } = useParams();

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/invoice/${reservationId}`, {
          responseType: 'arraybuffer', // Ensure response is treated as binary data
        });
        setPdfData(response.data); // Set the binary PDF data directly
      } catch (error) {
        setError('Error fetching PDF data');
      } finally {
        setLoading(false);
      }
    };

    fetchPdfData();
  }, [reservationId]); // Dependency array to re-fetch data when reservationId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pdfData) {
    return <div>No PDF data available</div>;
  }

  // Convert byte array to base64 string
  const base64Pdf = btoa(new Uint8Array(pdfData).reduce((data, byte) => data + String.fromCharCode(byte), ''));

  return (
        <div className='invoice-success-container'> 
            <div className='reservation-success-container'>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <h2>Votre réservation a été effectuée</h2></div>
            <div className='car-invoice-container'>
      <embed  className='invoice-embed' src={`data:application/pdf;base64,${base64Pdf}`} type="application/pdf"  width="100%"  />
    </div>
    </div>
  );
};

export default Invoice;
