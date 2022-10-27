// import api from "../services/mocked-api";
import { API_BASE_URL } from "src/configs/api";
import api from "../services/api";

const actions = {
  async getCompanies(_store) {
    const { data } = await api.getCompanies();

    return {
      data: {
        items: data.value.map((item) => ({
          ...item,
          ...(item.companyLogo && {
            companyLogo: `${API_BASE_URL}/${item.companyLogo}`
          })
        }))
      }
    };
  },
  async getCompany(_store, id) {
    const res = await api.getCompany(id);
    const { value } = res.data;

    if (value.imageUrl) {
      value.imageUrl = `${API_BASE_URL}/${value.imageUrl}`;
    }

    return res;
  },
  updateCompany(_store, data) {
    return api.updateCompany(data);
  },
  async createCompany(_store, data) {
    await api.createCompany(data);
    await _store.dispatch("chooseCompanyList");
  },
  async deleteCompany(_store, id) {
    await api.deleteCompany(id);
    await _store.dispatch("chooseCompanyList");
  },

  async chooseCompanyList(_store) {
    const response = await api.getCompanies();
    const list = await response.data.value;
    _store.commit("showCompanyList", list);
  }
};

export default actions;
