import { api } from "src/boot/axios";

export default {
  get: (id) => api.get(`/organization/${id}`),
};
