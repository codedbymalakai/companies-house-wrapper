import axios from "axios";
import dotenv from "dotenv";
import { filterSearch, cleanSearch, transformDict } from "../utils/filters.js";

dotenv.config();

const BASEURL = "https://api.company-information.service.gov.uk/";
const config = {
  auth: { username: process.env.COMPANIES_HOUSE_API_KEY, password: "" },
};

export async function getCompanyDetails(companyNumber) {
  if (!companyNumber) {
    const error = new Error("Company number is required for searching.");
    error.statusCode = 400;
    throw error;
  }
  const url = `${BASEURL}company/${companyNumber}`;
  try {
    const response = await axios.get(url, config);

    const transformedDict = transformDict(response?.data);

    return transformedDict;
  } catch (error) {
    const newError = new Error(
      error?.response?.data?.error ||
        error.message ||
        "Failed to get company details.",
    );
    newError.statusCode = error?.response?.status || 500;
    throw newError;
  }
}

export async function searchCompanies(postcode) {
  if (!postcode) {
    const error = new Error("Postcode is required for searching.");
    error.statusCode = 400;
    throw error;
  }
  const url = `${BASEURL}search/companies?q=${encodeURIComponent(postcode)}`;
  try {
    const response = await axios.get(url, config);

    const filteredResponse = filterSearch(response?.data?.items || []);

    const cleanResponse = cleanSearch(filteredResponse || []);

    return cleanResponse || [];
  } catch (error) {
    const newError = new Error(
      error?.response?.data?.error ||
        error.message ||
        "Failed to search companies.",
    );
    newError.statusCode = error?.response?.status || 500;
    throw newError;
  }
}

export async function compareCompanies(postcode, allowedCompanies) {
  if (
    !postcode ||
    !allowedCompanies ||
    !Array.isArray(allowedCompanies) ||
    allowedCompanies.length === 0
  ) {
    const error = new Error(
      "Postcode is required and allowedCompanies must be a non-empty array.",
    );
    error.statusCode = 400;
    throw error;
  }
  const allowed = [];
  const unauthorised = [];
  const allowedCompaniesSet = new Set(allowedCompanies);
  try {
    const companies = await searchCompanies(postcode);
    companies.forEach((company) => {
      if (allowedCompaniesSet.has(company.companyNumber)) {
        allowed.push({
          companyNumber: company.companyNumber,
          title: company.companyName,
        });
      } else {
        unauthorised.push({
          companyNumber: company.companyNumber,
          title: company.companyName,
        });
      }
    });
    return {
      allowed,
      unauthorised,
    };
  } catch (error) {
    const newError = new Error(
      error?.response?.data?.error ||
        error.message ||
        "Failed to compare companies",
    );
    newError.statusCode = error?.response?.status || 500;
    throw newError;
  }
}
