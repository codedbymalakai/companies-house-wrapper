import express from "express";
import { searchCompanies } from "../services/companiesHouseService.js";

const router = express.Router();

router.get("/company/:companyNumber", (req, res) => {
  // Call function from services
});

export default router;
