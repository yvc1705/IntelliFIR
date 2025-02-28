import mongoose from "mongoose";

const policeSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 50
        },
        lastName: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 50
        },
        email: {
            type: String,
            required: true,
            maxLength: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minLength: 5,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        badgeNumber: {
            type: String,
            unique: true,
            sparse: true, // Ensures uniqueness but allows null values for non-admin users
            required: function () {
                return this.role === "admin";
            }
        },
        rank: {
            type: String,
            required: function () {
                return this.role === "admin";
            }
        },
        stationAssigned: {
            type: String,
            required: function () {
                return this.role === "admin";
            },
            maxLength: 100
        },
        phoneNumber: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 15
        },
    },
    {
        timestamps: true,
    }
);

const Officer = mongoose.model("Officer", policeSchema);
export default Officer;
