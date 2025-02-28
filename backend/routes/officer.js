import express from "express";
import { registerOfficer, loginOfficer } from "../controllers/officer.js";
import { isOfficer } from "../middlewares/OfficersMiddleware.js";
import { fetchFIRs } from "../controllers/FIR.js";

const router = express.Router();

router.post("/login", loginOfficer);
router.post("/register", registerOfficer);
// router.get("/access-FIR", isOfficer, fetchFIRs);

export default router;