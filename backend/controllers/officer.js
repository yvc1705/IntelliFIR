import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Officer from "../models/Officer.js";

// Register Officer
export const registerOfficer = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, badgeNumber, rank, stationAssigned, phoneNumber } = req.body;

        // Check if the Officer already exists
        const existingOfficer = await Officer.findOne({ email });
        if (existingOfficer) {
            return res.status(400).json({ message: "Officer already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new Officer
        const newOfficer = new Officer({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            badgeNumber,
            rank,
            stationAssigned,
            phoneNumber
        });

        const savedOfficer = await newOfficer.save();
        // Save Officer to database
        // console.log(savedOfficer);
        // Generate JWT token (optional for registration)
        // const token = jwt.sign({ id: savedOfficer._id, role: savedOfficer.role }, process.env.JWT_SECRET);

        res.status(201).json({ message: "Officer registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Login Officer
export const loginOfficer = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the Officer exists
        const userOfficer = await Officer.findOne({ email });
        if (!userOfficer) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, userOfficer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: userOfficer._id, role: userOfficer.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token will expire in 1 hour
        );

        res.status(200).json({ message: "Login successful", userOfficer, token });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
