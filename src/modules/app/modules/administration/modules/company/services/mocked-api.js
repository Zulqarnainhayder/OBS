import { makeApiResponse } from "src/services/mocked-response";

const company = {
  name: "name",
  label: "label",
  unifiedNo: "unifiedNo",
  phone: "phone",
  email: "email",
  website: "website",
  address1: "address1",
  address2: "address2",
  city: "city",
  poCode: "poCode",
  state: "state",
  country: "country"
};

const companies = [
  {
    id: 1,
    companyName: "El accountant",
    labelName: "Sabq 1",
    currency: "$",
    activityTypes: "one",
    businessSector: "sector"
  },
  {
    id: 2,
    companyName: "El accountant",
    labelName: "Sabq 1",
    currency: "$",
    activityTypes: "one",
    businessSector: "sector"
  },
  {
    id: 3,
    companyName: "El accountant",
    labelName: "Sabq 1",
    currency: "$",
    activityTypes: "one",
    businessSector: "sector"
  },
  {
    id: 4,
    companyName: "El accountant",
    labelName: "Sabq 1",
    currency: "$",
    activityTypes: "one",
    businessSector: "sector"
  },
  {
    id: 5,
    companyName: "El accountant",
    labelName: "Sabq 1",
    currency: "$",
    activityTypes: "one",
    businessSector: "sector"
  }
];

export default {
  getCompanies: () => makeApiResponse({ items: companies }),
  getCompany: () => makeApiResponse(company),
  updateCompany: (company) => makeApiResponse()
};
