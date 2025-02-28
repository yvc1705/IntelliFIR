import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import LogoutButton from '../LogoutButton';
import User from '../UserLogoAndName/User';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';


function Navbar() {

    const navigate = useNavigate();
    const officerRole = useSelector((state) => state.auth.officer?.role); // Adjust 'officer.role' based on your state structure

    return (
        <Box component="navbar" sx={{
            px: 4,
            py: 2,
            border: '1px solid rgba(255, 255, 255, 0.18)',  // Slight border for glass effect
            backgroundColor: 'rgba(255, 255, 255, 0.1)',     // Semi-transparent background
            backdropFilter: 'blur(10px)',                      // Apply blur effect to background
            display: 'flex',
            // width: '100vw',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'         // Optional: Add a slight shadow for depth
        }}>
            <Box sx={{
                // mx: '4rem',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <Box
                    component="img"
                    src={require('../../assets/favicon-img.png')}
                    // src="https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Example"
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '8px',
                        boxShadow: 3,
                    }}
                />
                <Typography sx={{
                    p: '10px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    color: '#5465FF',
                    fontSize: '1.5rem' // Adjust the size as needed
                }}>
                    IntelliFIR
                </Typography>
            </Box>
            <Box component="section" sx={{
                mx: '4rem',
                p: '1rem',
                width: '70rem',
                // border: '1px solid grey',
                backgroundColor: '#E2FDFF',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: '20px'
            }}>

                <Button className='nav-button' onClick={() => { navigate('/fir') }} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Register FIR
                    <Fab color="primary" aria-label="add" size="small" sx={{ marginLeft: 1 }}>
                        <AddIcon />
                    </Fab>
                </Button>

                <Button className='nav-button' onClick={() => { navigate('/ipc-details') }} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Read About IPC
                    <Fab color="primary" aria-label="add" size="small" sx={{ marginLeft: 1 }}>
                        <AddIcon />
                    </Fab>
                </Button>
                <Button className='nav-button' onClick={() => { navigate('/my-firs') }} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Your FIRs
                    <Fab color="primary" aria-label="add" size="small" sx={{ marginLeft: 1 }}>
                        <AddIcon />
                    </Fab>
                </Button>

                <Button className='nav-button' onClick={() => { navigate('/faqs') }} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    FAQs
                    <Fab color="primary" aria-label="add" size="small" sx={{ marginLeft: 1 }}>
                        <AddIcon />
                    </Fab>
                </Button>

                {/* Conditional Button for Admin */}
                {officerRole === 'admin' && (
                    <Button className='nav-button' onClick={() => { navigate('/fetchFIRs') }} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        Admin Panel
                        <Fab color="primary" aria-label="add" size="small" sx={{ marginLeft: 1 }}>
                            <AddIcon />
                        </Fab>
                    </Button>
                )}

                <LogoutButton />
            </Box>
            <Box>
                <User />
            </Box>
        </Box >

    );
}

export default Navbar;
