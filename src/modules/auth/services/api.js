import { api } from "src/boot/axios";

const dashboardModule = "/api/Authentication";
const userModule = "/api/admin/user";

export default {
  login: (payload) => api.post(`${dashboardModule}/login`, payload),
  resetPassword: (payload) => api.post(`${userModule}/reset-password`, payload),
  saveUserProfileSettings: (payload) => api.post('api/Authentication/SaveUserProfileSettings', payload)
};
