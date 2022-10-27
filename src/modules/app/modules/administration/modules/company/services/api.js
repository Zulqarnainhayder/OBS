import { api } from "src/boot/axios";

export default {
  getCompanies: () => api.get("api/Organization/GetAllCompanies"),
  getCompany: (id) =>
    api.get("api/Organization/GetCompanyById", {
      params: {
        Id: id
      }
    }),
  updateCompany: (company) =>
    api.put("api/Organization/UpdateCompany", company),
  createCompany: (company) =>
    api.post("api/Organization/CreateCompany", company),
  deleteCompany: (id) =>
    api.delete("api/Organization/DeleteCompany", {
      params: {
        Id: id
      }
    })
};
