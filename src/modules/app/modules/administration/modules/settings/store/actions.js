import api from "../services/api";

const actions = {
  get(_store, data) {
    return api.get(data);
  },
  async getLanguages() {
    const response = await api.getLanguages();
    return {
      data: {
        items: response.data.value
      }
    };
  },
  updateTranslatable: (_store, id) => api.updateTranslatable(id),
  toggleIsLanguageActive: async (_store, id) => {
    await api.toggleIsLanguageActive(id)
    await _store.dispatch("chooseLangList")
  },
  async chooseLangList (_store){
    const response = await api.getLanguages();
    const list = await response.data.value
    const activeLanguages = await list.filter(lang => lang.active == true)
    _store.commit("showLangList", activeLanguages)
  },


  async getCurrencies() {
    const response = await api.getCurrencies();
    return {
      data: {
        items: response.data.value
      }
    };
  },
  toggleIsCurrencyActive: (_store, id) => api.toggleIsCurrencyActive(id),
  toggleIsEditiibility: (_store, id) => api.toggleIsEditiibility(id),
  updateCurrentRate: (_store, data) => api.updateCurrentRate(data),

  async getTags() {
    const response = await api.getTags();
    return {
      data: {
        items: response.data.value
      }
    };
  },

  addTag: (_store, data) => api.addTag(data),
  editTag: (_store, data) => api.editTag(data),
  deleteTag: (_store, data) => api.deleteTag(data),

  async getAddresses(_store) {
    const response = await api.getAddresses();
    return {
      data: {
        items: response.data.value
      }
    };
  },
  toggleCountryAddress(_store, id) {
    return api.toggleCountryAddress(id);
  },
  createRegion(_store, data) {
    return api.createRegion(data);
  },
  updateRegion(_store, data) {
    return api.updateRegion(data);
  },
  deleteRegion(_store, id) {
    return api.deleteRegion(id);
  },
  createCity(_store, data) {
    return api.createCity(data);
  },
  updateCity(_store, data) {
    return api.updateCity(data);
  },
  deleteCity(_store, id) {
    return api.deleteCity(id);
  },

  async getSeries() {
    const response = await api.getSeries();
    return {
      data: {
        items: response.data.value
      }
    };
  },

  addSeries(_store, data) {
    return api.addSeries(data);
  },
  editSeries(_store, data) {
    return api.editSeries(data);
  },
  toggleYear(_store, data) {
    return api.toggleYear(data);
  },
  toggleMonth(_store, data) {
    return api.toggleMonth(data);
  },
  toggleIsSeriesActive(_store, data) {
    return api.toggleIsSeriesActive(data);
  },

  deleteSeries(_store, data) {
    return api.deleteSeries(data);
  },


  async getBusinessSectors() {
    const { data } = await api.getBusinessSectors();

    return {
      data: {
        items: data.value
      }
    };
  },
  deleteBusinessSector(_store, id) {
    return api.deleteBusinessSector(id);
  },
  updateBusinessSector(_store, data) {
    return api.updateBusinessSector(data);
  },
  async getAccountingPeriods(_store) {
    const { data } = await api.getAccountingPeriods();

    return {
      data: {
        items: data.value
      }
    };
  },
  createBusinessSector(_store, data) {
    return api.createBusinessSector(data);
  },
  getOpeningDate(_store) {
    return api.getOpeningDate();
  },
  addAccountingPeriod(_store, data) {
    return api.addAccountingPeriod(data);
  },
  toggleAccountingPeriod(_store, id) {
    return api.toggleAccountingPeriod(id);
  },
  deleteAccountingPeriod(_store, id) {
    return api.deleteAccountingPeriod(id);
  },
  async getDimensionsTypes() {
    const response = await api.getDimensionsTypes();

    return {
      data: {
        items: response.data.value
      }
    };
  },

  addDimensionsTypes(_store, data) {
    return api.addDimensionsTypes(data);
  },

  addDimensionType: (_store, data) => api.addDimensionType(data),
  editDimensionType: (_store, data) => api.editDimensionType(data),
  deleteDimensionType: (_store, data) => api.deleteDimensionType(data),
  async getTaxes(_store) {
    const response = await api.getTaxes();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  createTax(_store, data) {
    return api.createTax(data);
  },
  updateTax(_store, data) {
    return api.updateTax(data);
  },
  deleteTax(_store, id) {
    return api.deleteTax(id);
  },
  ToggleTaxIsActive(_store, id) {
    return api.ToggleTaxIsActive(id);
  },
  updateBusinessSector(_store, data) {
    return api.updateBusinessSector(data);
  }
};

export default actions;
