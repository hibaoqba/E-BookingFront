import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/invoice.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FaFileInvoiceDollar } from "react-icons/fa";

const ApartmentInvoice = () => {
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { reservationId } = useParams();

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/invoiceApartment/${reservationId}`, {
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
  }, [reservationId]); 

  const handleDownloadPdf = () => {
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `reçu_${reservationId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pdfData) {
    return <div>No PDF data available</div>;
  }

  return (
    <div className='invoice-success-container'> 
      <div className='reservation-success-container'>
        <FontAwesomeIcon icon={faCircleCheck}/>
        <h2>Votre réservation a été effectuée</h2>
      </div>
      <div className='button-container'>
      <button className='download-button' onClick={handleDownloadPdf}>Télécharger Votre Reçu <FaFileInvoiceDollar/></button>
      </div>
    </div>
  );
};

export default ApartmentInvoice;
