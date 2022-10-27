import { boot } from "quasar/wrappers";
import axios from "axios";
import qs from "qs";
import { API_BASE_URL } from "src/configs/api";
import Storage from "src/services/storage";
import { Store } from "src/store";

const api = axios.create({
  // Base
  baseURL: API_BASE_URL,

  // Format all query paras
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: "repeat",
      skipNulls: true,
      allowDots: true,
    }),
});

export default boot(({ app }) => {
  api.interceptors.request.use((request) => {
    const token = Storage.getSetting("token");

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  });

  api.interceptors.response.use(
    (response) => {
      if(response.data.errorMessage) {
        return Promise.reject(response)
      }
      return response
    },
    (error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        Store.dispatch("AuthModule/logout", true);
      }

      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
