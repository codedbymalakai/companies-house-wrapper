import express from "express";
import {
  searchCompanies,
  getCompanyDetails,
  compareCompanies,
} from "../services/companiesHouseService.js";

const router = express.Router();

router.get("/company/:companyNumber", async (req, res) => {
  const { companyNumber } = req.params;
  if (!companyNumber) {
    return res.status(400).json({
      ok: false,
      error: "Company number is required for searching.",
    });
  }
  try {
    const companyData = await getCompanyDetails(companyNumber);
    return res.status(200).json({
      ok: true,
      data: companyData,
    });
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      ok: false,
      error: error.message || "Unknown error",
    });
  }
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

router.post("/companies/compare", async (req, res) => {
  const { postcode, allowedCompanies } = req.body;

  try {
    const result = await compareCompanies(postcode, allowedCompanies);

    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      ok: false,
      error: error.message || "Failed to compare companies",
    });
  }
});

export default router;
