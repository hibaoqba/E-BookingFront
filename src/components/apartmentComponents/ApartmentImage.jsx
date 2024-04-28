import {React,useState,useEffect} from 'react'
import axios from 'axios';
const ApartmentImage = ({apartmentId,left,right}) => {
    const [firstImage, setFirstImage] = useState(null);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchApartment = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/apartments/${apartmentId}`);
          if (response.data.images && response.data.images.length > 0) {
            setFirstImage(response.data.images[0]);
          } else {
            setFirstImage(null);
          }
          setError('');
        } catch (error) {
          setError('Error fetching apartment data');
          console.error(error);
        }
      };
  
      if (apartmentId) {
        fetchApartment();
      }
    }, [apartmentId]);
  
    return (
      <div>
        {error && <p>{error}</p>}
        {firstImage && (
          <img
            src={`data:image/png;base64,${firstImage}`}
            alt="Apartment Image"
            style={{ width: '100%', height:'200px',borderTopLeftRadius:`${left}px`,borderBottomLeftRadius:`${left}px`,borderTopRightRadius:`${right}px`,borderBottomRightRadius:`${right}px` }}
          />
        )}
      </div>
    );
  };
export default ApartmentImage
