import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { setLogout } from '../redux/slices/storeJwt/storeJwt.js'

function LogoutButton() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
    };

    return (
        <Button
            variant="contained"
            color="#788BFF"
            onClick={handleLogout}
            style={{
                margin: '10px',
                backgroundColor: '#788BFF' // Set the background color
            }}
        >
            Logout
        </Button>
    );
}

export default LogoutButton;
