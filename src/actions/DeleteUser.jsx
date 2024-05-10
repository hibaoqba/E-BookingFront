import axios from 'axios';

export const DeleteUser = async (userId, fetchUsers) => {
  try {
    // Update the status of the selected reservation using Axios
    await axios.delete(`http://localhost:8080/api/users/${userId}`);
    fetchUsers();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
