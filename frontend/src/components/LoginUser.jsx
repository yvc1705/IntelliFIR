import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../redux/slices/storeJwt/storeJwt.js';
import { showToast } from '../redux/slices/storeJwt/toastSlice'; // Import showToast
import { TextField, Button } from '@mui/material';

const LoginUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(5, 'Password must be at least 5 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            // Dispatch loading toast
            dispatch(showToast({
                message: "Logging in, please wait...",
                type: "info",
            }));

            try {
                const response = await axios.post('https://intellifir-1.onrender.com/auth/login', values);

                const { user, token } = response.data;
                // console.log({ user, token });
                dispatch(setLogin({ user, token }));

                // Dispatch success toast
                dispatch(showToast({
                    message: "Login successful!",
                    type: "success",
                }));

                resetForm();
                navigate('/home');
            } catch (error) {
                // Dispatch error toast
                dispatch(showToast({
                    message: error.response?.data?.message || 'Login failed. Please check your credentials.',
                    type: "error",
                }));
                console.error('Error logging in user:', error.response?.data || error.message);
            }
        },
    });

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            <h1>Login User</h1>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginUser;
