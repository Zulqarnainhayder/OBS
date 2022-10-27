import { makeApiResponse } from "src/services/mocked-response";

const organization = {
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

export default {
  getOrganization: () => makeApiResponse(organization),
  updateOrganization: () => makeApiResponse()
};
