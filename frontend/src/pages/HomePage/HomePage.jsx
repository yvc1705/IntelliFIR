import React from 'react';
import Navbar from "../../components/Navbar/Navbar.jsx";
import { ReactComponent as MySvgImage } from "../../assets/homepageSVG.svg";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";

function HomePage() {

    const navigate = useNavigate();
    return (
        <div className='all-main-div'>
            <Navbar />
            <div className='mainDiv'>
                <div className='home-title'>
                    <h1>|| सत्यमेव जयते: || Truth Always Triumphs!</h1>
                </div>
                <div className='home-svg-and-text'>
                    <div className='home-text'>
                        <h1 className='home-text-headline'>Empowering Citizens, Supporting Police: Smarter FIR Management.</h1>
                        <h2 className='home-text-para'>Tired of navigating complex legal processes? We've got you covered. File your FIR complaint easily, and let our algorithm do the heavy lifting by accurately assigning relevant IPCs.</h2>
                        <h2 className='home-text-mission'>We believe in simplifying the path to justice for everyone—citizens and police alike.</h2>
                        <Button
                            variant="outlined"
                            color="primary"
                            className='home-fir-button'
                            onClick={() => navigate('/fir')}
                        >
                            File Your Complaint Now →
                        </Button>
                    </div>
                    <div className='home-svg'>
                        <MySvgImage />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
