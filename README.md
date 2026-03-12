# Companies House API Wrapper

## Overview

This project is a lightweight **Express API wrapper** built around the official **Companies House API**.

It was designed to support **address monitoring use cases** where organisations need to verify which companies are registered at a given location and ensure only authorised companies are using that address.

The API provides endpoints to:

- Retrieve company details by company number
- Search companies by postcode
- Filter out dissolved companies
- Compare companies at an address against an allowed list

This wrapper simplifies the raw Companies House responses and exposes **clean, structured endpoints** that can be easily consumed by internal services or front-end applications.

---

## Tech Stack

- Node.js
- Express
- Axios
- Companies House API

---

## Installation

### Clone the repository

```bash
git clone https://github.com/codedbymalakai/companies-house-wrapper.git
cd companies-house-wrapper
```

Install dependencies

```bash
npm install
```

## Environment Variables

Create a .env file in the root of the project and add your Companies House API key:
`COMPANIES_HOUSE_API_KEY=your_api_key_here`

You can obtain an API key from:
https://developer.company-information.service.gov.uk/

## Running the Server

Start the development server:

```bash
node src/server.js
```

The API will run on:

```bash
http://localhost:3000
```

## Health check endpoint:

```bash
GET /health
```

## API Endpoints

`GET /health`

Purpose

Simple health check to verify the API is running.

Response

```JSON
{
  "status": "ok"
}
```

GET `/company/:companyNumber`

Purpose

Retrieve detailed information about a specific company using its Companies House number.

Example Request

`GET /company/01624297`

Example Response

```JSON
{
  "companyNumber": "01624297",
  "companyName": "EXAMPLE LTD",
  "status": "active",
  "dateOfCreation": "1982-03-15",
  "registeredOfficeAddress": "..."
}
```

Error Response

```JSON
{
  "ok": false,
  "error": "Company number is required for searching."
}
```

GET `/companies/search/:postcode`

Purpose

Search for companies registered at a given postcode.

The results are cleaned and dissolved companies are removed.

Example Request

`GET /companies/search/EC2A 4NE`

Example Response

```JSON
[
  {
    "companyNumber": "16804200",
    "companyName": "AAA MOVEMENTS LTD",
    "status": "active"
  },
  {
    "companyNumber": "16409528",
    "companyName": "AAA UTILITIES LIMITED",
    "status": "active"
  }
]
```

POST `/companies/compare`

Purpose

Compares companies registered at a postcode against a list of allowed companies.

This endpoint helps identify companies that are registered at an address but are not authorised to use it.

Request Body

```JSON
{
  "postcode": "EC2A 4NE",
  "allowedCompanies": [
    "16804200",
    "16601647"
  ]
}
```

Example Response

```JSON
{
  "ok": true,
  "data": {
    "allowed": [
      {
        "companyNumber": "16804200",
        "title": "AAA MOVEMENTS LTD"
      }
    ],
    "unauthorised": [
      {
        "companyNumber": "16409528",
        "title": "AAA UTILITIES LIMITED"
      }
    ]
  }
}
```

Error Response

```JSON
{
  "ok": false,
  "error": "Postcode and allowedCompanies are required."
}
```

## Error Handling

All endpoints return structured error responses when something goes wrong.

Common causes include:

Missing parameters

Invalid request body

Companies House API errors

Errors will return an appropriate HTTP status code and error message.

## Project Structure

```
src
 ├── routes
 │   └── companies.js
 ├── services
 │   └── companiesHouseService.js
 ├── helpers
 │   └── filters.js
 └── server.js
```

## Routes

Handle HTTP requests and responses.

Services

Contain the main business logic and Companies House API calls.

Helpers

Utility functions for filtering and transforming data.

## Future Improvements

Potential improvements include:

Rate limiting

Request validation middleware

Automated API documentation

Unit tests

Caching for repeated postcode searches

Author

Malakai Ricketts

GitHub:
https://github.com/codedbymalakai
