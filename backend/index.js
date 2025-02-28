import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import 'dotenv/config';
import authRoutes from "./routes/auth.js";
import firRoutes from './routes/FIR.js';
import officerRoutes from './routes/officer.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("hiii");
});

app.use("/auth", authRoutes);
app.use("/fir", firRoutes);
app.use("/officer", officerRoutes);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server running at ${process.env.PORT}.`))

    }).catch((error) => console.log(`${error} did not connect`))
