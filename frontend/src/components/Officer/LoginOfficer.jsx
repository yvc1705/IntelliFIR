import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOfficerLogin } from '../../redux/slices/storeJwt/storeJwt.js';
import { showToast } from '../../redux/slices/storeJwt/toastSlice'; // Adjust path as per your project structure
import { TextField, Button, Typography } from '@mui/material';

const LoginOfficer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(5).required('Password is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('https://intellifir-1.onrender.com/officer/login', values);

                const { userOfficer, token } = response.data;

                // Save the officer details and token to Redux
                dispatch(setOfficerLogin({ user: userOfficer, token }));

                // Show success toast
                dispatch(
                    showToast({
                        message: 'Login successful!',
                        type: 'success',
                    })
                );

                resetForm();

                // Redirect to home page after successful login
                navigate('/home');
            } catch (error) {
                const errorMessage =
                    error.response?.data?.msg || error.message || 'An error occurred during login';

                // Show error toast
                dispatch(
                    showToast({
                        message: errorMessage,
                        type: 'error',
                    })
                );

                console.error('Error logging in officer:', errorMessage);
            }
        },
    });

    return (
        <div style={{ width: '20vw', margin: 'auto', padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Login Officer
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginOfficer;
