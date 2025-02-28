import React from 'react';
import "./User.css";
import { useSelector } from 'react-redux';


const User = () => {
    const user = useSelector((state) => {
        // console.log("State is: ", state);
        if (state.auth.officer && state.auth.officer.role === 'admin') {
            return state.auth.officer; // Return officer details if the role is admin
        } else {
            return state.auth.user; // Fallback to user details
        }
    });
    console.log("User is: ", user);
    return (
        <div className='user-name'>
            <div className='user-details'>
                <i class="fa-solid fa-user"></i>
                <h2 className='user-full-name'>{user.firstName} {user.lastName}</h2>
            </div>
            <h3>{user.email}</h3>
        </div>
    );
};
export default User;
