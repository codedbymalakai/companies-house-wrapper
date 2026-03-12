import express from "express";
import {
  searchCompanies,
  getCompanyDetails,
} from "../services/companiesHouseService.js";

const router = express.Router();

router.get("/company/:companyNumber", (req, res) => {
  // Call function from services
});

router.get("/companies/search/:postcode", async (req, res) => {
  const { postcode } = req.params;
  if (!postcode) {
    return res.status(400).json({
      ok: false,
      error: "Postcode is required for searching",
    });
  }
  try {
    const companies = await searchCompanies(postcode);
    return res.status(200).json({
      ok: true,
      data: companies,
    });
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      ok: false,
      error: error.message || "Unknown error",
    });
  }
});

export default router;
