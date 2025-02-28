import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../Navbar/Navbar';
import "./FAQs.css";

const FAQs = () => {
    const faqs = [
        {
            question: "What is an FIR?",
            answer: "FIR (First Information Report) is a written document prepared by the police when they receive information about a cognizable offense. It is the first step in a criminal investigation.",
        },
        {
            question: "What sections of IPC are related to FIRs?",
            answer: "Sections 154 to 156 of the Indian Penal Code (IPC) deal with the process of registering and investigating an FIR. Section 154 specifically governs the procedure of lodging an FIR.",
        },
        {
            question: "How do I file an FIR through this system?",
            answer: "You can file an FIR by logging into the system, providing the required details, and submitting it. Your complaint will be automatically logged into the system for further investigation.",
        },
        {
            question: "What is the role of IPC in the legal system?",
            answer: "The Indian Penal Code (IPC) defines various criminal offenses and prescribes punishments for them. It is the primary legal document used by law enforcement to prosecute criminal activity.",
        },
        {
            question: "How does the audio recorder work in this system?",
            answer: "The built-in audio recorder allows you to record statements, evidence, or any relevant information. You can save the recordings, and they are securely stored for reference during investigations.",
        },
        {
            question: "Can I upload recorded audio along with an FIR?",
            answer: "Yes, you can upload audio recordings as evidence while submitting an FIR. This can help provide additional context to the case.",
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="faq-container">
                <Typography variant="h4" align="center" gutterBottom className="faq-title">
                    Frequently Asked Questions
                </Typography>
                {faqs.map((faq, index) => (
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
                                    padding: '16px 24px',
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                },
                            }}
                        >
                            <Typography variant="h6" className="accordion-summary">
                                {faq.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                padding: '16px 24px',
                            }}
                        >
                            <Typography className="accordion-details">{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

export default FAQs;
