import axios from 'axios';

export const DeleteApartmentReservation = async (reservationId, fetchReservations) => {
  try {
    // Update the status of the selected reservation using Axios
    await axios.delete(`http://localhost:8080/api/apt_reservations/${reservationId}`);
    fetchReservations();
  } catch (error) {
    console.error('Error deleting reservation:', error);
  }
};
