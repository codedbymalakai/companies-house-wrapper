import { searchCompanies } from "./companiesHouseService";
const express = require("express");

const app = express();
app.use(express.json());

app.get("/company/:companyNumber", (req, res) => {
  // Call function from services
});
