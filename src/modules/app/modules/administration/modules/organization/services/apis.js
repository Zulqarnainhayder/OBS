import { api } from "src/boot/axios";

export default {
  getOrganization: () => api.get("api/Organization/GetOrganization"),
  updateOrganization: (data) => api.put("api/Organization/UpdateOrganization", data)
};
