import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import './profileHeader.css'
const ProfileHeader = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            axios.get('http://localhost:8080/api/users/info', {
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='header-container'>
        <div className='profile-pic'>    <img src={userInfo.avatar || '/src/assets/avatar.png'} alt="avatar" className='avatar'/>
        </div>
        <div className='role-badge' >
        <Badge bg="warning">{userInfo.role}</Badge>
        </div>
        <div className='profile-name'>{userInfo.firstname} {userInfo.lastname}</div>
        <div ><button className='vendor-button'>devenez vendeur</button></div>
        </div>
    );
}

export default ProfileHeader;
