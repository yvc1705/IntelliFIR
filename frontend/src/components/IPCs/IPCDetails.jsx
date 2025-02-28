import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../Navbar/Navbar';
import './IPCDetails.css';

const IPCDetails = () => {
    const ipcInfo = [
        {
            question: "What is IPC?",
            answer: "The Indian Penal Code (IPC) is the main criminal code of India. It is a comprehensive code that covers all substantive aspects of criminal law. It was first enacted in 1860 and is still in force today.",
        },
        {
            question: "How many sections are there in IPC?",
            answer: "The Indian Penal Code contains 511 sections, which are divided into 23 chapters. These sections cover various offenses and their corresponding punishments.",
        },
        {
            question: "What does IPC deal with?",
            answer: "The IPC defines various criminal offenses and prescribes punishments for them. It covers offenses related to murder, theft, rape, assault, and many others.",
        },
        {
            question: "What are the key sections of IPC?",
            answer: "Some of the key sections include Section 302 (punishment for murder), Section 376 (punishment for rape), and Section 420 (cheating and dishonestly inducing delivery of property).",
        },
        {
            question: "Can the IPC be amended?",
            answer: "Yes, the IPC has been amended multiple times since its enactment. The amendments have introduced new sections and modified existing ones to adapt to evolving societal norms and criminal activity.",
        },
        {
            question: "What is the role of IPC in the legal system?",
            answer: "The IPC is used by law enforcement agencies to prosecute criminal activities. It serves as the primary tool for defining and penalizing crimes in India.",
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="ipc-container">
                <Typography variant="h4" align="center" gutterBottom className="ipc-title">
                    Indian Penal Code (IPC) Overview
                </Typography>
                <Typography variant="body1" className="ipc-content">
                    The Indian Penal Code (IPC) is the foundation of criminal law in India. It outlines the offenses that can be committed and the punishments for those offenses. Below are some frequently asked questions related to IPC and its sections:
                </Typography>

                {ipcInfo.map((ipc, index) => (
                    <Accordion
                        key={index}
                        sx={{
                            marginBottom: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'box-shadow 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            sx={{
                                '& .MuiAccordionSummary-content': {
                                    padding: '8px 50px',
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                },
                            }}
                        >
                            <Typography variant="h6" className="accordion-summary">
                                {ipc.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordion-details">
                            <Typography>{ipc.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

export default IPCDetails;
