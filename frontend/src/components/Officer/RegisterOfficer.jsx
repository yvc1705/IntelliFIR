import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/slices/storeJwt/toastSlice'; // Adjust the path based on your project structure

const RegisterOfficer = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            badgeNumber: '',
            rank: '',
            stationAssigned: '',
            role: 'admin', // Default role can be set to 'admin'
        },
        validationSchema: Yup.object({
            firstName: Yup.string().min(2).max(50).required('First name is required'),
            lastName: Yup.string().min(2).max(50).required('Last name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(5).required('Password is required'),
            phoneNumber: Yup.string().min(10).max(15).required('Phone number is required'),
            badgeNumber: Yup.string().required('Badge number is required for admin'),
            rank: Yup.string().required('Rank is required for admin'),
            stationAssigned: Yup.string().required('Station assigned is required for admin'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('https://intellifir-1.onrender.com/officer/register', values);
                if (response.status === 201) {
                    dispatch(
                        showToast({
                            message: 'Officer registered successfully!',
                            type: 'success',
                        })
                    );
                    resetForm();
                } else {
                    dispatch(
                        showToast({
                            message: response.data.message || 'Failed to register officer',
                            type: 'error',
                        })
                    );
                }
            } catch (error) {
                // Handle duplicate key error for email
                console.log(error.response.data.message);
                if (error.response?.data?.error?.includes('E11000 duplicate key error')) {
                    dispatch(
                        showToast({
                            message: 'Email ID already in use!',
                            type: 'error',
                        })
                    );
                } else {
                    dispatch(
                        showToast({
                            message: error.response?.data?.message || error.message || 'An error occurred',
                            type: 'error',
                        })
                    );
                }
            }
        },
    });

    return (
        <div style={{ width: '30vw', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Register Officer</h1>
            <form onSubmit={formik.handleSubmit}>
                {/* First Name and Last Name side by side */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                </div>

                {/* Phone Number and Badge Number side by side */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <TextField
                        fullWidth
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Phone Number"
                        variant="outlined"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
                    <TextField
                        fullWidth
                        id="badgeNumber"
                        name="badgeNumber"
                        label="Badge Number"
                        variant="outlined"
                        value={formik.values.badgeNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.badgeNumber && Boolean(formik.errors.badgeNumber)}
                        helperText={formik.touched.badgeNumber && formik.errors.badgeNumber}
                    />
                </div>

                <TextField
                    fullWidth
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="rank"
                    name="rank"
                    label="Rank"
                    variant="outlined"
                    value={formik.values.rank}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.rank && Boolean(formik.errors.rank)}
                    helperText={formik.touched.rank && formik.errors.rank}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="stationAssigned"
                    name="stationAssigned"
                    label="Station Assigned"
                    variant="outlined"
                    value={formik.values.stationAssigned}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.stationAssigned && Boolean(formik.errors.stationAssigned)}
                    helperText={formik.touched.stationAssigned && formik.errors.stationAssigned}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: '20px' }}
                >
                    Register
                </Button>
            </form>
        </div>
    );
};

export default RegisterOfficer;
