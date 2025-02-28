import express from "express";
import { registerFIR, fetchFIRs, fetchMyFir } from '../controllers/FIR.js';
import { isOfficer } from "../middlewares/OfficersMiddleware.js";

const router = express.Router();

router.post("/", registerFIR);
router.get("/fetchFIR", isOfficer, fetchFIRs);
router.get("/fetch-my-fir", fetchMyFir)
export default router;