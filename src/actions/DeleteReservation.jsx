import axios from 'axios';

export const DeleteReservation = async (reservationId, fetchReservations) => {
  try {
    // Update the status of the selected reservation using Axios
    await axios.delete(`http://localhost:8080/api/reservations/${reservationId}`);
    fetchReservations();
  } catch (error) {
    console.error('Error deleting reservation:', error);
  }
};
