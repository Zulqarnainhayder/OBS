import { api } from "src/boot/axios";

const actions = {
  get(_store, data) {
    return api.get(data);
  },

  getLanguages: () => api.get("api/Languages/GetAll"),
  updateTranslatable: (payload) =>
    api.put("api/Languages/UpdateTranslatable", payload),
  toggleIsLanguageActive: (payload) =>
    api.put("api/Languages/UpdateActive", payload),

  getCurrencies: () => api.get("api/Currency/GetAll"),
  toggleIsCurrencyActive: (id) =>
    api.put("api/Currency/ToggleIsActive", null, {
      params: { CurrencyId: id }
    }),
  toggleIsEditiibility: (id) =>
    api.put("api/Currency/ToggleIsEditiibility", null, {
      params: { CurrencyId: id }
    }),
  updateCurrentRate: (payload) => api.put("api/Currency/Update", payload),

  getBusinessSectors() {
    return api.get("api/BusinessSector/GetAll");
  },
  updateBusinessSector(data) {
    return api.put("api/BusinessSector/Update", data);
  },
  deleteBusinessSector(id) {
    return api.delete("api/BusinessSector/Delete", {
      data: {
        id
      }
    });
  },
  createBusinessSector(data) {
    return api.post("api/BusinessSector/Create", data);
  },
  getAccountingPeriods() {
    return api.get("api/AccountingPeriod/GetAll");
  },
  getOpeningDate() {
    return api.get("api/AccountingPeriod/GetOpeningDate");
  },
  addAccountingPeriod(data) {
    return api.post("api/AccountingPeriod/Create", data);
  },
  deleteAccountingPeriod(id) {
    return api.delete("api/AccountingPeriod/Delete", {
      data: {
        id
      }
    });
  },
  toggleAccountingPeriod(id) {
    return api.put("api/AccountingPeriod/ClosePeriod", {
      id
    });
  },
  getTaxes(_store) {
    return api.get("api/Tax/GetAll");
  },
  updateTax(data) {
    return api.put("api/Tax/Update", data);
  },
  createTax(data) {
    return api.post("api/Tax/Create", data);
  },
  deleteTax(id) {
    return api.delete("api/Tax/Delete", { params: { Id: id } });
  },
  ToggleTaxIsActive(id) {
    return api.put("api/Tax/ToggleTaxIsActive", null, {
      params: {
        TaxId: id
      }
    });
  },
  getTags: () => api.get("api/Tag/GetAll"),
  addTag: (payload) => api.post("api/Tag/Create", payload),
  editTag: (payload) => api.put("api/Tag/Update", payload),
  deleteTag: (id) => api.delete("api/Tag/Delete", { params: { Id: id } }),

  getDimensionsTypes: () => api.get("api/FinancialDimensionsType/GetAll"),
  addDimensionType: (payload) =>
    api.post("api/FinancialDimensionsType/Create", payload),
  editDimensionType: (payload) =>
    api.put("api/FinancialDimensionsType/Update", payload),
  deleteDimensionType: (id) =>
    api.delete(`api/FinancialDimensionsType/Delete`, { params: { Id: id } }),

  getSeries: () => api.get("api/Series/GetAll"),
  addSeries: (payload) => api.post("api/Series/Create", payload),
  editSeries: (payload) => api.put("api/Series/Update", payload),
  toggleYear: (id) => api.put("api/Series/UpdateYear", { id }),
  toggleMonth: (id) => api.put("api/Series/UpdateMonth", { id }),
  toggleIsSeriesActive: (id) => api.put("api/Series/UpdateActive", { id }),
  deleteSeries: (id) => api.delete("api/Series/Delete", { data: id }),
  getAddresses() {
    return api.get("api/Address/GetAll");
  },
  toggleCountryAddress(id) {
    return api.put("api/Address/ToggleCountryIsActive", null, {
      params: {
        Id: id
      }
    });
  },
  createRegion(data) {
    return api.post("api/Address/CreateRegion", data);
  },
  updateRegion(data) {
    return api.put("api/Address/UpdateRegion", data);
  },
  deleteRegion(id) {
    return api.delete("api/Address/DeleteRegion", {
      params: {
        Id: id
      }
    });
  },
  createCity(data) {
    return api.post("api/Address/CreateCity", data);
  },
  updateCity(data) {
    return api.put("api/Address/UpdateCity", data);
  },
  deleteCity(id) {
    return api.delete("api/Address/DeleteCity", {
      params: {
        Id: id
      }
    });
  }
};

export default actions;
