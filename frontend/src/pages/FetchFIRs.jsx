import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';

const FIRCard = ({ fir }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCardClick = () => {
        setIsExpanded(!isExpanded); // Toggle expanded state
    };
    return (
        <Card
            onClick={handleCardClick}
            sx={{
                maxWidth: 345,
                margin: isExpanded ? "auto" : "1rem",
                position: isExpanded ? "fixed" : "relative",
                top: isExpanded ? "50%" : "unset",
                left: isExpanded ? "50%" : "unset",
                transform: isExpanded
                    ? "translate(-50%, -50%) scale(1.5)" // Center and enlarge
                    : "translate(0, 0) scale(1)", // Reset
                zIndex: isExpanded ? 1000 : "auto",
                background: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
                backdropFilter: "blur(10px)", // Blur effect for glassmorphism
                borderRadius: "15px", // Rounded corners
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", // Darker shadow
                border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle light border
                color: "#e0e0e0", // Light grey text
                padding: "1rem", // Padding for inner content
                transition: "all 0.3s ease-in-out", // Smooth transition
                cursor: "pointer", // Pointer cursor on hover
            }}
        >
            <CardContent>
                <Typography variant="h6" component="div">
                    <span style={{ color: "#5465FF" }}>{fir.fir_id}</span>
                </Typography>
                <Typography variant="body2">
                    <strong style={{ color: "#fff" }}>Name:</strong>{" "}
                    <span style={{ color: "#5465FF" }}>{fir.name}</span>
                </Typography>
                <Typography variant="body2">
                    <strong style={{ color: "#fff" }}>Address:</strong>{" "}
                    <span style={{ color: "#5465FF" }}>{fir.address}</span>
                </Typography>
                <Typography variant="body2">
                    <strong style={{ color: "#fff" }}>Complaint:</strong>{" "}
                    <span style={{ color: "#5465FF" }}>{fir.complaint}</span>
                </Typography>
                <Typography variant="body2">
                    <strong style={{ color: "#fff" }}>IPC Section:</strong>{" "}
                    <span style={{ color: "#5465FF" }}>{fir.ipc_section}</span>
                </Typography>
                <Typography variant="body2">
                    <strong style={{ color: "#fff" }}>Date:</strong>{" "}
                    <span style={{ color: "#5465FF" }}>{fir.date}</span>
                </Typography>
            </CardContent>
        </Card>
    );
};

const FIRList = () => {
    const [firs, setFirs] = useState([]);
    const token = useSelector((state) => state.auth.token);
    useEffect(() => {
        const fetchFirs = async () => {
            try {
                const response = await axios.get('https://intellifir-1.onrender.com/fir/fetchFIR', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set the token in Authorization header
                    },
                });
                if (response.data.success) {
                    setFirs(response.data.data); // Limit to the first 5 FIRs
                } else {
                    console.error('Failed to fetch FIRs');
                }
            } catch (error) {
                console.error('Error fetching FIRs:', error);
            }
        };

        fetchFirs();
    }, [token]);

    return (
        <div>
            <Navbar />
            <Box sx={{ padding: '2rem' }}>
                <Grid container spacing={2} justifyContent="center">
                    {firs.map((fir) => (
                        <Grid item xs={12} sm={6} md={4} key={fir._id}>
                            <FIRCard fir={fir} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default FIRList;
