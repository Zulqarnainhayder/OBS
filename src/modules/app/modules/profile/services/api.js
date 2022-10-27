import { api } from "src/boot/axios";

const dashboardModule = "/api/Authentication";

export default {
  get: () => api.get(`${dashboardModule}/GetUserProfile`,{params: {userID: '2b559266-ba30-433c-aa4b-239f74db7f1f'}}),
  update: (data) => api.post(`${dashboardModule}/SaveUserProfileSettings`, data),
};
