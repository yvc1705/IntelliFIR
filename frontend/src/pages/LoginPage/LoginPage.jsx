import React, { useState } from 'react';
import LoginUser from '../../components/LoginUser';
import RegisterUser from '../../components/RegisterUser';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import "./LoginPage.css";
import QuoteCard from '../../components/QuoteCard/QuoteCard';

function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='login-main-div'>
            <div className="glass-container">
                {/* <h1>{isRegistering ? 'Register Page' : 'Login Page'}</h1> */}
                {isRegistering ? <RegisterUser /> : <LoginUser />}

                <div className="button-container">

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsRegistering(!isRegistering)}
                        style={{ margin: '10px' }}
                    >
                        {isRegistering ? 'Already have an account? Login!' : 'Create an Account!'}
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/officer')}
                        style={{ margin: '10px' }}
                    >
                        Are You an Officer
                    </Button>
                </div>
            </div>
            <div className='login-quote'>
                <QuoteCard />
            </div>
        </div>
    );
}

export default LoginPage;
