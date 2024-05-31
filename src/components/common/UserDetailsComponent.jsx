import React from 'react';
import '../../styles/userDetailsComponent.css'
const UserDetailsComponent = ({ user }) => {
  return (
    <div className='user-details-container'>
    <div className='user-image-div'><img className='user-image' src="/src/assets/avatar.png" alt="avatar" /></div>
    <div className='user-info-div'> <div style={styles.detail}><strong>Nom:</strong> {user.firstname}</div>
      <div style={styles.detail}><strong>Prenom:</strong> {user.lastname}</div>
      <div style={styles.detail}><strong>Numero de téléphone:</strong> {user.phoneNumber}</div>
   
      </div>  </div>
  );
};

const styles = {
  container: {
   
    padding: '16px',
    borderRadius: '8px',
    maxWidth: '400px',


  },
  heading: {
    fontSize: '24px',
    marginBottom: '16px',
    textAlign: 'center',
    color: '#333'
  },
  detail: {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#555'
  }
};

export default UserDetailsComponent;
