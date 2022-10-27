import api from "../services/apis";

const actions = {
  async getOrganization() {
    return api.getOrganization();
  },
  async updateOrganization(_, data) {
    return api.updateOrganization(data);
  },
  getSeries(_store, data) {
    return api.getSeries(data);
  },
  editSeries(_store, data) {
    return api.editSeries(data);
  },
  deleteSeries(_store, data) {
    return api.deleteSeries(data);
  },
  getCompany(_store, data) {
    return api.getCompany(data);
  },
  editCompany(_store, data) {
    return api.editCompany(data);
  }
};

export default actions;
