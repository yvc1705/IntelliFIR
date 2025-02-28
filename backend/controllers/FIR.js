// Import the Audio model if you’re storing metadata in MongoDB
import FIR from '../models/FIR.js';
import { spawn } from 'child_process';
import { v4 as uuidv4 } from 'uuid'; // To generate unique fir_id
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

// import console from 'console';

// Register FIR

// Controller function to register an FIR
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const registerFIR = async (req, res) => {
    try {
        // console.log("Processing FIR registration...");
        const { aadhar_number, name, address, age, mobile_number, complaint, email } = req.body;

        // Generate unique FIR ID
        const fir_id = `FIR${new Date().toISOString().replace(/[-:.TZ]/g, '')}${Math.floor(Math.random() * 1000)}`;
        // console.log("Complaint:", complaint);

        // Initialize the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate the IPC section using the Gemini model
        const prompt = `For the Indian context, analyze the following incident and determine the applicable IPC sections:

            Incident: "${complaint}"

            Return the answer strictly in the following format:
            "{IPC_First}, {IPC_Second}, etc."

            Output only the text in this format, without any explanation or additional information.`;


        const result = await model.generateContent(prompt);
        const ipc_section = result.response.text().trim() || "Not Specified";
        // console.log("IPC Section:", ipc_section);

        // Get the current date and time
        const date = new Date().toISOString();

        // Create a new FIR document
        const newFIR = new FIR({
            fir_id,
            aadhar_number,
            name,
            address,
            age,
            mobile_number,
            complaint,
            ipc_section,
            date,
            created_by: email,
        });

        // Save the FIR document to the database
        await newFIR.save();
        console.log("New FIR saved:", newFIR);

        // Send the saved FIR as the response
        res.status(201).json(newFIR);
    } catch (error) {
        // console.error("Error registering FIR:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// Fetch FIR and order them by recent first

export const fetchFIRs = async (req, res) => {
    try {
        const firs = await FIR.find().sort({ date: -1 });
        res.status(200).json({
            success: true,
            message: "FIRs fetched successfully",
            data: firs
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching FIRs",
            error: err.message
        });
    }
};


export const fetchMyFir = async (req, res) => {
    const { email } = req.query;  // Get the email from the query parameter

    try {
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email query parameter is required",
            });
        }

        // Fetch FIRs for the provided email
        const firs = await FIR.find({ created_by: email }).sort({ date: -1 });

        if (firs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No FIRs found for the provided email",
                data: [],
            });
        }

        res.status(200).json({
            success: true,
            message: "FIRs fetched successfully",
            data: firs,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching FIRs",
            error: err.message,
        });
    }
};

