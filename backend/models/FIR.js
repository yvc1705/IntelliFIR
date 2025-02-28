import mongoose from 'mongoose';

const firSchema = new mongoose.Schema(
    {
        fir_id: {
            type: String,
            required: true,
            unique: true,
        },
        aadhar_number: {
            type: String,
            required: true,
            minLength: 12,
            maxLength: 12,
        },
        name: {
            type: String,
            required: true,
            maxLength: 100,
        },
        address: {
            type: String,
            required: true,
            maxLength: 200,
        },
        age: {
            type: Number,
            required: true,
            min: 1, // Optional: Add validation for positive values
            max: 120,
        },
        mobile_number: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 15,
        },
        complaint: {
            type: String,
            required: true,
            maxLength: 500,
        },
        ipc_section: {
            type: String, // This will be set by the Python script
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['Filed', 'Not Filed'], // Ensures only these two values can be used
            default: 'Not Filed',
        },
        active: {
            type: String,
            enum: ['Active', 'Withdrawn'], // Ensures only these two values can be used
            default: 'Active',
        },
        created_by: {
            type: String,
            required: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex to validate email format
        },
    },
    {
        timestamps: true,
    }
);

const FIR = mongoose.model('FIR', firSchema);
export default FIR;
