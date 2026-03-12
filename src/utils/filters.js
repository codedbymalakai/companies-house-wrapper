export function filterSearch(data) {
  if (!data) {
    console.log("ERROR");
  }
  const filteredArray = data.filter(
    (company) => company.company_status !== "dissolved",
  );
  return filteredArray;
}

export function cleanSearch(data) {
  if (!data) {
    console.log("ERROR");
  }
  const cleanData = data.map((company) => ({
    companyName: company?.title,
    companyNumber: company?.company_number,
    companyStatus: company?.company_status,
    addressSnippet: company?.addressSnippet,
    dateOfCreation: company?.date_of_creation,
  }));
  return cleanData;
}
