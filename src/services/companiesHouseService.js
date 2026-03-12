import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASEURL = "https://api.company-information.service.gov.uk/";
const config = {
  auth: { username: process.env.COMPANIES_HOUSE_API_KEY, password: "" },
};

export async function getCompanyDetails() {}

export async function searchCompanies(postcode) {
  if (!postcode) {
    const error = new Error("Postcode is required for searching.");
    error.statusCode = 400;
    throw error;
  }
  const url = `${BASEURL}search/companies?q=${encodeURIComponent(postcode)}`;
  try {
    const response = await axios.get(url, config);

    return response.data?.items || [];
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
