function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
}

export function filterSearch(data) {
  if (!Array.isArray(data)) {
    return [];
  }
  const filteredArray = data.filter(
    (company) => company.company_status !== "dissolved",
  );
  return filteredArray;
}

export function cleanSearch(data) {
  if (!Array.isArray(data)) {
    return [];
  }
  const cleanData = data.map((company) => ({
    companyName: company?.title,
    companyNumber: company?.company_number,
    companyStatus: toTitleCase(company?.company_status),
    addressSnippet: company?.addressSnippet,
    dateOfCreation: company?.date_of_creation,
  }));
  return cleanData;
}

export function transformDict(dict) {
  if (typeof dict !== "object" || Array.isArray(dict)) {
    return {};
  }
  const {
    company_name,
    company_number,
    company_status,
    date_of_creation,
    type,
    sic_codes,
    registered_office_address,
  } = dict;

  return {
    companyName: company_name,
    companyyNumber: company_number,
    companyStatus: company_status,
    dateOfCreation: date_of_creation,
    companyType: type,
    sicCodes: sic_codes,
    registeredOfficeAddress: registered_office_address,
  };
}
