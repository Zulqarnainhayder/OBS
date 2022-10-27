import { api } from "src/boot/axios";

const prefix = "/api/LookUps";

export default {
  lookups: {
    get: ({ name, params }) => api.get(`${prefix}/${name}`, { params }),
    getCustom: ({ name, params }) => api.get(name, { params })
  }
};
