import jwt from "jsonwebtoken";
import Officer from "../models/Officer.js"; // Assuming your officer model is in this path

// Middleware to check if the user is an officer
export const isOfficer = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        // console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded.id)
        // Fetch the user from the database using the decoded user ID
        const officer = await Officer.findById(decoded.id);
        // console.log(officer);
        if (!officer) {
            return res.status(401).json({ message: "Officer not found" });
        }

        if (officer.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Officer only" });
        }

        // Attach officer data to req.body instead of req.user
        req.body.officer = officer; // Assign officer data to req.body

        next(); // Allow the request to proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized!" });
    }
};
