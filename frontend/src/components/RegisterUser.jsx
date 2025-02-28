import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showToast } from '../redux/slices/storeJwt/toastSlice';

const RegisterUser = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, 'First Name must be at least 2 characters')
                .max(50, 'First Name must be 50 characters or less')
                .required('First Name is required'),
            lastName: Yup.string()
                .min(2, 'Last Name must be at least 2 characters')
                .max(50, 'Last Name must be 50 characters or less')
                .required('Last Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .max(50, 'Email must be 50 characters or less')
                .required('Email is required'),
            password: Yup.string()
                .min(5, 'Password must be at least 5 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.post('https://intellifir-1.onrender.com/auth/register', values);

                // const response = await axios.post('https://intellifir-1.onrender.com/auth/register', values);
                // console.log(response);
                dispatch(
                    showToast({
                        message: 'User registered successfully!',
                        type: 'success',
                    })
                );
                resetForm();
            } catch (error) {
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
                            message: error.response?.data?.msg || error.message || 'An error occurred',
                            type: 'error',
                        })
                    );
                }
            }
        },
    });

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Register User</h1>
            <form onSubmit={formik.handleSubmit}>
                {/* First Name and Last Name side by side */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </div>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
        </div>
    );
};

export default RegisterUser;
