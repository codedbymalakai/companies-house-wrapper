const axios = require("axios");
const BASEURL = "https://api.company-information.service.gov.uk/";
const config = {
  auth: { username: COMPANIES_HOUSE_API_KEY, password: "" },
};

export function getCompanyDetails() {}

export async function searchCompanies(postcode) {
  if (!postcode) {
    return {
      statusCode: 400,
      body: { ok: false, error: "Postcode is required for searching." },
    };
  }
  const url = `${BASEURL}search/companies?q=${postcode}`;
  try {
    const searchResponse = await axios.get(url, config);

    console.log(searchResponse.data);
  } catch (error) {
    return {
      statusCode: error?.response?.status || 500,
      body: { ok: false, error: error.message || "Unknown Error" },
    };
  }
}
